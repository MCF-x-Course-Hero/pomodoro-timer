import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../contexts/auth";
import ApiClient from "../../services/apiClient"
import "./LoginForm.css";

export default function LoginForm({setLogin, setRegister}) {

const [isLoading, setIsLoading] = useState(false);
const { error, setError, loginUser } = useAuthContext();
const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleOnInputChange = (event) => {
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

    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
  };
  console.log("form", form)

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
    const { data, error } = await ApiClient.login(form);
    if (error) {
      setError((e) => ({ ...e, form: error }));
      setIsLoading(false);
    } else if (data?.user) {
      setLogin(true); 
      setRegister(false)
      loginUser(data.user);
      console.log(data.user);
      ApiClient.setToken(data.token);
      setIsLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="header">
        <h2>Login</h2>
      </div>
      {error?.form && (<span className="error">{error.form}</span>)}
      <div className="form">
        <div className="input-field">
          <input
            className="form-input"
            type="username"
            name="username"
            placeholder="username"
            id="username"
            value={form.username}
            required
            onChange={handleOnInputChange}
          />
          {error?.username && (<span className="error">{error.username}</span>)}
        </div>
        <div className="input-field">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={handleOnInputChange}
            value={form.password}
          />
          {error?.password && (<span className="error">{error.password}</span>)}
        </div>
        <button className="btn" disabled={isLoading} onClick={handleOnSubmit}>
          {" "}
          {isLoading ? "Loading..." : "Login"}
        </button>
      </div>
      <div className="footer">
        <p>
          Don't have an account?
        <button onClick={()=>{setLogin(false); setRegister(true)}}>Sign up here!</button>
        </p>
      </div>
    </div>
  );
}