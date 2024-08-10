const router = require('express').Router();
const { createNewUser, getUserByEmail } = require('../../controllers/v1/user');

router.post('/create', createNewUser);
router.get('/:email', getUserByEmail);

module.exports = router;
