import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import ModalContainer from '../components/Modal/ModalContainer';
import FoodbookModel from '../models/FoodbookModel';
import RecipeModel from '../models/RecipeModel';

import '../App.css';

const FoodbookDetail = (props) => {
    const [foodbook, setFoodbook] = useState({});
    const [error, setError] = useState('');

    useEffect(function(){
            if(props.match.params.id) {
                const foodbookId = props.match.params.id;
                findFoodbook(foodbookId);
            }
        },
        [props.match.params.id]
    );

    function findFoodbook (foodbookId) {
        FoodbookModel.show(foodbookId)
        .then((response) => {
            const foundFoodbook = response.foodbook;
            setFoodbook(foundFoodbook);
        })
        .catch((error) => {
            setError(error.message);
        });
    };

    function handleRecipeRemove(recipeId) {
        RecipeModel.remove(recipeId, foodbook._id)
            .catch((error) => console.log("Recipe remove error: ", error));
    }; 

    return (
        <>
        {foodbook.recipes ? 
            <>
            {/* Banner */}
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div className="container text-white rounded bg-dark top-banner">
                <div className="col-md-6 px-0 d-flex">
                    <h1 className="display-4 mr-auto">{foodbook.name}</h1>
                </div>
                <ModalContainer triggerText={"Edit foodbook"} foodbookId={foodbook._id} />
            </div>
            {/* Banner End */}
            <div className="page-header container">
                <h2 className="text-left pt-2 font-weight-bold">Recipes</h2>
                <hr />
            </div>

            {/* Recipes List */}
            <div className="container d-flex">
                <ul className="list-group list-group-flush">
                    {foodbook.recipes.length ? foodbook.recipes.map((recipe) => 
                        <li className="list-group-item d-flex" key={recipe._id}>
                            <Link to={`/recipe/${recipe.edamam_id}`}>
                                {recipe.name ? recipe.name : "Mysterious Nameless Recipe"}
                            </Link>
                            <div onClick={() => handleRecipeRemove(recipe._id)} title="Remove this recipe"><i className="fas fa-times-circle"></i></div>
                        </li>
                        ) 
                    : <li className="list-group-item text-muted">This foodbook is looking a little empty. Search for some recipes and add them in!</li> }
                </ul>
            </div>
            </>
            : <p>Loading...</p> }
        </>
    );
};

export default FoodbookDetail;