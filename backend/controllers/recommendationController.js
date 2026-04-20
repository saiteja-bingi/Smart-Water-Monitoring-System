import WaterLog from "../models/WaterLog.js";

export const getRecommendations = async (req, res) => {
  try {
    const latest = await WaterLog.findOne({
      userId: req.user._id
    }).sort({ createdAt: -1 });

    if (!latest) {
      return res.json({
        tips: ["No water data available yet"]
      });
    }

    let tips = [];

    if (latest.usedLiters > 500) {
      tips = [
        "Use bucket instead of shower",
        "Turn off tap while brushing",
        "Check for leaking taps"
      ];
    } else if (latest.usedLiters > 300) {
      tips = [
        "Reduce unnecessary washing",
        "Reuse water where possible",
        "Monitor daily usage"
      ];
    } else {
      tips = [
        "Great job! Keep saving water",
        "Reuse RO waste water",
        "Maintain current habits"
      ];
    }

    res.status(200).json({ tips });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};