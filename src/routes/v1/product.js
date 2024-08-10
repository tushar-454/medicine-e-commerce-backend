const router = require('express').Router();
const { createProduct } = require('../../controllers/v1/product');

router.post('/create', createProduct);

module.exports = router;
