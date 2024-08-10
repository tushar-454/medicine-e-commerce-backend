const EmailVerifyUser = require('../models/EmailVerifyUser');
const User = require('../models/User');
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
  const user = await User.create({ name, email, password, photo });
  return user.save();
};

module.exports = { getUserByProperty, createUser };
