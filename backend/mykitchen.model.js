const mongoose = require("mongoose");
const schema = mongoose.Schema;
let recipe = new schema({
  recipe_name: {
    type: String
  },
  recipe_desc: {
    type: String
  },
  recipe_ingr: {
    type: String
  },
  recipe_method: {
    type: String
  },
  recipe_difficulty: {
    type: String
  },
  recipe_time: {
    type: String
  },
  recipe_servings: {
    type: String
  },
  recipe_image: {
    public_id: { type: String },
    url: { type: String }
  }
});

module.exports = mongoose.model("recipe", recipe);
