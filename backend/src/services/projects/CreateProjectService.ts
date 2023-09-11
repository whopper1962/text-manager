import { appDataSource } from "@/database/appDataSource";
import { Project } from "@/models/Project.entity";
import { CreateProjectPayload } from "@/types/projects";
import { Repository } from "typeorm";

export class CreateProjectService {
  private projectRepository!: Repository<Project>;

  constructor() {
    this.projectRepository = appDataSource.getRepository(Project);
  }

  async execute(createProjectPayload: CreateProjectPayload): Promise<void> {
    await this.projectRepository.save(createProjectPayload);
  }
}
