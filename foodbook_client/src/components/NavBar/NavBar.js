import React, {useState, useEffect} from 'react';
import {NavLink} from 'react-router-dom';

import ModalContainer from '../Modal/ModalContainer';
import SearchModel from '../../models/SearchModel';
import ResultCard from '../Results/ResultCard';
import UserModel from '../../models/UserModel';

import { useRecoilState } from "recoil";
import { userState } from "../../recoil/atoms";

import './NavBar.css';

const NavBar = (props) => {
    const [active, setActive] = useState(false);
    const [results, setResults] = useState([]);
    const [query, setQuery]= useState("");
    const [user, setUser] = useRecoilState(userState);

    useEffect(function () {
        if(localStorage.getItem('uid')) {
            UserModel.show().then((response) => {
                setUser(response.data);
            });
        }
    }, []);
    
    useEffect(
        function () {
            if(!query) {
                setResults([]);
            }
            console.log("query", query);
            fetchRecipes(query);
        },
        [query]
    );

    function logout () {
        setUser(null);
        localStorage.clear();
    };
    
    function fetchRecipes (query) {
        console.log("query when search begins", query);
        SearchModel.searchRecipes(query)
            .then((response) => {
                console.log("response after aPI hit:", response);
                setResults(response.searchResults.hits);
            })
            .catch((error) => {
                console.log(error);
                return <p>Sorry, that search didn't work. Please try again.</p>;
            });
    };

    function getRecipeId (string) {
        return string.split("recipe_")[1];
    }

    return (
        <div className={`navbar ${active ? "navbar-active overflow-auto" : ""}`}>
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
                            // onBlur={(e) => {
                                // setActive(false);
                                // setResults([]);
                            // }}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </form>
                    <ul className='navbar-nav ml-auto'>
                        <li className='nav-item active'>
                        <NavLink className='nav-link' to='/about'>About<span className='sr-only'>(current)</span></NavLink>
                        </li>
                        {/* TODO once user auth is set up, add conditional logic here to display Profile and Logout links */}
                        {/* Here is where the modal containers will go */}
                        {user ? (
                            <>
                                <li className='nav-item active'>
                                    <NavLink className='nav-link' to={`/user/${user._id}`}>My Profile</NavLink>
                                </li>
                                <li className='nav-item active nav-link' onClick={logout}>
                                    Logout
                                </li>
                            </>
                        ) : (
                            <>
                                <li className='nav-item'>
                                    <ModalContainer triggerText={"Login"} />
                                </li>
                                <li className='nav-item'>
                                    <ModalContainer triggerText={"Sign Up"} />
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </nav>
            <div className="d-flex flex-wrap justify-content-around overflow-auto">
                {results ? results.map((result) => <ResultCard setActive={setActive} setResults={setResults} title={result.recipe.label} source={result.recipe.source} imageUrl={result.recipe.image} key={getRecipeId(result.recipe.uri)} edamam_id={getRecipeId(result.recipe.uri)} />) : null}
            </div>
            {active ? (<button onClick={(e) => {
                setActive(false);
                setResults([]);
            }} className="btn btn-lg btn-danger center" id="close-search">Close Search</button>) : null}
        </div>
    );
};

export default NavBar;