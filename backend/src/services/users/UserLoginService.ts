import { Repository } from "typeorm";
import { User as UserEntity } from "@/models/User.entity";
import { appDataSource } from "@/database/appDataSource";
import * as bcrypt from "bcrypt";
import { LoginPayload } from "@/types/auths";
import { sign } from "jsonwebtoken";
import { NotFoundError, NotFoundModelName } from "../errors/NotFoundError";
import { User } from "@/types/users";

export class UserLoginService {
  private userRepository!: Repository<UserEntity>;

  constructor() {
    this.userRepository = appDataSource.getRepository(UserEntity);
  }

  async execute(payload: LoginPayload): Promise<{
    loggingInUser: User;
    token: string;
  }> {
    const loggingInUser = await this.userRepository.findOne({
      where: {
        email: payload.email,
      },
    });

    if (!loggingInUser) throw new NotFoundError(NotFoundModelName.USER);

    const isPasswordCorrect = await this.checkPassword(
      payload.password,
      loggingInUser.password,
    );

    if (!isPasswordCorrect) throw new Error();

    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    if (!jwtSecretKey) throw new Error("Secret key is not defined.");

    const jwtPayload = {
      id: loggingInUser.id,
      email: loggingInUser.email,
    };

    const token = sign(jwtPayload, jwtSecretKey, {
      expiresIn: "1h",
    });

    return {
      loggingInUser,
      token,
    };
  }

  async checkPassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
