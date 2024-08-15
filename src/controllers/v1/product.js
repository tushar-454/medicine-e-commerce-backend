const Cart = require('../../models/Cart');
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
    const { category } = req.query;
    const { user } = req.body;
    if (category) {
      const products = await Product.find({ category, isDeleted: false }).lean();
      const carts = await Cart.find({ user }).lean();
      const newProducts = products.map((product) => {
        const isCarted = carts.find((cart) => cart.product.toString() === product._id.toString());
        if (isCarted) {
          return { ...product, isCarted: true };
        }
        return { ...product, isCarted: false };
      });
      return res.status(200).json({
        status: 200,
        products: newProducts,
      });
    }
    const products = await Product.find({ isDeleted: false }).lean();
    const carts = await Cart.find({ user }).lean();
    const newProducts = products.map((product) => {
      const isCarted = carts.find((cart) => cart.product.toString() === product._id.toString());
      if (isCarted) {
        return { ...product, isCarted: true };
      }
      return { ...product, isCarted: false };
    });
    res.status(200).json({
      status: 200,
      products: newProducts,
    });
  } catch (error) {
    next(error);
  }
  return null;
};
const getAdminProducts = async (req, res, next) => {
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

const updateProducts = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      photo,
      discount,
      variants,
      category,
      quantity,
      isFeatured,
      isSpecial,
      isPopular,
      isTrending,
      isDiscounted,
      isDeleted,
    } = req.body;
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id },
      {
        name,
        description,
        photo,
        discount,
        variants,
        category,
        quantity,
        isFeatured,
        isSpecial,
        isPopular,
        isTrending,
        isDiscounted,
        isDeleted,
      },
      { new: true },
    );
    return res.status(200).json({
      status: 200,
      message: 'Product updated successfully',
      updatedProduct,
    });
  } catch (error) {
    next(error);
  }
  return null;
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { isHard } = req.body;
    if (isHard) {
      await Product.findOneAndDelete({ _id: id });
      return res.status(204).json({
        status: 204,
        message: 'Product deleted successfully',
      });
    }
    await Product.findOneAndUpdate({ _id: id }, { isDeleted: true }, { new: true });
    return res.status(200).json({
      status: 200,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    next(error);
  }
  return null;
};

const getProductById = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const product = await Product.findOne({ _id: productId, isDeleted: false });
    const relatedProduct = await Product.find({ category: product.category }).limit(4);
    res.status(200).json({
      status: 200,
      product,
      relatedProduct,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProduct,
  getProducts,
  updateProducts,
  deleteProduct,
  getAdminProducts,
  getProductById,
};
