import { Request, Response } from "express";
import { createProfile, getProfileAll, updateProfile } from "../services/userService";

export const createProfileController = async (req: Request, res: Response) => {
  try {
    const profile = await createProfile(req.body);
    res.status(201).json({message: "profile created", profile});
  } catch (error) {
    res.status(400).json(error);
  }
};
export const updateProfileController = async (req: Request, res: Response) => {
  try {
    const profile = await updateProfile(req.body);
    res.status(201).json({meassage: "profile updated", profile});
  } catch (error) {
    res.status(400).json(error);
  }
}
export const getProfileController = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 0; // Parse page number from query parameter, default to 0
    const size = parseInt(req.query.size as string) || 10;
    const profile = await getProfileAll(page, size);
    if (!profile) {
      return res.status(400).json({ error: "User not found" });
    }
    res.status(200).json(profile);
  } catch (error) {
    res.status(400).json(error);
  }
};