import * as React from "react";
import { useRef, useState, useEffect, useContext} from 'react';
import AuthContext from "../../contexts/AuthContext";
import "./LoginForm.css";

export default function LoginForm() {
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);


    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user, pwd);
        setUser('');
        setPwd('');
        setSuccess(true);
    }

  return (
    <>
    {success ? (
        <section>
            <h1>Jane Doe</h1>
            <p>Member since July 21, 2022</p>
            <p>Total zone time: 6 hrs</p>
            <br />
            <p>
                <a href="#">Logout</a>
            </p>
        </section>

    ) : (
    <section>
        <p ref={errRef} className={errMsg ? "errmsg" : 
        "offscreen"} aria-live="assertive">{errMsg}</p>

        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input 
                type="text" 
                id="username" 
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
            />
            <label htmlFor="password">Password:</label>
            <input 
                type="password" 
                id="password" 
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
            />
            <button>Login</button>
        </form>
        <p>
            Don't have an account?<br />
            <span className="line">
                {/*put router link here*/}
                <a href="#">Sign up Here!</a>
            </span>
        </p>
    </section>
    )}
    </>
   )
}