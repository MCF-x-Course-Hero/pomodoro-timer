import React, { useState } from "react";
import { useAuthContext } from "../../contexts/auth";
import apiClient from "./../../Services/apiClient"
import "./RegisterForm.css";

export default function RegisterForm({setLogin, setRegister}) {
  const [isLoading, setIsLoading] = useState(false);
  const { error, setError, signupUser } = useAuthContext();
  const [form, setForm] = useState({
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


    if (event.target.name === "username") {
      if (event.target.value !== "") {
        setError((e) => ({ ...e, username: null }));
      }
    }


    if (event.target.name === "password") {
      if (event.target.value !== "") {
        setError((e) => ({ ...e, password: null }));
      }
    }

    if (event.target.name === "confirmPassword") {
      if (event.target.value !== "") {
        setError((e) => ({ ...e, confirmPassword: null }));
      }
    }

    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
  };

  const handleOnSubmit = async () => {
    setIsLoading(true);
    setError((e) => ({ ...e, form: null }));


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
      setError((e) => ({ ...e, passwordConfirm: null }));
    }

    const { data, error } = await apiClient.signup(form);
    if (error) {
      setError((e) => ({ ...e, form: error }));
      setIsLoading(false);
    } else if (data?.user) {
      signupUser(data.user);
      apiClient.setToken(data.token);
      setIsLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Sign Up</h2>
      {error?.form && (<span className="error">{error.form}</span>)}
      <div className="form">
        <div className="input-field">
          {/* <label>Username</label> */}
          <input
            className="form-input"
            type="username"
            name="username"
            placeholder="username"
            value={form.username}
            onChange={handleOnInputChange}
          />
          {error.username && <span className="error">{error.username}</span>}
        </div>
        <div className="split-input-field">
        </div>
        <div className="input-field">
          {/* <label>Password</label> */}
          <input
            className="form-input"
            type="password"
            name="password"
            placeholder="password"
            value={form.password}
            onChange={handleOnInputChange}
          />
          {error.password && <span className="error">{error.password}</span>}
        </div>
        <div className="input-field">
          {/* <label>Confirm Password</label> */}
          <input
            className="form-input"
            type="password"
            name="passwordConfirm"
            placeholder="confirm password"
            value={form.passwordConfirm}
            onChange={handleOnInputChange}
          />
          {error.passwordConfirm && (
            <span className="error">{error.passwordConfirm}</span>
          )}
        </div>
        <button className="submit-registration" onClick={handleOnSubmit}>
          {isLoading ? "Loading..." : "Registered"}
        </button>
      </div>
      <div className="footer">
        <p>
          Already have an account? 
          <span className="line">
                <button onClick={()=>{setLogin(true); setRegister(false)}}>Login here!</button>
            </span>
        </p>
      </div>
    </div>
  );
}