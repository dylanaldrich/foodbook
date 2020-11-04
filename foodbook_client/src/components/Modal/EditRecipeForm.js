/* TODO refactor for EDIT RECIPE */

import React, {useState, useEffect} from 'react';

import RecipeModel from '../../models/RecipeModel';
import UserModel from '../../models/UserModel';

import { useRecoilState } from "recoil";
import { userState } from "../../recoil/atoms";

export const EditRecipeForm = ({closeModal, recipeName, edamam_id, recipeType, savedRecipeId}) => {    
    const [recipe_type, setRecipeType] = useState(recipeType);
    const [allFoodbooks, setAllFoodbooks] = useState([]);
    const [user, setUser] = useRecoilState(userState);
    const [selectedFoodbooks, setSelectedFoodbooks] = useState([]);
    const [preSelectedFoodbooks, setPreSelectedFoodbooks] = useState([]);
    const [error, setError] = useState('');

    useEffect(function () {
        if(localStorage.getItem('uid')) {
            UserModel.show().then((response) => {
                console.log("response to user show", response);
                setUser(response.data);
                setAllFoodbooks(response.foodbooks);
                fetchRecipeFoodbooks();
                console.log("allFoodbooks", allFoodbooks);
            });
        }
    }, []);

    useEffect(function() {
        if(preSelectedFoodbooks) {
            setSelectedFoodbooks(preSelectedFoodbooks);
        }
    }, [preSelectedFoodbooks]);

    useEffect(function() {
        if(recipe_type) {
            preSelectRecipeType(document.getElementById("recipeTypeDropdown"), recipe_type);
        }
    }, [recipe_type]);

    async function fetchRecipeFoodbooks () {
        await RecipeModel.show(savedRecipeId).then(async response => {
            setPreSelectedFoodbooks(response.foundRecipe.foodbooks);
        });
    };

    function handleSubmit(event) {
        event.preventDefault();
        RecipeModel.update({recipe_type, foodbooksIds: selectedFoodbooks, name: recipeName, edamam_id}).then((response) => {
        console.log("Create recipe response:", response);
        if(response.status === 201) {
            console.log("Recipe created successfully");
            closeModal();
        } else {
            setError(response.message);
        }
        });
    };

    function handleChange(e) {
        console.log("e.target.type, name, value:", e.target.type, e.target.name, e.target.value);
        if(selectedFoodbooks.includes(e.target.value)) {
            setSelectedFoodbooks(selectedFoodbooks.filter(foodbook => {
                return foodbook !== e.target.value;
            }))
        } else {
            setSelectedFoodbooks([...selectedFoodbooks, e.target.value]);
        }
    }

    const generateCheckbox = allFoodbooks && preSelectedFoodbooks ? allFoodbooks.map((foodbook) => {
        // Handle the logic if foodbook is in selectedFoodbooks array, return a checked checkbox, else uncheck
        if(preSelectedFoodbooks.some(index => index === foodbook._id)) {
            selectedFoodbooks.concat([foodbook._id]);
            return <li className="mx-auto">
                <label htmlFor="name">{foodbook.name}</label> 
                <input type="checkbox" checked onChange={handleChange}  className="ml-2" name={`foodbook_${foodbook._id}`} value={foodbook._id} key={foodbook._id} />
            </li>;
        }

        return <li className="mx-auto">
        <label htmlFor="name">{foodbook.name}</label> 
        <input type="checkbox" onChange={handleChange}  className="ml-2" name={`foodbook_${foodbook._id}`} value={foodbook._id} key={foodbook._id} />
        </li>;
    }) : null;

    /* Adapted from: https://www.daftlogic.com/information-programmatically-preselect-dropdown-using-javascript.htm */
    // preselect the value of the dropdown menu to match the recipe's type, as previously saved
    function preSelectRecipeType(menu, type) {
        for (let i = 0; i < menu.options.length; i++) { 
            if (menu.options[i].value == type) {
                menu.options[i].selected = true;
                break;
            }
        }
        return;
    }

    return (
        <form onSubmit={handleSubmit}>
            {error && <p style={{ color: "red" }}>{error}</p>} 
            <div className="form-group text-center">
            <label htmlFor="recipe_type">Recipe type</label>
                    <select className="ml-2" id="recipeTypeDropdown" name="recipe_type" onChange={(e) => setRecipeType(e.target.value)}>
                        <option value="" className="text-italic text-muted">Select...</option>
                        <option value="entree">Entrée</option>
                        <option value="appetizer">Appetizer/Snack</option>
                        <option value="side">Side Dish</option>
                        <option value="salad">Salad</option>
                        <option value="dessert">Dessert</option>
                        <option value="drink">Drink</option>
                    </select>
            </div>

            {/* foodbook checkboxes */}
            <div className="form-group text-center">
                <h5>Foodbooks:</h5> 
                <ul className="d-flex flex-wrap list-unstyled">
                    {generateCheckbox}
                </ul>
            </div>

            {/* submit button */}
            <div className="form-group">
                <button className="form-control btn btn-primary" type="submit">
                    Update Recipe
                </button>
            </div>
        </form>
    );
};

export default EditRecipeForm;


// // Adapted from: https://blog.bitsrc.io/build-a-full-featured-modal-dialog-form-with-react-651dcef6c571