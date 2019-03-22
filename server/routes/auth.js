import { Router } from "express";
import AuthController from "../controllers/auth";
import { userValidate, loginValidate } from "../middleware/validations";

const router = Router();

router.post("/login",loginValidate, AuthController.login);
router.post("/signup", userValidate, AuthController.register);

export default router;
