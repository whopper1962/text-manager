import { appDataSource } from "@/database/appDataSource";
import { Tag } from "@/models/Tag.entity";
import { Repository } from "typeorm";

export class FetchTagsByProjectIdService {
  private tagRepository!: Repository<Tag>;

  constructor() {
    this.tagRepository = appDataSource.getRepository(Tag);
  }

  async execute(projectId: string): Promise<Tag[]> {
    return this.tagRepository.find({
      where: {
        project: {
          id: projectId,
        },
      },
    });
  }
}
