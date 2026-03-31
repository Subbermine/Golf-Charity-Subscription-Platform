import mongoose from 'mongoose';

const drawSchema = new mongoose.Schema({
  month: {
    type: String, // e.g., "2024-05"
    required: true,
    unique: true
  },
  numbers: {
    type: [Number],
    required: true,
    validate: [val => val.length === 5, 'Draw must have 5 numbers']
  },
  type: {
    type: String,
    enum: ['random', 'algorithm'],
    default: 'random'
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  winners: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Winner'
  }],
  prizePool: {
    type: Number,
    default: 0
  },
  rolloverFromPrevious: {
    type: Number,
    default: 0
  },
  rolloverToNext: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

export default mongoose.model('Draw', drawSchema);
