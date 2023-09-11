import { appDataSource } from "@/database/appDataSource";
import { ProjectMember } from "@/models/ProjectMember.entity";
import { MemberRole } from "@/types/projectMembers";
import { Project } from "@/models/Project.entity";
import { Repository } from "typeorm";
import { NotFoundError, NotFoundModelName } from "../errors/NotFoundError";
import { User } from "@/models/User.entity";

export class CreateProjectMemberService {
  private userRepository!: Repository<User>;
  private projectRepository!: Repository<Project>;
  private projectMemberRepository!: Repository<ProjectMember>;

  constructor() {
    this.userRepository = appDataSource.getRepository(User);
    this.projectRepository = appDataSource.getRepository(Project);
    this.projectMemberRepository = appDataSource.getRepository(ProjectMember);
  }

  async execute(
    projectId: string,
    userId: string,
    role: MemberRole,
  ): Promise<void> {
    const project = await this.projectRepository.findOne({
      where: { id: projectId },
    });
    if (!project) throw new NotFoundError(NotFoundModelName.PROJECT);

    const member = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!member) throw new NotFoundError(NotFoundModelName.USER);

    await this.projectMemberRepository.save({
      role,
      project,
      member,
    });
  }
}
