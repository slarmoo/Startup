//settings
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
function readTheme() {
    text1 = document.querySelectorAll(".text1");
    navEl = document.querySelector(".sidebar");
    bulkEl = document.querySelector(".bulk");
    tooltipEl = document.querySelectorAll(".tooltip");
    links = document.querySelectorAll(".link");
    links2 = document.querySelectorAll(".link2");
    options = document.getElementsByTagName("option");
    if(localStorage.getItem("theme") === "Light") {
        for(let i = 0; i < text1.length; i++) {
            text1[i].style.color = "black";
        }
        for(let i = 0; i < tooltipEl.length; i++) {
            tooltipEl[i].style.filter = "none";
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
    } else {
        for(let i = 0; i < text1.length; i++) {
            text1[i].style.color = "white";
        }
        for(let i = 0; i < tooltipEl.length; i++) {
            tooltipEl[i].style.filter = "invert";
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
    }
}
setDay();
function setDay() {
    let dayEl = document.querySelector("#day");
    localStorage.setItem("day", dayEl.value);
}

async function deleteCookie() {
    const del = await fetch("/user/expire", {
        method: 'GET',
        headers: {'content-type': 'application/json',
                    "credentials": "include"},
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