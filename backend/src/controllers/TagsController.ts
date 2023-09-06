import { FetchTagsByProjectIdService } from "@/services/tags/FetchTagsByProjectIdService";
import { Tag } from "@/types/tags";
import { NextFunction, Request, Response } from "express";

export class TagsController {
  static async fetchAll(
    request: Request,
    response: Response<Tag[]>,
    next: NextFunction,
  ): Promise<void> {
    try {
      // TODO: Get Project ID from session.
      const projectId = "289c2e46-4c5d-11ee-be56-0242ac120002";
      const Tags = await new FetchTagsByProjectIdService().execute(projectId);
      console.log("=============FETCHED TagS: CONTROLLER=============");
      console.debug(Tags);
      response.json(Tags);
    } catch (e) {
      next(e);
    }
  }
}
