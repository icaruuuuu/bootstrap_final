document.addEventListener("DOMContentLoaded", function () {
    var loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')) || {};
    var storedUserData = JSON.parse(localStorage.getItem('userData')) || [];

    var fullNameInput = document.getElementById('fullName');
    var emailAddressInput = document.getElementById('email');
    var newPasswordInput = document.getElementById('password');

    // Populate input boxes with current user data
    fullNameInput.value = loggedInUser.fullName || '';
    emailAddressInput.value = loggedInUser.emailAddress || '';

    // Add input event listeners to track changes in real-time
    fullNameInput.addEventListener('input', function () {
        loggedInUser.fullName = fullNameInput.value;
    });

    emailAddressInput.addEventListener('input', function () {
        loggedInUser.emailAddress = emailAddressInput.value;
    }); 

    newPasswordInput.addEventListener('input', function () {
        loggedInUser.password = newPasswordInput.value;
    });

    var profileForm = document.getElementById('profileForm');

    profileForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Update the user data in localStorage
        loggedInUser.fullName = fullNameInput.value;
        loggedInUser.emailAddress = emailAddressInput.value;
        loggedInUser.password = newPasswordInput.value; // Update password

        localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));

        // Update the user data in the storedUserData array if exists
        var userIndex = storedUserData.findIndex(user => user.emailAddress === loggedInUser.emailAddress);
        if (userIndex !== -1) {
            storedUserData[userIndex] = loggedInUser;
            localStorage.setItem('userData', JSON.stringify(storedUserData));
        }

        $('.toast').toast('show');
    });
});

function togglePasswordVisibility() {
    var passwordInput = document.getElementById('password');
    var icon = document.querySelector('.toggle-password');

    // Toggle the type attribute between 'password' and 'text'
    passwordInput.type = (passwordInput.type === 'password') ? 'text' : 'password';

    // Toggle the eye icon
    if (passwordInput.type === 'password') {
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

function closeToast() {
    $('#successToast').toast('hide');
}

document.addEventListener("DOMContentLoaded", function () {
    var loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')) || {};

    var userNameElement = document.querySelector('.dropdown-menu .logo');
    if (loggedInUser) {
        userNameElement.innerHTML = `<img src="image/avatar.png" height="100" width="100"><br>${loggedInUser.fullName}`;
    }
});