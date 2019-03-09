import { Router } from "express";
import {
  messages,
  message,
  unread,
  sent,
  draft,
  replyMessage,
  createMessage,
  moveToTrash,
  allUnread,
  allDrafts,
  allRead
} from "../controllers/messages";
import verifyToken from "../middleware/auth";

const router = Router();

router.get("/", verifyToken, messages);
router.get("/unread", verifyToken, unread);
router.get("/sent", verifyToken, sent);
router.get("/draft", verifyToken, draft);
router.get("/:id", verifyToken, message);
router.post("/reply/:messageId", verifyToken, replyMessage);

router.post("/", verifyToken, createMessage);
router.delete("/:messageId", verifyToken, moveToTrash);
router.get("/unread/messages", allUnread);
router.get("/draft/messages", allDrafts);
router.get("/read/messages", allRead);

export default router;
