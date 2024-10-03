// redisClient.js
const redis = require('redis');

// Create Redis client
const redisClient = redis.createClient({
    url: 'redis://localhost:6379', // Change this to your Redis server URL
    password: 'foobared',  // Use password if Redis is secured
});

// Connect to Redis
redisClient.connect()
    .then(() => console.log('Connected to Redis'))
    .catch(err => console.error('Could not connect to Redis', err));

// Handle Redis errors
redisClient.on('error', (err) => {
    console.error('Redis error:', err);
});

module.exports = redisClient;