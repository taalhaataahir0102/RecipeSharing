import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './Createpost.css';
import Topheader from './Topheader';
import Header from './Header';

const CreatePost = () => {
  const [category, setCategory] = useState('');
  const [ingredients, setIngredients] = useState(['']);
  const [recipe, setRecipe] = useState('');
  const [image, setImage] = useState(null);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleIngredientChange = (index, event) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = event.target.value;
    setIngredients(updatedIngredients);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const handleRemoveIngredient = (index) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
  };

  const handleRecipeChange = (event) => {
    setRecipe(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    // console.log(event)
    var reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      console.log(reader.result)
      setImage(reader.result);
    }
    reader.onerror = error => {
      console.log("Error:", error)
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:5000/api/post', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({category, ingredients, recipe, image})
    });
    const data = await response.json();
    const message = data.message;
    console.log(message);
    if (response.ok) {
      alert('Post successful!');
    }
    else{
      alert(message);
      // window.location.href = '/';
    }
    // Perform form submission logic here
  };

  return (
    <div className="dashboard-container">
      <Header />
      <div className="dashboard-content">
      <Topheader />
    <div className="create-post-container">
      <h2>Create Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select id="category" value={category} onChange={handleCategoryChange} required>
            <option value="">Select a category</option>
            <option value="Dessert">Dessert</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Meat">Meat</option>
            <option value="Cuisine">Cuisine</option>
          </select>
        </div>
        <div className="form-group">
          <label>Ingredients:</label>
          {ingredients.map((ingredient, index) => (
            <div key={index} className="ingredient-row">
              <input
                type="text"
                value={ingredient}
                onChange={(event) => handleIngredientChange(index, event)}
                required
              />
              {index === ingredients.length - 1 && (
                <FontAwesomeIcon icon={faPlus} className="add-ingredient" onClick={handleAddIngredient} />
              )}
              {index !== 0 && (
                <button type="button" className="remove-ingredient" onClick={() => handleRemoveIngredient(index)}>
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
        <div className="form-group">
          <label htmlFor="recipe">Recipe:</label>
          <textarea id="recipe" value={recipe} onChange={handleRecipeChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image:</label>
          <input type="file" id="image" accept="image/*" onChange={handleImageChange} required />
        </div>
        {image==="" || image === null ?"":<img width={200} height={150} src={image}/>}
        <button type="submit">Submit</button>
      </form>
    </div>
    </div>
    </div>
  );
};

export default CreatePost;
