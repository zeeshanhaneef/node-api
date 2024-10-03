function isAuthorized(req) {
  // Exclude Swagger endpoints
  if (req.path === '/api-docs' || req.path.startsWith('/api-docs/')) {
    return next(); // Skip authorization for Swagger
  }

  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return { error: true, message: 'Authorization header is missing' };
  }

  // Assuming a Bearer token is used (you can adjust as per your app's auth logic)
  const token = authHeader.split(' ')[1];

  if (!token) {
    return { error: true, message: 'Invalid Authorization header format' };
  }

  return { error: false, token };
}

function unifiedResponse(obj, isValid = true) {
  return { isValid : isValid, response : obj}
}

module.exports = { isAuthorized, unifiedResponse };