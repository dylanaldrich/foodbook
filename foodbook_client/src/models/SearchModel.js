const URL = "http://localhost:3001/search";

class SearchModel {
    // search all
    static searchRecipes = (query) => {
        return fetch(`${URL}/${query}`).then(response => response.json());
    };

    // find one?
};

export default SearchModel;