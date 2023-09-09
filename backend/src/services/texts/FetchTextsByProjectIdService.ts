import { TextsIndexSearchQuery, Text } from "@/types/texts";
import { FindOptionsWhere, In, Like, Repository } from "typeorm";
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
    searchQuery: TextsIndexSearchQuery
  ): Promise<Text[]> {
    const whereOptions = this.buildTextMasterWhereOptions(
      projectId,
      searchQuery
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
        "textContents.language",
        "textTags",
        "textTags.tag",
      ],
      where: {
        id: In(fetchedTextIds),
      },
    });

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
        createdAt: fetchedText.createdAt,
        updatedAt: fetchedText.updatedAt,
      };
    });
  }

  private buildTextMasterWhereOptions(
    projectId: string,
    searchQuery: TextsIndexSearchQuery
  ): FindOptionsWhere<TextMasterEntity> {
    if (Object.keys(searchQuery).length === 0)
      return {
        project: {
          id: projectId,
        },
      };

    return {
      project: {
        id: projectId,
      },
      textContents: this.buildTextContentWhereOption(searchQuery),
      textTags: this.buildTextTagContentWhereOption(searchQuery),
    };
  }

  private buildTextContentWhereOption(
    searchQuery: TextsIndexSearchQuery
  ): FindOptionsWhere<TextContentEntity> {
    if (!searchQuery.keyword) return {};
    return {
      language: {
        id: searchQuery.languageId,
      },
      content: Like(`%${searchQuery.keyword}%`),
    };
  }

  private buildTextTagContentWhereOption(
    searchQuery: TextsIndexSearchQuery
  ): FindOptionsWhere<TextTagEntity> {
    if (!searchQuery.tagIds) return {};
    return {
      tag: {
        id: In(searchQuery.tagIds),
      },
    };
  }
}
