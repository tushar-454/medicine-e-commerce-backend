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

const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      status: 200,
      products,
    });
  } catch (error) {
    next(error);
  }
  return null;
};

module.exports = { createProduct, getProducts };
