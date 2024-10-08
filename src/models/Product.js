const { model, Schema } = require('mongoose');

const productSchema = Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  variants: [
    {
      dose: {
        type: String,
        required: true,
      },
      package_size: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  isSpecial: {
    type: Boolean,
    default: false,
  },
  isPopular: {
    type: Boolean,
    default: false,
  },
  isTrending: {
    type: Boolean,
    default: false,
  },
  isDiscounted: {
    type: Boolean,
    default: false,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = model('Product', productSchema);
