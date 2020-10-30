const URL = "http://localhost:3001/recipes";

class RecipeModel {
    // show
    // TODO refactor this once I figure out how to save recipes from the API
    static show = (recipeId) => {
        return fetch(`${URL}/${recipeId}`).then(response => response.json());
    };


    // create
    static create = (recipeData) => {
        return fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(recipeData)
        })
        .then(response => response.json());
    };


    // update
    static update = (recipeId, recipeData) => {
        return fetch(`${URL}/${recipeId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(recipeData)
        })
        .then(response => response.json());
    };


    // delete (this will ONLY get hit on a recipe edit form)
    static delete = (recipeId) => {
        return fetch(`${URL}/${recipeId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json());
    };

    // remove
    static remove = (recipeId, foodbookId) => {
        return fetch(`${URL}/${recipeId}/${foodbookId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json());
    };
};

export default RecipeModel;