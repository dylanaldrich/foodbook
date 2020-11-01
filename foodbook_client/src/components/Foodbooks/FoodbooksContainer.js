import React from 'react';
import FoodbookCard from './FoodbookCard';

const FoodbooksContainer = ({foodbooks}) => {
    console.log("hits here");
    function generateFoodbookCards(foodbooks) {
        return foodbooks.map((foodbook) => {
            console.log("hits down here");
            return <FoodbookCard key={foodbook._id} foodbook={foodbook} />
        });
    };

    return (
        <div className="d-flex flex-wrap justify-content-around overflow-auto">
            {generateFoodbookCards(foodbooks)}
            Hello
        </div>
    );
};

export default FoodbooksContainer;