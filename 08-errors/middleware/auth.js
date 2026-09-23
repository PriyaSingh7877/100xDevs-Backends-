const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Token nahi hai!' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();

  } catch (err) {
    res.status(401).json({ message: 'Token invalid hai!' });
  }
};

module.exports = protect;


// Token = ID Card
// jwt.verify = Security guard ID scan karta hai
// req.user = Guard ne naam note kar liya
// next() = "Andar jao!" ✅
// Token sahi → decoded = { userId: "abc123" }
// Token galat → error throw hoga → catch mein jaayega