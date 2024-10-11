import { Router } from "express";
import {
  loginController,
  registerController,
  verifyUserController
} from "../controllers/authController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
// import { requireSignIn } from "../middlewares/authMiddleware.js";
const router = Router();

// register
router.post("/register", registerController);

// login
router.post("/login", loginController);

// Protected route for getting user profile
router.get('/profile',verifyToken, verifyUserController);




export default router;