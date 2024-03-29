import React from "react";
import axios from "axios";
import "./recipeform.css";

export default class RecipeForm extends React.Component {
  constructor(props) {
    super(props);
    if (props.data) {
      this.state = {
        name: this.props.data.recipe_name,
        desc: this.props.data.recipe_desc,
        ingr: this.props.data.recipe_ingr,
        method: this.props.data.recipe_method,
        difficulty: this.props.data.recipe_difficulty,
        servings: this.props.data.recipe_servings,
        time: this.props.data.recipe_time,
        imageFile: this.props.data.recipe_imageFile,
        actionName: "Update Recipe"
      };
    } else
      this.state = {
        name: "",
        desc: "",
        ingr: "",
        method: "",
        difficulty: "",
        servings: "",
        time: "",
        imageFile: null,
        actionName: "Add Recipe"
      };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeDifficulty = this.onChangeDifficulty.bind(this);
    this.onChangeIngr = this.onChangeIngr.bind(this);
    this.onChangeMethod = this.onChangeMethod.bind(this);
    this.onChangeRecipeDesc = this.onChangeRecipeDesc.bind(this);
    this.onChangeRecipeName = this.onChangeRecipeName.bind(this);
    this.onChangeServings = this.onChangeServings.bind(this);
    this.onChangeTime = this.onChangeTime.bind(this);
    this.onImageUpload = this.onImageUpload.bind(this);
  }
  addRecipe(recipe_data) {
    axios
      .post("http://localhost:4000/recipes/create", recipe_data)
      .then(res => {
        console.log(res.data);
        if (res.status === 200) {
          alert("recipe created");
          this.props.history.push("/home");
        } else {
          alert("failed to add recipe!", res.statusText);
        }
      });
  }
  editRecipe(recipe_data) {
    axios
      .post(
        `http://localhost:4000/recipes/update/${this.props.match.params.id}`,
        recipe_data
      )
      .then(res => {
        console.log(res.data);
        if (res.status === 200) {
          alert("recipe updated");
          this.props.history.push("/home");
        } else {
          alert("failed to update recipe!", res.statusText);
        }
      });
  }
  onImageUpload(e) {
    console.log(e.target.value);
    this.setState({
      imageFile: e.target.files[0]
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
  onChange(propName, val) {
    console.log(val);
    this.setState({ [propName]: val });
  }
  onSubmit(e) {
    e.preventDefault();
    console.log("form submitted");
    let formdata = new FormData();

    formdata.append("recipe_name", this.state.name);
    formdata.append("recipe_desc", this.state.desc);
    formdata.append("recipe_ingr", this.state.ingr);
    formdata.append("recipe_method", this.state.method);
    formdata.append("recipe_difficulty", this.state.difficulty);
    formdata.append("recipe_servings", this.state.servings);
    formdata.append("recipe_time", this.state.time);
    formdata.append("recipe_imageFile", this.state.imageFile);

    if (this.state.actionName === "Update Recipe") {
      this.editRecipe(formdata);
    } else {
      this.addRecipe(formdata);
    }

    this.setState({
      name: "",
      desc: "",
      ingr: "",
      method: "",
      difficulty: "",
      servings: "",
      time: "",
      imageFile: null,
      actionName: "Add Recipe"
    });
  }
  render() {
    return (
      <form
        id="recipeformpage"
        onSubmit={this.onSubmit}
        encType="multipart/form-data"
      >
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
          <div className="labels">
            <label>Upload image:</label>
          </div>
          <div className="inputs">
            <input
              type="file"
              files={this.state.imageFile}
              onChange={this.onImageUpload}
            />
          </div>
        </div>
        <div className="form-item">
          <button className="buttons">{this.state.actionName}</button>
        </div>
      </form>
    );
  }
}
