import User from "../models/User.js";
import WaterLog from "../models/WaterLog.js";

export const giveDailyPoints = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const today = new Date().toISOString().split("T")[0];

    if (user.lastPointDate === today) {
      return res.json({
        message: "Points already given today",
        totalPoints: user.points
      });
    }

    const latest = await WaterLog.findOne({
      userId: req.user._id
    }).sort({ createdAt: -1 });

    if (!latest) {
      return res.status(404).json({
        message: "No water data found"
      });
    }

    let earnedPoints = 0;

    if (latest.usedLiters <= 300) {
      earnedPoints = 10;
    } else if (latest.usedLiters <= 500) {
      earnedPoints = 5;
    }

    user.points += earnedPoints;
    user.lastPointDate = today;

    await user.save();

    res.json({
      message: "Daily points added",
      earnedPoints,
      totalPoints: user.points
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};