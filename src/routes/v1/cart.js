const router = require('express').Router();
const { createCart, getCarts } = require('../../controllers/v1/cart');

router.post('/create', createCart);
router.get('/:userId', getCarts);

module.exports = router;
