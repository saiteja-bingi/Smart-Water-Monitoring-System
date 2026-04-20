import User from "../models/User.js";

export const getLeaderboard = async (req, res) => {
  try {
    const users = await User.find({})
      .select("name points")
      .sort({ points: -1 })
      .limit(10);

    const rankedUsers = users.map((user, index) => ({
      rank: index + 1,
      name: user.name,
      points: user.points
    }));

    res.status(200).json(rankedUsers);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};