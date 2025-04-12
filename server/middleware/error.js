module.exports = (err, req, res, next) => {
    console.error(err.stack);
    
    // Mongoose validation error
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    
    // JWT error
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }
    
    // Default to 500 server error
    res.status(500).json({ message: 'Something went wrong' });
  };