import express from "express";
import protect from "../middleware/authMiddleware.js";
import { giveDailyPoints } from "../controllers/pointsController.js";

const router = express.Router();

router.post("/daily", protect, giveDailyPoints);

export default router;