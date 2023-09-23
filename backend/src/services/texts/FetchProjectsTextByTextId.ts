import { appDataSource } from "@/database/appDataSource";
import { TextMaster } from "@/models/TextMaster.entity";
import { TextDetails } from "@/types/texts";
import { Repository } from "typeorm";
import { NotFoundError, NotFoundModelName } from "../errors/NotFoundError";
import { TextTag } from "@/models/TextTag.entity";

export class FetchProjectsTextByTextId {
  private textMasterRepository!: Repository<TextMaster>;

  constructor() {
    this.textMasterRepository = appDataSource.getRepository(TextMaster);
  }

  async execute(projectId: string, textId: string): Promise<TextDetails> {
    const fetchedText = await this.textMasterRepository.findOne({
      relations: [
        "textContents",
        "updater",
        "textContents.language",
        "textTags",
        "textTags.tag",
      ],
      where: {
        id: textId,
        project: {
          id: projectId,
        },
      },
    });

    if (!fetchedText) throw new NotFoundError(NotFoundModelName.TEXT);

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
      memo: "Test memo",
      alias: fetchedText.alias,
    };
  }
}
