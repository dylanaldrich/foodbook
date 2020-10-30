import React from 'react';
const TriggerButton = ({ triggerText, buttonRef, showModal }) => {
  return (
    <button
      className="btn btn-lg btn-danger center modal-button"
      ref={buttonRef}
      onClick={showModal}
    >
      {triggerText}
    </button>
  );
};
export default TriggerButton;

// Source: https://blog.bitsrc.io/build-a-full-featured-modal-dialog-form-with-react-651dcef6c571