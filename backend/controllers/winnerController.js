import Winner from '../models/Winner.js';

export const uploadProof = async (req, res) => {
  const { winnerId, proofImage } = req.body;
  try {
    const winner = await Winner.findById(winnerId);
    if (!winner) return res.status(404).json({ message: 'Winner record not found' });
    
    if (winner.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    winner.proofImage = proofImage;
    winner.status = 'pending';
    await winner.save();

    res.json(winner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyWinnings = async (req, res) => {
  try {
    const winnings = await Winner.find({ userId: req.user._id }).populate('drawId');
    res.json(winnings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllWinners = async (req, res) => {
  try {
    const winners = await Winner.find({}).populate('userId drawId');
    res.json(winners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyWinner = async (req, res) => {
  const { status } = req.body;
  try {
    const winner = await Winner.findById(req.params.id);
    if (!winner) return res.status(404).json({ message: 'Winner not found' });

    winner.status = status; // approved, rejected, paid
    await winner.save();

    res.json(winner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
