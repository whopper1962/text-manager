import { appDataSource } from "@/database/appDataSource";
import { ProjectMember } from "@/models/ProjectMember.entity";
import { Project } from "@/types/projects";
import { Repository } from "typeorm";

export class FetchProjectsByUserIdService {
  private projectMemberRepository!: Repository<ProjectMember>;

  constructor() {
    this.projectMemberRepository = appDataSource.getRepository(ProjectMember);
  }

  async execute(userId: string): Promise<Project[]> {
    const projectMembers = await this.projectMemberRepository.find({
      where: {
        member: {
          id: userId,
        },
      },
      relations: ["project"],
    });

    return projectMembers.map((data) => ({
      id: data.project.id,
      name: data.project.name,
      role: data.role,
    }));
  }
}
