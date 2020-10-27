import React from 'react';
import {NavLink} from 'react-router-dom';

const NavBar = (props) => {
    return (
        <header>
            <nav class='navbar navbar-expand-md navbar-dark fixed-top bg-dark'>
                <NavLink className='navbar-brand' to='/'>foodbook</NavLink>
                <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarCollapse' aria-controls='navbarCollapse' aria-expanded='false' aria-label='Toggle navigation'>
                <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='navbarCollapse'>
                    {/* Search container component will go here */}
                    <form className='form-inline mt-2 mt-md-0'>
                        <input className='form-control mr-sm-2' type='text' placeholder='Search' aria-label='Search' />
                        <button className='btn btn-outline-success my-2 my-sm-0' type='submit'>Search</button>
                    </form>
                    <ul className='navbar-nav ml-auto'>
                        <li className='nav-item active'>
                        <NavLink className='nav-link' to='/about'>About<span className='sr-only'>(current)</span></NavLink>
                        </li>
                        {/* TODO once user auth is set up, add conditional logic here to display Profile and Logout links */}
                        <li className='nav-item'>
                        <NavLink className='nav-link' to='#'>Login</NavLink>
                        </li>
                        <li className='nav-item'>
                        <NavLink className='nav-link disabled' to='#'>Sign Up</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default NavBar;