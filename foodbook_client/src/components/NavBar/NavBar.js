import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';

import ModalContainer from '../Modal/ModalContainer';
import SearchModel from '../../models/SearchModel';

import './NavBar.css';

const NavBar = (props) => {
    const [active, setActive] = useState(false);
    const [results, setResults] = useState([]);

    async function handleChange (event) {
        const foundRecipes = await SearchModel.searchRecipes(event.target.value)
            .then((response) => {
                setResults(response.searchResults.hits);
            })
            .catch((error) => {
                console.log(error);
                return <p>Sorry, that search didn't work. Please try again.</p>;
            });
    };

    return (
        <div className={`navbar ${active ? "navbar-active" : ""}`}>
            <nav class='navbar navbar-expand-md navbar-dark fixed-top bg-dark navbar__titles'>
                <NavLink className='navbar-brand' to='/'>foodbook</NavLink>
                <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarCollapse' aria-controls='navbarCollapse' aria-expanded='false' aria-label='Toggle navigation'>
                <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='navbarCollapse'>
                    <form className='form-inline mt-2 mt-md-0'>
                        <input 
                            className='form-control mr-sm-2' 
                            type='text' 
                            placeholder='Search' 
                            aria-label='Search'
                            onFocus={(e) => setActive(true)}
                            onBlur={(e) => {
                                setActive(false);
                                setResults([]);
                            }}
                            onChange={handleChange}
                        />
                    </form>
                    <ul className='navbar-nav ml-auto'>
                        <li className='nav-item active'>
                        <NavLink className='nav-link' to='/about'>About<span className='sr-only'>(current)</span></NavLink>
                        </li>
                        {/* TODO once user auth is set up, add conditional logic here to display Profile and Logout links */}
                        {/* Here is where the modal containers will go */}
                        <li className='nav-item'>
                            <ModalContainer triggerText={"Login"} />
                        </li>
                        <li className='nav-item'>
                            <ModalContainer triggerText={"Sign Up"} />
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="navbar__item-list">
                {results ? results.map((result) => <h1>{/* {result.name} */}Result</h1>) : null}
            </div>
        </div>
    );
};

export default NavBar;