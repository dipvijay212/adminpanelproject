const express = require('express');
const fs = require('fs-extra');
const path = require('path');
const auth = require('../middleware/authMiddleware');
const logger = require('../middleware/loggerMiddleware');
const addID = require('../middleware/addIDMiddleware');
const router = express.Router();

const dbPath = path.join(__dirname, '../data/db.json');

// Add a new hero
router.post('/add/hero', addID, async (req, res) => {
  const db = await fs.readJson(dbPath);
  const newHero = req.body;
  db.heroes.push(newHero);
  await fs.writeJson(dbPath, db);
  res.status(200).json(db.heroes);
});

// Get all heroes
router.get('/', logger, async (req, res) => {
  const db = await fs.readJson(dbPath);
  res.status(200).json(db.heroes);
});

// Update villain for a hero
router.patch('/update/villain/:hero_id', auth, async (req, res) => {
  const { hero_id } = req.params;
  const { name, health } = req.body;
  const db = await fs.readJson(dbPath);
  const hero = db.heroes.find(h => h.id == hero_id);

  if (!hero) {
    return res.status(404).json({ message: 'Hero not found' });
  }

  hero.villains.push({ name, health });
  await fs.writeJson(dbPath, db);
  res.status(200).json(hero);
});

// Delete a hero
router.delete('/delete/hero/:hero_id', auth, async (req, res) => {
  const { hero_id } = req.params;
  const db = await fs.readJson(dbPath);
  const heroIndex = db.heroes.findIndex(h => h.id == hero_id);

  if (heroIndex === -1) {
    return res.status(404).json({ message: 'Hero not found' });
  }

  db.heroes.splice(heroIndex, 1);
  await fs.writeJson(dbPath, db);
  res.status(200).json(db.heroes);
});

module.exports = router;
