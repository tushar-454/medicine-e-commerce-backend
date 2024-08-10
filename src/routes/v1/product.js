const router = require('express').Router();
const { createProduct, getProducts } = require('../../controllers/v1/product');

router.post('/create', createProduct);
router.get('/', getProducts);

module.exports = router;
