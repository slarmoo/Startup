import React from 'react';
import "./settings.css"

export function Settings() {
    return (
        <div class="bulk">
            <div>
                <label class="text1">Access Day: </label>
                <select id="day" onchange="setDay()">
                    <option>Sunday</option>
                    <option>Monday</option>
                    <option selected>Tuesday</option>
                    <option>Wednesday</option>
                    <option>Thursday</option>
                    <option>Friday</option>
                    <option>Saturday</option>
                </select>
                <img src="tooltip.png" class="tooltip" width="20" title="Changes which day you will be able to access the site" />
            </div>
            <div>
                <label class="text1">Theme: </label>
                <select id="theme" onchange="setTheme()">
                    <option>Light</option>
                    <option selected>Dark</option>
                </select>
                <img src="tooltip.png" class="tooltip" width="20" title="Changes the site color theme" />
            </div>
        </div>
    )
}