import WaterLog from "../models/WaterLog.js";
import User from "../models/User.js";

export const updateWaterLevel = async (req, res) => {
  try {
    const { distance } = req.body;

    const user = await User.findById(req.user._id);

    const tankHeight = user.tankHeight;      // in cm
    const tankCapacity = user.tankCapacity;  // liters

    // Calculate actual water height
    let waterLevel = tankHeight - distance;

    if (waterLevel < 0) waterLevel = 0;
    if (waterLevel > tankHeight) waterLevel = tankHeight;

    // Percentage
    const waterPercent = (waterLevel / tankHeight) * 100;

    // Remaining liters
    const remainingLiters = Math.round(
      (waterPercent / 100) * tankCapacity
    );

    // Used liters
    const usedLiters = tankCapacity - remainingLiters;

    const log = await WaterLog.create({
      userId: req.user._id,
      waterPercent: waterPercent.toFixed(2),
      remainingLiters,
      usedLiters
    });

    res.status(201).json({
      message: "Sensor data updated",
      waterLevel: waterLevel.toFixed(2),
      waterPercent: waterPercent.toFixed(2),
      remainingLiters,
      usedLiters,
      log
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getLatestWaterData = async (req, res) => {
  try {
    const log = await WaterLog.findOne({
      userId: req.user._id
    }).sort({ createdAt: -1 });

    if (!log) {
      return res.status(404).json({ message: "No data available" });
    }

    res.json({
      waterPercent: log.waterPercent,
      remainingLiters: log.remainingLiters,
      usedLiters: log.usedLiters,
      waterLevel: (
        (log.waterPercent / 100) *
        req.user.tankHeight
      ).toFixed(2)
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

    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};