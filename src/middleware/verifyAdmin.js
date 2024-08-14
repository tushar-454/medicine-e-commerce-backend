const verifyAdmin = (req, res, next) => {
  if (req.role === 'admin' || req.role === 'super-admin') {
    next();
  } else {
    res.status(403).json({ status: 403, message: 'Access denied! Admin only' });
  }
  return null;
};

module.exports = verifyAdmin;
