import express from "express";
import { restrictTo } from "../middlewares/restictAccess.js";
import { sendDoc } from "../controllers/Roles/Workers/worker.KycController.js";
import protect from "../middlewares/verifyUser.js";
import {
  getDocs,
  updateStatusDocs,
} from "../controllers/Roles/Admins/admin.doc.js";

const router = express.Router();

router.post("/send-doc", protect, restrictTo("user", "worker"), sendDoc);

router.get("/get-doc", protect, restrictTo("admin", "staff"), getDocs);
router.patch(
  "/update-doc/:id",
  protect,
  restrictTo("admin", "staff"),
  updateStatusDocs,
);

export default router;
