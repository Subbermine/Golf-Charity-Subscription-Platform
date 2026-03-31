import Subscription from '../models/Subscription.js';

export const subscribedOnly = async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  // Allow admins to bypass
  if (req.user.role === 'admin') {
    return next();
  }

  // In development, we can be more lenient or just check if a subscription exists
  const subscription = await Subscription.findOne({ 
    userId: req.user._id,
    status: 'active'
  });

  if (!subscription && process.env.NODE_ENV !== 'development') {
    return res.status(403).json({ 
      message: 'Access denied. Active subscription required.' 
    });
  }

  next();
};
