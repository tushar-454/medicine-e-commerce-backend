const crypto = require('crypto');
const nodemailer = require('nodemailer');
const EmailVerifyUser = require('../../models/EmailVerifyUser');
const { getUserByProperty } = require('../../services/v1/user');

const sendVerificationCode = async (req, res, next) => {
  const { email } = req.body;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({ status: 400, message: 'Invalid email' });
  }

  const verificationCode = crypto.randomInt(100000, 999999);
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send the email with the verification code
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your Verification Code',
      text: `Your verification code is ${verificationCode}`,
    });

    // Find the user in the database by email or create a new one
    let user = await getUserByProperty('email', email, 'EmailVerifyUser');
    if (user) {
      // If the user exists, update the verification code
      user.isVerified = false;
      user.verificationCode = verificationCode;
      user.createdAt = Date.now();
    } else {
      // If the user doesn't exist, create a new user with the email and verification code
      user = new EmailVerifyUser({ email, verificationCode });
    }
    await user.save();

    return res.status(200).json({ status: 200, message: 'Verification code sent successfully' });
  } catch (error) {
    next(error);
  }
  return null;
};

const verifyCode = async (req, res, next) => {
  const { email, code } = req.body;
  try {
    const user = await EmailVerifyUser.findOne({ email });

    // Check if the user exists and the verification code matches
    if (
      user &&
      user.verificationCode === parseInt(code, 10) &&
      Date.now() - user.createdAt > 60000
    ) {
      user.isVerified = false;
      await user.save();
      return res.status(200).json({ status: 400, message: 'Time expire!' });
    }
    if (user && user.verificationCode === parseInt(code, 10)) {
      user.isVerified = true;
      await user.save();
      return res.status(200).json({ status: 200, message: 'Email verified successfully' });
    }
    return res.status(400).json({ status: 400, message: 'Invalid code' });
  } catch (error) {
    next(error);
  }
  return null;
};

module.exports = { sendVerificationCode, verifyCode };
