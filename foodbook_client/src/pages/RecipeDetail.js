import React, {useState, useEffect} from 'react';
import ModalContainer from '../components/Modal/ModalContainer';
import SearchModel from '../models/SearchModel';
import UserModel from '../models/UserModel';

// import { useRecoilState } from "recoil";
// import { userState } from "../recoil/atoms";

import '../App.css';

const RecipeDetail = (props) => {
    const [recipe, setRecipe] = useState({});
    const [isSaved, setIsSaved] = useState(false);
    // const [user, setUser] = useRecoilState(userState);
    const [userRecipe, setUserRecipe] = useState({});
    const [error, setError] = useState('');

    useEffect(function(){
            if(!userRecipe.name) {
                determineIfSaved();
            }
        },
        [userRecipe]);


    useEffect(function(){
            if(props.match.params.id) {
                const edamam_id = props.match.params.id;
                findOneRecipe(edamam_id);
            }
        },
        [props.match.params.id]
    );

    useEffect(function(){
        setUserRecipe({});
    },
    [props.match.params.id]
);

    function determineIfSaved() {
        if(localStorage.getItem('uid')) {
            UserModel.show().then((response) => {
                response.recipes.forEach(index => {
                    if (index.edamam_id === props.match.params.id) {
                        setIsSaved(true);
                        return setUserRecipe(index);
                    } 
                })
            });
        }
    };

    function findOneRecipe (recipe_id) {
        SearchModel.searchOneRecipe(recipe_id)
        .then((response) => {
            const foundRecipe = response.searchResults.hits[0].recipe;
            setRecipe(foundRecipe);
        })
        .catch((error) => {
            setError(error.message);
        });
    };      

    /* Adapted from: https://www.w3resource.com/javascript-exercises/javascript-date-exercise-13.php */
    function timeConvert(n) {
        let hours = (n / 60);
        let rhours = Math.floor(hours);
        let minutes = (hours - rhours) * 60;
        let rminutes = Math.round(minutes);

        if(!n) return "N/A";
        if(!rminutes) return rhours + "h";
        if(rhours > 0) return rhours + "h " + rminutes + "m";
        return rminutes + "mins";
    }

    function perServing(total) {
        return Math.floor(total / recipe.yield);
    }

    return (
        <>
        {recipe.image ? 
            <>
            {console.log("userRecipe", userRecipe)}
            {/* Banner */}
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div className="container d-flex text-white rounded bg-dark top-banner">
                <img className="card-img-left flex-auto d-none d-md-block"  src={recipe.image} alt={recipe.label} />
                <div className="col-md-6 px-0 d-flex">
                    <h1 className="display-4 mr-auto">{recipe.label}</h1>
                </div>
                {/* Add or Edit button */}
                {isSaved && userRecipe.name ? <ModalContainer 
                    triggerText={"Edit Recipe"} 
                    recipeType={userRecipe.recipe_type} 
                    savedFoodbooks={userRecipe.foodbooks} 
                    recipeName={userRecipe.name} 
                    edamam_id={userRecipe.edamam_id} 
                    findOneRecipe={findOneRecipe} 
                    /> 
                    : <ModalContainer 
                    triggerText={"Save Recipe"} 
                    recipeName={recipe.label} 
                    edamam_id={props.match.params.id} 
                    findOneRecipe={findOneRecipe} 
                    /> 
                }
            </div>
            {/* Banner End */}

            {/* At a Glance Table */}
            <div className="container d-flex">
                <table class="table col-4 table-striped border border-dark">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col mx-auto text-center" colSpan="2">At a Glance</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">Source</th>
                            <td>
                                <a href={recipe.url} target="_blank" rel="noreferrer">{recipe.source}</a>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Servings</th>
                            <td>{recipe.yield}</td>
                        </tr>
                        <tr>
                            <th scope="row">Time</th>
                            <td>{timeConvert(recipe.totalTime)}</td>
                        </tr>
                        <tr className="thead-dark">
                            <th scope="col mx-auto text-center" colSpan="2">Nutrition Facts <br/><small>(per serving)</small></th>
                        </tr>
                        <tr>
                            <th scope="row flex-wrap">Calories</th>
                            <td>{perServing(recipe.calories)}</td>
                        </tr>
                        <tr>
                            <th scope="row">Protein</th>
                            <td>{perServing(recipe.totalNutrients.PROCNT.quantity)}g</td> 
                        </tr>
                        <tr>
                            <th scope="row">Fat</th>
                            <td>{perServing(recipe.totalNutrients.FAT.quantity)}g</td>
                        </tr>
                        <tr>
                            <th scope="row">Carbs</th>
                            <td>{perServing(recipe.totalNutrients.CHOCDF.quantity)}g</td>
                        </tr>
                        <tr>
                            <th scope="row">Sugar</th>
                            <td>{perServing(recipe.totalNutrients.SUGAR.quantity)}g</td>
                        </tr>
                    </tbody>
                </table>
                <div className="col-6">
                    {/* A button to go to the recipe's source */}
                    <a href={recipe.url} className="btn btn-lg btn-danger center" rel="noreferrer">See Full Directions</a>

                    {/* A list of ingredients */}
                    <h3>Ingredients</h3>
                    <ul className="list-group list-group-flush">
                        {recipe.ingredientLines.map((ingredient) => <li className="list-group-item">{ingredient}</li>)}
                    </ul>
                </div>
            </div>
            </>
            : <h2 className="mt-5">Loading...</h2> }
        </>
    );
};

export default RecipeDetail;