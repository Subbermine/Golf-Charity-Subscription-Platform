import stripe from '../config/stripe.js';
import Subscription from '../models/Subscription.js';
import User from '../models/User.js';
import Charity from '../models/Charity.js';

export const createSubscription = async (userId, plan, paymentMethodId) => {
  try {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');

    // In a real app, you'd create a Stripe customer or use existing one
    // const customer = await stripe.customers.create({ email: user.email, payment_method: paymentMethodId });
    
    // For this prototype, we'll mock the Stripe success or use a basic intent
    const amount = plan === 'monthly' ? 1000 : 10000; // $10 or $100 in cents

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method: paymentMethodId,
      confirm: true,
      automatic_payment_methods: { enabled: true, allow_redirects: 'never' },
    });

    if (paymentIntent.status === 'succeeded') {
      const endDate = new Date();
      if (plan === 'monthly') endDate.setMonth(endDate.getMonth() + 1);
      else endDate.setFullYear(endDate.getFullYear() + 1);

      const subscription = await Subscription.create({
        userId,
        plan,
        status: 'active',
        startDate: new Date(),
        endDate,
        paymentId: paymentIntent.id
      });

      user.subscriptionId = subscription._id;
      await user.save();

      // Update Charity Donation (at least 10% as per PRD)
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
