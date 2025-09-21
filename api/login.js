const router = require('express').Router();

/* ---------- POST → login asli ---------- */
router.post('/login', (req, res) => {
  const { username, password, type } = req.body; // reseller | developer | pt | tk
  if (!username || !password || !type) return res.status(400).json({ error: 'data kurang' });

  const users = global.readDB(type + '.json');
  const user = users.find(u => u.username === username);

  // sementara plain-text; nanti bisa pakai bcrypt.compareSync(password, user.password)
  const ok = user && user.password === password;
  if (!ok) return res.status(401).json({ error: 'salah' });

  req.session.user = { username, type };
  res.json({ ok: 1 });
});

/* ---------- GET → cuma untuk test browser ---------- */
router.get('/login', (_, res) =>
  res.json({ hint: 'Gunakan POST untuk login', contoh: { username: 'reseller1', password: 'pass123', type: 'reseller' } })
);

module.exports = router;
