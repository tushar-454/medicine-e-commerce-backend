const Order = require('../../models/Order');

const createOrder = async (req, res, next) => {
  try {
    const { user, products, totalAmount, paymentMethod, shippingInfo, Phone } = req.body;
    if (products.length === 0) {
      return res.status(400).json({ status: 400, message: 'Products are required' });
    }
    const order = await Order.create({
      user,
      products,
      totalAmount,
      paymentMethod,
      shippingInfo,
      Phone,
    });
    return res.status(201).json({ status: 201, message: 'Order created successfully', order });
  } catch (error) {
    next(error);
  }
  return null;
};

module.exports = { createOrder };
