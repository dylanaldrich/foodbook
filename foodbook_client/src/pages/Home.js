import React from 'react';

import '../App.css';

const Home = (props) => {
    return (
        <>
            <div className='jumbotron jumbotron-fluid'>
                <div className='container justify-content-start'>
                    <h1 className='display-4 text-left pt-2'>Welcome to foodbook!</h1>
                    <hr />
                    <h3 className='text-left pb-2'>We're so glad you're here! Ready to get cooking?</h3>
                </div>
            </div>
            <div className='container justify-content-start'>
                <div class='row featurette align-items-center'>
                    <div class='col-md-3'>
                        <svg class='bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto mt-4' width='250' height='250' xmlns='http://www.w3.org/2500/svg' preserveAspectRatio='xMidYMid slice' focusable='false' role='img' aria-label='Placeholder: 250x250'><title>Placeholder</title><rect width='100%' height='100%' fill='#eee'></rect><text x='50%' y='50%' fill='#aaa' dy='.3em'>250x250</text></svg>
                    </div>
                    <div class='col-md-8 text-left'>
                        <h2 class='featurette-heading'>Step 1: Search for a recipe thats interests you.</h2>
                        <p class='lead'>Search by name, ingredient, diet, etc.</p>
                    </div>
                </div>
                <div class='row featurette align-items-center'>
                    <div class='col-md-3'>
                        <svg class='bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto mt-4' width='250' height='250' xmlns='http://www.w3.org/2500/svg' preserveAspectRatio='xMidYMid slice' focusable='false' role='img' aria-label='Placeholder: 250x250'><title>Placeholder</title><rect width='100%' height='100%' fill='#eee'></rect><text x='50%' y='50%' fill='#aaa' dy='.3em'>250x250</text></svg>
                    </div>
                    <div class='col-md-8 text-left'>
                        <h2 class='featurette-heading'>Step 2: Do you want to save a recipe and try it out?</h2>
                        <p class='lead'>Register for an account, and then add it to one of your foodbooks!</p>
                    </div>
                </div>
                <div class='row featurette align-items-center'>
                    <div class='col-md-3'>
                        <svg class='bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto mt-4' width='250' height='250' xmlns='http://www.w3.org/2500/svg' preserveAspectRatio='xMidYMid slice' focusable='false' role='img' aria-label='Placeholder: 250x250'><title>Placeholder</title><rect width='100%' height='100%' fill='#eee'></rect><text x='50%' y='50%' fill='#aaa' dy='.3em'>250x250</text></svg>
                    </div>
                    <div class='col-md-8 text-left'>
                        <h2 class='featurette-heading'>Step 3: Need to create a foodbook?</h2>
                        <p class='lead'>Your foodbooks are where you store recipes. You can create any kind of foodbook you like: Mexican, Weeknight Meals, Vegetarian, Christmas, etc. To create one, just complete the short form on your profile page and you're ready to go!</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;