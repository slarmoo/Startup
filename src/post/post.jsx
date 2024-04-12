import React from 'react';
import "./post.css"

export function Post() {
    main();
    let userName;
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
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
        checkDay();
        readTheme();
        configureWebSocket();
    }

    async function savePost() {
        postTextEl = document.querySelector("#postText");
        postImgEl = document.querySelector("#postImg");
        if (postTextEl.value != "" && postImgEl.files[0] != "") {
            const img = new Image();
            let imggg;
            img.src = URL.createObjectURL(postImgEl.files[0]);
            imggg = document.querySelector("#preview").src;
            //img.onload = async function() {
            //imggg = await compressImage(img, 0.15);
            let d = new Date();
            let day = d.getDate();
            if (day.length < 2) {
                day = "0" + day.toString();
            }
            let month = d.getMonth();
            let date = month.toString() + day.toString();
            date = Number(date);
            delta = { text: postTextEl.value, image: imggg, date: date, user: document.querySelector("#userName").innerText };

            postTextEl.value = "";
            postImgEl.value = "";
            document.querySelector("#preview").src = "";

            const newPost = fetch("/api/post", {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(delta),
            });
            //};        
        }
        if (socket.readyState === WebSocket.OPEN) {
            broadcastEvent(userName);
        } else {
            console.warn('WebSocket not open yet.');
        }
    }
    function compressImage(image, i) {
        return new Promise((resolve, reject) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            canvas.width = image.width;
            canvas.height = image.height;

            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

            const compressedDataURL = canvas.toDataURL('image/jpeg', i);
            if (compressedDataURL.length <= 9000) {
                resolve(compressedDataURL);
            } else {
                const img = new Image();
                img.src = compressedDataURL;
                img.onload = function () {
                    if (i > 0.1) {
                        resolve(compressImage(image, i - 0.05));
                    } else if (i > 0.001) {
                        resolve(compressImage(image, i / 2));
                    } else {
                        reject(new Error('Image compression failed'));
                    }

                }
            }
        });
    }

    async function preview() {
        let preview = document.querySelector("#preview");
        let file = document.querySelector("#postImg").files[0];
        const img = new Image();
        let imggg;
        img.src = URL.createObjectURL(file);

        img.onload = async function () {
            try {
                imggg = await compressImage(img, 0.15);
                const el = document.querySelector(".error");
                if (el != null) {
                    el.remove();
                }
            } catch {
                const el = document.querySelector(".error");
                if (el == null) {
                    const p = document.createElement("p");
                    p.innerText = "File too large";
                    p.classList.add("error");
                    document.querySelector(".bulk").appendChild(p);
                }
            }
            preview.src = imggg;

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
        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
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
        socket.send(JSON.stringify(event));
    }

    return (
        <div className="text1" id="postBulk">
            <textarea id="postText"></textarea>
            <div>
                <input id="postImg" type="file" accept=".jpeg,.png,.tiff,.jpg" className="text1" onchange="preview()" />
                <button onClick="savePost()" className="text1" id="button">Post</button>
            </div>
            <div>
                <img src="" width="150" alt="your image here!" id="preview" />
            </div>
        </div>
    );
}