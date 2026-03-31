import mongoose from 'mongoose';

const charitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a charity name'],
    unique: true
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  image: {
    type: String,
    default: 'no-image.jpg'
  },
  category: {
    type: String,
    default: 'General'
  },
  totalDonations: {
    type: Number,
    default: 0
  },
  isFeatured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

export default mongoose.model('Charity', charitySchema);
