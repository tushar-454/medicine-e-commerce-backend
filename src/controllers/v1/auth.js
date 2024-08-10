const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../models/User');

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ status: 404, message: 'User not found' });
    }
    // compaire the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ status: 400, message: 'Invalid credentials' });
    }
    return res.status(200).json({ status: 200, message: 'Login successful' });
  } catch (error) {
    next(error);
  }
  return null;
};

const createToken = async (req, res, next) => {
  try {
    const { email } = req.body;
    const accessToken = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_ACCESS_EXPIRATION,
    });

    const refreshToken = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_REFRESH_EXPIRATION,
    });

    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'none' });

    return res.status(201).json({
      status: 201,
      message: 'Token generated successfully',
      token: {
        accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
  return null;
};

module.exports = { loginUser, createToken };
