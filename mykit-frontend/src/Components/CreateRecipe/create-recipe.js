import React from "react";
import axios from 'axios';
import "./create_recipe.css";
export default class CreateRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      desc: "",
      ingr: "",
      method: "",
      difficulty: "",
      servings: "",
      time: ""
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeDifficulty = this.onChangeDifficulty.bind(this);
    this.onChangeIngr = this.onChangeIngr.bind(this);
    this.onChangeMethod = this.onChangeMethod.bind(this);
    this.onChangeRecipeDesc = this.onChangeRecipeDesc.bind(this);
    this.onChangeRecipeName = this.onChangeRecipeName.bind(this);
    this.onChangeServings = this.onChangeServings.bind(this);
    this.onChangeTime = this.onChangeTime.bind(this);
  }
  onSubmit(e) {
    e.preventDefault();
    console.log('form submitted');
    const newRecipe={
      recipe_name:this.state.name,
      recipe_desc:this.state.desc,
      recipe_ingr:this.state.ingr,
      recipe_method:this.state.method,
      recipe_difficulty:this.state.difficulty,
      recipe_servings:this.state.servings,
      recipe_time:this.state.time
    };
    axios.post('http://localhost:4000/recipes/create',newRecipe).then(res=>console.log(res.data));
    this.setState({
      name: "",
      desc: "",
      ingr: "",
      method: "",
      difficulty: "",
      servings: "",
      time: ""
    });
  }
  onChangeRecipeName(e) {
    this.setState({
      name: e.target.value
    });
  }
  onChangeRecipeDesc(e) {
    this.setState({
      desc: e.target.value
    });
  }
  onChangeIngr(e) {
    this.setState({
      ingr: e.target.value
    });
  }
  onChangeMethod(e) {
    this.setState({
      method: e.target.value
    });
  }
  onChangeDifficulty(e) {
    this.setState({
      difficulty: e.target.value
    });
  }
  onChangeServings(e) {
    this.setState({
      servings: e.target.value
    });
  }
  onChangeTime(e) {
    this.setState({
      time: e.target.value
    });
  }
  render() {
    return (
      <div id="create-recipe">
        <form id="form-create" onSubmit={this.onSubmit}>
          <div className="form-item">
            <div className="labels">
              <label>*Recipe Name:</label>
            </div>
            <div className="inputs">
              <input
                type="text"
                required
                value={this.state.name}
                onChange={this.onChangeRecipeName}
              />
            </div>
          </div>
          <div className="form-item">
            <div className="labels">
              <label>Short Description:</label>
            </div>
            <div className="inputs">
              <input
                type="text"
                value={this.state.desc}
                onChange={this.onChangeRecipeDesc}
              />
            </div>
          </div>
          <div className="form-item">
            <div className="labels">
              <label>*Ingredients:</label>
            </div>
            <div className="inputs">
              <input
                type="text"
                required
                value={this.state.ingr}
                onChange={this.onChangeIngr}
              />
            </div>
          </div>
          <div className="form-item">
            <div className="labels">
              <label>*Method:</label>
            </div>
            <div className="inputs">
              <input
                type="text"
                required
                value={this.state.method}
                onChange={this.onChangeMethod}
              />
            </div>
          </div>
          <div className="form-item">
            <div className="labels">
              <label>Difficulty Level:</label>
            </div>
            <div className="inputs">
              <div className="form-radio">
                <input
                  type="radio"
                  name="diffLevel"
                  id="easyLevel"
                  value="easy"
                  checked={this.state.difficulty === "easy"}
                  onChange={this.onChangeDifficulty}
                />
                <label>Easy</label>
              </div>
              <div className="form-radio">
                <input
                  type="radio"
                  name="diffLevel"
                  id="interLevel"
                  value="moderate"
                  checked={this.state.difficulty === "moderate"}
                  onChange={this.onChangeDifficulty}
                />
                <label>Moderate</label>
              </div>
              <div className="form-radio">
                <input
                  type="radio"
                  name="diffLevel"
                  id="hardLevel"
                  value="hard"
                  checked={this.state.difficulty === "hard"}
                  onChange={this.onChangeDifficulty}
                />
                <label>Hard</label>
              </div>
            </div>
          </div>
          <div className="form-item">
            <div className="labels">
              <label>Servings:</label>
            </div>
            <div className="inputs">
              <input
                type="text"
                required
                value={this.state.servings}
                onChange={this.onChangeServings}
              />
            </div>
          </div>
          <div className="form-item">
            <div className="labels">
              <label>Cooking time:</label>
            </div>
            <div className="inputs">
              <input
                type="text"
                required
                value={this.state.time}
                onChange={this.onChangeTime}
              />
            </div>
          </div>
          <div className="form-item">
            <button className="buttons" type="submit">
              create recipe
            </button>
          </div>
        </form>
      </div>
    );
  }
}
