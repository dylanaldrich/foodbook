import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';

import FoodbookModel from '../../models/FoodbookModel';

const FoodbookCard = ({foodbook}) => {
    const [recipes, setRecipes] = useState([]);
    const [error, setError] = useState('');
    console.log("hits foodbook card");
    console.log("foodbook for the card:", foodbook);
    
    function populateRecipes () {
        FoodbookModel.show(foodbook._id)
            .then((response) => {
                console.log("response.recipes from user show route: ", response.recipes);
                // setRecipes(response.recipes);
            })
            .catch((error) => {
                setError(error.message);
            });
    }
    
    return(
        <>
        {console.log("hits card return")}
        <div className="card" style={{width: "18rem"}}>
            <div className="card-body">
                <h5 className="card-title">Hello</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">Cras justo odio</li>
                <li className="list-group-item">Dapibus ac facilisis in</li>
                <li className="list-group-item">Vestibulum at eros</li>
            </ul>
            <div className="card-body">
                <a href="#" className="card-link">Card link</a>
                <a href="#" className="card-link">Another link</a>
            </div>
        </div>
        </>
    );
};

export default FoodbookCard;