import User from '../models/User.js';

export const addScore = async (req, res) => {
  const { score } = req.body;

  if (score < 1 || score > 45) {
    return res.status(400).json({ message: 'Score must be between 1 and 45' });
  }

  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.scores.push(score);
      if (user.scores.length > 5) {
        user.scores.shift(); // remove oldest
      }
      await user.save();
      res.json(user.scores);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getScores = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      res.json(user.scores);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
