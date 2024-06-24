import { Request, Response } from "express";
import {
  generateOtp,
  getGeneratedOtps,
  updateOtp,
  getGeneratedOtpss,
} from "../services/userService";

export const createOtpController = async (req: Request, res: Response) => {
  try {
    const otps = await getGeneratedOtpss(req.body);
    if(!otps){
        await generateOtp(req.body);
    }else{
        await updateOtp(req.body);
    }
    res.status(200).json({ message: "otp created" });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const verifyOtpController = async (req: Request, res: Response) => {
  try {
    const otp = await getGeneratedOtps(req.body);
    if(otp === true){
        res.status(200).json({ message: "otp verified", otp });
    }else{
        res.status(400).json({ message: "otp not verified", otp });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};
