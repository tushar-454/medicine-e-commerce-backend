const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({ status: 401, message: 'Access denied! Please login' });
    }

    // Verify the access token
    jwt.verify(token, process.env.JWT_SECRET, (errAccessToken, decoded) => {
      if (errAccessToken) {
        if (errAccessToken.name === 'TokenExpiredError') {
          // Access token expired, check for refresh token
          const { refreshToken } = req.cookies;
          if (!refreshToken) {
            return res.status(401).json({ status: 401, message: 'Access denied! Please login' });
          }

          // Verify the refresh token
          jwt.verify(
            refreshToken,
            process.env.JWT_SECRET,
            (errRefreshToken, decodedRefreshToken) => {
              if (errRefreshToken) {
                return res
                  .status(401)
                  .json({ status: 401, message: 'Access denied! Please login' });
              }

              // Generate a new access token
              const newAccessToken = jwt.sign(
                { email: decodedRefreshToken.email, role: decodedRefreshToken.role },
                process.env.JWT_SECRET,
                { expiresIn: parseInt(process.env.JWT_ACCESS_EXPIRATION, 10) },
              );
              res.setHeader('Authorization', `Bearer ${newAccessToken}`);
              req.user = decodedRefreshToken.email;
              req.role = decodedRefreshToken.role;
              next();
              return null;
            },
          );
        } else {
          return res.status(401).json({ status: 401, message: 'Invalid token!' });
        }
      } else {
        // Access token is valid
        req.user = decoded.email;
        req.role = decoded.role;
        next();
      }
      return null;
    });
  } catch (error) {
    next(error);
  }
  return null;
};

module.exports = verifyToken;
