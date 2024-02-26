//create
function create() {
    const nameEl = document.querySelector("#username");
    const passEl = document.querySelector("#password");
    const birthEl = document.querySelector("#birth");
    const parsedDate = birthEl.value.split("-");
    const confirmEl = document.querySelector("#comfirm");
    if(passEl.value && passEl.value != "") {
        if(passEl.value === confirmEl.value) {
            if(parsedDate[0] <= 2011) {
                localStorage.setItem("userName", nameEl.value);
                window.location.href = "browse.html";
            } else {
                document.querySelector("#feedback").innerHTML = "You aren't old enough";
            }
        } else {
            document.querySelector("#feedback").innerHTML = "Double check confirm password";
        }
    } else {
        document.querySelector("#feedback").innerHTML = "Make sure you enter a password";
    }
}
    
  