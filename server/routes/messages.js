import { Router } from "express";
import MessageController from "../controllers/messages";
import verifyToken from "../middleware/auth";

const router = Router();

router.get("/", verifyToken, MessageController.messages);
router.get("/unread", verifyToken, MessageController.unread);
router.get("/sent", verifyToken, MessageController.sent);
router.get("/draft", verifyToken, MessageController.draft);
router.get("/:id", verifyToken, MessageController.message);
router.post("/reply/:messageId", verifyToken, MessageController.replyMessage);

router.post("/", verifyToken, MessageController.createMessage);
router.delete("/:messageId", verifyToken, MessageController.moveToTrash);

export default router;
