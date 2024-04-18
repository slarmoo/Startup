import React from 'react';
import "./settings.css"
import tooltip from "./tooltip.png"

export function Settings() {
    // const [day, setDayy] = React.useState("Tuesday");
    // const [theme, setThemee] = React.useState("Dark")
    // let userName;

    React.useEffect(() => {
        main();
    }, []);

    // React.useEffect(() => {
    //     setDay();
    //     async function setDay() {
    //         console.log(day);
    //         const response = await fetch('/user/settings', {
    //             method: 'POST',
    //             headers: { 'content-type': 'application/json' },
    //             body: JSON.stringify({ username: userName, day: day, theme: theme }),
    //         });
    //         console.log(day);
    //     }
    // })

    async function main() {
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
    }

    // async function setTheme(newTheme) {
    //     setThemee(newTheme);
    //     const response = await fetch('/user/settings', {
    //         method: 'POST',
    //         headers: { 'content-type': 'application/json' },
    //         body: JSON.stringify({ username: userName, day: day, theme: theme }),
    //     });
    // }
    
    

    return (
        <div id="settingsBulk">
            <div>
                <label className="text1">Access Day: </label>
                <select id="day" >
                    <option value="Sunday">Sunday</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thurday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                </select>
                <img src={tooltip} className="tooltip" width="20" title="Changes which day you will be able to access the site" />
            </div>
            <div>
                <label className="text1">Theme: </label>
                <select id="theme" >
                    <option value="Light">Light</option>
                    <option value="Dark">Dark</option>
                </select>
                <img src={tooltip} className="tooltip" width="20" title="Changes the site color theme" />
            </div>
        </div>
    )
}