import { appDataSource } from "@/database/appDataSource";
import { TextMaster } from "@/models/TextMaster.entity";
import { TextDetails } from "@/types/texts";
import { Repository } from "typeorm";
import { NotFoundError, NotFoundModelName } from "../errors/NotFoundError";
import { TextTag } from "@/models/TextTag.entity";
import { ProjectMember } from "@/models/ProjectMember.entity";
import { Bookmark } from "@/models/Bookmark.entity";

export class FetchProjectsTextByTextId {
  private textMasterRepository!: Repository<TextMaster>;
  private projectMemberRepository!: Repository<ProjectMember>;
  private bookmarkRepository!: Repository<Bookmark>;

  constructor() {
    this.textMasterRepository = appDataSource.getRepository(TextMaster);
    this.projectMemberRepository = appDataSource.getRepository(ProjectMember);
    this.bookmarkRepository = appDataSource.getRepository(Bookmark);
  }

  async execute(
    projectId: string,
    textId: string,
    loggingInUserId: string,
  ): Promise<TextDetails> {
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

    const projectMember = await this.projectMemberRepository.findOne({
      where: {
        member: { id: loggingInUserId },
        project: { id: projectId },
      },
    });

    if (!projectMember) throw new Error();

    const textMaster = await this.textMasterRepository.findOne({
      where: { id: textId },
    });

    if (!textMaster) throw new Error();

    const isBookmarked = await this.bookmarkRepository.exist({
      where: {
        projectMember: {
          id: projectMember.id,
        },
        textMaster: {
          id: textMaster.id,
        },
      },
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
      memo: fetchedText.memo,
      alias: fetchedText.alias,
      bookmarked: isBookmarked,
    };
  }
}
