import { Router } from "express";
import {getUser, getUsers, getUsersWithPosts, updatToeUser, deleteUser } from "../controllers/userController";

const userRouter = Router();


userRouter.get("/", getUser);
userRouter.get("/", getUsers);
userRouter.get("/", getUsersWithPosts);
userRouter.put("/:username", updatToeUser);
userRouter.delete("/:username", deleteUser);

export default userRouter;
