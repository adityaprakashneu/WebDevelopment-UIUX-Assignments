$(document).ready(function () {
    // Function to validate the email format
    function isValidEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@northeastern\.edu$/;
        return emailRegex.test(email);
    }

    // Function to enable/disable the login button
    function updateLoginButton() {
        const email = $('#email').val();
        const username = $('#username').val();
        const password = $('#password').val();
        const confirmPassword = $('#confirm-password').val();

        const emailValid = isValidEmail(email);
        const usernameValid = /^[a-zA-Z0-9]{3,10}$/.test(username);
        const hasUserLength = username.length >= 3;

        // Password validation checks
        const hasLength = password.length >= 8;
        const hasLetters = /[a-zA-Z]/.test(password);
        const hasNumbers = /[0-9]/.test(password);
        const hasSpecialCharacters = /[^a-zA-Z0-9]/.test(password);

        const passwordValid =
            hasLength && hasLetters && hasNumbers && hasSpecialCharacters && password === confirmPassword;

        $('#email-error').text(emailValid ? '' : 'Invalid email format (xyz@northeastern.edu)');
        $('#username-error').text(
            hasUserLength 
                ? (usernameValid
                    ? ''
                    : 'Username cannot contain special characters') 
                : 'Username should be 3 to 10 characters');
        $('#password-error').text(
            hasLength
                ? (hasLetters
                    ? (hasNumbers
                        ? ''
                        : 'Password must contain at least one number')
                    : 'Password must contain at least one letter')
                : 'Password must be at least 8 characters'
        );

        $('#confirm-password-error').text(password === confirmPassword ? '' : 'Passwords do not match');

        const allFieldsValid = emailValid && usernameValid && passwordValid;

        $('#login-btn').prop('disabled', !allFieldsValid);
    }

    // Event listeners for input fields
    $('#email, #username, #password, #confirm-password').on('input', function () {
        updateLoginButton();
    });
});

function redirectToSecondPage() {
    const inputValue = document.getElementById('username').value;
    window.location.href = `calculate.html?username=${inputValue}`;
}

$(document).ready(function () {
    // Function to validate input

    const urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams)
    const value = urlParams.get('username');
    console.log(value)
    document.getElementById("name").textContent = "Logged in as: " + value;

    function validateInput(input, inputId, errorMessageId) {
        const inputValue = $(input).val();
        const isNumber = !isNaN(inputValue) && isFinite(inputValue);
        const hasSpecialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(inputValue);

        if (!inputValue) {
            $(errorMessageId).text('This field cannot be empty');
        } else if (!isNumber) {
            $(errorMessageId).text('Please enter a valid number');
        } else if (hasSpecialCharacters) {
            $(errorMessageId).text('Special characters are not allowed');
        } else {
            $(errorMessageId).text('');
        }
    }

    // Event listeners for input fields
    $('#num1, #num2').on('input', function () {
        validateInput(this, this.id, `#${this.id}-error`);
    });

    // Calculate result using one arrow function for all operations
    $('.operation-buttons button').on('click', function () {
        const num1 = parseFloat($('#num1').val());
        const num2 = parseFloat($('#num2').val());

        const operation = $(this).attr('id');

        let result;

        switch (operation) {
            case 'add':
                result = num1 + num2;
                break;
            case 'subtract':
                result = num1 - num2;
                break;
            case 'multiply':
                result = num1 * num2;
                break;
            case 'divide':
                result = num2 !== 0 ? num1 / num2 : 'Cannot divide by zero';
                break;
            default:
                result = 'Invalid operation';
        }

        $('#result').val(result);
    });
});
