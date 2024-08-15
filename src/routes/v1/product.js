const router = require('express').Router();
const {
  createProduct,
  getProducts,
  updateProducts,
  deleteProduct,
  getProductById,
} = require('../../controllers/v1/product');
const verifyToken = require('../../middleware/verifyToken');

router.post('/create', verifyToken, createProduct);
router.post('/', getProducts);
router.get('/:productId', getProductById);
router.put('/:id', verifyToken, updateProducts);
router.delete('/:id', verifyToken, deleteProduct);

module.exports = router;
