// routes/cacheRoutes.js
const express = require('express');
const router = express.Router();
const redisClient = require('./redisClient');  // Import Redis client

// Route to set a key-value pair in Redis
router.get('/set', async (req, res) => {
    try {
        const result = await redisClient.set('mykey', 'Hello World', {
            EX: 60, // Expire key in 60 seconds
        });
        res.send(`SET command result: ${result}`);
    } catch (error) {
        console.error('Error setting key in Redis:', error);
        res.status(500).send('Error setting value');
    }
});

// Route to get the value by key from Redis
router.get('/get', async (req, res) => {
    try {
        const value = await redisClient.get('mykey');
        if (value) {
            res.send(`GET command result: ${value}`);
        } else {
            res.send('Key does not exist');
        }
    } catch (error) {
        console.error('Error getting key from Redis:', error);
        res.status(500).send('Error retrieving value');
    }
});

module.exports = router;