import React, {useState, useEffect} from 'react';
import ModalContainer from '../components/Modal/ModalContainer';
import FoodbookModel from '../models/FoodbookModel';

import '../App.css';

const FoodbookDetail = (props) => {
    const [foodbook, setFoodbook] = useState({});
    const [error, setError] = useState('');

    useEffect(function(){
            if(props.match.params.id) {
                const foodbookId = props.match.params.id;
                findFoodbook(foodbookId);
            }
        },
        [props.match.params.id]
    );

    function findFoodbook (foodbookId) {
        FoodbookModel.show(foodbookId)
        .then((response) => {
            const foundFoodbook = response.foodbook;
            setFoodbook(foundFoodbook);
        })
        .catch((error) => {
            setError(error.message);
        });
    };


    return (
        <>
        {foodbook ? 
            <>
            {/* Banner */}
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div className="container text-white rounded bg-dark top-banner">
                        <div className="col-md-6 px-0 d-flex">
                            <h1 className="display-4 mr-auto">{foodbook.name}</h1>
                        </div>
                        {/* this button will become a modal trigger for profile edit form */}
                        <ModalContainer triggerText={"Edit foodbook"} foodbookId={foodbook._id} />
                    </div>
            {/* Banner End */}
            <div className="page-header container">
                <h2 className="text-left pt-2 font-weight-bold">Recipes</h2>
                <hr />
            </div>

            {/* Recipes List */}
            <div className="container d-flex">
                Recipes go here
            </div>
            </>
            : <p>Loading...</p> }
        </>
    );
};

export default FoodbookDetail;