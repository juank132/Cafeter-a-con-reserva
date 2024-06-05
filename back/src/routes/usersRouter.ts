import { Router } from "express";
import { getUsers, getUsersId, loginUsers, registerUsers } from "../controllers/usersController";


export const usersRouter = Router();

usersRouter.get("/", getUsers);

usersRouter.get("/:id", getUsersId);

usersRouter.post("/register", registerUsers);

usersRouter.post("/login", loginUsers);