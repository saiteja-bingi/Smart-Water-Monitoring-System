import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import waterRoutes from "./routes/waterRoutes.js";
import pointsRoutes from "./routes/pointsRoutes.js";
import leaderboardRoutes from "./routes/leaderboardRoutes.js";
import recommendationRoutes from "./routes/recommendationRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

dotenv.config();
connectDB();

const app = express();  

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/water", waterRoutes);
app.use("/api/points", pointsRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/recommendations", recommendationRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
  res.send("Smart Water Monitoring Backend Running!!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});