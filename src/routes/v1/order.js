const router = require('express').Router();
const {
  createOrder,
  getOrders,
  userUpdateOrder,
  adminUpdateOrder,
} = require('../../controllers/v1/order');

router.post('/create', createOrder);
router.get('/:userId', getOrders);
router.put('/user/:orderId', userUpdateOrder);
router.put('/admin/:orderId', adminUpdateOrder);

module.exports = router;
