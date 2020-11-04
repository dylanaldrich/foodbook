import React, {useState, useEffect} from 'react';
import {NavLink, useHistory} from 'react-router-dom';

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
    let history = useHistory();

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
        history.push("/");
    };
    
    function fetchRecipes (query) {
        SearchModel.searchRecipes(query)
            .then((response) => {
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
            <nav class='navbar navbar-expand-md navbar-dark fixed-top bg-dark d-flex'>
            <NavLink to='/'><img className="mr-1" src="https://i.ibb.co/YP9SC9N/foodbook-favicon.png" alt="foodbook-logo" height="55"/></NavLink>
                <NavLink className='navbar-brand navbar__titles' to='/'>foodbook</NavLink>
                <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarCollapse' aria-controls='navbarCollapse' aria-expanded='false' aria-label='Toggle navigation'>
                <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='navbarCollapse'>
                    {active ? (<button onClick={(e) => {
                        setActive(false);
                        setQuery("");
                        setResults([]);
                    }} className="btn btn-md btn-info mx-2"><i class="fas fa-times"></i></button>) : null}
                    <form className='form-inline mt-2 mt-md-0 p2 align-item-start'>
                        <input 
                            className='form-control mr-sm-2' 
                            type='text' 
                            placeholder='Search' 
                            aria-label='Search'
                            onFocus={(e) => setActive(true)}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </form>
                    <ul className='navbar-nav ml-auto'>
                        <li className='nav-item'>
                        <NavLink className='nav-link' to='/about'>About</NavLink>
                        </li>
                        {user ? (
                            <>
                                <li className='nav-item'>
                                    <NavLink className='nav-link' id="profile-link" to={`/profile/${user._id}`}>My Profile</NavLink>
                                </li>
                                <li className='nav-item nav-link' onClick={logout}>
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
            <div className="d-flex container flex-wrap justify-content-around overflow-auto" id="search-results">
                {results ? results.map((result) => <ResultCard setActive={setActive} setResults={setResults} title={result.recipe.label} source={result.recipe.source} imageUrl={result.recipe.image} key={getRecipeId(result.recipe.uri)} edamam_id={getRecipeId(result.recipe.uri)} />) : null}
            </div>
        </div>
    );
};

export default NavBar;