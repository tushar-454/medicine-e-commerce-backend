const router = require('express').Router();
const { createOrder, getOrders } = require('../../controllers/v1/order');

router.post('/create', createOrder);
router.get('/:userId', getOrders);

module.exports = router;
