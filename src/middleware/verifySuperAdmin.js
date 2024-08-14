const verifySuperAdmin = (req, res, next) => {
  if (req.role === 'super-admin') {
    next();
  } else {
    res.status(403).json({ status: 403, message: 'Access denied! Super Admin only' });
  }
  return null;
};

module.exports = verifySuperAdmin;
