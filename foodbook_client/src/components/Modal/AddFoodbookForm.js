import React, {useState, useEffect} from 'react';
import FoodbookModel from '../../models/FoodbookModel';
import UserModel from '../../models/UserModel';

import { useRecoilState } from "recoil";
import { userState } from "../../recoil/atoms";


export const AddFoodbookForm = ({closeModal, findProfile}) => {
    const [name, setName] = useState("");
    const [error, setError] = useState('');
    const [user, setUser] = useRecoilState(userState);

    useEffect(function () {
        if(localStorage.getItem('uid')) {
            UserModel.show().then((response) => {
                console.log(response.data);
                setUser(response.data);
            });
        }
    }, []);
    
    function handleSubmit(event) {
        event.preventDefault();
        FoodbookModel.create({name}).then((response) => {
            if(response.status === 201) {
                findProfile(user._id);
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
                    Create foodbook
                </button>
            </div>
        </form>
    );
};

export default AddFoodbookForm;


// Adapted from: https://blog.bitsrc.io/build-a-full-featured-modal-dialog-form-with-react-651dcef6c571