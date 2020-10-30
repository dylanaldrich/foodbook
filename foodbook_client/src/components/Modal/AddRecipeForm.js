import React, {useState} from 'react';
import RecipeModel from '../../models/RecipeModel';

export const AddRecipeForm = ({closeModal}) => {    
    const [recipe_type, setRecipeType] = useState("");
    const [selectedFoodbooks, setSelectedFoodbooks] = useState("");
    const [error, setError] = useState('');

    function setSelectedFoodbooks(event) {
        const addsFoodbook = selectedFoodbooks.concat([event.target.value]);
        selectedFoodbooks = addsFoodbook;
    };


    function handleSubmit(event) {
        event.preventDefault();
        RecipeModel.create({recipe_type, selectedFoodbooks}).then((response) => {
        console.log("Create recipe response:", response);
        if(response.status === 201) {
            console.log("Recipe created successfully");
            closeModal();
        } else {
            setError(response.message);
        }
        });
    };
    
    return (
        <form onSubmit={handleSubmit}>
            {error && <p style={{ color: "red" }}>{error}</p>} 
            <div className="form-group">
                <label>
                    Recipe type
                    <select /* value={recipe_type} */ name={recipe_type} onChange={setRecipeType}>
                        <option value="entree">Entrée</option>
                        <option value="appetizer">Appetizer/Snack</option>
                        <option value="side">Side dish</option>
                        <option value="salad">Salad</option>
                        <option value="dessert">Dessert</option>
                        <option value="drink">Drink</option>
                    </select>
                </label>
            </div>
            <div className="form-group">
                {/* Here is where the list of foodbooks and checkboxes will go */}
            </div>
            <div className="form-group">
                <button className="form-control btn btn-primary" type="submit">
                    Save Recipe
                </button>
            </div>
        </form>
    );
};

export default AddRecipeForm;


// Adapted from: https://blog.bitsrc.io/build-a-full-featured-modal-dialog-form-with-react-651dcef6c571