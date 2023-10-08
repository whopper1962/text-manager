import { ApiGroupPath } from "@/configs/api.config";
import { ApiService } from "./ApiService";
import { CreateProjectPayload } from "@/types/projects";
import { Project } from "@/types/projects";

class ProjectsApiService extends ApiService {
  constructor() {
    super(ApiGroupPath.PROJECTS);
  }

  async fetchAll(): Promise<Project[]> {
    return await this.get<Project[]>("");
  }

  async create(payload: CreateProjectPayload): Promise<void> {
    return await this.post<void, CreateProjectPayload>("", payload);
  }
}

export const projectsApiService: ProjectsApiService = new ProjectsApiService();
