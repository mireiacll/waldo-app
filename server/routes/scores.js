const express = require('express');
const router = express.Router();
const Score = require('../models/Score');

// Save score — time is calculated server-side from the session, NOT trusted from frontend
router.post('/scores', async (req, res) => {
  const { playerName } = req.body;

  if (!req.session.startTime) {
    return res.status(400).json({ error: 'No active game session' });
  }

  const timeSeconds = Math.floor((Date.now() - req.session.startTime) / 1000);

  try {
    const score = await Score.create({ playerName, timeSeconds });
    req.session.destroy();
    res.json(score);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save score' });
  }
});

// Top 10 fastest times
router.get('/scores', async (req, res) => {
  try {
    const scores = await Score.find().sort({ timeSeconds: 1 }).limit(10);
    res.json(scores);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch scores' });
  }
});

module.exports = router;