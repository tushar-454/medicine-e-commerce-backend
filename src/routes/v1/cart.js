const router = require('express').Router();
const { createCart, getCarts, updateCart, deleteCart } = require('../../controllers/v1/cart');

router.post('/create', createCart);
router.get('/:userId', getCarts);
router.put('/:cartId', updateCart);
router.delete('/:cartId', deleteCart);

module.exports = router;
