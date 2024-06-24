import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { createUser, getUser, verifyUsers } from "../services/userService";

export const createUserController = async (req: Request, res: Response) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getUserController = async (req: Request, res: Response) => {
  try {
    const user = await getUser(req.params.email);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const isValid = await verifyUsers(email, password);
    const user = await getUser(email);

    const payload = { id: user!.id, email: user!.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: process.env.JWT_EXPIRATION || "24h",
    });
    if (isValid) {
      res.status(200).json({ message: "Login successful", token });
    } else {
      res.status(400).json({ error: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
