//login
async function login() {
    const nameEl = document.querySelector("#username");
    const passEl = document.querySelector("#password");
    if(passEl.value && passEl.value != "") {

        try {
            const response = await fetch('/auth/login', {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify({username: nameEl.value, password: passEl.value}),
            });
            if(response.ok) {
                const el = document.querySelector(".error");
                if(el != null) {
                    el.remove();
                }
                window.location.href = "browse.html";
            } else {
                throw new Error("Incorrect username or password");
            }
        } catch (error) {
            console.log(error.message);
            const el = document.querySelector(".error");
            if(el != null) {
                const p = document.createElement("p");
                p.innerText = error.message;
                p.classList.add("error");
                document.querySelector(".bulk").appendChild(p);
            }
        }
      }
    else {
        document.querySelector("#welcome").innerHTML = "Make sure you enter a password";
    }
}
readTheme();
function readTheme() {
    text1 = document.querySelectorAll(".text1");
    navEl = document.querySelector(".sidebar");
    bulkEl = document.querySelector(".bulk");
    links = document.querySelectorAll(".link");
    links2 = document.querySelectorAll(".link2");
    buttonEl = document.querySelector("#login");
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