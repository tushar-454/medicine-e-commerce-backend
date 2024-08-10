const router = require('express').Router();
const { loginUser, createToken } = require('../../controllers/v1/auth');

router.post('/login', loginUser);
router.post('/create-token', createToken);

module.exports = router;
