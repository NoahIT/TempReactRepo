const express = require('express');
const db = require('../db/db');
const authenticateToken = require('../middleware/auth');
const router = express.Router();

router.use(authenticateToken);

// Gauti visas užduotis
router.get('/', (req, res) => {
  db.all('SELECT * FROM tasks WHERE user_id = ?', [req.user.id], (err, rows) => {
    if (err) return res.sendStatus(500);
    res.json(rows);
  });
});

// Sukurti užduotį
router.post('/', (req, res) => {
  const { title, description } = req.body;
  db.run(
    'INSERT INTO tasks (user_id, title, description) VALUES (?, ?, ?)',
    [req.user.id, title, description],
    function (err) {
      if (err) return res.sendStatus(500);
      res.status(201).json({ id: this.lastID, title, description });
    }
  );
});

// Atnaujinti užduotį
router.put('/:id', (req, res) => {
  const { title, description } = req.body;
  db.run(
    'UPDATE tasks SET title = ?, description = ? WHERE id = ? AND user_id = ?',
    [title, description, req.params.id, req.user.id],
    function (err) {
      if (err || this.changes === 0) return res.sendStatus(404);
      res.json({ id: req.params.id, title, description });
    }
  );
});

// Ištrinti užduotį
router.delete('/:id', (req, res) => {
  db.run('DELETE FROM tasks WHERE id = ? AND user_id = ?', [req.params.id, req.user.id], function (err) {
    if (err || this.changes === 0) return res.sendStatus(404);
    res.sendStatus(204);
  });
});

module.exports = router;
