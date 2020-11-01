import React, {useState, useEffect} from 'react';
import { useRecoilState } from "recoil";


import ModalContainer from '../components/Modal/ModalContainer';
import FoodbooksContainer from '../components/Foodbooks/FoodbooksContainer';
// import Link from 'react-router-dom';
import UserModel from '../models/UserModel';
import FoodbookModel from '../models/FoodbookModel';
import { userState } from "../recoil/atoms";

import '../App.css';

const Profile = (props) => {
    const [user, setUser] = useRecoilState(userState);
    const [error, setError] = useState('');
    const [foodbooks, setFoodbooks] = useState([]);

    useEffect(function(){
            if(props.match.params.id) {
                const userId = props.match.params.id;
                findUser(userId);
            }
        },
        [props.match.params.id]
    );

    function findUser (userId) {
        UserModel.show(userId)
        .then((response) => {
            setUser(response.data);
            setFoodbooks(response.foodbooks);
        })
        .catch((error) => {
            setError(error.message);
        });
    };

    // function findFoodbooks (userId) {
    //     FoodbookModel.index(userId)
    //     .then((response) => {
    //         console.log("response from foodbooks index route: ", response);
    //         // setFoodbooks(response.data);
    //     })
    //     .catch((error) => {
    //         setError(error.message);
    //     });
    // }

    console.log('foodbooks: ', foodbooks);

    if (error) return (
        <div className="container text-white rounded bg-dark top-banner">
            <div className="col-md-6 px-0 d-flex">
                <h3 className="display-4 mr-auto">{error}</h3>
            </div>
        </div>
    ); 

    return (
        <>
            {user ? 
                <>
                    {/* Banner */}
                    <div className="container text-white rounded bg-dark top-banner">
                        <div className="col-md-6 px-0 d-flex">
                            <h1 className="display-4 mr-auto">{user.username}'s Profile</h1>
                        </div>
                        {/* this button will become a modal trigger for profile edit form */}
                        <ModalContainer triggerText={"Edit Profile"} />
                    </div>
                    <div className="page-header container">
                        <h2 className="text-left pt-2 font-weight-bold">My foodbooks <button className=''><i className="fas fa-plus-circle d-inline-block"></i></button></h2>
                        <hr />
                    </div>
                    <div className="container">
                        {user.foodbooks.length ?
                        <>
                            <p>Foodbooks go here</p>
                            <FoodbooksContainer foodbooks={foodbooks} />
                        </>
                        : <p>You haven't created any foodbooks yet!</p> }
                    </div>
                </> 
            : <p>Loading...</p>} 
        </>
    );
};

export default Profile;