import { CreateUserService } from "@/services/users/CreateUserService";
import { UserLoginService } from "@/services/users/UserLoginService";
import { User } from "@/types/users";
import { LoginPayload, SignupPayload } from "@/types/auths";
import { NextFunction, Request, Response } from "express";

export class AuthsController {
  static async login(
    request: Request<any, any, LoginPayload>,
    response: Response<User>,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { body } = request;

      const { loggingInUser, token } = await new UserLoginService().execute(body);

      response.cookie("token", token, {
        httpOnly: true,
      });

      response.json(loggingInUser);
    } catch (e) {
      next(e);
    }
  }

  static async signup(
    request: Request<any, any, SignupPayload>,
    response: Response<string>,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { body } = request;
      await new CreateUserService().execute(body);
      response.status(204).send("Created");
    } catch (e) {
      next(e);
    }
  }
}
