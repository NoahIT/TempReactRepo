require('dotenv').config(); // .env failo parametrų įkėlimas
const express = require('express');
const helmet = require('helmet'); // Saugumo antraščiai
const cors = require('cors'); // CORS politika
const rateLimit = require('express-rate-limit'); // Užklausų dažnio ribojimas
const bcrypt = require('bcrypt'); // Slaptažodžių hash'inimas
const jwt = require('jsonwebtoken'); // JSON Web Token autentifikacija
const { body, validationResult } = require('express-validator'); // Įvesties patikra
const sqlite3 = require('sqlite3').verbose(); // SQLite klientas

// DB inicijavimas: jei DB failas neegzistuoja – sukuriamas
const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) console.error('Nepavyko prisijungti prie DB:', err);
});
// Lentelių kūrimas su užtikrinimu, kad neegzistuoja
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE NOT NULL, password TEXT NOT NULL)`);
  db.run(`CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL, title TEXT NOT NULL, description TEXT, FOREIGN KEY(user_id) REFERENCES users(id))`);
});

const app = express();

// Globalūs middleware
app.use(helmet());
app.use(express.json());
app.use(cors({ origin: [process.env.CLIENT_URL, 'http://localhost:5173'], methods: ['GET','POST','PUT','DELETE'], allowedHeaders: ['Content-Type','Authorization'] }));

// Rate limit: apsauga auth endpointams nuo DoS užpuolimų
app.use('/api/auth', rateLimit({ windowMs: 15*60e3, max: 100, message: { error: 'Too many requests' } }));

// Vartotojo duomenų validacijos aprašai
const validateUser = [
  body('username').isLength({ min:3, max:20 }),
  body('password').isLength({ min:6 })
];

// Middleware: JWT validavimas ir naudotojo įrašymas į req.user
function authenticateToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token missing' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token invalid' });
    req.user = user;
    next();
  });
}

// Registracijos maršrutas: hash'inimas ir įrašymas į DB
app.post('/api/auth/register', validateUser, (req, res) => {
  const errs = validationResult(req);
  if (!errs.isEmpty()) return res.status(400).json({ errors: errs.array() });

  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      db.run('INSERT INTO users (username,password) VALUES (?,?)', [req.body.username, hash], function(err) {
        if (err && err.code==='SQLITE_CONSTRAINT') return res.status(409).json({ error: 'User exists' });
        if (err) return res.status(500).json({ error: 'DB error' });
        res.status(201).json({ message: 'Registered' });
      });
    })
    .catch(() => res.status(500).json({ error: 'Hash error' }));
});

// Prisijungimo maršrutas: tikriname slaptažodį ir grąžiname JWT
app.post('/api/auth/login', validateUser, (req, res) => {
  const errs = validationResult(req);
  if (!errs.isEmpty()) return res.status(400).json({ errors: errs.array() });

  db.get('SELECT * FROM users WHERE username=?', [req.body.username], (err, user) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    bcrypt.compare(req.body.password, user.password)
      .then(valid => {
        if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token });
      });
  });
});

// Apsaugoti užduočių maršrutai: CRUD operacijos priskirtoms vartotojui užduotims
app.get('/api/tasks', authenticateToken, (req, res) => {
  db.all('SELECT * FROM tasks WHERE user_id=?', [req.user.id], (err, rows) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.json(rows);
  });
});
app.post('/api/tasks', authenticateToken, (req, res) => {
  db.run('INSERT INTO tasks (user_id,title,description) VALUES (?,?,?)', [req.user.id, req.body.title, req.body.description], function(err) {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.status(201).json({ id:this.lastID, ...req.body });
  });
});
app.put('/api/tasks/:id', authenticateToken, (req, res) => {
  db.run('UPDATE tasks SET title=?,description=? WHERE id=? AND user_id=?', [req.body.title, req.body.description, req.params.id, req.user.id], function(err) {
    if (err) return res.status(500).json({ error: 'DB error' });
    if (this.changes === 0) return res.status(404).json({ error: 'Task not found' });
    res.json({ id:req.params.id, ...req.body });
  });
});
app.delete('/api/tasks/:id', authenticateToken, (req, res) => {
  db.run('DELETE FROM tasks WHERE id=? AND user_id=?', [req.params.id, req.user.id], function(err) {
    if (err) return res.status(500).json({ error: 'DB error' });
    if (this.changes === 0) return res.status(404).json({ error: 'Task not found' });
    res.sendStatus(204);
  });
});

// Serverio paleidimas
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Serveris veikia ant http://localhost:${PORT}`));
