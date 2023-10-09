import { ApiGroupPath } from "@/configs/api.config";
import type { TextsIndexSearchQuery, Text, TextDetails } from "@/types/texts";
import { ApiService } from "./ApiService";

class TextsApiService extends ApiService {
  constructor() {
    super(ApiGroupPath.TEXTS);
  }

  async fetchAll(query: Partial<TextsIndexSearchQuery>): Promise<Text[]> {
    return await this.get<Text[]>("", {
      params: query,
    });
  }

  async fetchById(textId: string): Promise<TextDetails> {
    return await this.get<TextDetails>(`/${textId}`);
  }

  async postBookmark(textId: string): Promise<void> {
    return await this.post<void>(`/${textId}/bookmark`);
  }

  async deleteBookmark(textId: string): Promise<void> {
    return await this.delete<void>(`/${textId}/bookmark`);
  }
}

export const textsApiService: TextsApiService = new TextsApiService();
