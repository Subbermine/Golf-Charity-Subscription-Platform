import Draw from '../models/Draw.js';
import Subscription from '../models/Subscription.js';
import { generateDrawNumbers, calculateWinners } from '../services/drawService.js';

export const runDraw = async (req, res) => {
  const { month, type } = req.body;
  console.log(`Running draw for month: ${month}, type: ${type}`);

  try {
    // If a draw for this month exists and is published, don't allow re-run
    const existingDraw = await Draw.findOne({ month });
    if (existingDraw && existingDraw.isPublished) {
      console.log(`Draw for ${month} already published.`);
      return res.status(400).json({ message: `Draw for ${month} is already published.` });
    }

    // If it exists but NOT published, delete it so we can re-generate
    if (existingDraw) {
      console.log(`Deleting existing draft draw for ${month}`);
      await Draw.findByIdAndDelete(existingDraw._id);
    }

    const numbers = await generateDrawNumbers(type);
    console.log(`Generated numbers: ${numbers}`);
    
    // Calculate prize pool from active subscriptions
    const activeSubscriptions = await Subscription.countDocuments({ status: 'active' });
    const subscriptionContribution = activeSubscriptions * 5;

    // Get rollover from latest published draw
    const lastPublishedDraw = await Draw.findOne({ isPublished: true }).sort({ createdAt: -1 });
    const rolloverFromPrevious = lastPublishedDraw ? lastPublishedDraw.rolloverToNext : 0;

    const prizePool = subscriptionContribution + rolloverFromPrevious;

    const draw = await Draw.create({
      month,
      numbers,
      type,
      prizePool,
      rolloverFromPrevious
    });

    console.log(`Draw created successfully: ${draw._id}`);
    res.status(201).json(draw);
  } catch (error) {
    console.error(`Error running draw: ${error.message}`);
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

export const getAdminLatestDraw = async (req, res) => {
  try {
    // Get the absolute latest draw, published or not
    const draw = await Draw.findOne({}).sort({ createdAt: -1 }).populate('winners');
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
