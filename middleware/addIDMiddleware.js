const fs = require('fs-extra');
const path = require('path');
const dbPath = path.join(__dirname, '../data/db.json');

async function addID(req, res, next) {
  const db = await fs.readJson(dbPath);
  const lastHero = db.heroes[db.heroes.length - 1];
  req.body.id = lastHero ? lastHero.id + 1 : 1;
  next();
}

module.exports = addID;
