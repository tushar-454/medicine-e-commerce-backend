const router = require('express').Router();
const { superAdminUpdateUserByEmail } = require('../../controllers/v1/user');

router.put('/user/:email', superAdminUpdateUserByEmail);

module.exports = router;
