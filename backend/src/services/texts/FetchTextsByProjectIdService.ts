import { Text } from "@/types/texts";
import { Repository } from "typeorm";
import { TextMaster as TextMasterEntity } from "@/models/TextMaster.entity";
import { appDataSource } from "@/database/appDataSource";
import { TextTag } from "@/models/TextTag.entity";

export class FetchTextsService {
  private TextMasterRepository!: Repository<TextMasterEntity>;

  constructor() {
    this.TextMasterRepository = appDataSource.getRepository(TextMasterEntity);
  }

  async execute(projectId: string): Promise<Text[]> {
    const fetchedText = await this.TextMasterRepository.find({
      relations: [
        "textContents",
        "textContents.language",
        "textTags",
        "textTags.tag",
      ],
      where: {
        project: {
          id: projectId,
        },
      },
    });
    console.log("=============FETCHED TEXTS: SERVICE=============");
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
        createdAt: fetchedText.createdAt,
        updatedAt: fetchedText.updatedAt,
      };
    });
  }
}
