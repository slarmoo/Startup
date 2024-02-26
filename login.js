//login
function login() {
    const nameEl = document.querySelector("#username");
    const passEl = document.querySelector("#password");
    if(passEl.value && passEl.value != "") {
        localStorage.setItem("userName", nameEl.value);
        window.location.href = "browse.html";
      }
    else {
        document.querySelector("#welcome").innerHTML = "Make sure you enter a password";
    }
}
    
  