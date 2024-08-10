const router = require('express').Router();
const { createCategory, getCategories } = require('../../controllers/v1/category');
const verifyToken = require('../../middleware/verifyToken');

router.post('/create', createCategory);
router.get('/', verifyToken, getCategories);

module.exports = router;
