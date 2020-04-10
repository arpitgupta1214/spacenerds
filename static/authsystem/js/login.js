async function sendreq() {
    const usernameBox = document.querySelector("input[name='username']")
    const passwordBox = document.querySelector("input[name='password']")
    const msgbox = document.querySelector(".logmsg > p")
    const csrftoken = document.querySelector("input[name='csrfmiddlewaretoken']").value

    let valid = true
    if (usernameBox.value === "") {
        valid = false
        msgbox.innerHTML = "Please enter Username"
    }
    if (passwordBox.value === "") {
        valid = false
        msgbox.innerHTML = "Please enter Password"
    }
    if (valid) {
        const response = await fetch("/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrftoken
            },
            body: JSON.stringify({
                username: usernameBox.value,
                password: passwordBox.value
            })
        })
        json = await response.json()
        if (json.response == "OK") {
            window.location.href = "/"
        } else if (json.response == "Fail") {
            msgbox.innerHTML = "Wrong Credentials"
            usernameBox.addEventListener("click", () => msgbox.innerHTML = "")
            usernameBox.addEventListener("touchend", () => msgbox.innerHTML = "")
            passwordBox.addEventListener("click", () => msgbox.innerHTML = "")
            passwordBox.addEventListener("touchend", () => msgbox.innerHTML = "")
        }
    }
}

var logb = document.querySelector("button[name=submit]")
logb.addEventListener("click", sendreq)
logb.addEventListener("touchend", sendreq)