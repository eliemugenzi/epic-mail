import { Router } from "express";
const router = Router();
import AuthController from "../controllers/auth";

router.post("/login", AuthController.login);
router.post("/signup", AuthController.register);

export default router;
