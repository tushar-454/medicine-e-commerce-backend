const router = require('express').Router();
const { createNewUser } = require('../../controllers/v1/user');

router.post('/create', createNewUser);

module.exports = router;
