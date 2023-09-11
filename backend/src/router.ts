import { Router } from "express";
import { UsersController } from "@/controllers/UsersController";
import { TextsController } from "@/controllers/TextsController";
import { LanguagesController } from "@/controllers/LanguagesController";
import { TagsController } from "@/controllers/TagsController";
import { ProjectMembersController } from "./controllers/ProjectMembersController";
import { ProjectsController } from "./controllers/ProjectsController";

export const router: Router = Router();

// users
router.get("/users", UsersController.fetchAll);

// texts
router.get("/texts", TextsController.fetchAll);

// languages
router.get("/languages", LanguagesController.fetchAll);

// tags
router.get("/tags", TagsController.fetchAll);

// projects
router.get("/projects", ProjectMembersController.fetchAll);
router.post("/projects", ProjectsController.create);

// project_members
router.post("/project_members", ProjectMembersController.create);
