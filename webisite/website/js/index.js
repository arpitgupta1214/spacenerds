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

// Carousel
const slider = document.querySelector(".carousel .slider")
let active;
function setActive(img) {
    active = img
    document.querySelectorAll(".carousel .selector div").forEach((div) => {
        div.style.backgroundColor = "transparent"
    })
    document.querySelector(`.carousel .selector div[class='img${img}']`).style.backgroundColor = "white"
    slider.style.transform = `translateX(-${(img - 1) * 20}%)`
}

function startCarousel() {
    const id = setInterval(() => {
        if (active === 5) {
            setActive(1)
            return null
        }
        setActive(active + 1)
    }, 4000)
    return id
}

setActive(1)
id = startCarousel()
document.querySelectorAll(".carousel .selector div").forEach((div) => {
    div.addEventListener("click", () => {
        setActive(Number(div.className.slice(-1)))
        clearInterval(id)
        id = startCarousel()
    })
    div.addEventListener("touchend", () => {
        setActive(Number(div.className.slice(-1)))
        clearInterval(id)
        id = startCarousel()
    })
})

document.querySelector(".contact form button[class='send']").addEventListener("click", () => {
    const fname = document.querySelector(".contact form input[name='fname']").value
    const lname = document.querySelector(".contact form input[name='lname']").value
    const email = document.querySelector(".contact form input[name='email']").value
    const reason = document.querySelector(".contact form select[name='reason']").value
    const message = document.querySelector(".contact form textarea[class='message']").value
    const errordiv = document.querySelector(".contact form div[class='errordiv']")
    const csrftoken = document.querySelector(".contact form input[name='csrfmiddlewaretoken']").value
    let valid = true

    if (reason == "def") {
        errordiv.innerHTML = "Please select reason for contact"
        valid = false
    }
    if (fname == "") {
        errordiv.innerHTML = "Please enter first name"
        valid = false
    }
    if (lname == "") {
        errordiv.innerHTML = "Please enter last name"
        valid = false
    }
    if (!(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(email))) {
        errordiv.innerHTML = "Please enter valid email"
        valid = false
    }
    if (valid) {
        errordiv.innerHTML = "Sent!"
        fetch("/contact/", {
            method: 'POST',
            headers: {
                'X-CSRFToken': csrftoken,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                fname,
                lname,
                email,
                reason,
                message
            })
        })

    }

})
