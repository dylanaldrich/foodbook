import React from 'react';
import FoodbookCard from './FoodbookCard';

const FoodbooksContainer = ({foodbooks}) => {
    function generateFoodbookCards(foodbooks) {
        return foodbooks.map((foodbook) => {
            return <FoodbookCard key={foodbook._id} foodbook={foodbook} />
        });
    };

    return (
        <div className="d-flex flex-wrap justify-content-around overflow-auto">
            {generateFoodbookCards(foodbooks)}
        </div>
    );
};

export default FoodbooksContainer;