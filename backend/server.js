const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

const recipeRoutes = express.Router();

const multer = require("multer");
const fs = require("fs");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
let Recipe = require("./mykitchen.model");
app.use(cors());
app.use(bodyParser.json());
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});
const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: "mykitchenapp",
  allowedFormats: ["jpg", "png"],
  transformation: [{ width: 500, height: 500, crop: "limit" }]
});
const parser = multer({ storage: storage });
mongoose.connect("mongodb://127.0.0.1:27017/mykitchen", {
  useNewUrlParser: true
});
const connection = mongoose.connection;
connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});

recipeRoutes.route("/").get(function(req, res) {
  Recipe.find(function(err, recipes) {
    if (err) {
      console.log(err);
      console.log("DATA NOT SENT");
    } else {
      res.json(recipes);
    }
  });
});
recipeRoutes.route("/:id").get(function(req, res) {
  let id = req.params.id;
  Recipe.findById(id, function(err, recipeData) {
    res.json(recipeData);
  });
});

recipeRoutes.route("/update/:id").post(function(req, res) {
  Recipe.findById(req.params.id, function(err, data) {
    if (!data) res.status(404).send("data not found");
    else {
      data.recipe_name = req.body.recipe_name;
      data.recipe_desc = req.body.recipe_desc;
      data.recipe_ingr = req.body.recipe_ingr;
      data.recipe_method = req.body.recipe_method;
      data.recipe_difficulty = req.body.recipe_difficulty;
      data.recipe_servings = req.body.recipe_servings;
      data.recipe_time = req.body.recipe_time;
      data.recipe_image = req.body.recipe_image;
      data
        .save()
        .then(data => res.json("Recipe Updated!"))
        .catch(err => res.status(404).send("Update not possible!"));
    }
  });
});

recipeRoutes
  .route("/create")
  .post(parser.single("recipe_imageFile"), function(req, res) {
    console.log(req.file);
    const image = {};
    image.public_id = req.file.public_id;
    image.url = req.file.url;
    let data = new Recipe();
    data.recipe_name = req.body.recipe_name;
    data.recipe_desc = req.body.recipe_desc;
    data.recipe_ingr = req.body.recipe_ingr;
    data.recipe_method = req.body.recipe_method;
    data.recipe_difficulty = req.body.recipe_difficulty;
    data.recipe_servings = req.body.recipe_servings;
    data.recipe_time = req.body.recipe_time;
    data.recipe_image = image;
    //let data = new Recipe(req.body);
    data
      .save()
      .then(data =>
        res.status(200).json({ recipe: "recipe added successfully" })
      )
      .catch(err => res.status(400).send("recipe creation failed"));
  });
recipeRoutes.route("/delete/:id").delete(function(req, res) {
  Recipe.deleteOne({ _id: req.params.id }, function(err) {
    if (err) res.send(err);
    else res.send("recipe deleted successfully");
  });
});

/*recipeRoutes.route("/uploadImage").post(parser.single("image"), (req, res) => {
  console.log(req.file); // to see what is returned to you
  const image = {};
  image.url = req.file.url;
  image.id = req.file.public_id;
  Recipe.create(image) // save image information in database
    .then(newImage => res.json(newImage))
    .catch(err => console.log(err));
});*/
app.use("/recipes", recipeRoutes);
app.listen(process.env.PORT, function() {
  console.log("Server is running on Port: " + process.env.PORT);
});
