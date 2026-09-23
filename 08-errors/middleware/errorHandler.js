const errorHandler = (err, req, res, next) => {
  // Error ka status code lo — default 500
  const statusCode = err.statusCode || 500;
  
  res.status(statusCode).json({
    message: err.message || 'Kuch gadbad ho gayi!',
    // Development mein stack trace dikhao
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};

module.exports = errorHandler;



// err.statusCode → error ka status code
//                  Nahi hai? → 500 default
// err.message    → error ka message
// err.stack      → kahan error hua — 
//                  sirf development mein dikhao!