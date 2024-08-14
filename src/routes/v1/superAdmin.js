const router = require('express').Router();
const {
  superAdminUpdateUserByEmail,
  superAdmindeleteUserByEmail,
  getSuperAdminAllUsers,
} = require('../../controllers/v1/user');

router.get('/users', getSuperAdminAllUsers);
router.put('/user/:email', superAdminUpdateUserByEmail);
router.delete('/user/:email', superAdmindeleteUserByEmail);

module.exports = router;
