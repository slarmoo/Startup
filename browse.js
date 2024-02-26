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