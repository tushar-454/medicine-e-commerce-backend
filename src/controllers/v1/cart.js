const Cart = require('../../models/Cart');

const createCart = async (req, res, next) => {
  try {
    const { user, product, quantity, varient, total } = req.body;
    const cart = await Cart.create({ user, product, quantity, varient, total });
    return res.status(201).json({ status: 201, message: 'Cart created successfully', cart });
  } catch (error) {
    next(error);
  }
  return null;
};

const getCarts = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const carts = await Cart.find({ user: userId }).populate('product');
    return res.status(200).json({ status: 200, message: 'Carts retrieved successfully', carts });
  } catch (error) {
    next(error);
  }
  return null;
};

const updateCart = async (req, res, next) => {
  try {
    const { cartId } = req.params;
    const { quantity, varient } = req.body;
    if (quantity <= 0) {
      return res.status(400).json({ status: 400, message: 'Quantity must be greater than 0' });
    }
    const cart = await Cart.findByIdAndUpdate(cartId, { quantity, varient }, { new: true });
    return res.status(200).json({ status: 200, message: 'Cart updated successfully', cart });
  } catch (error) {
    next(error);
  }
  return null;
};

const deleteCart = async (req, res, next) => {
  try {
    const { cartId } = req.params;
    await Cart.findByIdAndDelete(cartId);
    return res.status(204).json({ status: 204, message: 'Cart deleted successfully' });
  } catch (error) {
    next(error);
  }
  return null;
};

module.exports = { createCart, getCarts, updateCart, deleteCart };
