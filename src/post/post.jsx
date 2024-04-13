import React from 'react';
import "./post.css"
import { MainStuff } from "./mainStuff";

export function Post(above) {
    main();

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
    }

    return (
        <MainStuff notifs={above.notifs} socket={above.socket} />
    );
}