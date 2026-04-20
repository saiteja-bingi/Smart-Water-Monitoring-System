import WaterLog from "../models/WaterLog.js";
import User from "../models/User.js";

export const updateWaterLevel = async (req, res) => {
  try {
    const { waterPercent } = req.body;

    const user = await User.findById(req.user._id);

    const tankCapacity = user.tankCapacity;

    const remainingLiters = Math.round(
      (waterPercent / 100) * tankCapacity
    );

    const usedLiters = tankCapacity - remainingLiters;

    const log = await WaterLog.create({
      userId: req.user._id,
      waterPercent,
      remainingLiters,
      usedLiters
    });

    res.status(201).json({
      message: "Water data updated",
      log
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getWaterHistory = async (req, res) => {
  try {
    const logs = await WaterLog.find({
      userId: req.user._id
    }).sort({ createdAt: -1 });

    res.status(200).json(logs);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getLatestWaterData = async (req, res) => {
  try {
    const latest = await WaterLog.findOne({
      userId: req.user._id
    }).sort({ createdAt: -1 });

    if (!latest) {
      return res.status(404).json({
        message: "No water data found"
      });
    }

    let alert = "Water level normal";

    if (latest.waterPercent < 20) {
      alert = "Low Water Alert";
    }

    res.status(200).json({
      latest,
      alert
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};