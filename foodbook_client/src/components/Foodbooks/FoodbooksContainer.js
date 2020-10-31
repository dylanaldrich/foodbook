import React from 'react';
import FoodbookCard from './FoodbookCard';

const FoodbooksContainer = ({foodbooks}) => {
    // This takes the array of todos from the API and converts it into an array of todo objects (components)
    const generateFoodbooks = foodbooks.map((foodbook) => {
        return (
            <FoodbookCard
            key = {foodbook._id}
            foodbook = {foodbook}
            />
        );
    });

    // this renders the list of todo objects
    return (
        <div className="d-flex flex-wrap justify-content-around overflow-auto">
            {generateFoodbooks}
        </div>
    );
};

export default FoodbooksContainer;