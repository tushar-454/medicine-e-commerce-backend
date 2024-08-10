const router = require('express').Router();
const userRoutes = require('./user');
const emailRoutes = require('./email');
const imageRoutes = require('./image');

router.use('/api/v1/user', userRoutes);
router.use('/api/v1/email', emailRoutes);
router.use('/api/v1/image', imageRoutes);

module.exports = router;
