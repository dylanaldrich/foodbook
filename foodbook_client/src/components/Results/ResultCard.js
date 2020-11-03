import React from 'react';
import {NavLink} from 'react-router-dom';

import './ResultCard.css';

const ResultCard = ({title, source, imageUrl, edamam_id, setActive, setResults}) => {
    return(
        <div className="col-md-4">
            <div className="card mb-4 box-shadow">
                <img src={imageUrl} alt={title} className="card-img-top"/>
                <div className="card-body">
                    <p className="card-text">{title}</p>
                    <p className="card-text">{source}</p>
                    <div className="btn-group" 
                    onClick={() => {
                        setActive(false);
                        setResults([]);
                    }}>
                        <NavLink to={`/recipe/${edamam_id}`} className="btn btn-dark">View</NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResultCard;