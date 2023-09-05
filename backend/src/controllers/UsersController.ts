import { FetchMembersService } from "@/services/FetchUsersService";
import { User } from "@/types/users";
import { NextFunction, Request, Response } from "express";

export class UsersController {
  static async fetchAll(
    request: Request,
    response: Response<User[]>,
    next: NextFunction,
  ): Promise<void> {
    try {
      const members = await new FetchMembersService().execute();
      response.json(members);
    } catch (e) {
      next(e);
    }
  }
}
