import { Router } from "express";
import UserController from "../controllers/users";
import verifyToken from "../middleware/auth";

const router = Router();

router.get("/", UserController.users);
router.get("/:id", UserController.singleUser);
router.get("/search", UserController.search);
router.post("/byemail", UserController.findByEmail);
router.get("/current", verifyToken, UserController.current);
export default router;
