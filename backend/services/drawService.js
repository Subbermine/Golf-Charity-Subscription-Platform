import Draw from '../models/Draw.js';
import User from '../models/User.js';
import Winner from '../models/Winner.js';
import Charity from '../models/Charity.js';

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

  const users = await User.find({ 
    subscriptionId: { $exists: true }, 
    scores: { $exists: true, $not: { $size: 0 } } 
  });

  const winners = [];
  const prizePool = draw.prizePool;

  for (const user of users) {
    const matches = user.scores.filter(s => draw.numbers.includes(s)).length;
    if (matches >= 3) {
      winners.push({ userId: user._id, matchCount: matches });
    }
  }

  // Distribution logic:
  // 5-match -> 40%
  // 4-match -> 35%
  // 3-match -> 25%
  const winnersByMatch = { 3: [], 4: [], 5: [] };
  winners.forEach(w => winnersByMatch[w.matchCount].push(w));

  const match5Pool = prizePool * 0.40;
  const match4Pool = prizePool * 0.35;
  const match3Pool = prizePool * 0.25;

  const results = [];

  const addWinners = async (matchCount, pool) => {
    const list = winnersByMatch[matchCount];
    if (list.length > 0) {
      const prizePerWinner = pool / list.length;
      for (const w of list) {
        const winner = await Winner.create({
          userId: w.userId,
          drawId: draw._id,
          matchCount: matchCount,
          prizeAmount: prizePerWinner
        });
        results.push(winner._id);
      }
    }
  };

  await addWinners(5, match5Pool);
  await addWinners(4, match4Pool);
  await addWinners(3, match3Pool);

  draw.winners = results;
  await draw.save();

  return results;
};
