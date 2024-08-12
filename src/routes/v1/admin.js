const router = require('express').Router();
const { getAdminProducts } = require('../../controllers/v1/product');
const { getAdminAllUsers } = require('../../controllers/v1/user');

router.get('/users', getAdminAllUsers);
router.get('/products', getAdminProducts);

module.exports = router;
