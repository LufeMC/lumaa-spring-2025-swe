const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // get token from header
  const token = req.header('Authorization')?.replace('Bearer ', '');

  // check if the token exists
  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    // verify token using the jwt secret 
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //console.log("decoded", decoded);
    // extract user 
    req.user = {userId: decoded.id};


    // proceed to the route 
    next();
  } catch (error) {
    // handle expried tokens
    // would have to redirect back to the login screen 
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = authMiddleware;