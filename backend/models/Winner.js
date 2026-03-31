import mongoose from 'mongoose';

const winnerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  drawId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Draw',
    required: true
  },
  matchCount: {
    type: Number,
    enum: [3, 4, 5],
    required: true
  },
  prizeAmount: {
    type: Number,
    required: true
  },
  proofImage: {
    type: String
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'paid'],
    default: 'pending'
  }
}, {
  timestamps: true
});

export default mongoose.model('Winner', winnerSchema);
