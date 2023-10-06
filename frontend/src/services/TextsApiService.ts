import { ApiGroupPath } from "@/configs/api.config";
import type { TextsIndexSearchQuery, Text, TextDetails } from "@/types/texts";
import { ApiService } from "./ApiService";

class TextsApiService extends ApiService {
  constructor() {
    super(ApiGroupPath.TEXTS);
  }

  async fetchAll(query: Partial<TextsIndexSearchQuery>): Promise<Text[]> {
    return await this.get<Text[]>("", query);
  }

  async fetchById(textId: string): Promise<TextDetails> {
    return await this.get<TextDetails>(`/${textId}`);
  }
}

export const textsApiService: TextsApiService = new TextsApiService();
