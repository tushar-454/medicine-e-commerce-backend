const router = require('express').Router();
const {
  createNewUser,
  getUserByEmail,
  updateUserByEmail,
  deleteUserByEmail,
} = require('../../controllers/v1/user');
const verifyToken = require('../../middleware/verifyToken');

router.post('/create', createNewUser);
router.get('/:email', verifyToken, getUserByEmail);
router.put('/:email', verifyToken, updateUserByEmail);
router.delete('/:email', verifyToken, deleteUserByEmail);

module.exports = router;
