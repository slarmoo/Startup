import React from 'react';
import "./create.css"

export function Create() {
    return (
        <div id="createBulk">
            <div class="card">
                <label class="text1">Username: </label><input required id="username" />
            </div>
            <div class="card">
                <label class="text1">Date of Birth: </label><input type="date" required id="birth" />
            </div>
            <div class="card">
                <label class="text1">Password: </label><input type="password" required id="password" />
            </div>
            <div class="card">
                <label class="text1">Comfirm Password: </label><input type="password" required id="comfirm" />
            </div>
            <div id="wrapper">
                <div class="card" id="signup">
                    <button onclick="create()" class="text1" id="button">Sign Up</button>
                </div>
                <div class="card" id="signin">
                    <a href="index.html" class="link">Already have an account?</a>
                </div>
            </div>
            <div class="card">
                <p id="feedback" class="text1"></p>
            </div>
        </div>
    )
}