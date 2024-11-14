const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/gamedb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const Score = require('./models/score');

app.post('/scores', async (req, res) => {
    const { username, score } = req.body;
    try {
        const newScore = new Score({ username, score });
        await newScore.save();
        res.status(201).json({ message: 'Score saved!' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save score' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
