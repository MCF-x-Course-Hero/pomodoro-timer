import * as React from "react";
import { useAuthContext } from "../../contexts/AuthContext";
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
          <button className="cancel" onClick={() => {authSetStates.setDeleteUser(false)}}>X</button>
          <h1>WARNING: Are you sure you want to delete your account?</h1>
          <h4>{"("}You cannot undo this action{")"}</h4>
          <div className="confirmation">
            <p>Please type your username: {authStates.user.username}</p>
            <input
              type="text"
              placeholder="my-username"
              onChange={e => setDeleteForm(e.target.value)}
              value={deleteForm}
            />
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
