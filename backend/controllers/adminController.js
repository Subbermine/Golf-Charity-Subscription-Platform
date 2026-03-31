import User from '../models/User.js';
import Subscription from '../models/Subscription.js';
import Winner from '../models/Winner.js';
import Charity from '../models/Charity.js';

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).populate('subscriptionId charityId');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAdminReports = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({});
    const activeSubs = await Subscription.countDocuments({ status: 'active' });
    const totalDonations = await Charity.aggregate([
      { $group: { _id: null, total: { $sum: "$totalDonations" } } }
    ]);
    const pendingWinners = await Winner.countDocuments({ status: 'pending' });

    res.json({
      totalUsers,
      activeSubs,
      totalDonations: totalDonations[0]?.total || 0,
      pendingWinners
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
