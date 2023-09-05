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
      const projectId = "15d2a240-4bea-11ee-be56-0242ac120002";
      const texts = await new FetchTextsService().execute(projectId);
      console.log("=============FETCHED TEXTS: CONTROLLER=============");
      console.debug(texts);
      response.json(texts);
    } catch (e) {
      next(e);
    }
  }
}
