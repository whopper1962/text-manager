import { Project } from "@/types/projects";
import { CreateProjectMemberService } from "@/services/projectMembers/CreateProjectMemberService";
import { FetchProjectsByUserIdService } from "@/services/projectMembers/FetchProjectsByUserIdService";
import { MemberRole } from "@/types/projectMembers";
import { NextFunction, Request, Response } from "express";

export class ProjectMembersController {
  static async fetchAll(
    request: Request,
    response: Response<Project[]>,
    next: NextFunction,
  ): Promise<void> {
    try {
      // TODO: get user id from session
      const userId = "487e89f2-4c5d-11ee-be56-0242ac120002";
      const projects = await new FetchProjectsByUserIdService().execute(userId);
      response.json(projects);
    } catch (e) {
      next(e);
    }
  }

  static async create(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const projectId = "289c2e46-4c5d-11ee-be56-0242ac120003";
      const userId = "487e89f2-4c5d-11ee-be56-0242ac120002";
      await new CreateProjectMemberService().execute(
        projectId,
        userId,
        MemberRole.DEVELOPER,
      );
      response.status(204).send("Project member successfully created!");
    } catch (e) {
      next(e);
    }
  }
}
