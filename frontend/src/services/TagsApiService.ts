import { ApiGroupPath } from "@/configs/api.config";
import type { Tag } from "@/types/tags";
import { ApiService } from "./ApiService";

class TagsApiService extends ApiService {
  constructor() {
    super(ApiGroupPath.TAGS);
  }

  async fetchAll(): Promise<Tag[]> {
    return await this.get<Tag[]>("");
  }
}

export const tagsApiService: TagsApiService = new TagsApiService();
