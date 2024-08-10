const router = require('express').Router();
const userRoutes = require('./user');
const emailRoutes = require('./email');
const imageRoutes = require('./image');
const adminRoutes = require('./admin');

router.use('/api/v1/user', userRoutes);
router.use('/api/v1/email', emailRoutes);
router.use('/api/v1/image', imageRoutes);
router.use('/api/v1/admin', adminRoutes);

module.exports = router;
