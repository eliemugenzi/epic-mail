import { Router } from "express";
import AuthController from "../controllers/auth";
import { userValidate } from "../middleware/validations";

const router = Router();

router.post("/login", AuthController.login);
router.post("/signup", userValidate, AuthController.register);

export default router;
