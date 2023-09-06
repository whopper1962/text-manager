import { appDataSource } from "@/database/appDataSource";
import { Language } from "@/models/Language.entity";
import { Repository } from "typeorm";

export class FetchLanguagesByProjectIdService {
  private languageRepository!: Repository<Language>;

  constructor() {
    this.languageRepository = appDataSource.getRepository(Language);
  }

  async execute(projectId: string): Promise<Language[]> {
    return this.languageRepository.find({
      where: {
        project: {
          id: projectId,
        },
      },
    });
  }
}
