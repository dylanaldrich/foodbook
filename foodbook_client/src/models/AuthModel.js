const URL = "http://localhost:3001/auth";

class AuthModel {
    static register = (userData) => {
        return fetch(`${URL}/register`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        }).then((response) => response.json());
    };

    static login = (userData) => {
        return fetch(`${URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        }).then((response) => response.json());
    };
};

export default AuthModel;