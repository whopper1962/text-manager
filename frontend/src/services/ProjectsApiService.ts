import { ApiGroupPath } from "@/configs/api.config";
import { ApiService } from "./ApiService";
import { CreateProjectPayload } from "@/types/projects";
import { Project } from "@/types/projects";

interface IProjectsApiService {
  fetchAll(): Promise<Project[]>;
  create(payload: CreateProjectPayload): Promise<void>;
}

class ProjectsApiService extends ApiService implements IProjectsApiService {
  constructor() {
    super(ApiGroupPath.PROJECTS);
  }

  async fetchAll(): Promise<Project[]> {
    return await this.get<Project[]>("");
  }

  async create(payload: CreateProjectPayload): Promise<void> {
    return await this.post<CreateProjectPayload, void>("", payload);
  }
}

export const projectsApiService: ProjectsApiService = new ProjectsApiService();
