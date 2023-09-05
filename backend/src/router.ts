import { Router } from "express";
import { UsersController } from '@/controllers/UsersController';

export const router: Router = Router();

router.get("/users", UsersController.fetchAll);