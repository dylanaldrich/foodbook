import React from 'react';
import {NavLink} from 'react-router-dom';

import ModalContainer from '../Modal/ModalContainer';
import SearchModel from '../../models/SearchModel';
import ResultCard from '../Results/ResultCard';

import './NavBar.css';

class NavBar extends React.Component {
    state = {
        query: '',
        active: false,
        results: [],
    }

    fetchRecipes = (query) => {
        SearchModel.searchRecipes(query)
            .then((response) => {
                this.setState({
                    results: response.searchResults.hits
                });
            })
            .catch((error) => {
                console.log(error);
                return <p>Sorry, that search didn't work. Please try again.</p>;
            });
    };

    shouldComponentUpdate = (nextProps, nextState) => {
        if(this.state.results.length === 0 && this.state.query === nextState.query) {
            return false;
        }
        return true;
    };

    componentDidUpdate = (prevProps, prevState) => {
        if(prevState.query !== this.state.query) {
            this.fetchRecipes(this.state.query);
        }
    };

    handleChange = (event) => {
        this.setState({
            query: event.target.value
        });
    };

    render() {
        return (
            <div className={`navbar ${this.state.active ? "navbar-active" : ""}`}>
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
                                onFocus={(e) => {
                                    this.setState({active: true});
                                }}
                                onBlur={(e) => {
                                    this.setState({active: false});
                                    this.setState({results: []});
                                    this.setState({query: ''});
                                }}
                                onChange={this.handleChange}
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
                <div className="d-flex flex-wrap justify-content-around">
                    {this.state.results ? this.state.results.map((result) => <ResultCard recipe={result} title={result.recipe.label} source={result.recipe.source} imageUrl={result.recipe.image} key={result.recipe.calories} />) : null}
                </div>
            </div>
        );
    };
}

export default NavBar;