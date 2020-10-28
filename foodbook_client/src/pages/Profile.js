import React from 'react';
// import Link from 'react-router-dom';

import '../App.css';

class Profile extends React.Component {
    render() {
        return (
            <>
            {/* Banner */}
            <div className="container text-white rounded bg-dark top-banner">
                <div className="col-md-6 px-0 d-flex">
                    <h1 className="display-4 mr-auto">User's Profile</h1>
                </div>
                {/* this button will become a modal trigger for profile edit form */}
                <button type="button" className="btn btn-light ml-auto float-right banner-btn">Edit</button>
            </div>
            <div className="page-header container">
                <h2 className="text-left pt-2 font-weight-bold">My foodbooks <button className=''><i className="fas fa-plus-circle d-inline-block"></i></button></h2>
                
                <hr />
            </div>
            {/* Foodbooks container will go here */}
            </>
        )
    };
};

export default Profile;