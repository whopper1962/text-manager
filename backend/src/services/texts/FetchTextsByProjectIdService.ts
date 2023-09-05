import { Text } from "@/types/texts";
import { Repository } from "typeorm";
import { Text as TextEntity } from "@/models/Text.entity";
import { appDataSource } from "@/database/appDataSource";
import { ProjectText } from "@/models/ProjectText.entity";

export class FetchTextsService {
  private projectTextRepository!: Repository<ProjectText>;

  constructor() {
    this.projectTextRepository = appDataSource.getRepository(ProjectText);
  }

  async execute(projectId: string): Promise<Text[]> {
    const fetchedProjectText = await this.projectTextRepository.find({
      relations: [
        "text"
      ],
      where: {
        project: {
          id: projectId
        }
      }
    });
    console.log("=============FETCHED TEXTS: SERVICE=============");
    console.debug(fetchedProjectText);
    return fetchedProjectText.map((projectText) => ({
      id: projectText.id,
      text: projectText.text?.content || ""
    }));
  }
}
