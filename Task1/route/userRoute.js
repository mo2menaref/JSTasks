import express from "express";
import { authenticate, requireAdmin } from "../middleware/auth.js";
import { validateUserRegistration, validateUserLogin } from "../middleware/validations.js";
import { 
    registerUser, 
    loginUser, 
    getAllUsers 
} from "../controllers/userControllers.js";

const router = express.Router();

router.post("/register", validateUserRegistration, registerUser);
router.post("/login", validateUserLogin, loginUser);
router.get("/", authenticate, requireAdmin, getAllUsers);

export default router;