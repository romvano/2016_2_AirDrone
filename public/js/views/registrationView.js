(function() {
    'use strict';

    function showRegistration () {
        if (typeof window === 'object') {
            let RegistrationForm = window.RegistrationForm1;
            document.body.classList.add('body-login');
            let registrationForm = new RegistrationForm1();
        }
    }

    function nextStepRegistration () {
        if (typeof window === 'object') {
            document.querySelector('.main__login').remove();
            let RegistrationForm = window.RegistrationForm2;
            let registrationForm = new RegistrationForm2();
        }
    }

    function hideRegistration () {
        document.body.classList.remove('body-login');
        document.querySelector('.main__login').remove();
    }

    window.showRegistration = showRegistration;
    window.nextStepRegistration = nextStepRegistration;
    window.hideRegistration = hideRegistration;
}) ();