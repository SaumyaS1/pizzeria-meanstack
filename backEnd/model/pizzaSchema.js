const mongoose = require('mongoose');

const pizzaSchema = new mongoose.Schema({
  id: { type: String, required: true },
  type: { type: String, enum: ['veg', 'nonveg'], required: true },
  price: { type: Number, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  ingredients: { type: [String], required: true },
  toppings: { type: [String], required: true }
});

const Pizza = mongoose.model('pizza', pizzaSchema);

module.exports = Pizza;
