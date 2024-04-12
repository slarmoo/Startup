import React from 'react';
import { Navigate, NavLink } from 'react-router-dom';
import "./create.css"

export function Create() {
    const [userName, setUserName] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirm, setConfirm] = React.useState("");
    const [birth, setBirth] = React.useState("");
    const parsedDate = birth.split("-");

    async function create() {
        if (password && password != "") {
            if (password === confirm) {
                if (parsedDate[0] <= 2011) {
                    try {
                        const response = await fetch('/auth/create', {
                            method: 'POST',
                            headers: { 'content-type': 'application/json' },
                            body: JSON.stringify({ username: userName, password: password }),
                        });
                        if (response.ok) {
                            return <Navigate to="/browse" />;
                        } else {
                            throw new Error("Incorrect username or password");
                        }
                    } catch (error) {
                        console.log(error.message);
                        const el = document.querySelector(".er");
                        if (el == null) {
                            const div = document.createElement("div");
                            const p = document.createElement("p");
                            div.classList.add("er");
                            document.querySelector(".bulk").appendChild(div);
                            p.innerText = error.message;
                            p.classList.add("error");
                            document.querySelector(".er").appendChild(p);
                        }
                    }
                } else {
                    document.querySelector("#feedback").innerHTML = "You aren't old enough";
                }
            } else {
                document.querySelector("#feedback").innerHTML = "Double check confirm password";
            }
        } else {
            document.querySelector("#feedback").innerHTML = "Make sure you enter a password";
        }
    }

    return (
        <div id="createBulk">
            <div className="card">
                <label className="text1">Username: </label><input required id="username" value={userName} onChange={(e) => setUserName(e.target.value)} />
            </div>
            <div className="card">
                <label className="text1">Date of Birth: </label><input type="date" required id="birth" value={birth} onChange={(e) => setBirth(e.target.value)} />
            </div>
            <div className="card">
                <label className="text1">Password: </label><input type="password" required id="password" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="card">
                <label className="text1">Comfirm Password: </label><input type="password" required id="comfirm" onChange={(e) => setConfirm(e.target.value)} />
            </div>
            <div id="wrapper">
                <div className="card" id="signup">
                    <button onClick={() => create()} className="text1" id="button">Sign Up</button>
                </div>
                <div className="card" id="signin">
                    <NavLink to="/" className="link">Already have an account?</NavLink>
                </div>
            </div>
            <div className="card">
                <p id="feedback" className="text1"></p>
            </div>
        </div>
    )
}