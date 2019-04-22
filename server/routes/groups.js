import { Router } from "express";

import verifyToken from "../middleware/auth";
import GroupController from "../controllers/groups";
import {
  groupMessageValidate,
  groupsValidate,
  memberValidate,
  nameValidate
} from "../middleware/validations";

const router = Router();

router.get("/", verifyToken, GroupController.groups);
router.post("/", verifyToken, groupsValidate, GroupController.createGroup);
router.patch("/:id", verifyToken, nameValidate, GroupController.editName);
router.delete("/:id", verifyToken, GroupController.deleteGroup);
router.post("/:groupId/users", verifyToken, GroupController.addMembers);
router.delete(
  "/:groupId/users/:memberId",
  verifyToken,
  memberValidate,
  GroupController.deleteUser
);
router.post(
  "/:groupId/messages",
  verifyToken,
  groupMessageValidate,
  GroupController.sendGroupMessage
);
router.get("/:id", verifyToken, GroupController.group);
router.get(
  "/:groupId/messages",
  verifyToken,
  GroupController.viewGroupMessages
);
router.get(
  "/:groupId/messages/:messageId",
  verifyToken,
  GroupController.singleGroupMessage
);
router.get("/search", verifyToken, GroupController.searchGroup);
router.get("/:id/users", verifyToken, GroupController.getMembers);
router.get("/:groupId/users/:userId", verifyToken, GroupController.getmember);
export default router;
