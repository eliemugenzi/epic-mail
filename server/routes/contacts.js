import { Router } from "express";
import ContactController from "../controllers/contacts";

const router = Router();

router.get("/", ContactController.contacts);
router.get("/:id", ContactController.contact);
router.delete("/:id", ContactController.deleteContact);
router.post("/", ContactController.createContact);

export default router;
