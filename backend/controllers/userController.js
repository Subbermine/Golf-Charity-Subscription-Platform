import User from '../models/User.js';
import Subscription from '../models/Subscription.js';
import { createSubscription } from '../services/paymentService.js';

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('subscriptionId charityId');
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.charityId = req.body.charityId || user.charityId;
      user.charityPercentage = req.body.charityPercentage || user.charityPercentage;

      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        charityId: updatedUser.charityId,
        charityPercentage: updatedUser.charityPercentage
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const subscribe = async (req, res) => {
  const { plan, paymentMethodId } = req.body;

  try {
    const subscription = await createSubscription(req.user._id, plan, paymentMethodId);
    res.status(201).json(subscription);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getSubscriptionStatus = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(subscription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
