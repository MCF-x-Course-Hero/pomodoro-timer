import * as React from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import ApiClient from "../../services/apiClient"
import "./LoginForm.css";

export default function LoginForm() {
  const { authStates, authSetStates, authFunctions } = useAuthContext();
  const [isLoading, setIsLoading] = React.useState(false);
  const [form, setForm] = React.useState({
    username: "",
    password: "",
  });

  const handleOnInputChange = (event) => {
    if (event.target.name === "username" && event.target.value !== "") {
      authSetStates.setError((e) => ({ ...e, username: null }));
    }

    if (event.target.name === "password" && event.target.value !== "") {
      authSetStates.setError((e) => ({ ...e, password: null }));
    }

    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
  };

  const handleOnSubmit = async (event) => {

    event.preventDefault();
    setIsLoading(true);
    authSetStates.setError((e) => ({ ...e, form: null }));

    if (form.username === "") {
      authSetStates.setError((e) => ({ ...e, username: "Please enter an username" }));
      setIsLoading(false);
      return;
    }

    if (form.password === "") {
      authSetStates.setError((e) => ({ ...e, password: "Please enter a password" }));
      setIsLoading(false);
      return;
    }

    const { data, error } = await ApiClient.login(form);
    if (error) {
      authSetStates.setError((e) => ({ ...e, form: error }));
      setIsLoading(false);
    } else if (data?.user) {
      authSetStates.setLoggedIn(true); 
      authSetStates.setRegister(false);
      authSetStates.setLogin(false);
      authFunctions.loginUser(data.user);
      ApiClient.setToken(data.token);
      setIsLoading(false);
    }
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      {authStates.error?.form && (<span className="error">{authStates.error.form}</span>)}
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
        {authStates.error?.username && (<span className="error">{authStates.error.username}</span>)}
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
        {authStates.error?.password && (<span className="error">{authStates.error.password}</span>)}
      </div>
      <button className="btn" disabled={isLoading} onClick={handleOnSubmit}>
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