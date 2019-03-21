import { Router } from "express";

import verifyToken from "../middleware/auth";
import GroupController from "../controllers/groups";

const router = Router();

router.get("/", GroupController.groups);
router.post("/", verifyToken, GroupController.createGroup);
router.patch("/:id", verifyToken, GroupController.editName);
router.delete("/:id", verifyToken, GroupController.deleteGroup);
router.post("/:groupId/users", verifyToken, GroupController.addMembers);
router.delete("/:groupId/users/:memberId", GroupController.deleteUser);
router.post("/:groupId/messages", verifyToken, GroupController.sendGroupMessage);
router.get("/:id", verifyToken, GroupController.group);

export default router;
