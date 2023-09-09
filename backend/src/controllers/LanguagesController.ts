import { FetchLanguagesByProjectIdService } from "@/services/languages/FetchLanguagesByProjectIdService";
import { Language } from "@/types/languages";
import { NextFunction, Request, Response } from "express";

export class LanguagesController {
  static async fetchAll(
    request: Request,
    response: Response<Language[]>,
    next: NextFunction,
  ): Promise<void> {
    try {
      // TODO: Get Project ID from session.
      const projectId = "289c2e46-4c5d-11ee-be56-0242ac120002";
      const languages = await new FetchLanguagesByProjectIdService().execute(projectId);
      response.json(languages);
    } catch (e) {
      next(e);
    }
  }
}
