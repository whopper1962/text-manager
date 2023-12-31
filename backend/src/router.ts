import { Router } from "express";
import { UsersController } from "@/controllers/UsersController";
import { TextsController } from "@/controllers/TextsController";
import { LanguagesController } from "@/controllers/LanguagesController";
import { TagsController } from "@/controllers/TagsController";
import { ProjectMembersController } from "./controllers/ProjectMembersController";
import { ProjectsController } from "./controllers/ProjectsController";
import { AuthsController } from "./controllers/AuthsController";
import { authenticationCheck } from "./middlewares/authenticationCheck";

export const router: Router = Router();

// auth
router.post("/login", AuthsController.login);
router.post("/signup", AuthsController.signup);

// users
router.get("/users", UsersController.fetchAll);

// texts
router.get("/texts", authenticationCheck, TextsController.fetchAll);
router.get("/texts/:textId", authenticationCheck, TextsController.fetchById);
router.post(
  "/texts/:textId/bookmark",
  authenticationCheck,
  TextsController.createBookmark,
);
router.delete(
  "/texts/:textId/bookmark",
  authenticationCheck,
  TextsController.deleteBookmark,
);

// languages
router.get("/languages", LanguagesController.fetchAll);

// tags
router.get("/tags", TagsController.fetchAll);

// projects
router.get("/projects", ProjectMembersController.fetchAll);
router.post("/projects", ProjectsController.create);

// project_members
router.post("/project_members", ProjectMembersController.create);
