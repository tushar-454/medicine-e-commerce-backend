const router = require('express').Router();
const {
  createProduct,
  getProducts,
  updateProducts,
  deleteProduct,
} = require('../../controllers/v1/product');
const verifyToken = require('../../middleware/verifyToken');

router.post('/create', verifyToken, createProduct);
router.post('/', getProducts);
router.put('/:id', verifyToken, updateProducts);
router.delete('/:id', verifyToken, deleteProduct);

module.exports = router;
