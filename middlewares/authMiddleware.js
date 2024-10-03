function verifyAuthorization(req, res, next) {
    // Exclude Swagger endpoints
    if (req.path === '/api-docs' || req.path.startsWith('/api-docs/') || req.path.startsWith('/cache/')) {
        return next(); // Skip authorization for Swagger
    }

    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header is missing' });
    }

    // Assuming a Bearer token is used (adjust as per your app's auth logic)
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Invalid Authorization header format' });
    }

    // You can implement token verification logic here, like using JWT verification
    // jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    //   if (err) return res.status(403).json({ message: 'Token is invalid' });
    //   req.user = user;
    //   next();
    // });

    // For simplicity, assuming the token is valid for now
    req.token = token;

    // If the token is valid, call next() to pass the request to the next middleware/route handler
    next();
}

module.exports = verifyAuthorization;