async function signup() {
    const fname = document.querySelector("input[name='fname']")
    const lname = document.querySelector("input[name='lname']")
    const email = document.querySelector("input[name='email']")
    const username = document.querySelector("input[name='username']")
    const password = document.querySelector("input[name='password']")
    const csrftoken = document.querySelector("input[name='csrfmiddlewaretoken']").value
    const msgbox = document.querySelector(".logmsg > p")
    valid = true
    if (fname.value == "") {
        valid = false
        msgbox.innerHTML = "Please enter First Name"
        return null
    }
    if (lname.value == "") {
        valid = false
        msgbox.innerHTML = "Please enter Last Name"
        return null
    }
    if (!(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(email.value))) {
        msgbox.innerHTML = "Please enter valid email"
        valid = false
        return null
    }
    if (username.value == "") {
        valid = false
        msgbox.innerHTML = "Please enter username"
        return null

    }
    if (password.value.length < 8) {
        valid = false
        msgbox.innerHTML = "Password too short (min. 8 char)"
        return null
    }
    if (valid) {
        response = await fetch("/signup/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrftoken
            },
            body: JSON.stringify({
                fname: fname.value,
                lname: lname.value,
                username: username.value,
                email: email.value,
                password: password.value
            })
        })
        json = await response.json()

        if (json.emailExists) {
            msgbox.innerHTML = "Email already in use"
            return null
        }
        if (json.usernameExists) {
            msgbox.innerHTML = "Username already in use"
            return null
        }

        msgbox.innerHTML = "Registered"

        response = await fetch("/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrftoken
            },
            body: JSON.stringify({
                username: username.value,
                password: password.value
            })
        })
        setTimeout(() => window.location.href = "/", 2000)
    }

}

document.querySelector("button[name='submit']").addEventListener("click", signup)
document.querySelector("button[name='submit']").addEventListener("touchend", signup)
