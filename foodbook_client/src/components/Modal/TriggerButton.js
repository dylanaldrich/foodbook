import React from 'react';

const TriggerButton = ({ triggerText, buttonRef, showModal}) => {
    // function setClassName(string) {
    //     if(string === "Login" || string === "Sign Up") {
    //         return "nav-item nav-link nav-button";
    //     } 
    //     return "btn btn-md btn-info center modal-button";
    
    // }
    
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