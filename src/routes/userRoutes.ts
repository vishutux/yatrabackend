import { Router } from "express";
import {
  createUserController,
  getUserController,
  loginController,
} from "../controllers/userController";

import {
  createProfileController,
  getProfileController,
  updateProfileController
} from "../controllers/profileController";

import { authenticateToken } from "../authMiddleware";

const router = Router();

router.post("/users", authenticateToken, createUserController);
router.get("/users/:email", authenticateToken, getUserController);

router.post("/profile", authenticateToken, createProfileController);
router.get("/allprofile",authenticateToken, getProfileController);
router.post("/updateprofile", authenticateToken, updateProfileController);

router.post("/login", loginController);

export default router;