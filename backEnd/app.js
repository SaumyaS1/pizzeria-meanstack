const express = require('express');
const cors=require('cors')
// const connectDB = require('./database/mongoose');
// const routes = require('./routes/routes');
const app = express();
app.use(cors());
const PORT = 3000;
app.use(express.json());
// app.use(express.json());
// app.use('/getpizza',routes);
// app.use('/getingredients',routes);
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/pizzeria')
  .then(() => {
    console.log('MongoDB connected:', mongoose.connection.host);
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1);
  });


const ingredientSchema = new mongoose.Schema({
  id: Number,
  name: String,
  price: Number,
  image:String
});

const pizzaSchema = new mongoose.Schema({
  id: String,
  type: {String, enum: ['veg', 'nonveg']},
  price: Number,
  name: String,
  image: String,
  description: String,
  ingredients: [String],
  toppings: [String],
});

const Ingredient = mongoose.model('Ingredient', ingredientSchema);
const Pizza = mongoose.model('Pizza', pizzaSchema);

const cartSchema = new mongoose.Schema({
  id:Number,
  price:Number,
  name:String,
  image:String,
  qty:Number
});

// const ingredientCartSchema = new mongoose.Schema({
//   id: { type: Number, required: true },
//   tname: { type: String, required: true },
//   price: { type: Number, required: true },
//   image: { type: String, required: true },
//   qty:Number
// });

// const ingredientCart=mongoose.model('ingredientCart',ingredientCartSchema);
const Cart=mongoose.model('Cart',cartSchema);

app.get('/getpizza',(req,res) =>{
  Pizza.find()
  .then(pizzas => {
    res.json(pizzas);
    console.log(pizzas)
  })
  .catch(error => {
    console.error("Error fetching Pizzas:", error);
    res.status(500).json({ message: "Internal Server Error" });
  });
});

app.get('/getingredients',(req,res) =>{
  Ingredient.find()
  .then(ingredients => {
    res.json(ingredients);
    console.log(ingredients)
  })
  .catch(error => {
    console.error("Error fetching Ingredients:", error);
    res.status(500).json({ message: "Internal Server Error"});
  });
});

app.get('/get/cart',async (req,res)=>{
  try{
  const items= await Cart.find();
  res.json(items)
  console.log("data:",items);
  }
  catch(err){
    console.log("Error fetching Cart Items");
    res.status(500).json({message:"Internal Server Error"});
  }
})

app.post('/cart/add',async (req,res)=>{
  try{
    console.log(req.body);
    const {id,type,price,name,image,qty,action}=req.body;
  const item= await Cart.findOne({ id:id })
  console.log(item);
  if(item){
    item.qty +=1;
   await item.save();
    console.log(item);
    res.json(item);
  }
  else{
    const data=new Cart({id,type,price,name,image,qty:1});
    const save=await data.save();
    console.log(save);
    res.json(save);
  } 
}
  catch(err){
    console.error('Error adding pizza:', err);
      res.status(500).json({ message: 'Internal Server Error' });
  };
})

app.put('/cart/:id',async (req,res)=>{
  try{
    const id=req.params.id;
    console.log(id);
    const item = await Cart.findOne({ id:id });
    if(!item){
      console.error('Error updating pizza:');
      res.status(404).json({'message':'Item does not exist'});
    }
    console.log(item);
    if(item.qty>1){
      await Cart.updateOne({'id':id},{$set:{qty:item.qty-1}}); 
      res.json({'message':'Quantity successfully substracted'})
    }
    else{
      res.status(400).json({'message':'Quantity cannot be less than 1'});
    }
    
  }
  catch(err){
    // console.error('Error updating pizza:', err);
    res.status(500).json(err);
  }
});

app.delete('/cart/:id',async (req,res)=>{
  try{
    const id =req.params.id;
    const item = await Cart.findOne({id:id});
    if(item.qty>0){
      await Cart.deleteOne({id:id});
      res.status(200).json({"message":"Item deleted successfully"});
    }
    else{
      res.status(400).json({"message":"Quantity should be more than 0"});  
    } 
  }
  catch(err){
    console.log("Cannot delete item:",err);
    res.status(404).json({"message":"Item does not exist"});  
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});