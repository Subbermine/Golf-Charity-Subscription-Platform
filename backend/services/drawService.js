import Draw from '../models/Draw.js';
import User from '../models/User.js';
import Winner from '../models/Winner.js';
import Charity from '../models/Charity.js';
import Subscription from '../models/Subscription.js';

export const generateDrawNumbers = async (type = 'random') => {
  if (type === 'random') {
    const numbers = [];
    while (numbers.length < 5) {
      const r = Math.floor(Math.random() * 45) + 1;
      if (numbers.indexOf(r) === -1) numbers.push(r);
    }
    return numbers.sort((a, b) => a - b);
  } else {
    // Algorithm: based on frequency of user scores
    const users = await User.find({ scores: { $exists: true, $not: { $size: 0 } } });
    const frequency = {};
    users.forEach(u => {
      u.scores.forEach(s => {
        frequency[s] = (frequency[s] || 0) + 1;
      });
    });

    const sorted = Object.keys(frequency).sort((a, b) => frequency[b] - frequency[a]);
    const topNumbers = sorted.slice(0, 5).map(Number);

    // If less than 5, fill with random
    while (topNumbers.length < 5) {
      const r = Math.floor(Math.random() * 45) + 1;
      if (topNumbers.indexOf(r) === -1) topNumbers.push(r);
    }
    return topNumbers.sort((a, b) => a - b);
  }
};

export const calculateWinners = async (drawId) => {
  const draw = await Draw.findById(drawId);
  if (!draw) throw new Error('Draw not found');

  // Find all users with active subscriptions and scores
  const activeSubs = await Subscription.find({ status: 'active' }).select('userId');
  const activeUserIds = activeSubs.map(s => s.userId);

  const users = await User.find({ 
    _id: { $in: activeUserIds },
    scores: { $exists: true, $not: { $size: 0 } } 
  });

  const winnersByMatch = { 3: [], 4: [], 5: [] };
  const prizePool = draw.prizePool;

  for (const user of users) {
    const matches = user.scores.filter(s => draw.numbers.includes(s)).length;
    if (matches >= 3) {
      winnersByMatch[matches].push(user);
    }
  }

  // Distribution logic:
  // 5-match -> 40% (Rollover Yes)
  // 4-match -> 35% (Rollover No)
  // 3-match -> 25% (Rollover No)
  
  const match5Pool = prizePool * 0.40;
  const match4Pool = prizePool * 0.35;
  const match3Pool = prizePool * 0.25;

  const results = [];
  let rolloverToNext = 0;

  // Process 5-match winners
  if (winnersByMatch[5].length > 0) {
    const prizePerWinner = match5Pool / winnersByMatch[5].length;
    for (const user of winnersByMatch[5]) {
      const winner = await Winner.create({
        userId: user._id,
        drawId: draw._id,
        matchCount: 5,
        prizeAmount: prizePerWinner
      });
      results.push(winner._id);
    }
  } else {
    // Rollover the 5-match jackpot
    rolloverToNext = match5Pool;
  }

  // Process 4-match winners
  if (winnersByMatch[4].length > 0) {
    const prizePerWinner = match4Pool / winnersByMatch[4].length;
    for (const user of winnersByMatch[4]) {
      const winner = await Winner.create({
        userId: user._id,
        drawId: draw._id,
        matchCount: 4,
        prizeAmount: prizePerWinner
      });
      results.push(winner._id);
    }
  }

  // Process 3-match winners
  if (winnersByMatch[3].length > 0) {
    const prizePerWinner = match3Pool / winnersByMatch[3].length;
    for (const user of winnersByMatch[3]) {
      const winner = await Winner.create({
        userId: user._id,
        drawId: draw._id,
        matchCount: 3,
        prizeAmount: prizePerWinner
      });
      results.push(winner._id);
    }
  }

  draw.winners = results;
  draw.rolloverToNext = rolloverToNext;
  await draw.save();

  return results;
};
