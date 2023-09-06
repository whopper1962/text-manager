import { ApiGroupPath } from "@/configs/api.config";
import type { Language } from "@/types/languages";
import { ApiService } from "./ApiService";

interface ILanguagesApiService {
  fetchAll(): Promise<Language[]>;
}

class LanguagesApiService extends ApiService implements ILanguagesApiService {
  constructor() {
    super(ApiGroupPath.LANGUAGES);
  }

  async fetchAll(): Promise<Language[]> {
    return await this.get<Language[]>("");
  }
}

export const languagesApiService: LanguagesApiService =
  new LanguagesApiService();
