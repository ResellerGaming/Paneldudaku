const router = require('express').Router();

router.get('/pt', (req, res) => {
  if (!req.session.user) return res.status(403).json({ error: 'login dulu' });
  const users = global.readDB('pt.json');
  const me = users.find(u => u.username === req.session.user.username);
  if (!me) return res.status(404).json({ error: 'user tidak ada' });
  res.json(me);
});

module.exports = router;