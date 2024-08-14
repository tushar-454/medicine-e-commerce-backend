const router = require('express').Router();
const { getAdminOrders } = require('../../controllers/v1/order');
const { getAdminProducts } = require('../../controllers/v1/product');
const { getAdminAllUsers } = require('../../controllers/v1/user');

router.get('/users', getAdminAllUsers);
router.get('/products', getAdminProducts);
router.get('/orders', getAdminOrders);

module.exports = router;
