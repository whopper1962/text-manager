import { FetchProjectsTextByTextId } from "@/services/texts/FetchProjectsTextByTextId";
import { FetchTextsByProjectIdService } from "@/services/texts/FetchTextsByProjectIdService";
import { UpdateBookmarkService } from "@/services/texts/UpdateBookmarkService";
import { TextsIndexSearchQuery, Text, TextDetails } from "@/types/texts";
import { NextFunction, Request, Response } from "express";

export class TextsController {
  static async fetchAll(
    request: Request<any, any, any, TextsIndexSearchQuery>,
    response: Response<Text[]>,
    next: NextFunction,
  ): Promise<void> {
    try {
      // TODO: Get Project ID from session.
      const projectId = "289c2e46-4c5d-11ee-be56-0242ac120002";
      const { query } = request;
      const texts = await new FetchTextsByProjectIdService().execute(
        projectId,
        query,
      );
      response.json(texts);
    } catch (e) {
      next(e);
    }
  }

  static async fetchById(
    request: Request<{ textId: string }>,
    response: Response<TextDetails>,
    next: NextFunction,
  ): Promise<void> {
    try {
      // TODO: Get Project ID from session.
      const projectId = "289c2e46-4c5d-11ee-be56-0242ac120002";
      const { textId } = request.params;

      const fetchedText = await new FetchProjectsTextByTextId().execute(
        projectId,
        textId,
      );
      response.json(fetchedText);
    } catch (e) {
      next(e);
    }
  }

  static async updateBookmark(
    request: Request<{ textId: string }>,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { textId } = request.params;
      const { loggingInUserId } = request;
      const projectId = "289c2e46-4c5d-11ee-be56-0242ac120002";

      await new UpdateBookmarkService().execute(
        loggingInUserId,
        textId,
        projectId,
      );
      response.status(204).send("Successfully updated!");
    } catch (e) {
      next(e);
    }
  }
}
