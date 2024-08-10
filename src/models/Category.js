const { model, schema } = require('mongoose');

const categorySchema = schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    trim: true,
  },
  photo: {
    type: String,
    required: true,
  },
  parent: {
    type: schema.Types.ObjectId,
    ref: 'Category',
  },
  ancestors: [
    {
      type: schema.Types.ObjectId,
      ref: 'Category',
    },
  ],
  isRoot: {
    type: Boolean,
    default: false,
  },
  isLeaf: {
    type: Boolean,
    default: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = model('Category', categorySchema);
