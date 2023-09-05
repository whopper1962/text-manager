import { Router } from "express";
import { UsersController } from '@/controllers/UsersController';
import { TextsController } from "./controllers/TextsController";

export const router: Router = Router();

// users
router.get("/users", UsersController.fetchAll);

// texts
router.get("/texts", TextsController.fetchAll);
