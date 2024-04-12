import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import "./login.css";

export function Login() {
    const [userName, setUserName] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigate = useNavigate();

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
                    navigate("/browse");
                } else {
                    throw new Error("Incorrect username or password");
                }
            } catch (error) {
                console.log(error.message);
                const el = document.querySelector(".error");
                if (el != null) {
                    const p = document.createElement("p");
                    p.innerText = error.message;
                    p.classList.add("error");
                    document.querySelector(".bulk").appendChild(p);
                }
            }
        }
        else {
            document.querySelector("#welcome").innerHTML = "Make sure you enter a password";
        }
    }

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