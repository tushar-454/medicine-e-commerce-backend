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
