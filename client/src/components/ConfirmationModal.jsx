import React from "react";
import "../assets/styles/components/ConfirmationModal/confirmationmodal.css";

const ConfirmationModal = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <p>Are you sure you want to submit your contribution?</p>
        <button onClick={onConfirm} className="writepage-confirmation-button">
          Yes
        </button>
        <button onClick={onCancel} className="writepage-confirmation-button">
          No
        </button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
