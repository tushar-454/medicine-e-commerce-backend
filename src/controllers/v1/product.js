const Product = require('../../models/Product');

const createProduct = async (req, res, next) => {
  try {
    const { name, description, photo, category, quantity, variants } = req.body;
    const product = new Product({
      name,
      description,
      photo,
      category,
      quantity,
      variants,
    });
    await product.save();
    res.status(201).json({
      status: 201,
      message: 'Product created successfully',
      product,
    });
  } catch (error) {
    next(error);
  }
  return null;
};

module.exports = { createProduct };
