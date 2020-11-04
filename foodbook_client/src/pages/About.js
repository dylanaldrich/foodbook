/* imports */
import React from 'react';

import '../App.css';

/* About Page Component */
const About = (props) => {
    return (
        <>
            <div className='jumbotron jumbotron-fluid'>
                <div className='container justify-content-start'>
                    <h1 className='display-4 text-left pt-2'>About foodbook</h1>
                    <hr />
                </div>
            </div>
            <div className="row container mx-auto d-flex align-content-around">
                <div className=' p-3 w-50 mx-3 lead bg-secondary text-white rounded col'>
                    <p>
                        <span className="font-weight-bold text-info display-3" id="foodbook-tag">foodbook</span> is made for all the foodies and chefs out there who like to find and try out new recipes. When you have a ton of recipes bookmarked and saved all over the place, it can be hard to remember where to find the right one, for the right occasion. That's where foodbook comes in.
                    </p>  
                    <p>
                        On foodbook, you can create your own custom foodbooks (like a cookbook) and add in as many recipes as you like. You can organize your recipes by type, so they're even easier to find when you're ready to get cooking. Our database features millions of recipes from sources all over the internet, so dig in, and enjoy!
                    </p>
                </div>
                <div className='p-3 w-50 mx-3 lead bg-secondary d-flex align-items-center justify-content-center text-white rounded col'>
                    <div className="align-self-center">
                        <img src="https://i.ibb.co/7YPhThm/CV-photo.png" alt="dylan aldrich" className="rounded-circle" />
                        <h2 className="font-weight-bold text-info display-4">Creator</h2>
                        <h3>Dylan Aldrich</h3>
                        <small>– Los Angeles, CA –</small>
                        <p className="d-flex justify-content-center mt-2">
                            <a className="nav-item mx-2 socials" href="https://www.linkedin.com/in/dylanaldrich/">LinkedIn</a> | <a className="nav-item mx-2 socials" href="https://github.com/dylanaldrich">Github</a>
                        </p>
                    </div>
                </div>
        
            </div>
        </>
    );
};

export default About;