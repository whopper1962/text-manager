import { User } from "@/types/users";
import { Repository } from "typeorm";
import { User as UserEntity } from "@/models/User.entity";
import { appDataSource } from "@/database/appDataSource";

export class FetchMembersService {
  private memberRepository!: Repository<UserEntity>;

  constructor() {
    this.memberRepository = appDataSource.getRepository(UserEntity);
  }

  async execute(): Promise<User[]> {
    return this.memberRepository.find();
  }
}
