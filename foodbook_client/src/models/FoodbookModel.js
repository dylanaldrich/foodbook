const URL = "http://localhost:3001/foodbooks";

class FoodbookModel {
    // show
    static show = (foodbookId) => {
        return fetch(`${URL}/${foodbookId}`).then(response => response.json());
    };


    // create
    static create = (foodbookData) => {
        return fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(foodbookData)
        })
        .then(response => response.json());
    };


    // update
    static update = (foodbookId, foodbookData) => {
        return fetch(`${URL}/${foodbookId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(foodbookData)
        })
        .then(response => response.json());
    };


    // delete
    static delete = (foodbookId) => {
        return fetch(`${URL}/${foodbookId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json());
    };
};

export default FoodbookModel;