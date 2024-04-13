import React from 'react';
import "./settings.css"
import tooltip from "./tooltip.png"

export function Settings() {
    const [day, setDayy] = React.useState("Tuesday");
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
        userName = userData.username;

        const response = await fetch('/user/login', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ username: userName }),
        });
        
        //setTheme();
    }

    // function setTheme() {
    //     localStorage.setItem("theme", theme);
    //     readTheme();
    // }
    
    setDay();
    function setDay() {
        localStorage.setItem("day", day);
    }

    return (
        <div id="settingsBulk">
            <div>
                <label className="text1">Access Day: </label>
                <select id="day" onChange={() => setDay()} value={day}>
                    <option>Sunday</option>
                    <option>Monday</option>
                    <option selected={true}>Tuesday</option>
                    <option>Wednesday</option>
                    <option>Thursday</option>
                    <option>Friday</option>
                    <option>Saturday</option>
                </select>
                <img src={tooltip} className="tooltip" width="20" title="Changes which day you will be able to access the site" />
            </div>
            {/* <div>
                <label className="text1">Theme: </label>
                <select id="theme" onChange={() => setTheme()} value={theme}>
                    <option>Light</option>
                    <option selected={true}>Dark</option>
                </select>
                <img src={tooltip} className="tooltip" width="20" title="Changes the site color theme" />
            </div> */}
        </div>
    )
}