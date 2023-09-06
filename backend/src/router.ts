import { Router } from "express";
import { UsersController } from '@/controllers/UsersController';
import { TextsController } from "@/controllers/TextsController";
import { LanguagesController } from "@/controllers/LanguagesController";
import { TagsController } from "@/controllers/TagsController";

export const router: Router = Router();

// users
router.get("/users", UsersController.fetchAll);

// texts
router.get("/texts", TextsController.fetchAll);

// languages
router.get("/languages", LanguagesController.fetchAll);

// tags
router.get("/tags", TagsController.fetchAll);