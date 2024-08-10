const router = require('express').Router();
const { createNewUser, getUserByEmail, updateUserByEmail } = require('../../controllers/v1/user');

router.post('/create', createNewUser);
router.get('/:email', getUserByEmail);
router.put('/:email', updateUserByEmail);

module.exports = router;
