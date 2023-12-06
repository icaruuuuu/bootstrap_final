document.addEventListener("DOMContentLoaded", function () {
    var form = document.querySelector('form');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        var fullNameInput = document.querySelector('input[type="text"]');
        var emailAddressInput = document.querySelector('input[type="email"]');
        var passwordInput = document.querySelector('input[type="password"]');
        var checkbox = document.querySelector('#cb1');
        var validationMessage = document.getElementById('validationMessage');

        if (!checkbox.checked) {
            validationMessage.innerHTML = '* Please agree to the terms and conditions.';
            return;
        }

        validationMessage.innerHTML = '';

        var existingUserData = JSON.parse(localStorage.getItem('userData')) || [];

        if (!Array.isArray(existingUserData)) {
            existingUserData = [];
        }

        var currentUserData = {
            fullName: fullNameInput.value,
            emailAddress: emailAddressInput.value,
            password: passwordInput.value
        };

        existingUserData.push(currentUserData);

        var updatedUserDataJSON = JSON.stringify(existingUserData);

        localStorage.setItem('userData', updatedUserDataJSON);

        form.reset();
        
        $('.toast').toast('show');
    });
});
