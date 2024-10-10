import { Request, Response } from "express";
import User, { IUser } from "../models/userModel";
import {
  getUserById,
  getAllUsers,
  updateUser,
  deleteToUser,
  getAllUsersWithPosts,
} from "../services/userService";

export const getUser = async (req: Request, res: Response) => {
  const user = await getUserById(req.params.id);

  if (!user) {
    res.status(404).json({ messege: "User not found" });
  }

  res.json(user);
};

export const getUsers = async (req: Request, res: Response) => {
  const users = await getAllUsers();

  res.json(users);
};

export const getUsersWithPosts = async (req: Request, res: Response) => {
  const users = await getAllUsersWithPosts();

  res.json(users);
};

export const updatToeUser = async (req: Request, res: Response) => {
  const user = await updateUser(req.params.id, req.body);

  if (!user) {
    res.status(404).json({ messege: "User not found" });
  }

  res.json(user);
};

export const deleteUser = async (req: Request, res: Response) => {
  const user = await deleteToUser(req.params.id);

  if (!user) {
    res.status(404).json({ messege: "User not found" });
  }

  res.json({ message: "User Deleted!" });
};

// Optionally, add DELETE and EDIT functions
