const Order = require('../../models/Order');

const createOrder = async (req, res, next) => {
  try {
    const { user, products, totalAmount, paymentMethod, shippingInfo, phone } = req.body;
    if (products.length === 0) {
      return res.status(400).json({ status: 400, message: 'Products are required' });
    }
    const order = await Order.create({
      user,
      products,
      totalAmount,
      paymentMethod,
      shippingInfo,
      phone,
    });
    return res.status(201).json({ status: 201, message: 'Order created successfully', order });
  } catch (error) {
    next(error);
  }
  return null;
};

const getOrders = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ user: userId })
      .populate('user', 'name photo email')
      .populate('products.product', 'name photo');
    return res.status(200).json({ status: 200, message: 'Orders retrieved successfully', orders });
  } catch (error) {
    next(error);
  }
  return null;
};

const userUpdateOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { isCanceled, isRefunded, isReturned, orderStatus } = req.body;
    const orderOne = await Order.findOne({ _id: orderId });
    if (!orderOne) {
      return res.status(404).json({ status: 404, message: 'Order not found' });
    }

    if (orderOne.discontinued) {
      return res
        .status(400)
        .json({ status: 400, message: "Order is discontinued. You can't modified it" });
    }
    if (orderStatus !== 'pending' && orderStatus !== 'canceled') {
      return res.status(400).json({
        status: 400,
        message: 'You can only update order status to pending or canceled',
      });
    }
    const order = await Order.findOneAndUpdate(
      { _id: orderId },
      { isCanceled, isRefunded, isReturned, orderStatus },
      { new: true },
    );
    if (!order) {
      return res.status(404).json({ status: 404, message: 'Order not found' });
    }
    return res.status(200).json({ status: 200, message: 'Order updated successfully', order });
  } catch (error) {
    next(error);
  }
  return null;
};

const adminUpdateOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { orderStatus, isPaid, isDelivered, discontinued, isDeleted } = req.body;
    const order = await Order.findOneAndUpdate(
      { _id: orderId },
      { orderStatus, isPaid, isDelivered, discontinued, isDeleted },
      { new: true },
    );
    if (!order) {
      return res.status(404).json({ status: 404, message: 'Order not found' });
    }
    return res.status(200).json({ status: 200, message: 'Order updated successfully', order });
  } catch (error) {
    next(error);
  }
  return null;
};

const getAdminOrders = async (req, res, next) => {
  try {
    //  I want to filter order by orderStatus and sort by date

    const { orderStatus, createdAt } = req.query;

    if (orderStatus && createdAt) {
      const orders = await Order.find({ orderStatus })
        .sort({ createdAt: parseInt(createdAt, 10) })
        .populate('user', 'name photo email')
        .populate('products.product', 'name photo');
      return res
        .status(200)
        .json({ status: 200, message: 'Orders retrieved successfully', orders });
    }
    if (orderStatus) {
      const orders = await Order.find({ orderStatus })
        .populate('user', 'name photo email')
        .populate('products.product', 'name photo');
      return res
        .status(200)
        .json({ status: 200, message: 'Orders retrieved successfully', orders });
    }
    if (createdAt) {
      const orders = await Order.find()
        .sort({ createdAt: parseInt(createdAt, 10) })
        .populate('user', 'name photo email')
        .populate('products.product', 'name photo');
      return res
        .status(200)
        .json({ status: 200, message: 'Orders retrieved successfully', orders });
    }

    const orders = await Order.find()
      .populate('user', 'name photo email')
      .populate('products.product', 'name photo');
    return res.status(200).json({ status: 200, message: 'Orders retrieved successfully', orders });
  } catch (error) {
    next(error);
  }
  return null;
};

module.exports = { createOrder, getOrders, userUpdateOrder, adminUpdateOrder, getAdminOrders };
