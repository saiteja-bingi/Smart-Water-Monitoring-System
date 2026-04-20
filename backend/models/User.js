import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true
    },

    tankCapacity: {
      type: Number,
      required: true
    },

    tankHeight: {
      type: Number,
      required: true
    },

    points: {
      type: Number,
      default: 0
    },

    lastPointDate: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;