import Subscription from '../models/Subscription.js';

export const subscribedOnly = async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  const subscription = await Subscription.findOne({ 
    userId: req.user._id,
    status: 'active'
  });

  if (!subscription) {
    return res.status(403).json({ 
      message: 'Access denied. Active subscription required.' 
    });
  }

  next();
};
