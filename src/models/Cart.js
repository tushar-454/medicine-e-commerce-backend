const { model, schema } = require('mongoose');

const cartSchema = schema({
  user: {
    type: schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  product: {
    type: schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  varient: {
    type: {
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
});

module.exports = model('Cart', cartSchema);
