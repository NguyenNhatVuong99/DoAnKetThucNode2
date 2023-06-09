
let auth = {
    login: async function () {
        // // // spinner()
        let email = $("#inputEmail").val()
        let password = $("#inputPassword").val()
        let url = "/api/v1/auth/login"
        let config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        }
        try {
            let response = await fetch(url, config)
            let data = await response.json()
            let message = data.message
            if (response.status == 200) {
                showToastr("success", message)
                setTimeout(() => {
                    window.location.href = "/admin";
                }, 1000);
            } else {
                showToastr("error", message)
            }
        } catch (error) {
            console.log(error);
        }
    },
    forgotPassword: async function () {
        // // // spinner()
        let email = $("#inputEmailForgot").val()
        let url = "/api/v1/auth/forgot-password"
        let config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
            })
        }
        try {
            let response = await fetch(url, config)
            let data = await response.json()
            let message = data.message
            if (response.status == 200) {
                showToastr("success", message)
                setTimeout(() => {
                    window.location.href = "/admin";
                }, 1000);
            } else {
                showToastr("error", message)
            }
        } catch (error) {
            console.log(error);
        }
    },
    logout: async function () {
        let url = "/api/v1/auth/logout"
        try {
            let response = await fetch(url);
            let data = await response.json()
            if (response.status == 200) {
                window.location.href = "/login";
            }
        } catch (error) {
            console.log(error);
        }
    }
}

$(document).ready(() => {
    $(".btn-login").on("click", (e) => {
        e.preventDefault()
        auth.login()
    })
    $(".btn-register").on("click", (e) => {
        e.preventDefault()
        auth.register()
    })
    $(".btn-logout").on("click", (e) => {
        e.preventDefault()
        auth.logout()
    })
    $(".btn-facebook").on("click", (e) => {
        e.preventDefault()
        window.location.href = '/auth/github';
    })
    $(".btn-google").on("click", (e) => {
        e.preventDefault()
        window.location.href = '/auth/google';
    })
    $(".btn-forgot").on("click", (e) => {
        e.preventDefault()
        auth.forgotPassword()
    })
})