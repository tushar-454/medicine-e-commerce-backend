const router = require('express').Router();
const { getAdminAllUsers } = require('../../controllers/v1/user');

router.get('/users', getAdminAllUsers);

module.exports = router;
