//settings
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
let themeEl = document.querySelector("#theme");
localStorage.setItem("theme", themeEl.value);
setDay();
function setDay() {
    let dayEl = document.querySelector("#day");
    localStorage.setItem("day", dayEl.value);
    checkDay();
}
function checkDay() {
    let d = new Date();
    let day = d.getDay();
    const dayParser = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    if(dayParser[day] != localStorage.getItem("day")) {
        mainEl = document.querySelector(".bulk");
        while (mainEl.firstChild) {
            mainEl.firstChild.remove();
        }
        mainEl.innerHTML = "Unable to Access on " + dayParser[day] + "s";
    }
}