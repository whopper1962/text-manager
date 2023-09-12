import { Repository } from "typeorm";
import { User as UserEntity } from "@/models/User.entity";
import { appDataSource } from "@/database/appDataSource";
import * as bcrypt from "bcrypt";
import { LoginPayload } from "@/types/auths";

export class UserLoginService {
  private userRepository!: Repository<UserEntity>;

  constructor() {
    this.userRepository = appDataSource.getRepository(UserEntity);
  }

  async execute(payload: LoginPayload): Promise<UserEntity> {
    const loggingInUser = await this.userRepository.findOne({
      where: {
        email: payload.email,
      },
    });

    if (!loggingInUser) throw new Error();

    const isPasswordCorrect = await this.checkPassword(
      payload.password,
      loggingInUser.password,
    );

    if (!isPasswordCorrect) throw new Error();

    return loggingInUser;
  }

  async checkPassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
