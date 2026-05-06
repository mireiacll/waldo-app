const express = require('express');
const router = express.Router();
const Character = require('../models/Character');

// Returns only names — never expose positions to the frontend (that would be cheating!)
router.get('/characters', async (req, res) => {
  try {
    const characters = await Character.find({}, 'name');
    res.json(characters);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch characters' });
  }
});

// Called when the page loads — saves start time in the session on the SERVER
// This prevents the user from manipulating their time in the browser
router.post('/start', (req, res) => {
  req.session.startTime = Date.now();
  req.session.found = [];
  res.json({ message: 'Game started' });
});

// Called every time the user selects a character from the dropdown
// x and y come from the frontend as percentages
router.post('/validate', async (req, res) => {
  const { characterName, x, y } = req.body;

  try {
    const character = await Character.findOne({ name: characterName });
    if (!character) return res.status(404).json({ error: 'Character not found' });

    const dx = Math.abs(character.x - x);
    const dy = Math.abs(character.y - y);
    const correct = dx <= character.tolerance && dy <= character.tolerance;

    if (correct) {
      if (!req.session.found) req.session.found = [];
      if (!req.session.found.includes(characterName)) {
        req.session.found.push(characterName);
      }

      res.json({
        correct: true,
        position: { x: character.x, y: character.y }, // exact position for placing the marker
        found: req.session.found
      });
    } else {
      res.json({ correct: false });
    }
  } catch (err) {
    res.status(500).json({ error: 'Validation failed' });
  }
});

// Called when all characters are found — returns elapsed seconds from the server
router.get('/elapsed', (req, res) => {
  if (!req.session.startTime) {
    return res.status(400).json({ error: 'Game not started' });
  }
  const elapsed = Math.floor((Date.now() - req.session.startTime) / 1000);
  res.json({ elapsed });
});

module.exports = router;