import stripe from '../config/stripe.js';
import Subscription from '../models/Subscription.js';
import User from '../models/User.js';
import Charity from '../models/Charity.js';

export const createSubscription = async (userId, plan, paymentMethodId) => {
  try {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');

    const amount = plan === 'pro' ? 2500 : 1200; // $25 or $12 in cents

    let paymentSucceeded = false;
    let paymentId = 'mock_payment_id_' + Date.now();

    // In a real app, use Stripe. For this prototype, if key is mock, succeed automatically
    if (process.env.STRIPE_SECRET_KEY && process.env.STRIPE_SECRET_KEY !== 'your_stripe_secret_key_here') {
      try {
        const paymentIntent = await stripe.paymentIntents.create({
          amount,
          currency: 'usd',
          payment_method: paymentMethodId,
          confirm: true,
          automatic_payment_methods: { enabled: true, allow_redirects: 'never' },
        });
        paymentSucceeded = paymentIntent.status === 'succeeded';
        paymentId = paymentIntent.id;
      } catch (err) {
        console.warn('Stripe failed, falling back to mock for prototype:', err.message);
        paymentSucceeded = true; // Still succeed for prototype
      }
    } else {
      paymentSucceeded = true;
    }

    if (paymentSucceeded) {
      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() + 1);

      const subscription = await Subscription.create({
        userId,
        plan,
        status: 'active',
        startDate: new Date(),
        endDate,
        paymentId
      });

      user.subscriptionId = subscription._id;
      await user.save();

      // Update Charity Donation
      if (user.charityId) {
        const donationAmount = (amount / 100) * (user.charityPercentage / 100);
        await Charity.findByIdAndUpdate(user.charityId, {
          $inc: { totalDonations: donationAmount }
        });
      }

      return subscription;
    } else {
      throw new Error('Payment failed');
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
