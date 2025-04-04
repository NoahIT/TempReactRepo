const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db/db');
const router = express.Router();
const SECRET = 'slaptas_raktas';

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 10);

  db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hash], function (err) {
    if (err) return res.status(400).json({ error: 'Vartotojas jau egzistuoja' });
    res.status(201).json({ message: 'Registracija sėkminga' });
  });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.get('SELECT * FROM users WHERE username = ?', [username], async (err, user) => {
    if (err || !user) return res.status(401).json({ error: 'Neteisingi prisijungimo duomenys' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Neteisingas slaptažodis' });

    const token = jwt.sign({ id: user.id, username: user.username }, SECRET, { expiresIn: '1d' });
    res.json({ token });
  });
});

module.exports = router;
