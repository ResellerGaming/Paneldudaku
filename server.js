const express = require('express');
const session = require('express-session');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // front kamu

/* session */
app.use(session({
  secret: 'ganti-dengan-env',
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }
}));

/* baca DB helper */
global.readDB = file => JSON.parse(
  fs.readFileSync(path.join(__dirname, 'data', file), 'utf-8')
);

/* route backend */
app.use('/api', require('./api/login'));
app.use('/api', require('./api/reseller'));
app.use('/api', require('./api/developer'));
app.use('/api', require('./api/pt'));
app.use('/api', require('./api/tk'));

/* start */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Running on', PORT));