async function signout() {
    const csrftoken = document.querySelector("input[name='csrfmiddlewaretoken']").value
    res = await fetch("/logout/", {
        method: "POST",
        headers: {
            "X-CSRFToken": csrftoken
        }
    })
    window.location.href = "/"
}
document.querySelector("button").addEventListener("click", signout)
document.querySelector("button").addEventListener("touchend", signout)