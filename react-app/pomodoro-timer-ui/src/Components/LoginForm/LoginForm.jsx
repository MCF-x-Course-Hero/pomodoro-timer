import * as React from "react";
import { useAuthContext } from "./../../contexts/AuthContext";
import apiClient from "./../../services/apiClient"
import "./LoginForm.css";

export default function LoginForm() {
  const { authSetStates, authFunctions } = useAuthContext();
  const [error, setError] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [form, setForm] = React.useState({
    username: "",
    password: "",
  });

  const handleOnInputChange = (event) => {
    if (event.target.name === "username" && event.target.value !== "") {
      setError((e) => ({ ...e, username: null }));
    }

    if (event.target.name === "password" && event.target.value !== "") {
      setError((e) => ({ ...e, password: null }));
    }

    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
  };

  const handleOnSubmit = async (event) => {

    event.preventDefault();
    setIsLoading(true);
    setError((e) => ({ ...e, form: null }));

    if (form.username === "") {
      setError((e) => ({ ...e, username: "Please enter an username" }));
      setIsLoading(false);
      return;
    }

    if (form.password === "") {
      setError((e) => ({ ...e, password: "Please enter a password" }));
      setIsLoading(false);
      return;
    }

    const { data, error } = await apiClient.login(form);
    if (error) {
      setError((e) => ({ ...e, form: error }));
      setIsLoading(false);
    } else if (data?.user) { 
      authFunctions.loginUser(data.user, data.token);
      setIsLoading(false);
    }
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      {error?.form && (<span className="error">{error.form}</span>)}
      {error?.username && (<span className="error">{error.username}</span>)}
      {error?.password && (<span className="error">{error.password}</span>)}
      <div className="form">
        <div className="input-field">
          <i className="material-symbols-outlined">person</i>
          <input
            className="form-input"
            type="text"
            name="username"
            placeholder="Username"
            id="username"
            value={form.username}
            required
            onChange={handleOnInputChange}
          />
        </div>
        <div className="input-field">
          <i className="material-symbols-outlined">lock</i>
          <input
            className="form-input"
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleOnInputChange}
            value={form.password}
          />
        </div>
      </div>
      <button className="btn" disabled={isLoading} onClick={handleOnSubmit} >
          {" "}
          {isLoading ? "Loading..." : "Login"}
        </button>
      <div className="footer">
          Don't have an account?
        <p onClick={()=>{authSetStates.setLogin(false); authSetStates.setRegister(true)}}>Sign up here!</p>
      </div>
    </div>
  );
}