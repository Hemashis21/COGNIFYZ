document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('myForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const subjectSelect = document.getElementById('subject');
    const messageTextarea = document.getElementById('message');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const phoneError = document.getElementById('phoneError');
    const subjectError = document.getElementById('subjectError');
    const messageError = document.getElementById('messageError');
    const successMessage = document.getElementById('successMessage');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); 

        let isValid = true;

        hideError(nameError, nameInput);
        hideError(emailError, emailInput);
        hideError(phoneError, phoneInput);
        hideError(subjectError, subjectSelect);
        hideError(messageError, messageTextarea);
        successMessage.style.display = 'none';

        if (nameInput.value.trim() === '') {
            showError(nameError, nameInput, 'Name is required.');
            isValid = false;
        } else if (nameInput.value.trim().length < 2) {
            showError(nameError, nameInput, 'Name must be at least 2 characters long.');
            isValid = false;
        }

        if (emailInput.value.trim() === '') {
            showError(emailError, emailInput, 'Email is required.');
            isValid = false;
        } else if (!isValidEmail(emailInput.value.trim())) {
            showError(emailError, emailInput, 'Please enter a valid email address.');
            isValid = false;
        }

        if (phoneInput.value.trim() !== '' && !/^[0-9]{10}$/.test(phoneInput.value.trim())) {
            showError(phoneError, phoneInput, 'Phone number must be 10 digits.');
            isValid = false;
        }

        if (subjectSelect.value === '') {
            showError(subjectError, subjectSelect, 'Please select a subject.');
            isValid = false;
        }

        if (messageTextarea.value.trim() === '') {
            showError(messageError, messageTextarea, 'Message is required.');
            isValid = false;
        } else if (messageTextarea.value.trim().length < 10) {
            showError(messageError, messageTextarea, 'Message must be at least 10 characters long.');
            isValid = false;
        }

        if (isValid) {
            console.log('Form submitted successfully!');
            console.log('Name:', nameInput.value.trim());
            console.log('Email:', emailInput.value.trim());
            console.log('Phone:', phoneInput.value.trim());
            console.log('Subject:', subjectSelect.value);
            console.log('Message:', messageTextarea.value.trim());

            successMessage.textContent = 'Form submitted successfully!';
            successMessage.style.display = 'block';

            form.reset();
        }
    });

    function showError(errorElement, inputElement, message) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        inputElement.classList.add('invalid');
    }

    function hideError(errorElement, inputElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
        inputElement.classList.remove('invalid');
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    nameInput.addEventListener('input', () => {
        if (nameInput.value.trim().length >= 2 || nameInput.value.trim() === '') {
            hideError(nameError, nameInput);
        }
    });

    emailInput.addEventListener('input', () => {
        if (isValidEmail(emailInput.value.trim()) || emailInput.value.trim() === '') {
            hideError(emailError, emailInput);
        }
    });

    phoneInput.addEventListener('input', () => {
        if (/^[0-9]{10}$/.test(phoneInput.value.trim()) || phoneInput.value.trim() === '') {
            hideError(phoneError, phoneInput);
        }
    });

    subjectSelect.addEventListener('change', () => {
        if (subjectSelect.value !== '') {
            hideError(subjectError, subjectSelect);
        }
    });

    messageTextarea.addEventListener('input', () => {
        if (messageTextarea.value.trim().length >= 10 || messageTextarea.value.trim() === '') {
            hideError(messageError, messageTextarea);
        }
    });
});