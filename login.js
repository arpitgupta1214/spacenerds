function setmsg() {
    msgbox = document.querySelector(".logmsg > p")
    msgbox.innerHTML = "Wrong Credentials"
    setTimeout(() => msgbox.innerHTML = "", 5000)
}
var logb = document.querySelector("input[type=submit]")
logb.addEventListener("click", setmsg)
logb.addEventListener("touchend", setmsg)