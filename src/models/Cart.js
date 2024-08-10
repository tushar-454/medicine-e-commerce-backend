const { model, Schema } = require('mongoose');

const cartSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  varient: {
    type: Number,
    required: true,
  },
});

module.exports = model('Cart', cartSchema);
