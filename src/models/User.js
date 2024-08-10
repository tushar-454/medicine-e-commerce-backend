const { model, Schema } = require('mongoose');

const userSchema = Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'superadmin'],
    default: 'user',
  },
  division: {
    type: String,
    default: 'division',
  },
  distric: {
    type: String,
    default: 'district',
  },
  upazila: {
    type: String,
    default: 'upazila',
  },
  address: {
    type: String,
    default: 'address',
  },
});

module.exports = model('User', userSchema);
