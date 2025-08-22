const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();
const pool = require('../utils/database');
const JWT_SECRET = process.env.JWT_SECRET;

const pswHasher = async (psw) => {
    const hashedPsw = await bcrypt.hash(psw, 10);
    return hashedPsw;
}

const pswComparer = async (psw, hashedPsw) => {
    const comparedPsw = await bcrypt.compare(psw, hashedPsw);
    return comparedPsw;
}

router.post('/register', async (req, res) => {
    if (!req.body.username || !req.body.email || !req.body.psw) 
        return res.status(400).json({error: "Compile every form to register"});

    const check1 = await pool.query('SELECT username FROM users WHERE username = $1', [req.body.username]);
    if (check1.rows.length > 0) 
        return res.status(400).json({error: "This username already exists!"});   

    const check2 = await pool.query('SELECT email FROM users WHERE email = $1', [req.body.email]);
    if (check2.rows.length > 0) 
        return res.status(400).json({error: "Email already in use!"});

    const hashedPsw = await pswHasher(req.body.psw);
    await pool.query("INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3)", 
        [req.body.username, req.body.email, hashedPsw]);

    res.json({message: "User created"});
});

router.post('/login', async (req, res) => {
    const user = await pool.query("SELECT id, username, email, password_hash FROM users WHERE email = $1", [req.body.email]);
    if (user.rows.length == 0) return res.status(401).json({error: "Wrong email or password"});

    const passwordMatch = await pswComparer(req.body.psw, user.rows[0].password_hash);
    if(!passwordMatch) return res.status(401).json({error: "Wrong email or password"});
    
    const token = jwt.sign({userId: user.rows[0].id}, JWT_SECRET, {expiresIn: '24h'});
    res.json({
        message: "Login successful",
        token: token,
        user: {
            id: user.rows[0].id, 
            username: user.rows[0].username, 
            email: user.rows[0].email
        } 
    });
});

router.post("/verify-token", (req, res) => {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({error: "Bad request, Authorization is missing"});

    const token = auth.split(' ')[1];
    if (!token) return res.status(401).json({error: "Token missing"});

    try {
        const payload = jwt.verify(token, JWT_SECRET);
        res.json(payload);
    } catch (error) {
        return res.status(401).json({error: "Invalid token"});
    }
});

module.exports = router;