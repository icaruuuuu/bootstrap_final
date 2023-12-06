document.addEventListener("DOMContentLoaded", function () {
    var loginForm = document.querySelector('form');
    var rememberMeCheckbox = document.querySelector('#cb1');
    var emailAddressInput = document.querySelector('input[type="email"]');
    var passwordInput = document.querySelector('input[type="password"]');

    var savedCredentials = JSON.parse(localStorage.getItem('savedCredentials')) || {};
    if (savedCredentials.rememberMe) {
        emailAddressInput.value = savedCredentials.emailAddress;
        passwordInput.value = savedCredentials.password;
        rememberMeCheckbox.checked = true;
    }

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        var storedUserData = JSON.parse(localStorage.getItem('userData')) || [];

        var userToLogin = {
            emailAddress: emailAddressInput.value,
            password: passwordInput.value
        };

        var foundUser = storedUserData.find(function (user) {
            return user.emailAddress === userToLogin.emailAddress && user.password === userToLogin.password;
        });

        if (foundUser) {
            localStorage.setItem('loggedInUser', JSON.stringify(foundUser));

            window.location.href = 'main.html';

            if (rememberMeCheckbox.checked) {
                localStorage.setItem('savedCredentials', JSON.stringify({
                    emailAddress: userToLogin.emailAddress,
                    password: userToLogin.password,
                    rememberMe: true
                }));
            } else {
                localStorage.removeItem('savedCredentials');
            }
        } else {
            showErrorToast('Invalid email address or password.');
        }

        loginForm.reset();
    });

    function showErrorToast(message) {
        $('.toast-body').html(message);
        $('.toast').toast('show');
    }
});
