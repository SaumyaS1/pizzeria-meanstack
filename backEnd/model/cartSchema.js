const mongoose = require('mongoose');

const pizzaCartSchema = new mongoose.Schema({
    id: { type: String, required: true },
    type: { type: String, enum: ['veg', 'nonveg'], required: true },
    price: { type: Number, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    qty:{type:Number, default: 1,required:true}
});

const ingredientCartSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    tname: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true }
  });

  const ingredientCart=mongoose.model('pizzaCart',ingredientCartSchema);
  const pizzaCart=mongoose.model('pizzaCart',pizzaCartSchema);
module.exports=ingredientCart,pizzaCart;
