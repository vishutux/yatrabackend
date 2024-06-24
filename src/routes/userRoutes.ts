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
} from "../controllers/profileController";

import { createCorporateUserController } from "../controllers/corporateUserController";
import { authenticateToken } from "../authMiddleware";

const router = Router();

router.post("/users", authenticateToken, createUserController);
router.get("/users/:email", authenticateToken, getUserController);

router.post("/profile", authenticateToken, createProfileController);
router.get("/allprofile",authenticateToken, getProfileController);
router.post("/updateprofile", authenticateToken, updateProfileController);

router.post("/verifyUrl", verifyUrlController);

router.post("/corporateUser", authenticateToken, createCorporateUserController);

router.post("/login", loginController);

export default router;
