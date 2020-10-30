import React, {useState} from 'react';
import AuthModel from '../../models/AuthModel';

export const LoginForm = ({closeModal}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        AuthModel.login({email, password}).then((response) => {
        console.log("Register response:", response);
        if(response.status === 201) { // status code 201 means OK, successful
            console.log("Login success");
            closeModal();
        } else {
            setError(response.message);
        }
        });
    };
    
    return (
        <form onSubmit={handleSubmit}>
            {error && <p style={{ color: "red" }}>{error}</p>} 
            <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    name='email'
                    placeholder="name@example.com"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                type="password"
                className="form-control"
                id="password"
                name='password'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                />
            </div>
            <div className="form-group">
                <button className="form-control btn btn-primary" type="submit">
                    Login
                </button>
            </div>
        </form>
    );
};

export default LoginForm;


// Adapted from: https://blog.bitsrc.io/build-a-full-featured-modal-dialog-form-with-react-651dcef6c571