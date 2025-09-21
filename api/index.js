const express = require('express');
const session = require('express-session');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// session
app.use(session({
  secret: process.env.JWT_SECRET || 'rahasia',
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }
}));

// helper baca JSON
global.readDB = file => JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', 'data', file), 'utf-8')
);

// routes
app.use('/api/login', require('./login'));
app.use('/api/reseller', require('./reseller'));
app.use('/api/developer', require('./developer'));
app.use('/api/pt', require('./pt'));
app.use('/api/tk', require('./tk'));

module.exports = app;
