(function() {
    'use strict';

    function showLogin () {
        if (typeof window === 'object') {
            let LoginForm = window.LoginForm;
            document.body.classList.add('body-login');
//        document.querySelector('.main__login').style.display = 'block';
            console.log('showLogin');
            let loginForm = new LoginForm();
        }
    }

    function hideLogin () {
        document.body.classList.remove('body-login');
        document.querySelector('.main__login').remove();
    }

    window.showLogin = showLogin;
    window.hideLogin = hideLogin;
}) ();
