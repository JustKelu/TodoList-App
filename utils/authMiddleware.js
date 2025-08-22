const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({error: "You must be logged in!"});

    const token = auth.split(' ')[1];
    if (!token) return res.status(401).json({error: "Token missing"});

    try {
        const payload = jwt.verify(token, JWT_SECRET);
        req.userId = payload.userId;
        next();
    } catch (error) {
        return res.status(401).json({error: "Invalid token"});
    }
};

module.exports = authMiddleware;