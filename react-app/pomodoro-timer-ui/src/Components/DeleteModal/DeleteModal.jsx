import * as React from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { IconButton } from "@mui/material";
import Modal from "../Modal/Modal"
import ApiClient from "../../Services/apiClient";
import "./DeleteModal.css";

export default function DeleteModal() {
  const { authSetStates, authStates } = useAuthContext();
  const [deleteForm, setDeleteForm] = React.useState("");
  
  function handleOnDelete() {
    ApiClient.deleteUser(authStates.user.username);
    authSetStates.setLoggedIn(false);
    authSetStates.setLogin(true);
    authSetStates.setDeleteUser(false);
  }

  return (
    <Modal>
      <div className="modal-background">
        <div className="modal-container">
          <button className="cancel" onClick={() => {authSetStates.setDeleteUser(false)}}>          <IconButton>

<svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-x"
    width="28"
    height="28"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="#ffffff"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg></IconButton></button>
          <h1>WARNING: Are you sure you want to delete your account?</h1>
          <h4>{"("}You cannot undo this action{")"}</h4>
          <div className="confirmation">
            <p>Please type your username: {authStates.user.username}</p>
            <div className="username">
              <i className="material-symbols-outlined">person</i>
              <input
                type="text"
                placeholder="my-username"
                onChange={e => setDeleteForm(e.target.value)}
                value={deleteForm}
              />
            </div>
          </div>
            <button
              className={`${(deleteForm === authStates.user.username) ? `delete` : `fill`}`}
              onClick={(deleteForm === authStates.user.username) ? handleOnDelete : null}
            >Delete Account</button>
        </div>
      </div>
    </Modal>
  );
}
