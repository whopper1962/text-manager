import { appDataSource } from "@/database/appDataSource";
import { Bookmark } from "@/models/Bookmark.entity";
import { ProjectMember } from "@/models/ProjectMember.entity";
import { TextMaster } from "@/models/TextMaster.entity";
import { Repository } from "typeorm";

export class DeleteBookmarkService {
  private textMasterRepository!: Repository<TextMaster>;
  private projectMemberRepository!: Repository<ProjectMember>;
  private bookmarkRepository!: Repository<Bookmark>;

  constructor() {
    this.textMasterRepository = appDataSource.getRepository(TextMaster);
    this.projectMemberRepository = appDataSource.getRepository(ProjectMember);
    this.bookmarkRepository = appDataSource.getRepository(Bookmark);
  }

  async execute(
    loggingInUserId: string,
    textId: string,
    projectId: string,
  ): Promise<void> {
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

    const bookmarkToDelete = await this.bookmarkRepository.findOne({
      where: {
        projectMember: {
          id: projectMember.id,
        },
        textMaster: {
          id: textMaster.id,
        },
      },
    });

    if (!bookmarkToDelete) throw new Error();

    const deleteResult = await this.bookmarkRepository.delete(
      bookmarkToDelete.id,
    );
    if (deleteResult.affected !== 1) throw new Error();
  }
}
