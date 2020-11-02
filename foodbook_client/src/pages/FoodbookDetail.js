import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import ModalContainer from '../components/Modal/ModalContainer';
import FoodbookModel from '../models/FoodbookModel';
import RecipeModel from '../models/RecipeModel';

import '../App.css';

const FoodbookDetail = (props) => {
    const [recipeFilter, setRecipeFilter] = useState("");
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

    useEffect(() => {
        console.log(recipeFilter);
    }, [recipeFilter]);

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
            <div className="page-header container ">
                <div className="mx-0 row pt-3 align-items-start">
                    {/* Recipe Type Filter */}
                    <div className="col-md-auto mx-auto">
                        <h4 className="pt-2">Recipe Types</h4>
                        <div class="list-group mx-0">
                            <div className="list-group-item list-group-item-action" onClick={(e) => setRecipeFilter("")}>All</div>
                            <div className="list-group-item list-group-item-action" onClick={(e) => setRecipeFilter("appetizer")}>Appetizers</div>
                            <div className="list-group-item list-group-item-action" onClick={(e) => setRecipeFilter("entree")}>Entrées</div>
                            <div className="list-group-item list-group-item-action" onClick={(e) => setRecipeFilter("side")}>Sides</div>
                            <div className="list-group-item list-group-item-action" onClick={(e) => setRecipeFilter("salad")}>Salads</div>
                            <div className="list-group-item list-group-item-action" onClick={(e) => setRecipeFilter("dessert")}>Desserts</div>
                            <div className="list-group-item list-group-item-action" onClick={(e) => setRecipeFilter("drink")}>Drinks</div>
                        </div>
                    </div>

                    {/* Recipes List */}
                    <div className="col">
                        <h2 className="text-left pt-2 font-weight-bold">Recipes</h2>
                        <hr />
                        <ul className="list-group list-group-flush">
                            {foodbook.recipes.length ? foodbook.recipes.map((recipe) => 
                                <li className="list-group-item d-flex" key={recipe._id}>
                                    <Link to={`/recipe/${recipe.edamam_id}`}>
                                        {recipe.name ? recipe.name : "Mysterious Nameless Recipe"}
                                    </Link>
                                    <p className="ml-3 mr-auto text-muted font-italic">{recipe.recipe_type}</p>
                                    <div onClick={() => handleRecipeRemove(recipe._id)} title="Remove this recipe"><i className="fas fa-times-circle"></i></div>
                                </li>
                                ) 
                            : <li className="list-group-item text-muted">This foodbook is looking a little empty. Search for some recipes and add them in!</li>}
                        </ul>
                    </div>
                </div>
            </div>
            </>
            : <p>Loading...</p> }
        </>
    );
};

export default FoodbookDetail;