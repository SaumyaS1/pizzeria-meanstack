const Pizza = require('../model/pizzaSchema.js');

exports.getAllPizzas = async (req, res) => {
  try {
    const pizzas = await Pizza.find();
    res.json(pizzas);
  } catch (err) {
    res.status(500).json("error while grtting pizzas");
  }
};
