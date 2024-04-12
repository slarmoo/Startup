import React from 'react';
import "./browse.css"

export function Browse() {
    main(true);
    async function main(fig = false) {
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
        addPosts();
        async function addPosts() {
            let posts;
            try {
                const postResponse = await fetch("/api/post");
                posts = await postResponse.json();
            } finally {
                let bulk = document.querySelector(".bulk");
                for (let i = 0; i < posts.length; i++) {
                    let objj = {};
                    objj["div" + i] = document.createElement("div");
                    bulk.appendChild(objj["div" + i]);
                    bulk.lastChild.classList.add("card");
                }
                cards = document.querySelectorAll(".card");

                for (let i = 0; i < cards.length; i++) {
                    let obj = {};
                    obj["div1" + i] = document.createElement("div");
                    obj["div2" + i] = document.createElement("div");
                    obj["div3" + i] = document.createElement("div");
                    obj["div4" + i] = document.createElement("div");
                    const p = document.createElement("p");
                    const img = document.createElement("img");
                    const label = document.createElement("label");
                    const input = document.createElement("input");
                    const label2 = document.createElement("label");

                    let postText = posts[i]["text"];
                    let postImg = posts[i]["image"];
                    let postUser = posts[i]["user"];

                    cards[i].appendChild(obj["div1" + i]);
                    let currentDiv = cards[i].lastChild;
                    currentDiv.appendChild(p);
                    currentDiv.lastChild.classList.add("postText");
                    currentDiv.lastChild.classList.add("text1");
                    currentDiv.lastChild.innerText = postText;
                    cards[i].appendChild(obj["div2" + i]);
                    currentDiv = cards[i].lastChild;
                    currentDiv.appendChild(img);
                    currentDiv.lastChild.id = "postImage" + i;
                    currentDiv.lastChild.src = postImg;
                    currentDiv.lastChild.alt = "";
                    currentDiv.lastChild.width = "150";
                    cards[i].appendChild(obj["div3" + i]);
                    currentDiv = cards[i].lastChild;
                    currentDiv.appendChild(label);
                    currentDiv.lastChild.classList.add("text1");
                    currentDiv.lastChild.innerText = postUser;
                    cards[i].appendChild(obj["div4" + i]);
                    currentDiv = cards[i].lastChild;
                    currentDiv.appendChild(label2);
                    currentDiv.lastChild.classList.add("like");
                    currentDiv.lastChild.classList.add("text1");
                    currentDiv.lastChild.innerText = "Like";
                    // currentDiv.lastChild.src = postImg;
                    currentDiv.appendChild(input);
                    currentDiv.lastChild.type = "checkbox";
                    currentDiv.lastChild.name = "like";
                    currentDiv.lastChild.classList.add("likeCheck");
                    checkDay();
                }
            }
        }

        checkDay();
        readTheme();
        if (fig) {
            configureWebSocket();
        }

    }

    function checkDay() {
        let d = new Date();
        let day = d.getDay();
        const dayParser = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        access = localStorage.getItem("day");
        if (dayParser[day] != access) {
            mainEl = document.querySelector(".bulk");
            while (mainEl.firstChild) {
                mainEl.firstChild.remove();
            }
            mainEl.innerHTML = "Unable to access website today. Try again on " + access + ". ";
            mainEl.style.textAlign = "center";
            mainEl.style.flex = "1";
            mainEl.style.padding = "2em";
            mainEl.style.justifySelf = "center";
            mainEl.style.alignSelf = "center";
            mainEl.style.justifyContent = "center";
            if (localStorage.getItem("theme") === "Light") {
                mainEl.style.border = "#883300 solid 5px";
                mainEl.style.background = "#fC8f14";
            } else {
                mainEl.style.backgroundColor = "#212121";
                mainEl.style.border = "solid black 5px";
            }
            mainEl.style.margin = "2em";
            mainEl.style.height = "80%";
        }
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
            document.querySelector(".bulk").innerHTML = "";
            delay(100);
            main();
        };
    }

    function displayMsg(clss, from, msg) {
        const notifEl = document.querySelector('.notif');
        notifEl.innerHTML = (
            `<div class="event"><span class="${clss}Event">${from}</span> ${msg}</div>`) + notifEl.innerHTML;
    }

    function broadcastEvent(from) {
        const event = {
            from: from,
        };
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
        socket.send(JSON.stringify(event));
    }

    function delay(milliseconds) {
        return new Promise((resolve) => {
            setTimeout(resolve, milliseconds);
        });
    }

    return (
        <p>Coming Soon!</p>
    )
}