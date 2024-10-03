const redisClient = require('../routes/redisClient');  // Import Redis client

// Middleware function to check Redis cache
const cacheMiddleware = (req, res, next) => {
    if (req.path === '/api-docs' || req.path.startsWith('/api-docs/') || req.path.startsWith('/cache/')) {
        return next(); // Skip cache middleware
    }

    const { key } = req.params;  // Assuming the key is passed as a URL parameter

    if (req.method === 'GET') {
        let getKey = key ?? req.path;

        console.log('Params received', getKey);
        // Check if data exists in Redis cache
        redisClient.get(getKey)
            .then(data => {
                if (data !== null) {
                    // Cache hit, return the cached data
                    console.log('Cache hit => ', data);
                    res.status(200).json(JSON.parse(data));
                } else {
                    try {
                        // Cache miss, mark that and proceed to fetch new data
                        console.log('Cache miss');
                        req.isCacheMiss = true;

                        // Intercept the response to save the data in cache before sending
                        const originalJson = res.json.bind(res);

                        res.json = (body) => {
                            // Save the response in Redis if it's a cache miss
                            if (req.isCacheMiss) {
                                redisClient.setEx(getKey, 3600, JSON.stringify(body)); // Cache for 1 hour
                            }

                            // Send the actual response
                            originalJson(body);
                        };
                    } catch (error) {
                        console.log('error', error)
                    }

                    next(); // Proceed to the route handler
                }
            })
            .catch(err => {
                console.error('Redis get error:', err);
                next();
            });
    }
    else {
        next();
    }
};

module.exports = cacheMiddleware;