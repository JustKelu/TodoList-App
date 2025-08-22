const express = require('express');
const router = express.Router();

const pool = require('../utils/database');
const authMiddleware = require('../utils/authMiddleware');

const authorizeUser = (req, res, next) => {
    if (req.userId != req.params.userId) {
        console.warn(
            `[${new Date().toISOString()}] 403 Unauthorized: ` +
            `User ${req.userId} tried accessing user ${req.params.userId}`
        );
        return res.status(404).json({ error: "User not found" });
    }
    next();
};

router.get('/', authMiddleware, async (req, res) => {
    //Route Admin
    if(req.userId != 1) return res.status(404).json({error: "Error 404 page not found"});

    const users = await pool.query('SELECT id, username, email, created_at FROM users');

    res.json(users.rows);
});

router.post('/:userId/todos', authMiddleware, authorizeUser, async (req, res) => { 
    if(!req.body.title) return res.status(400).json({error: "Title is required"});
    if(!req.body.text) return res.status(400).json({error: "Text is required"});

    const user = await pool.query('SELECT id FROM users WHERE id = $1', [req.params.userId]); 
    if (user.rows.length == 0) return res.status(404).json({error: "User not found!"});

    const result = await pool.query("INSERT INTO todos (title, text, completed, user_id) VALUES ($1, $2, $3, $4) RETURNING *", 
        [req.body.title, req.body.text, false, user.rows[0].id]);

    res.status(201).json(result.rows[0]);
});

router.get('/:userId/todos/:id', authMiddleware, authorizeUser, async (req, res) => {
    const user = await pool.query('SELECT id FROM users WHERE id = $1', [req.params.userId]); 
    if (user.rows.length == 0) return res.status(404).json({error: "User not found!"});

    const task = await pool.query('SELECT * FROM todos WHERE id = $1 AND user_id = $2', [req.params.id, req.params.userId]); 
    if (task.rows.length == 0) return res.status(404).json({error: "Task not found"});

    res.json(task.rows[0]);
});

router.put('/:userId/todos/:id', authMiddleware, authorizeUser, async (req, res) => {
    const user = await pool.query('SELECT id FROM users WHERE id = $1', [req.params.userId]); 
    if (user.rows.length == 0) return res.status(404).json({error: "User not found"});
    
    let task = await pool.query('SELECT * FROM todos WHERE id = $1 AND user_id = $2', [req.params.id, req.params.userId]);
    if (task.rows.length == 0) return res.status(404).json({error: "Task not found"});
    
    if (req.body.title != undefined) {
        await pool.query("UPDATE todos SET title = $1 WHERE id = $2 AND user_id = $3", 
            [req.body.title, req.params.id, req.params.userId]
        );
    }
    if (req.body.text != undefined) {
        await pool.query("UPDATE todos SET text = $1 WHERE id = $2 AND user_id = $3", 
            [req.body.text, req.params.id, req.params.userId]
        );
    }
    if (req.body.completed != undefined) {
        await pool.query("UPDATE todos SET completed = $1 WHERE id = $2 AND user_id = $3", 
            [req.body.completed, req.params.id, req.params.userId]
        );
    }

    task = await pool.query('SELECT * FROM todos WHERE id = $1 AND user_id = $2', [req.params.id, req.params.userId]);

    res.json(task.rows[0]); 
});

router.delete('/:userId/todos/:id', authMiddleware, authorizeUser, async (req, res) => {

    const user = await pool.query('SELECT id FROM users WHERE id = $1', [req.params.userId]); 
    if (user.rows.length == 0) return res.status(404).json({error: "User not found"});

    const task = await pool.query('SELECT id FROM todos WHERE id = $1 AND user_id = $2', [req.params.id, req.params.userId]);
    if (task.rows.length == 0) return res.status(404).json({error: "Task not found"});

    try {
        await pool.query('DELETE FROM todos WHERE id = $1 AND user_id = $2',
            [req.params.id, req.params.userId]
        );
    
        res.json({message: "Task deleted"});

    } catch (err) {
        console.error('Delete error:', err);
        return res.status(500).json({error: "Internal server error"});
    }
});

router.get('/:userId/todos', authMiddleware, authorizeUser, async (req, res) => {
    const user = await pool.query('SELECT id FROM users WHERE id = $1', [req.params.userId]); 
    if (user.rows.length == 0) return res.status(404).json({error: "User not found"});

    const todos = await pool.query('SELECT id, title, text, completed, created_at FROM todos WHERE user_id = $1', [req.params.userId]);

    res.json(todos.rows || []);
});

module.exports = router;
