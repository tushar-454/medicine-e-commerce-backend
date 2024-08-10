const router = require('express').Router();
const {
  superAdminUpdateUserByEmail,
  superAdmindeleteUserByEmail,
} = require('../../controllers/v1/user');

router.put('/user/:email', superAdminUpdateUserByEmail);
router.delete('/user/:email', superAdmindeleteUserByEmail);

module.exports = router;
