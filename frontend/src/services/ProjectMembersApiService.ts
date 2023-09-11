import { ApiGroupPath } from "@/configs/api.config";
import { ApiService } from "./ApiService";
import { CreateProjectPayload } from "@/types/projects";

interface IProjectMembersApiService {
  create(payload: CreateProjectPayload): Promise<boolean>;
}

class ProjectMembersApiService
  extends ApiService
  implements IProjectMembersApiService
{
  constructor() {
    super(ApiGroupPath.PROJECT_MEMBES);
  }

  async create(payload: CreateProjectPayload): Promise<boolean> {
    return await this.post<CreateProjectPayload, boolean>("", payload);
  }
}

export const projectMembersApiService: ProjectMembersApiService =
  new ProjectMembersApiService();
