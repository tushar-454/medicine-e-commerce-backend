const router = require('express').Router();
const {
  createProduct,
  getProducts,
  updateProducts,
  deleteProduct,
} = require('../../controllers/v1/product');

router.post('/create', createProduct);
router.post('/', getProducts);
router.put('/:id', updateProducts);
router.delete('/:id', deleteProduct);

module.exports = router;
