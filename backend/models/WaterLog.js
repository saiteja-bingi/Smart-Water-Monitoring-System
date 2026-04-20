import mongoose from "mongoose";

const waterLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    waterPercent: {
      type: Number,
      required: true
    },

    remainingLiters: {
      type: Number,
      required: true
    },

    usedLiters: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

const WaterLog = mongoose.model("WaterLog", waterLogSchema);

export default WaterLog;