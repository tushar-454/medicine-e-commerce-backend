const router = require('express').Router();
const { createProduct, getProducts, updateProducts } = require('../../controllers/v1/product');

router.post('/create', createProduct);
router.get('/', getProducts);
router.put('/:id', updateProducts);

module.exports = router;
