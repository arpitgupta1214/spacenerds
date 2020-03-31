function backdropresize() {
    var backdrop = document.querySelector(".backdrop")
    backdrop.style.height = (document.querySelector(".home .intro").clientHeight) + 220 + "px"
}

function homeimgdivresize() {
    homeimgdiv = document.querySelector(".home .image")
    img1 = document.querySelector(".home .image img")
    msgbox = document.querySelector(".home .image .msgbox")
    if (msgbox.clientHeight > 0.5 * img1.clientHeight) {
        homeimgdiv.style.height = 0.5 * img1.clientHeight + msgbox.clientHeight + 40 + "px"
    }
}
function sizesetup() {
    homeimgdivresize()
    backdropresize()
}

var navlinks = document.querySelectorAll(".navbar-mob ul li")
navlinks.forEach(element => {
    element.addEventListener("touchend", () => document.querySelector(".navbar-mob input").checked = false)
    element.addEventListener("click", () => document.querySelector(".navbar-mob input").checked = false)
});

sizesetup()
window.onresize = sizesetup
