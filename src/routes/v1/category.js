const router = require('express').Router();
const { createCategory, getCategories } = require('../../controllers/v1/category');

router.post('/create', createCategory);
router.get('/', getCategories);

module.exports = router;
