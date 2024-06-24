import { Request, Response } from "express";
import { createCorporateUser } from "../services/userService";
export const createCorporateUserController = async (
  req: Request,
  res: Response
) => {
  try {
    const corporateUser = await createCorporateUser(req.body);
    res.status(200).json({ message: "profile created", corporateUser });
  } catch (error) {
    res.status(400).json(error);
  }
};
