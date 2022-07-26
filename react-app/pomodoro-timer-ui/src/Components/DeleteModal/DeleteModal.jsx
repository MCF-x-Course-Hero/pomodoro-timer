import React from "react";
import "./Modal.css";

function Modal({ setOpenModal }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h1>Warning: Are you sure you want to delete your account? you cannot undo this command</h1>
        </div>
        <div className="body">
          <p>Pleade type: Yes, I want to delete my account</p>
        </div>
        <div className="footer">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >Cancel
          </button>
          <button>Delete Account</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;