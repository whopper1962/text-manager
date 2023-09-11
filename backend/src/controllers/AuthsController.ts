import { UserLoginService } from "@/services/users/UserLoginService";
import { UserSignupService } from "@/services/users/UserSignupService";
import { User } from "@/types/users";
import { NextFunction, Request, Response } from "express";

export class AuthsController {
  static async login(
    request: Request,
    response: Response<User[]>,
    next: NextFunction,
  ): Promise<void> {
    try {
      const members = await new UserSignupService().execute();
      response.json(members);
    } catch (e) {
      next(e);
    }
  }

  static async signup(
    request: Request,
    response: Response<User[]>,
    next: NextFunction,
  ): Promise<void> {
    try {
      const members = await new UserLoginService().execute();
      response.json(members);
    } catch (e) {
      next(e);
    }
  }
}
