import React from 'react';
import "./post.css"
import { MainStuff } from "./mainStuff";

export function Post(above) {
    main();
    let userName = above.userName;

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
        userName = uppercase(userData.username);
        document.querySelector("#userName").innerText = userName;
        function uppercase(word) {
            let newWord = word[0].toUpperCase();
            for (let i = 1; i < word.length; i++) {
                newWord = newWord + word[i];
            }
            return newWord;
        }
    }

    return (
        <MainStuff notifs={above.notifs} socket={above.socket} />
    );
}