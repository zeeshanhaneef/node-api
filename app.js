const express = require('express')
const  userRoute = require('./routes/user')
const  customerRoute = require('./routes/customer')
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const verifyAuthorization = require('./middlewares/authMiddleware');
const cacheMiddleware = require('./middlewares/cacheMiddleware');
const cacheRoutes = require('./routes/cacheRoutes');  // Import cache routes

const app = express();
const port = 3000;
const API_PREFIX = '/api';

// Middleware to parse json body
app.use(express.json());

// Middleware to validate JWT token
app.use(verifyAuthorization);

// Middleware to redis-cache
app.use(cacheMiddleware);

// Use the cache routes
app.use('/cache', cacheRoutes);  // Routes for Redis operations

app.get('/', (req, res) => {
    res.send('Hello from Node API')
})

// Serve the Swagger UI at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(`${API_PREFIX}/user`, userRoute)
app.use(`${API_PREFIX}/customer`, customerRoute)

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
    console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
})