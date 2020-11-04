import React, {useState, useEffect} from 'react';
import { useRecoilState } from "recoil";


import ModalContainer from '../components/Modal/ModalContainer';
import FoodbooksContainer from '../components/Foodbooks/FoodbooksContainer';
import UserModel from '../models/UserModel';
import { userState } from "../recoil/atoms";

import '../App.css';

const Profile = (props) => {
    const [user, setUser] = useRecoilState(userState);
    const [error, setError] = useState('');
    const [foodbooks, setFoodbooks] = useState([]);

    useEffect(function(){
            if(props.match.params.id) {
                const userId = props.match.params.id;
                findProfile(userId);
            }
        },
        [props.match.params.id]
    );

    useEffect(function() {
        if(foodbooks) {
            const userId = props.match.params.id;
            findProfile(userId);
        }
    }, [foodbooks])

    function findProfile (userId) {
        UserModel.show(userId)
        .then((response) => {
            setUser(response.data);
            setFoodbooks(response.foodbooks);
        })
        .catch((error) => {
            setError(error.message);
        });
    };

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
                    <div className="container text-white rounded bg-dark d-flex align-items-center top-banner">
                        <div className="col-md-6 px-0">
                            <h1 className="display-4 text-left">{user.username}'s Profile</h1>
                        </div>
                        {/* Edit Profile Button */}
                        <div className="ml-auto">
                            <ModalContainer 
                                triggerText={"Edit Profile"}
                                findProfile={findProfile} profileId={props.match.params.id}
                            />
                        </div>
                    </div>
                    <div className="page-header container d-flex align-items-center">
                        <h2 className="text-left pt-2 font-weight-bold">My foodbooks <ModalContainer triggerText={"Create a foodbook"} findProfile={findProfile} profileId={props.match.params.id} /></h2>
                    </div>
                    <div className="container">
                        <hr />
                        {user.foodbooks.length ?
                        <FoodbooksContainer foodbooks={foodbooks} findProfile={findProfile} profileId={props.match.params.id} />
                        : <p>You haven't created any foodbooks yet!</p> }
                    </div>
                </> 
            : <p>Loading...</p>} 
        </>
    );
};

export default Profile;