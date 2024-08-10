const router = require('express').Router();
const { loginUser, createToken, deleteToken } = require('../../controllers/v1/auth');

router.post('/login', loginUser);
router.post('/create-token', createToken);
router.delete('/delete-token', deleteToken);

module.exports = router;
