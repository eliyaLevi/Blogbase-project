import { Request, Response } from "express";
import User from "../models/userModel";
import { generateToken } from "../utils/auth";
import { createUser } from "../services/userService";

// פונקציה להרשמה של משתמש חדש
export const register = async (req: Request, res: Response) => {
  const { username, password, email, profile } = req.body;

  try {
    await createUser({
      username,
      password,
      email,
      profile,
    });
    res.status(201).json({ message: "נרשמת בהצלחה  " });
  } catch (error) {
    console.log(error);
    res.status(400).json("תקלה בהרשמה");
  }
};

// התחברות של משתמש קיים
export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user || !(await user.comparePassword(password))) {
    res.status(401).json({ message: "שם משתמש או סיסמה שגויים" });
    return;
  }
  await user.save();

  const token = generateToken(user.id);
  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    maxAge: 3600000,
  });
  res.status(201).json({ message: "התחברת בהצלחה", token });
};
