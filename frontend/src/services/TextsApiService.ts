import { ApiGroupPath } from "@/configs/api.config";
import type { TextsIndexSearchQuery, Text, TextDetails } from "@/types/texts";
import { ApiService } from "./ApiService";

interface ITextsApiService {
  fetchAll(query: TextsIndexSearchQuery): Promise<Text[]>;
  fetchById(textId: string): Promise<TextDetails>;
}

class TextsApiService extends ApiService implements ITextsApiService {
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
