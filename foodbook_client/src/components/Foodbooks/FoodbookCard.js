import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

import RecipeModel from '../../models/RecipeModel';

const FoodbookCard = ({foodbook}) => {
    const [,setState] = useState();
    useEffect(() => {
        console.log("Foodbook after change:", foodbook);
        setState({});
    }, [foodbook]);
    // TODO figure out how to make the foodbook card rerender when a recipe is removed
    
    function handleRecipeRemove(recipeId) {
        RecipeModel.remove(recipeId, foodbook._id)
            .catch((error) => console.log("recipe remove error", error));
    }; 
    
    return(
        <>
        <div className="card" style={{width: "18rem"}}>
            <div className="card-body">
                <h5 className="card-title">{foodbook.name}</h5>
                <h6>Recipes:</h6>
            </div>
            <ul className="list-group list-group-flush">
                {foodbook.recipes.length ? foodbook.recipes.map((recipe) => 
                    <li className="list-group-item d-flex" key={recipe._id}>
                        <Link to={`/recipe/${recipe.edamam_id}`}>
                            {recipe.name ? recipe.name : "No name recipe"}
                        </Link>
                        <div onClick={() => handleRecipeRemove(recipe._id)} title="Remove this recipe"><i className="fas fa-times-circle"></i></div>
                    </li>
                    ) 
                : null}
            </ul>
        </div>
        </>
    );
};

export default FoodbookCard;