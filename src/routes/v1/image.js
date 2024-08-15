const router = require('express').Router();
const { imageUpdaload } = require('../../controllers/v1/image');

router.post('/upload', imageUpdaload);

module.exports = router;
