import express from "express";
import protect from "../middleware/authMiddleware.js";
import { updateWaterLevel, getWaterHistory, getLatestWaterData } from "../controllers/waterController.js";

const router = express.Router();

router.post("/update", protect, updateWaterLevel);
router.get("/history", protect, getWaterHistory);
router.get("/latest", protect, getLatestWaterData);

export default router;