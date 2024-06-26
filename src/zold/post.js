//post
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
    if(postTextEl.value != "" && postImgEl.files[0] != "") {
        const img = new Image();
        let imggg;
        img.src = URL.createObjectURL(postImgEl.files[0]);
        imggg = document.querySelector("#preview").src;
        //img.onload = async function() {
            //imggg = await compressImage(img, 0.15);
            let d = new Date();
            let day = d.getDate();
            if(day.length < 2) {
                day = "0"+day.toString();
            } 
            let month = d.getMonth();
            let date = month.toString()+day.toString();
            date = Number(date);
            delta = {text: postTextEl.value, image: imggg, date: date, user: document.querySelector("#userName").innerText};

            postTextEl.value = "";
            postImgEl.value = "";
            document.querySelector("#preview").src = "";

            const newPost = fetch("/api/post", {
                method: 'POST',
                headers: {'content-type': 'application/json'},
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
        if(compressedDataURL.length <= 9000) {
            resolve(compressedDataURL);
        } else {
            const img = new Image();
            img.src = compressedDataURL;
            img.onload = function() {
                if(i>0.1) {
                    resolve(compressImage(image, i-0.05));
                } else if(i>0.001) {
                    resolve(compressImage(image, i/2));
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

    img.onload = async function() {
        try{
            imggg = await compressImage(img, 0.15);
            const el = document.querySelector(".error");
            if(el != null) {
                el.remove();
            }
        } catch {
            const el = document.querySelector(".error");
            if(el == null) {
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
    if(dayParser[day] != access) {
        mainEl = document.querySelector(".bulk");
        while (mainEl.firstChild) {
            mainEl.firstChild.remove();
        }
        mainEl.innerHTML = "Unable to access website today. Try again on " + access + ". ";
        mainEl.style.textAlign = "center";
    }
}
function readTheme() {
    text1 = document.querySelectorAll(".text1");
    navEl = document.querySelector(".sidebar");
    bulkEl = document.querySelector(".bulk");
    links = document.querySelectorAll(".link");
    links2 = document.querySelectorAll(".link2");
    buttonEl = document.querySelector("#button");
    if(localStorage.getItem("theme") === "Light") {
        for(let i = 0; i < text1.length; i++) {
            text1[i].style.color = "black";
        }
        let l = links.length;
        for(let i = 0; i < l; i++) {
            links[i].classList.add("link2");
            links[i].classList.remove("link");
        }
        // for(let i = 0; i < options; i++) {
        //     options[i].removeAttribute("selected");
        // }
        navEl.style.background = "#fC8f14";
        bulkEl.style.background = "#fC8f14";
        navEl.style.border = "#883300 solid 2px";
        bulkEl.style.border = "#883300 solid 5px";
        buttonEl.style.background = "#eeeeee";
    } else {
        for(let i = 0; i < text1.length; i++) {
            text1[i].style.color = "white";
        }
        let l = links2.length;
        for(let i = 0; i < links2.length; i++) {
            links2[i].classList.add("link");
            links2[i].classList.remove("link2");
        }
        navEl.style.background = "#212121";
        bulkEl.style.background = "#212121";
        navEl.style.border = "#000000 solid 2px";
        bulkEl.style.border = "#000000 solid 5px";
        buttonEl.style.background = "#fC8f14";
    }
}

async function deleteCookie() {
    const del = await fetch("/user/expire", {
        method: 'GET',
        headers: {'content-type': 'application/json',
                    "credentials": "include"},
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