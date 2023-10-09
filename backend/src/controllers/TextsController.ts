import { FetchProjectsTextByTextId } from "@/services/texts/FetchProjectsTextByTextId";
import { FetchTextsByProjectIdService } from "@/services/texts/FetchTextsByProjectIdService";
import { DeleteBookmarkService } from "@/services/texts/DeleteBookmarkService";
import { TextsIndexSearchQuery, Text, TextDetails } from "@/types/texts";
import { NextFunction, Request, Response } from "express";
import { CreateBookmarkService } from "@/services/texts/CreateBookmarkService copy";

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
      const { loggingInUserId } = request;
      const { textId } = request.params;

      const fetchedText = await new FetchProjectsTextByTextId().execute(
        projectId,
        textId,
        loggingInUserId,
      );
      response.json(fetchedText);
    } catch (e) {
      next(e);
    }
  }

  static async createBookmark(
    request: Request<{ textId: string }>,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { textId } = request.params;
      const { loggingInUserId } = request;
      const projectId = "289c2e46-4c5d-11ee-be56-0242ac120002";

      await new CreateBookmarkService().execute(
        loggingInUserId,
        textId,
        projectId,
      );
      response.status(204).send("Successfully updated!");
    } catch (e) {
      next(e);
    }
  }

  static async deleteBookmark(
    request: Request<{ textId: string }>,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { textId } = request.params;
      const { loggingInUserId } = request;
      const projectId = "289c2e46-4c5d-11ee-be56-0242ac120002";

      await new DeleteBookmarkService().execute(
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
