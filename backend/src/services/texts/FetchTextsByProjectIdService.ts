import { TextsIndexSearchQuery, Text, ComparisonMethod } from "@/types/texts";
import { Equal, FindOptionsWhere, In, Like, Not, Repository } from "typeorm";
import { TextMaster as TextMasterEntity } from "@/models/TextMaster.entity";
import { TextContent as TextContentEntity } from "@/models/TextContent.entity";
import { TextTag as TextTagEntity } from "@/models/TextTag.entity";
import { appDataSource } from "@/database/appDataSource";
import { TextTag } from "@/models/TextTag.entity";

export class FetchTextsByProjectIdService {
  private textMasterRepository!: Repository<TextMasterEntity>;

  constructor() {
    this.textMasterRepository = appDataSource.getRepository(TextMasterEntity);
  }
  async execute(
    projectId: string,
    searchQuery: TextsIndexSearchQuery,
  ): Promise<Text[]> {
    const tagFilteredTextMasterIds =
      await this.getTagFilteredTextMasterIds(searchQuery);

    const whereOptions = this.buildTextMasterWhereOptions(
      projectId,
      tagFilteredTextMasterIds,
      searchQuery,
    );

    const fetchedTextIds = await this.textMasterRepository
      .find({
        where: whereOptions,
        select: ["id"],
      })
      .then((rawData) => {
        return rawData.map((data) => data.id);
      });

    const fetchedText = await this.textMasterRepository.find({
      relations: [
        "textContents",
        "updater",
        "textContents.language",
        "textTags",
        "textTags.tag",
      ],
      where: {
        id: In(fetchedTextIds),
      },
    });

    console.log("===============FETCHED TEXTS=================");
    console.debug(fetchedText);

    return fetchedText.map((fetchedText) => {
      const textByLanguages: Record<string, string> = {};
      fetchedText.textContents?.map((textContent) => {
        textByLanguages[textContent.language.id] = textContent.content;
      });
      return {
        id: fetchedText.id,
        text: textByLanguages,
        tags: fetchedText.textTags.map((textTag: TextTag) => ({
          id: textTag.tag.id,
          name: textTag.tag.name,
        })),
        updater: {
          id: fetchedText.updater?.id,
          name: fetchedText.updater?.name,
          email: fetchedText.updater?.email,
          profileImage: fetchedText.updater.profileImage,
        },
        createdAt: fetchedText.createdAt,
        updatedAt: fetchedText.updatedAt,
      };
    });
  }

  private async getTagFilteredTextMasterIds(
    searchQuery: TextsIndexSearchQuery,
  ): Promise<string[] | null> {
    const { tagIds } = searchQuery;
    if (!tagIds) return null;

    return await this.textMasterRepository
      .createQueryBuilder("textMaster")
      .innerJoin("textMaster.textTags", "textTag")
      .where("textTag.tag_id IN (:...tagIds)", { tagIds })
      .groupBy("textMaster.id")
      .having("COUNT(textTag.tag_id) = :tagCount", { tagCount: tagIds.length })
      .getMany()
      .then((rawData) => {
        return rawData.map((data) => data.id);
      });
  }

  private buildTextMasterWhereOptions(
    projectId: string,
    tagFilteredTextMasterIds: string[] | null,
    searchQuery: TextsIndexSearchQuery,
  ): FindOptionsWhere<TextMasterEntity> {
    if (Object.keys(searchQuery).length === 0)
      return {
        project: {
          id: projectId,
        },
      };

    return {
      ...(tagFilteredTextMasterIds ? { id: In(tagFilteredTextMasterIds) } : {}),
      project: {
        id: projectId,
      },
      textContents: this.buildTextContentWhereOption(searchQuery),
      textTags: this.buildTextTagContentWhereOption(searchQuery),
    };
  }

  private buildTextContentWhereOption(
    searchQuery: TextsIndexSearchQuery,
  ): FindOptionsWhere<TextContentEntity> {
    if (!searchQuery.keyword) return {};

    return {
      language: {
        id: searchQuery.languageId,
      },
      ...this.buidlContentComparisonQuery(searchQuery),
    };
  }

  private buidlContentComparisonQuery(
    searchQuery: TextsIndexSearchQuery,
  ): FindOptionsWhere<TextContentEntity> {
    switch (searchQuery.comparisonMethod) {
      case ComparisonMethod.CONTAINS: {
        return {
          content: Like(`%${searchQuery.keyword}%`),
        };
      }
      case ComparisonMethod.EQUALS: {
        return {
          content: Equal(searchQuery.keyword),
        };
      }
      case ComparisonMethod.NOT_CONTAINS: {
        return {
          content: Not(Like(`%${searchQuery.keyword}%`)),
        };
      }
      case ComparisonMethod.NOT_EQUALS: {
        return {
          content: Not(Equal(searchQuery.keyword)),
        };
      }
    }
  }

  private buildTextTagContentWhereOption(
    searchQuery: TextsIndexSearchQuery,
  ): FindOptionsWhere<TextTagEntity> {
    if (!searchQuery.tagIds) return {};
    return {
      tag: {
        id: In(searchQuery.tagIds),
      },
    };
  }
}
