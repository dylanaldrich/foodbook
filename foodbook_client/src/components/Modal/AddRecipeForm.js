import React, {useState} from 'react';
import AuthModel from '../../models/AuthModel';

export const AddRecipeForm = ({closeModal}) => {
    const [name, setName] = useState("");
    const [error, setError] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        AuthModel.login({name, password}).then((response) => {
        console.log("Create response:", response);
        if(response.status === 201) { // status code 201 means OK, successful
            console.log("foodbook created successfully");
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
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    name='name'
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
            </div>
            <div className="form-group">
                <button className="form-control btn btn-primary" type="submit">
                    Save Recipe
                </button>
            </div>
        </form>
    );
};

export default AddRecipeForm;


// Adapted from: https://blog.bitsrc.io/build-a-full-featured-modal-dialog-form-with-react-651dcef6c571