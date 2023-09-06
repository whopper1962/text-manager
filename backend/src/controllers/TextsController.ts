import { FetchTextsService } from "@/services/texts/FetchTextsByProjectIdService";
import { Text } from "@/types/texts";
import { NextFunction, Request, Response } from "express";

export class TextsController {
  static async fetchAll(
    request: Request,
    response: Response<Text[]>,
    next: NextFunction,
  ): Promise<void> {
    try {
      // TODO: Get Project ID from session.
      const projectId = "289c2e46-4c5d-11ee-be56-0242ac120002";
      const texts = await new FetchTextsService().execute(projectId);
      console.log("=============FETCHED TEXTS: CONTROLLER=============");
      console.debug('%o', texts);
      response.json(texts);
    } catch (e) {
      next(e);
    }
  }
}
