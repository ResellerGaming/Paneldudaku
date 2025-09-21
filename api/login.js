const router = require('express').Router();
const bcrypt = require('bcrypt');

router.post('/login', (req, res) => {
  const { username, password, type } = req.body; // type: reseller | developer | pt | tk
  if (!username || !password || !type) return res.status(400).json({ error: 'data kurang' });

  const file = type + '.json';
  const users = global.readDB(file);
  const user = users.find(u => u.username === username);

  // kalau password masih plain-text (sementara)
  const ok = user && user.password === password;
  if (!ok) return res.status(401).json({ error: 'salah' });

  req.session.user = { username, type };
  res.json({ ok: 1 });
});

module.exports = router;