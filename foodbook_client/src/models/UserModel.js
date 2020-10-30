const URL = "http://localhost:3001/user";

class UserModel {
    // show
    static show = (userId) => {
        return fetch(`${URL}/${userId}`).then(response => response.json());
    };


    // create
    static create = (userData) => {
        return fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        })
        .then(response => response.json());
    };


    // update
    static update = (userId, userData) => {
        return fetch(`${URL}/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        })
        .then(response => response.json());
    };


    // delete
    static delete = (userId) => {
        return fetch(`${URL}/${userId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json());
    };
};

export default UserModel;