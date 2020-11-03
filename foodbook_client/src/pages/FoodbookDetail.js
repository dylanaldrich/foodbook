import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import ModalContainer from '../components/Modal/ModalContainer';
import FoodbookModel from '../models/FoodbookModel';
import RecipeModel from '../models/RecipeModel';

import '../App.css';

const FoodbookDetail = (props) => {
    const [recipeFilter, setRecipeFilter] = useState("");
    const [foodbook, setFoodbook] = useState({});
    const [recipes, setRecipes] = useState([]);
    const [error, setError] = useState('');

    // watches for change of url to rerender a new foodbook
    useEffect(function(){
            if(props.match.params.id) {
                const foodbookId = props.match.params.id;
                findFoodbook(foodbookId);
            }
        },
        [props.match.params.id]
    );

    // watches for change in recipe filter to invoke recipe filter method
    useEffect(async () => {
        console.log("filter by: ", recipeFilter);
        await setRecipes(foodbook.recipes);
        console.log("recipes when useeffect hits:", recipes);
        if(recipeFilter !== "") return handleRecipeFilter();
    }, [recipeFilter]);

    function findFoodbook (foodbookId) {
        FoodbookModel.show(foodbookId)
        .then(async (response) => {
            const foundFoodbook = response.foodbook;
            await setFoodbook(foundFoodbook);
            const foundRecipes = response.foodbook.recipes;
            await setRecipes(foundRecipes);
        })
        .catch((error) => {
            setError(error.message);
        });
    };

    function handleRecipeRemove(recipeId) {
        RecipeModel.remove(recipeId, foodbook._id)
            .catch((error) => console.log("Recipe remove error: ", error));
    };

    async function handleRecipeFilter() {
        console.log("recipes before filter:", recipes);
        const filteredRecipes = recipes.filter(recipe => recipe.recipe_type === recipeFilter);
        await setRecipes(filteredRecipes);
        console.log("recipes after filter:", recipes);
    }

    return (
        <>
        {foodbook.recipes ? 
            <>
            {/* Banner */}
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div className="container text-white rounded bg-dark d-flex align-items-center top-banner">
                <div className="col-md-6 px-0">
                    <h1 className="display-4 text-left">{foodbook.name}</h1>
                </div>
                <div className="ml-auto">
                    <ModalContainer triggerText={"Edit foodbook"} foodbookId={foodbook._id} />
                </div>
            </div>
            {/* Banner End */}
            <div className="page-header container ">
                <div className="mx-0 row pt-3 align-items-start">
                    {/* Recipe Type Filter */}
                    <div className="col-md-auto mx-auto">
                        <h4 className="pt-2">Recipe Types</h4>
                        <div class="list-group mx-0">
                            <div className="list-group-item list-group-item-action" onClick={() => {
                                setRecipeFilter("");
                                setRecipes(foodbook.recipes);
                                }}>All</div>
                            <div className="list-group-item list-group-item-action" onClick={() => setRecipeFilter("appetizer")}>Appetizers</div>
                            <div className="list-group-item list-group-item-action" onClick={() => setRecipeFilter("entree")}>Entrées</div>
                            <div className="list-group-item list-group-item-action" onClick={() => setRecipeFilter("side")}>Sides</div>
                            <div className="list-group-item list-group-item-action" onClick={() => setRecipeFilter("salad")}>Salads</div>
                            <div className="list-group-item list-group-item-action" onClick={() => setRecipeFilter("dessert")}>Desserts</div>
                            <div className="list-group-item list-group-item-action" onClick={() => setRecipeFilter("drink")}>Drinks</div>
                        </div>
                    </div>

                    {/* Recipes List */}
                    <div className="col">
                        <h2 className="text-left pt-2 font-weight-bold">Recipes</h2>
                        <hr />
                        <ul className="list-group list-group-flush">
                            {recipes ? recipes.map((recipe) => 
                                <li className="list-group-item d-flex" key={recipe._id}>
                                    <Link to={`/recipe/${recipe.edamam_id}`}>
                                        {recipe.name ? recipe.name : "Mysterious Nameless Recipe"}
                                    </Link>
                                    <p className="ml-3 mr-auto text-muted font-italic">{recipe.recipe_type}</p>
                                    <div onClick={() => handleRecipeRemove(recipe._id)} title="Remove this recipe"><i className="fas fa-times-circle"></i></div>
                                </li>
                                )
                            : <li className="list-group-item text-muted">Nothing to see here! Search for some recipes and add them in!</li>}
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