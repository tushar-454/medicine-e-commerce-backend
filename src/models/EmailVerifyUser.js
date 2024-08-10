const { model, Schema } = require('mongoose');

const emailVerifyUserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  verificationCode: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

module.exports = model('EmailVerifyUser', emailVerifyUserSchema);
