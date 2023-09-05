import { ApiGroupPath } from "@/configs/api.config";
import type { Text } from "@/types/texts";
import { ApiService } from "./ApiService";

interface ITextsApiService {
  fetchAll(): Promise<Text[]>;
}

class TextsApiService extends ApiService implements ITextsApiService {
  constructor() {
    super(ApiGroupPath.TEXTS);
  }

  async fetchAll(): Promise<Text[]> {
    return await this.get<Text[]>("");
  }
}

export const textsApiService: TextsApiService = new TextsApiService();
