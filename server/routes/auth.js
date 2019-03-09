import { Router } from "express";
const router = Router();
import { login, register } from "../controllers/auth";

router.post("/login", login);
router.post("/signup", register);

export default router;
