import { SignupPayload } from "@/types/auths";
import { Repository } from "typeorm";
import { User as UserEntity } from "@/models/User.entity";
import { appDataSource } from "@/database/appDataSource";

export class CreateUserService {
  private userRepository!: Repository<UserEntity>;

  constructor() {
    this.userRepository = appDataSource.getRepository(UserEntity);
  }

  async execute(payload: SignupPayload): Promise<void> {
    const userToInsert = this.userRepository.create(payload);
    await this.userRepository.save(userToInsert);
  }
}
