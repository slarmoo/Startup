//post

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
readTheme();
async function savePost() {
    postTextEl = document.querySelector("#postText");
    postImgEl = document.querySelector("#postImg");
    // console.log("postImg = " + postImgEl.files);
    if(postTextEl.value != "" && postImgEl.files[0] != "") {
        let delta = [];
        //posts = JSON.parse(localStorage.getItem("posts"));
        let posts = await fetch("/api/post")
            .then(response => response.json())
            .then(data => {localStorage.setItem("posts", data)});
        posts = localStorage.getItem("posts");
        console.log(posts);
        if(posts) {
                delta = delta.concat(posts);
        } else {
            console.log("ERROR: posts not found");
        }
        
        if(posts) {
            delta = delta.concat(posts);
        }

        const reader = new FileReader();
        let imgString;
        reader.onload = function (e) {
            const base64String = e.target.result;
            console.log('Base64 Image:', base64String);
            imgString = base64String;
        }
        reader.readAsDataURL(postImgEl.files[0]);
        
        console.log("image string = " + imgString);
        delta.push([postTextEl.value, imgString]);

        postTextEl.value = "";
        postImgEl.value = "";
        const newPost = await fetch("/api/post", {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(delta),
        });
    }
}
function preview() {
    let preview = document.querySelector("#preview");
    let file = document.querySelector("#postImg").files[0];
    let reader  = new FileReader();
    reader.onloadend = function () {
        preview.src = reader.result;
      }
    
      if (file) {
        reader.readAsDataURL(file);
      } else {
        preview.src = "";
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