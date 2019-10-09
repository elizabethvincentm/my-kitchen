const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const recipeRoutes=express.Router();
const PORT = 4000;
let Recipe=require('./mykitchen.model');
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(
  "mongodb://127.0.0.1:27017/mykitchen",
  { useNewUrlParser: true }
);
const connection = mongoose.connection;
connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});

recipeRoutes.route('/').get(function(req,res){
Recipe.find(function(err,recipes){
  if(err){
console.log(err);
console.log('DATA NOT SENT');
  }
  else{
    res.json(recipes);
  }
})
});
//console.log('DATA NOT SENT');
recipeRoutes.route('/:id').get(function(req,res){
let id=req.params.id;
Recipe.findById(id,function(err,recipeData){
  res.json(recipeData);
})
});

recipeRoutes.route('/update/:id').post(function(req,res){
  Recipe.findById(req.params.id,function(err,data){
    if(!data)
    res.status(404).send("data not found");
    else{
      data.recipe_name=req.body.recipe_name;
      data.recipe_desc=req.body.recipe_desc;
      data.recipe_ingr=req.body.recipe_ingr;
      data.recipe_method=req.body.recipe_method;
      data.recipe_difficulty=req.body.recipe_difficulty;
      data.recipe_servings=req.body.recipe_servings;
      data.recipe_time=req.body.recipe_time;
      data.save().then(data=>res.json('Recipe Updated!')).catch(err=>res.status(404).send("Update not possible!"));
    }
  })
})

recipeRoutes.route('/create').post(function(req,res){
  let data=new Recipe(req.body);
  data.save().then(data=>res.status(200).json({'recipe':'recipe added successfully'})).catch(err=>res.status(400).send('recipe creation failed'));
})


app.use('/recipes',recipeRoutes);
app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT);
});
