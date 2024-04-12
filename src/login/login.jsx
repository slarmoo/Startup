import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import "./login.css"

export function Login() {

    async function login() {
        const nameEl = document.querySelector("#username");
        const passEl = document.querySelector("#password");
        if (passEl.value && passEl.value != "") {

            try {
                const response = await fetch('/auth/login', {
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify({ username: nameEl.value, password: passEl.value }),
                });
                if (response.ok) {
                    const el = document.querySelector(".error");
                    if (el != null) {
                        el.remove();
                    }
                    //window.location.href = "browse.html";
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
                <label className="text1">Username: </label><input required id="username" />
            </div>
            <div>
                <label className="text1">Password: </label><input type="password" required id="password" />
            </div>
            <div id="loginnew">
                <button id="login" onClick={() => login()} className="text1">Login</button>
                <NavLink to="create" id="new" className="link">New User?</NavLink>
            </div>
        </div>
    )
}