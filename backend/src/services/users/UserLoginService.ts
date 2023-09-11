import { User } from "@/types/users";
import { Repository } from "typeorm";
import { User as UserEntity } from "@/models/User.entity";
import { appDataSource } from "@/database/appDataSource";

export class UserLoginService {
  private userRepository!: Repository<UserEntity>;

  constructor() {
    this.userRepository = appDataSource.getRepository(UserEntity);
  }

  async execute(): Promise<User[]> {
    return this.userRepository.find();
  }
}
