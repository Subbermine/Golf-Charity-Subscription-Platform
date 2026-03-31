import Draw from '../models/Draw.js';
import Subscription from '../models/Subscription.js';
import { generateDrawNumbers, calculateWinners } from '../services/drawService.js';

export const runDraw = async (req, res) => {
  const { month, type } = req.body;

  try {
    const numbers = await generateDrawNumbers(type);
    
    // Calculate prize pool from active subscriptions for that month
    // In this prototype, we'll just sum up all active subscriptions
    const activeSubscriptions = await Subscription.countDocuments({ status: 'active' });
    const prizePool = activeSubscriptions * 5; // $5 from each subscription goes to prize pool

    const draw = await Draw.create({
      month,
      numbers,
      type,
      prizePool
    });

    res.status(201).json(draw);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const publishResults = async (req, res) => {
  try {
    const draw = await Draw.findById(req.params.id);
    if (!draw) return res.status(404).json({ message: 'Draw not found' });

    await calculateWinners(draw._id);
    draw.isPublished = true;
    await draw.save();

    res.json(draw);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getLatestDraw = async (req, res) => {
  try {
    const draw = await Draw.findOne({ isPublished: true }).sort({ createdAt: -1 }).populate('winners');
    res.json(draw);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDrawHistory = async (req, res) => {
  try {
    const draws = await Draw.find({ isPublished: true }).sort({ createdAt: -1 });
    res.json(draws);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
