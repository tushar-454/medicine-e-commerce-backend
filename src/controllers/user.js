const { getUserByProperty, createUser } = require('../services/user');

const createNewUser = async (req, res, next) => {
  try {
    const { name, email, password, photo } = req.body;
    // check is user completed email verification
    const user = await getUserByProperty('email', email, 'EmailVerifyUser');
    if (!user) {
      return res.status(404).json({
        status: 404,
        error: 'Email not found in our database',
      });
    }
    if (user.verificationCode === '') {
      return res.status(400).json({
        status: 400,
        error: 'Send verification code on email first',
      });
    }
    if (user.isVerified === false) {
      return res.status(400).json({
        status: 401,
        error: 'Verify email. Email not verified',
      });
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

module.exports = { createNewUser };
