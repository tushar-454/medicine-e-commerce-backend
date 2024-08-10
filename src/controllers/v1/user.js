const bcrypt = require('bcrypt');
const User = require('../../models/User');
const { getUserByProperty, createUser } = require('../../services/v1/user');

const createNewUser = async (req, res, next) => {
  try {
    const { name, email, password, photo } = req.body;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ status: 400, message: 'Invalid email' });
    }
    // check is user completed email verification
    const user = await getUserByProperty('email', email, 'EmailVerifyUser');

    if (!user || user.verificationCode === '') {
      return res.status(400).json({
        status: 400,
        error: 'Send verification code on email first',
      });
    }
    if (user.isVerified === false) {
      return res.status(400).json({
        status: 401,
        error: 'Verification Code send your mail, verify now.',
      });
    }
    const userExists = await getUserByProperty('email', email, 'User');
    if (userExists) {
      return res.status(409).json({ status: 409, message: 'User already exists' });
    }
    // now create a user if email is verified
    await createUser({ name, email, password, photo });
    res.status(201).json({
      status: 201,
      message: 'User created',
    });
  } catch (error) {
    next(error);
  }
  return null;
};

const getUserByEmail = async (req, res, next) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email }).select({ password: 0 });
    if (!user) {
      return res.status(404).json({ status: 404, error: 'User not found' });
    }
    return res.status(200).json({ status: 200, user });
  } catch (error) {
    next(error);
  }
  return null;
};

const updateUserByEmail = async (req, res, next) => {
  try {
    const { email } = req.params;
    const { name, password, photo, division, district, upazila, address } = req.body;

    const user = await getUserByProperty('email', email, 'User');
    if (!user) {
      return res.status(404).json({ status: 404, error: 'User not found' });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { name, password: hashPassword, photo, division, district, upazila, address },
      { new: true },
    );
    const userWithoutPassword = updatedUser.toObject();
    delete userWithoutPassword.password;
    return res.status(200).json({ status: 200, user: userWithoutPassword });
  } catch (error) {
    next(error);
  }
  return null;
};

const deleteUserByEmail = async (req, res, next) => {
  try {
    const { email } = req.params;
    const user = await User.findOneAndDelete({ email });
    if (!user) {
      return res.status(404).json({ status: 404, error: 'User not found' });
    }
    return res.status(204).json({ status: 204, message: 'User deleted' });
  } catch (error) {
    next(error);
  }
  return null;
};

module.exports = { createNewUser, getUserByEmail, updateUserByEmail, deleteUserByEmail };
