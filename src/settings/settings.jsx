import React from 'react';
import "./settings.css"
import tooltip from "./tooltip.png"

export function Settings() {
    main();
    async function main() {
        let userName;
        let username = await fetch("/user/me", {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                "credentials": "include"
            },
        });
        if (username.ok) {
            console.log("ok");
        } else {
            window.location.href = "index.html"
        }
        const userData = await username.json();
        userName = uppercase(userData.username);
        document.querySelector("#userName").innerText = userName;
        function uppercase(word) {
            let newWord = word[0].toUpperCase();
            for (let i = 1; i < word.length; i++) {
                newWord = newWord + word[i];
            }
            return newWord;
        }
        setTheme();
        configureWebSocket();
    }

    function setTheme() {
        let themeEl = document.querySelector("#theme");
        localStorage.setItem("theme", themeEl.value);
        readTheme();
    }
    
    setDay();
    function setDay() {
        let dayEl = document.querySelector("#day");
        localStorage.setItem("day", dayEl.value);
    }

    async function deleteCookie() {
        const del = await fetch("/user/expire", {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                "credentials": "include"
            },
        });
    }

    function configureWebSocket() {
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
        socket.onopen = (event) => {
            this.displayMsg('system', 'websocket', 'connected');
        };
        socket.onclose = (event) => {
            this.displayMsg('system', 'websocket', 'disconnected');
        };
        socket.onmessage = async (event) => {
            const msg = JSON.parse(await event.data.text());
            this.displayMsg('user', msg.from, "made a post!");
        };
    }

    function displayMsg(clss, from, msg) {
        const notifEl = document.querySelector('.notif');
        notifEl.innerHTML = (
            `<div class="event"><span class="${clss}Event">${from}</span> ${msg}</div>`) + notifEl.innerHTML;
    }

    return (
        <div id="settingsBulk">
            <div>
                <label className="text1">Access Day: </label>
                <select id="day" onChange="setDay()">
                    <option>Sunday</option>
                    <option>Monday</option>
                    <option selected="true">Tuesday</option>
                    <option>Wednesday</option>
                    <option>Thursday</option>
                    <option>Friday</option>
                    <option>Saturday</option>
                </select>
                <img src={tooltip} className="tooltip" width="20" title="Changes which day you will be able to access the site" />
            </div>
            <div>
                <label className="text1">Theme: </label>
                <select id="theme" onChange="setTheme()">
                    <option>Light</option>
                    <option selected>Dark</option>
                </select>
                <img src={tooltip} className="tooltip" width="20" title="Changes the site color theme" />
            </div>
        </div>
    )
}