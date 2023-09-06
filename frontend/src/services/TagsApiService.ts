import { ApiGroupPath } from "@/configs/api.config";
import type { Tag } from "@/types/tags";
import { ApiService } from "./ApiService";

interface ITagsApiService {
  fetchAll(): Promise<Tag[]>;
}

class TagsApiService extends ApiService implements ITagsApiService {
  constructor() {
    super(ApiGroupPath.TAGS);
  }

  async fetchAll(): Promise<Tag[]> {
    return await this.get<Tag[]>("");
  }
}

export const tagsApiService: TagsApiService = new TagsApiService();
