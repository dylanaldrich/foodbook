import React from 'react';

import '../App.css';

const Home = (props) => {
    return (
        <>
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="display-4">Welcome to foodbook!</h1>
                    <hr className="my-4" />
                    <p className="lead">Ready to get cooking?</p>
                </div>
            </div>
            <hr class="featurette-divider" />
            <div class="row featurette">
            <div class="col-md-5">
                    <svg class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="200" height="200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 200x200"><title>Placeholder</title><rect width="100%" height="100%" fill="#eee"></rect><text x="50%" y="50%" fill="#aaa" dy=".3em">200x200</text></svg>
                </div>
                <div class="col-md-7">
                    <h2 class="featurette-heading">Step 1: Search for a recipe thats interests you.</h2>
                    <p class="lead">Search by name, ingredient, diet, etc.</p>
                </div>
            </div>
            <hr class="featurette-divider" />
            <div class="row featurette">
            <div class="col-md-5">
                    <svg class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="200" height="200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 200x200"><title>Placeholder</title><rect width="100%" height="100%" fill="#eee"></rect><text x="50%" y="50%" fill="#aaa" dy=".3em">200x200</text></svg>
                </div>
                <div class="col-md-7">
                    <h2 class="featurette-heading">Step 2: Do you want to save a recipe and try it out?</h2>
                    <p class="lead">Register for an account, and then add it to one of your foodbooks!</p>
                </div>
            </div>
            <hr class="featurette-divider" />
            <div class="row featurette">
                <div class="col-md-5">
                    <svg class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="200" height="200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 200x200"><title>Placeholder</title><rect width="100%" height="100%" fill="#eee"></rect><text x="50%" y="50%" fill="#aaa" dy=".3em">200x200</text></svg>
                </div>
                <div class="col-md-7">
                    <h2 class="featurette-heading">Step 3: Need to create a foodbook?</h2>
                    <p class="lead">Your foodbooks are where you store recipes. You can create any kind of foodbook you like: Mexican, Weeknight Meals, Vegetarian, Christmas, etc. To create one, just complete the short form on your profile page and you're ready to go!</p>
                </div>
            </div>
        </>
    );
};

export default Home;