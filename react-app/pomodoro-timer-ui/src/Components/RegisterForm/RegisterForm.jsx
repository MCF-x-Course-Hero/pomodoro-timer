import * as React from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { useSettingsContext } from "../../contexts/SettingsContext";
import apiClient from "./../../Services/apiClient.js";
import "./RegisterForm.css";

const MIN_USERNAME_LENGTH = 6
const MAX_USERNAME_LENGTH = 20
const MIN_PASSWORD_LENGTH = 8


export default function RegisterForm() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState({});
  const { authSetStates, authFunctions } = useAuthContext();
  const { settingsFunctions } = useSettingsContext();
  const [form, setForm] = React.useState({
    username: "",
    password: "",
    passwordConfirm: "",
  });

  const handleOnInputChange = (event) => {
    if (event.target.name === "password") {
      if (form.passwordConfirm && form.passwordConfirm !== event.target.value) {
        (e) => ({
          ...e,
          passwordConfirm: "Passwords do not match",
        });
      } else {
        setError((e) => ({ ...e, passwordConfirm: null }));
      }
    }
    if (event.target.name === "passwordConfirm") {
      if (form.password && form.password !== event.target.value) {
        setError((e) => ({
          ...e,
          passwordConfirm: "Passwords do not match",
        }));
      } else {
        setError((e) => ({ ...e, passwordConfirm: null }));
      }
    }

    if (event.target.name === "username" && event.target.value !== "") {
      setError((e) => ({ ...e, username: null }));
    }

    if (event.target.name === "password" && event.target.value !== "") {
      setError((e) => ({ ...e, password: null }));
    }

    if (event.target.name === "confirmPassword" && event.target.value !== "") {
      setError((e) => ({ ...e, confirmPassword: null }));
    }

    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
  };

  
  const handleOnSubmit = async () => {
    setIsLoading(true);
    setError((e) => ({ ...e, form: null }));

    if (form.username.length < MIN_USERNAME_LENGTH){
      setError((e) => ({ ...e, username: "Username must have at least 6 characters" }));
      setIsLoading(false);
      return;
    }
    if (form.username.length > MAX_USERNAME_LENGTH){
      setError((e) => ({ ...e, username: "Username must have at most 20 characters" }));
      setIsLoading(false);
      return;
    }
    if (form.password.length < MIN_PASSWORD_LENGTH){
      setError((e) => ({ ...e, password: "Password must have at least 8 characters" }));
      setIsLoading(false);
      return;
    }
    
    if (form.username === "") {
      setError((e) => ({ ...e, username: "Please enter a username" }));
      setIsLoading(false);
      return;
    }

    if (form.password === "") {
      setError((e) => ({ ...e, password: "Please enter a password" }));
      setIsLoading(false);
      return;
    }

    if (form.confirmPassword === "") {
      setError((e) => ({
        ...e,
        confirmPassword: "Please confirm your password",
      }));
      setIsLoading(false);
      return;
    }

    if (form.passwordConfirm !== form.password) {
      setError((e) => ({ ...e, passwordConfirm: "Passwords do not match." }));
      setIsLoading(false);
      return;
    } else {
      authSetStates.setError((e) => ({ ...e, passwordConfirm: null }));
    }

    const { data, error } = await apiClient.signup(form);
    if (error) {
      setError((e) => ({ ...e, form: error }));
      setIsLoading(false);
    } else if (data?.user) {
      authFunctions.registerUser(data.user, data.token);
      settingsFunctions.addUserSettings();
      setIsLoading(false);
    }
    
  };

  return (
    <div className="register-form">
      <h2>Sign Up</h2>
      {error?.form && (<span className="error">{error.form}</span>)}
      {error.username && <span className="error">{error.username}</span>}
      {error.password && <span className="error">{error.password}</span>}
      {error.passwordConfirm && (
            <span className="error">{error.passwordConfirm}</span>
          )}
      <div className="form">
        <div className="input-field">
          <i className="material-symbols-outlined">person</i>
          <input
            className="form-input"
            type="username"
            name="username"
            placeholder="Username"
            minLength={4}
            value={form.username}
            onChange={handleOnInputChange}
          />
        </div>
        <div className="input-field">
          <i className="material-symbols-outlined">key</i>
          <input
            className="form-input"
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            minLength={8}
            onChange={handleOnInputChange}
          />
        </div>
        <div className="input-field">
          <i className="material-symbols-outlined">key</i>
          <input
            className="form-input"
            type="password"
            name="passwordConfirm"
            placeholder="Confirm Password"
            minLength={8}
            value={form.passwordConfirm}
            onChange={handleOnInputChange}
          />
        </div>
      </div>
      <button className="submit-registration" onClick={handleOnSubmit} disabled={isLoading} >
          {isLoading ? "Loading..." : "Register"}
        </button>
      <div className="footer">
          Already have an account? 
          <p onClick={()=>{ authSetStates.setLogin(true); authSetStates.setRegister(false)}}>Login here!</p>
      </div>
    </div>
  );
}