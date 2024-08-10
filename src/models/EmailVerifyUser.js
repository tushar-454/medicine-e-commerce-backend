const { model, Schema } = require('mongoose');

const emailVerifyUserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  verificationCode: {
    type: Number,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Number,
    default: 0,
  },
});

module.exports = model('EmailVerifyUser', emailVerifyUserSchema);
