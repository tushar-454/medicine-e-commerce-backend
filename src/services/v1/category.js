const Category = require('../../models/Category');

const getCategoryWithSubcategories = async (parentId = null, depth = 3) => {
  if (depth === 0) return [];

  // Fetch categories with the given parentId (null for root categories)
  const categories = await Category.find({ parent: parentId, isDeleted: false }).lean();

  // Fetch subcategories for each category
  const categoriesWithSubcategories = await Promise.all(
    categories.map(async (category) => {
      const subCategories = await getCategoryWithSubcategories(category._id, depth - 1);
      return {
        ...category,
        subCategories,
      };
    }),
  );

  return categoriesWithSubcategories;
};

module.exports = { getCategoryWithSubcategories };
