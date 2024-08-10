const router = require('express').Router();
const { createOrder } = require('../../controllers/v1/order');

router.post('/create', createOrder);

module.exports = router;
