import { ApiGroupPath } from "@/configs/api.config";
import type { TextsIndexSearchQuery, Text } from "@/types/texts";
import { ApiService } from "./ApiService";

interface ITextsApiService {
  fetchAll(query: TextsIndexSearchQuery): Promise<Text[]>;
}

class TextsApiService extends ApiService implements ITextsApiService {
  constructor() {
    super(ApiGroupPath.TEXTS);
  }

  async fetchAll(query: Partial<TextsIndexSearchQuery>): Promise<Text[]> {
    return await this.get<Text[]>("", query);
  }
}

export const textsApiService: TextsApiService = new TextsApiService();
