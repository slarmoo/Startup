import React from 'react';
import "./login.css"

export function Login() {
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
                <button id="login" onClick="login()" className="text1">Login</button>
                <a href="create.html" id="new" className="link">New User?</a>
            </div>
        </div>
    )
}