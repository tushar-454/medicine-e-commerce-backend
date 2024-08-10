const bcrypt = require('bcrypt');
const EmailVerifyUser = require('../../models/EmailVerifyUser');
const User = require('../../models/User');
// common services for user
const getUserByProperty = async (property, value, collection) => {
  if (collection === 'User') {
    const user = await User.findOne({
      [property]: value,
    });
    return user;
  }
  if (collection === 'EmailVerifyUser') {
    const user = await EmailVerifyUser.findOne({
      [property]: value,
    });
    return user;
  }
  return null;
};

/**
 * Create a new user
 */

const createUser = async ({ name, email, password, photo }) => {
  bcrypt.hash(password, 10).then(async (hash) => {
    const newUser = await User.create({ name, email, password: hash, photo });
    return newUser.save();
  });
};

module.exports = { getUserByProperty, createUser };
