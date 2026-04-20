import User from "../models/User.js";
import WaterLog from "../models/WaterLog.js";

export const getDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    const latest = await WaterLog.findOne({
      userId: req.user._id
    }).sort({ createdAt: -1 });

    let alert = "Water level normal";

    if (latest && latest.waterPercent < 20) {
      alert = "Low Water Alert";
    }

    res.status(200).json({
      user,
      latest,
      alert
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};