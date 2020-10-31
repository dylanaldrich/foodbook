import React, {useState, useEffect} from 'react';
import ModalContainer from '../components/Modal/ModalContainer';
import SearchModel from '../models/SearchModel';

import '../App.css';

const RecipeDetail = (props) => {
    const [recipe, setRecipe] = useState({});
    const [error, setError] = useState('');
    

    useEffect(
        function () {
            findRecipe(props.match.params.id);
        },
        [props.match.params.id]
    );

    function findRecipe (recipe_id) {
        SearchModel.findRecipe(recipe_id)
        .then((response) => {
            const foundRecipe = response.searchResults.hits[0].recipe;
            console.log("Found Recipe: ", foundRecipe);
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

        if(rhours) return rhours + "h " + rminutes + "m";
        return rminutes + "mins";
    }

    function perServing(total) {
        return Math.floor(total / recipe.yield);
    }

    return (
        <>
            {/* Banner */}
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div className="container text-white rounded bg-dark top-banner">
            {/* <img className="card-img-left flex-auto d-none d-md-block"  alt= src=  style="width: 200px; height: 250px;"/> */}
            {/* <img src={recipe.image} alt={recipe.label} /> */}
                <div className="col-md-6 px-0 d-flex">
                    <h1 className="display-4">{recipe.label}</h1>
                </div>
                <ModalContainer triggerText={"Save Recipe"} />
            </div>
            {/* Here is where the table will go with the information about the recipe */}
            <div className="container d-flex">
                <table class="table col-4 table-striped border border-dark">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col mx-auto text-center" colspan="2">At a Glance</th>
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
                            <th scope="col mx-auto text-center" colspan="2">Nutrition Facts <small>(per serving)</small></th>
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
    );
};

export default RecipeDetail;