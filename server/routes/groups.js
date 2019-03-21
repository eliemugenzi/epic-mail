import { Router } from "express";

import verifyToken from "../middleware/auth";
import GroupController from "../controllers/groups";
import { groupMessageValidate, groupsValidate, memberValidate , nameValidate } from "../middleware/validations";

const router = Router();

router.get("/", verifyToken, GroupController.groups);
router.post("/", verifyToken, groupsValidate, GroupController.createGroup);
router.patch("/:id", verifyToken, nameValidate, GroupController.editName);
router.delete("/:id", verifyToken, GroupController.deleteGroup);
router.post("/:groupId/users", verifyToken, GroupController.addMembers);
router.delete("/:groupId/users/:memberId", verifyToken, memberValidate, GroupController.deleteUser);
router.post("/:groupId/messages", verifyToken, groupMessageValidate, GroupController.sendGroupMessage);
router.get("/:id", verifyToken, GroupController.group);

export default router;
