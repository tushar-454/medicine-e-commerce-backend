const router = require('express').Router();
const {
  createNewUser,
  getUserByEmail,
  updateUserByEmail,
  deleteUserByEmail,
} = require('../../controllers/v1/user');

router.post('/create', createNewUser);
router.get('/:email', getUserByEmail);
router.put('/:email', updateUserByEmail);
router.delete('/:email', deleteUserByEmail);

module.exports = router;
