const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 8000;

const loggerMiddleware = require('./utils/loggerMiddleware');
const authRoutes = require('./routes/authRoutes');
const usersRoutes = require('./routes/usersRoutes');

app.use(cors({
    origin: 'http://localhost:5173', // Il tuo frontend
    credentials: true,
    optionsSuccessStatus: 200
}));

app.use(express.json());
app.use(loggerMiddleware);
app.use('/auth', authRoutes);
app.use('/users', usersRoutes);

app.get("/", (req, res) => {
    res.json('Todo API is running');
});

app.listen(PORT, () => {
   console.log('Server listening on PORT: ' + PORT);
});
