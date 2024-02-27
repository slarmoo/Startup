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