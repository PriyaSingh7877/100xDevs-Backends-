const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  try {
    // 1. Header se token lo
    const token = req.headers.authorization?.split(' ')[1];
    
    // 2. Token hai ya nahi?
    if (!token) {
      return res.status(401).json({ message: 'Token nahi hai!' });
    }

    // 3. Token verify karo
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 4. User info req mein save karo
    req.user = decoded;
    
    // 5. Aage jao!
    next();

  } catch (err) {
    res.status(401).json({ message: 'Token invalid hai!' });
  }
};

module.exports = protect;