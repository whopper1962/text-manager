import { appDataSource } from "@/database/appDataSource";
import { Bookmark } from "@/models/Bookmark.entity";
import { Project } from "@/models/Project.entity";
import { ProjectMember } from "@/models/ProjectMember.entity";
import { TextMaster } from "@/models/TextMaster.entity";
import { User } from "@/models/User.entity";
import { Repository } from "typeorm";

export class UpdateBookmarkService {
  private textMasterRepository!: Repository<TextMaster>;
  private projectRepository!: Repository<Project>;
  private projectMemberRepository!: Repository<ProjectMember>;
  private userRepository!: Repository<User>;
  private bookmarkRepository!: Repository<Bookmark>;

  constructor() {
    this.textMasterRepository = appDataSource.getRepository(TextMaster);
    this.projectRepository = appDataSource.getRepository(Project);
    this.projectMemberRepository = appDataSource.getRepository(ProjectMember);
    this.userRepository = appDataSource.getRepository(User);
    this.bookmarkRepository = appDataSource.getRepository(Bookmark);
  }

  async execute(
    userId: string,
    textId: string,
    projectId: string,
  ): Promise<void> {
    const member = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!member) throw new Error();

    const project = await this.projectRepository.findOne({
      where: { id: projectId },
    });

    if (!project) throw new Error();

    const projectMember = await this.projectMemberRepository.findOne({
      where: {
        member: { id: member.id },
        project: { id: project.id },
      },
    });

    if (!projectMember) throw new Error();

    const textMaster = await this.textMasterRepository.findOne({
      where: { id: textId },
    });

    if (!textMaster) throw new Error();

    await this.bookmarkRepository.save({
      projectMember,
      textMaster,
    });
  }
}
