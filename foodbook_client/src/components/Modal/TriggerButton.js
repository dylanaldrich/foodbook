import React from 'react';
import { NavLink } from 'react-router-dom';

import './TriggerButton.css';

const TriggerButton = ({ triggerText, buttonRef, showModal}) => {    
    if(triggerText === "Login" || triggerText === "Sign Up") {
        return (
            <div 
            className={`nav-link ${triggerText === "Sign Up" ? "signup-link" : ""}`} 
            ref={buttonRef}
            onClick={showModal}
            >
                {triggerText}
            </div>
        );
    };
    
    return (
        <button
            className="btn btn-md btn-info center modal-button w-auto"  
            ref={buttonRef}
            onClick={showModal}
        >
            {triggerText}
        </button>
    );
};
export default TriggerButton;

// Source: https://blog.bitsrc.io/build-a-full-featured-modal-dialog-form-with-react-651dcef6c571