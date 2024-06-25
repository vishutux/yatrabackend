import { Router } from "express";
import {
  createUserController,
  getUserController,
  loginController,
} from "../controllers/userController";

import {
  createProfileController,
  getProfileController,
  updateProfileController,
  verifyUrlController,
  syncProfileAndCorporateUserController,
} from "../controllers/profileController";

import { createCorporateUserController } from "../controllers/corporateUserController";
import {
  createOtpController,
  verifyOtpController,
} from "../controllers/otpController"; 
import { authenticateToken } from "../authMiddleware";

const router = Router();

router.post("/users", createUserController);
router.get("/users/:email", authenticateToken, getUserController);

router.post("/profile", authenticateToken, createProfileController);
router.get("/allprofile",authenticateToken, getProfileController);
router.post("/updateprofile", authenticateToken, updateProfileController);

router.post("/verifyUrl", verifyUrlController);

router.post("/corporateUser", createCorporateUserController);

router.post("/otp", createOtpController);
router.post("/verifyotp", verifyOtpController);
router.post("/syncdata",authenticateToken, syncProfileAndCorporateUserController)
router.post("/login", loginController);

export default router;
