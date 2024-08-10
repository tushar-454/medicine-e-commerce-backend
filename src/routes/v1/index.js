const router = require('express').Router();
const userRoutes = require('./user');
const emailRoutes = require('./email');

router.use('/api/v1/user', userRoutes);
router.use('/api/v1/email', emailRoutes);

module.exports = router;
