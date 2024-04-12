export function readTheme() {
    text1 = document.querySelectorAll(".text1");
    navEl = document.querySelector(".sidebar");
    bulkEl = document.querySelector(".bulk");
    links = document.querySelectorAll(".link");
    links2 = document.querySelectorAll(".link2");
    buttonEl = document.querySelector("#login");
    if (localStorage.getItem("theme") === "Light") {
        for (let i = 0; i < text1.length; i++) {
            text1[i].style.color = "black";
        }
        let l = links.length;
        for (let i = 0; i < l; i++) {
            links[i].classList.add("link2");
            links[i].classList.remove("link");
        }
        navEl.style.background = "#fC8f14";
        bulkEl.style.background = "#fC8f14";
        navEl.style.border = "#883300 solid 2px";
        bulkEl.style.border = "#883300 solid 5px";
        buttonEl.style.background = "#eeeeee";
    } else {
        for (let i = 0; i < text1.length; i++) {
            text1[i].style.color = "white";
        }
        let l = links2.length;
        for (let i = 0; i < links2.length; i++) {
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

function readTheme() {
    text1 = document.querySelectorAll(".text1");
    navEl = document.querySelector(".sidebar");
    bulkEl = document.querySelector(".bulk");
    tooltipEl = document.querySelectorAll(".tooltip");
    links = document.querySelectorAll(".link");
    links2 = document.querySelectorAll(".link2");
    options = document.getElementsByTagName("option");
    if (localStorage.getItem("theme") === "Light") {
        for (let i = 0; i < text1.length; i++) {
            text1[i].style.color = "black";
        }
        for (let i = 0; i < tooltipEl.length; i++) {
            tooltipEl[i].style.filter = "none";
        }
        let l = links.length;
        for (let i = 0; i < l; i++) {
            links[i].classList.add("link2");
            links[i].classList.remove("link");
        }
        navEl.style.background = "#fC8f14";
        bulkEl.style.background = "#fC8f14";
        navEl.style.border = "#883300 solid 2px";
        bulkEl.style.border = "#883300 solid 5px";
    } else {
        for (let i = 0; i < text1.length; i++) {
            text1[i].style.color = "white";
        }
        for (let i = 0; i < tooltipEl.length; i++) {
            tooltipEl[i].style.filter = "invert";
        }
        let l = links2.length;
        for (let i = 0; i < links2.length; i++) {
            links2[i].classList.add("link");
            links2[i].classList.remove("link2");
        }
        navEl.style.background = "#212121";
        bulkEl.style.background = "#212121";
        navEl.style.border = "#000000 solid 2px";
        bulkEl.style.border = "#000000 solid 5px";
    }
}

function readTheme() {
    text1 = document.querySelectorAll(".text1");
    navEl = document.querySelector(".sidebar");
    bulkEl = document.querySelector(".bulk");
    links = document.querySelectorAll(".link");
    links2 = document.querySelectorAll(".link2");
    buttonEl = document.querySelector("#button");
    if (localStorage.getItem("theme") === "Light") {
        for (let i = 0; i < text1.length; i++) {
            text1[i].style.color = "black";
        }
        let l = links.length;
        for (let i = 0; i < l; i++) {
            links[i].classList.add("link2");
            links[i].classList.remove("link");
        }
        navEl.style.background = "#fC8f14";
        bulkEl.style.background = "#fC8f14";
        navEl.style.border = "#883300 solid 2px";
        bulkEl.style.border = "#883300 solid 5px";
        buttonEl.style.background = "#eeeeee";
    } else {
        for (let i = 0; i < text1.length; i++) {
            text1[i].style.color = "white";
        }
        let l = links2.length;
        for (let i = 0; i < links2.length; i++) {
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

function readTheme() {
    text1 = document.querySelectorAll(".text1");
    navEl = document.querySelector(".sidebar");
    bulkEl = document.querySelector(".bulk");
    links = document.querySelectorAll(".link");
    links2 = document.querySelectorAll(".link2");
    buttonEl = document.querySelector("#button");
    if (localStorage.getItem("theme") === "Light") {
        for (let i = 0; i < text1.length; i++) {
            text1[i].style.color = "black";
        }
        let l = links.length;
        for (let i = 0; i < l; i++) {
            links[i].classList.add("link2");
            links[i].classList.remove("link");
        }
        navEl.style.background = "#fC8f14";
        bulkEl.style.background = "#fC8f14";
        navEl.style.border = "#883300 solid 2px";
        bulkEl.style.border = "#883300 solid 5px";
        buttonEl.style.background = "#eeeeee";
    } else {
        for (let i = 0; i < text1.length; i++) {
            text1[i].style.color = "white";
        }
        let l = links2.length;
        for (let i = 0; i < links2.length; i++) {
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

function readTheme() {
    text1 = document.querySelectorAll(".text1");
    navEl = document.querySelector(".sidebar");
    cardEl = document.querySelectorAll(".card");
    links = document.querySelectorAll(".link");
    links2 = document.querySelectorAll(".link2");
    if (localStorage.getItem("theme") === "Light") {
        for (let i = 0; i < text1.length; i++) {
            text1[i].style.color = "black";
        }
        let l = links.length;
        for (let i = 0; i < l; i++) {
            links[i].classList.add("link2");
            links[i].classList.remove("link");
        }
        for (let i = 0; i < cardEl.length; i++) {
            cardEl[i].style.border = "#883300 solid 5px";
            cardEl[i].style.background = "#fC8f14";
        }
        navEl.style.background = "#fC8f14";
        navEl.style.border = "#883300 solid 2px";
    } else {
        for (let i = 0; i < text1.length; i++) {
            text1[i].style.color = "white";
        }
        let l = links2.length;
        for (let i = 0; i < links2.length; i++) {
            links2[i].classList.add("link");
            links2[i].classList.remove("link2");
        }
        for (let i = 0; i < cardEl.length; i++) {
            cardEl[i].style.border = "#000000 solid 5px";
            cardEl[i].style.background = "#212121";
        }
        navEl.style.background = "#212121";
        navEl.style.border = "#000000 solid 2px";
    }
}