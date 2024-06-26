import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import "./login.css";

export function Login(above) {
    const [userName, setUserName] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigate = useNavigate();
    const [error, setError] = React.useState(false);

    async function login() {    
        if (password && userName != "") {
            try {
                const response = await fetch('/auth/login', {
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify({ username: userName, password: password }),
                });
                if (response.ok) {
                    console.log("Fetch successful");
                    above.setPlace("Browse");
                    navigate("/browse");
                } else {
                    throw new Error("Incorrect username or password");
                }
            } catch (error) {
                console.log(error.message);
                setError(true);
            }
        }
    }
    if (error) {
        return (
            <div id="loginBulk">
                <div id="welcome">
                    <p className="text1">Welcome</p>
                </div>
                <div>
                    <label className="text1">Username: </label><input required id="username" value={userName} onChange={(e) => setUserName(e.target.value)} />
                </div>
                <div>
                    <label className="text1">Password: </label><input type="password" required id="password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div id="loginnew">
                    <button id="login" onClick={() => login()} className="text1">Login</button>
                    <NavLink to="create" id="new" className="link" >New User?</NavLink>
                </div>
                <div>
                    <p>Incorrect username or password</p>
                </div>
            </div>
        )
    } else {
        return (
            <div id="loginBulk">
                <div id="welcome">
                    <p className="text1">Welcome</p>
                </div>
                <div>
                    <label className="text1">Username: </label><input required id="username" value={userName} onChange={(e) => setUserName(e.target.value)} />
                </div>
                <div>
                    <label className="text1">Password: </label><input type="password" required id="password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div id="loginnew">
                    <button id="login" onClick={() => login()} className="text1">Login</button>
                    <NavLink to="create" id="new" className="link">New User?</NavLink>
                </div>
            </div>
        )
    }
}