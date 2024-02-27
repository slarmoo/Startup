//browse
let userName = localStorage.getItem("userName");
userName = uppercase(userName);
document.querySelector("#userName").innerHTML = userName;
function uppercase(word) {
    let newWord = word[0].toUpperCase();
    for(let i = 1; i < word.length; i++) {
        newWord = newWord + word[i];
    }
    return newWord;
}
checkDay();
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
        mainEl.style.flex = "1";
        mainEl.style.padding = "2em";
        mainEl.style.justifySelf = "center";
        mainEl.style.alignSelf = "center";
        mainEl.style.justifyContent = "center";
        mainEl.style.backgroundColor = "#212121";
        mainEl.style.border = "solid black 5px";
        mainEl.style.margin = "2em";
        mainEl.style.height = "80%";  
    }
}
readTheme();
function readTheme() {
    text1 = document.querySelectorAll(".text1");
    navEl = document.querySelector(".sidebar");
    cardEl = document.querySelectorAll(".card");
    links = document.querySelectorAll(".link");
    links2 = document.querySelectorAll(".link2");
    if(localStorage.getItem("theme") === "Light") {
        for(let i = 0; i < text1.length; i++) {
            text1[i].style.color = "black";
        }
        let l = links.length;
        for(let i = 0; i < l; i++) {
            links[i].classList.add("link2");
            links[i].classList.remove("link");
        }
        for(let i = 0; i < cardEl.length; i++) {
            cardEl[i].style.border = "#550000 solid 5px";
            cardEl[i].style.background = "#ff5346";
        }
        navEl.style.background = "#ff5346";
        navEl.style.border = "#550000 solid 2px";
    } else {
        for(let i = 0; i < text1.length; i++) {
            text1[i].style.color = "white";
        }
        let l = links2.length;
        for(let i = 0; i < links2.length; i++) {
            links2[i].classList.add("link");
            links2[i].classList.remove("link2");
        } 
        for(let i = 0; i < cardEl.length; i++) {
            cardEl[i].style.border = "#000000 solid 5px";
            cardEl[i].style.background = "#212121";
        }
        navEl.style.background = "#212121";
        navEl.style.border = "#000000 solid 2px";
    }
}