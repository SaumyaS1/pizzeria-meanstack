    const express = require('express');
    const router = express.Router();
    const pizzaController = require('../controllers/pizzaController');
    const ingredientController = require('../controllers/ingredientController');

    router.get('/getpizza', pizzaController.getAllPizzas);
    router.get('/getingredients', ingredientController.getAllIngredients)
    module.exports = router;
