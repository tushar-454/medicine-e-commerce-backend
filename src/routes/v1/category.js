const router = require('express').Router();
const { createCategory, getCategories } = require('../../controllers/v1/category');
const verifyToken = require('../../middleware/verifyToken');

router.post('/create', verifyToken, createCategory);
router.get('/', getCategories);

module.exports = router;
