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
fakePost()
function fakePost() {
    fetch("/api/posts").then((data) => data.json()).then((data)=>{
        console.log(data);
        post = data[0];
        img = imageAPI();
        console.log(img);
        let delta = [];
        posts = JSON.parse(localStorage.getItem("posts"));
        if(posts) {
            delta = delta.concat(posts);
        }
        console.log(["welp: ",post, imageAPI()]);
        delta.push([post, imageAPI()]);
        localStorage.setItem("posts", JSON.stringify(delta));
    });
}
addPosts();
function addPosts() {
    let posts = JSON.parse(localStorage.getItem("posts"));
    let bulk = document.querySelector(".bulk");
    for(let i=0; i<posts.length; i++) {
        let objj = {};
        objj["div" + i] = document.createElement("div");
        bulk.appendChild(objj["div" + i]);
        bulk.lastChild.classList.add("card");
    }
    cards = document.querySelectorAll(".card");
    for(let i=0; i<cards.length; i++) {
        let obj = {};
        obj["div1" + i] = document.createElement("div");
        obj["div2" + i] = document.createElement("div");
        obj["div3" + i] = document.createElement("div");
        const p = document.createElement("p");
        const img = document.createElement("img");
        const label = document.createElement("label");
        const input = document.createElement("input");
        let postText = posts[i][0];
        let postImg = posts[i][1];
        console.log([postText, postImg]);
        cards[i].appendChild(obj["div1" + i]);
            let currentDiv = cards[i].lastChild;
            currentDiv.appendChild(p);
                currentDiv.lastChild.classList.add("postText");
                currentDiv.lastChild.classList.add("text1");
                currentDiv.lastChild.innerHTML = postText;
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
                currentDiv.lastChild.classList.add("like");
                currentDiv.lastChild.classList.add("text1");
                currentDiv.lastChild.innerHTML = "Like";
                currentDiv.lastChild.src = postImg;
            currentDiv.appendChild(input);
                currentDiv.lastChild.type = "checkbox";
                currentDiv.lastChild.name = "like";
                currentDiv.lastChild.classList.add("likeCheck");         
    //     let reader  = new FileReader();
    //     let sadness =  document.querySelector("#postImage" + i);
    //     reader.onloadend = function () {
    //        sadness.src = reader.result;
    //     }
        
    //     if (postImg) {
    //         console.log(postImg);
    //         reader.readAsDataURL(postImg);
    //     } else {
    //         sadness.src = "";
    //     }
     }
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
        if(localStorage.getItem("theme") === "Light") {
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
            cardEl[i].style.border = "#883300 solid 5px";
            cardEl[i].style.background = "#fC8f14";
        }
        navEl.style.background = "#fC8f14";
        navEl.style.border = "#883300 solid 2px";
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

function imageAPI() {
    const apiKey = 'b2AeAeLD7dCCPd68hRdOzTrusVvgKQQu9k4mC76F';

    fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            console.log(data.url);
            return data.url;
        });
    
}