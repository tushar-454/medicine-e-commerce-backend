const Category = require('../../models/Category');
const { getCategoryWithSubcategories } = require('../../services/v1/category');

const createCategory = async (req, res, next) => {
  try {
    const { name, slug, photo, parent, ancestors, isRoot = !parent, isLeaf = true } = req.body;

    // Create a new category document
    const newCategory = new Category({
      name,
      slug: slug.toLowerCase(),
      photo,
      parent,
      ancestors,
      isRoot,
      isLeaf,
      isDeleted: false,
    });

    // Save the category to the database
    const savedCategory = await newCategory.save();

    // Respond with the created category
    res.status(201).json(savedCategory);
  } catch (error) {
    next(error);
  }
  return null;
};

const getCategories = async (req, res, next) => {
  try {
    // Fetch all main categories and their nested subcategories
    const categories = await getCategoryWithSubcategories(null, 3);

    // Respond with the categories
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
  return null;
};

module.exports = { createCategory, getCategories };
