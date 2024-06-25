import { Request, Response } from "express";
import {
  createCorporateUser,
  getCorporateUserByCode,
} from "../services/userService";
export const createCorporateUserController = async (
  req: Request,
  res: Response
) => {
  try {
    const corporateUser = await createCorporateUser(req.body);
    res.status(200).json({ message: "profile created", corporateUser });
  } catch (error) {
    console.log("error is ", error);
    res.status(400).json(error);
  }
};

export const getCorporateUserByCodes = async (req: Request, res: Response) => { 
  try {
    const corporateUser = await getCorporateUserByCode(req.body);
    res.status(200).json( corporateUser );
  } catch (error) {
    console.log("error is ", error);
    res.status(400).json(error);
  }
}