import { ApiGroupPath } from "@/configs/api.config";
import { ApiService } from "./ApiService";
import { CreateProjectPayload } from "@/types/projects";

class ProjectMembersApiService extends ApiService {
  constructor() {
    super(ApiGroupPath.PROJECT_MEMBES);
  }

  async create(payload: CreateProjectPayload): Promise<boolean> {
    return await this.post<CreateProjectPayload, boolean>("", payload);
  }
}

export const projectMembersApiService: ProjectMembersApiService =
  new ProjectMembersApiService();
