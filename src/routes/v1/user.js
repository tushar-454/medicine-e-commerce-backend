const router = require('express').Router();
const { createNewUser } = require('../../controllers/user');

router.post('/create', createNewUser);

module.exports = router;
