const router = require('express').Router();
const userRoutes = require('./user');
const emailRoutes = require('./email');
// const imageRoutes = require('./image');
const superAdminRoutes = require('./superAdmin');
const adminRoutes = require('./admin');
const categoryRoutes = require('./category');
const authRoutes = require('./auth');
const productRoutes = require('./product');
const cartRoutes = require('./cart');
const orderRoutes = require('./order');
const verifyToken = require('../../middleware/verifyToken');
const verifyAdmin = require('../../middleware/verifyAdmin');
const verifySuperAdmin = require('../../middleware/verifySuperAdmin');

router.use('/api/v1/user', userRoutes);
router.use('/api/v1/email', emailRoutes);
// router.use('/api/v1/image', imageRoutes);
router.use('/api/v1/super-admin', verifyToken, verifySuperAdmin, superAdminRoutes);
router.use('/api/v1/admin', verifyToken, verifyAdmin, adminRoutes);
router.use('/api/v1/category', categoryRoutes);
router.use('/api/v1/auth', authRoutes);
router.use('/api/v1/product', productRoutes);
router.use('/api/v1/cart', verifyToken, cartRoutes);
router.use('/api/v1/order', verifyToken, orderRoutes);

module.exports = router;
