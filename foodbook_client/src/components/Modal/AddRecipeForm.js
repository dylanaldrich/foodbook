import React, {useState, useEffect} from 'react';

import RecipeModel from '../../models/RecipeModel';
import UserModel from '../../models/UserModel';

import { useRecoilState } from "recoil";
import { userState } from "../../recoil/atoms";

export const AddRecipeForm = ({closeModal}) => {    
    const [recipe_type, setRecipeType] = useState("");
    const [allFoodbooks, setAllFoodbooks] = useState([]);
    const [user, setUser] = useRecoilState(userState);
    const [selectedFoodbooks, setSelectedFoodbooks] = useState("");
    const [error, setError] = useState('');

    useEffect(function () {
        if(localStorage.getItem('uid')) {
            UserModel.show().then((response) => {
                console.log("response to user show", response);
                setUser(response.data);
                setAllFoodbooks(response.foodbooks);
                console.log("allFoodbooks", allFoodbooks);
            });
        }
    }, []);
    
    function addFoodbooks(event) {
        const foodbooksToAdd = selectedFoodbooks.concat([event.target.value]);
        setSelectedFoodbooks(foodbooksToAdd);
    };


    function handleSubmit(event) {
        event.preventDefault();
        console.log(event);
        RecipeModel.create().then((response) => {
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
            <div className="form-group text-center">
            <label htmlFor="recipe_type">Recipe type</label>
                    <select /* value={recipe_type} */ className="ml-2" name={recipe_type} onChange={setRecipeType}>
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
                    {allFoodbooks ? allFoodbooks.map((foodbook) => <li className="mx-auto">
                    <label htmlFor="name">{foodbook.name}</label> 
                    <input type="checkbox" className="ml-2" name={`foodbook_${foodbook._id}`} key={foodbook._id} />
                    </li>)
                    : null}
                </ul>
            </div>

            {/* submit button */}
            <div className="form-group">
                <button className="form-control btn btn-primary" type="submit">
                    Save Recipe
                </button>
            </div>
        </form>
    );
};

export default AddRecipeForm;


// // Adapted from: https://blog.bitsrc.io/build-a-full-featured-modal-dialog-form-with-react-651dcef6c571