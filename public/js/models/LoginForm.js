(function () {
    'use strict';

    class LoginForm {

        constructor () {
            let self = this;
            this.el = document.createElement('div');
            this.el.classList.add('main__login');
    
            let h1 = document.createElement('h1');
            h1.classList.add('main__login__header');
            h1.innerHTML = 'Вход';
            this.el.appendChild(h1);
    
            let form = document.createElement('form');
            form.classList.add('main__login__form');
            form.onsubmit = function() { self.login(); return 0; };
            form.method = 'POST';

            let emailError = document.createElement('p');
            emailError.classList.add('main__login__form__error', 'js-email-error');
            emailError.style.display = 'none';
            emailError.innerHTML = 'Пожалуйста, введите валидный e-mail!';
    
            let email = document.createElement('input');
            email.type = 'email';
            email.classList.add('main__login__form__input', 'js-email');
            email.required = true;
            email.placeholder = 'E-mail';

            let passwordError = document.createElement('p');
            passwordError.classList.add('main__login__form__error', 'js-password-error');
            passwordError.style.display = 'none';
            passwordError.innerHTML = 'Пожалуйста, введите пароль!';
    
            let password = document.createElement('input');
            password.type = 'password';
            password.classList.add('main__login__form__input', 'js-password');
            password.required = true;
            password.placeholder = 'Пароль';
    
            let submit = document.createElement('button');
            submit.classList.add('main__login__form__button', 'js-submit');
            submit.innerHTML = 'Войти!';

            let registrationLink = document.createElement('div');
            registrationLink.classList.add('main__login__form__link');
            registrationLink.onclick = function() { console.log('click'); hideLogin(); showRegistration(); return 0;};
            registrationLink.innerHTML = 'Регистрация';

            form.appendChild(emailError);
            form.appendChild(email);
            form.appendChild(passwordError);
            form.appendChild(password);
            form.appendChild(submit);
            form.appendChild(registrationLink);
            this.el.appendChild(form);
            document.querySelector('.main').appendChild(this.el);
        }

        validate () {
            if (document.querySelector('.js-email').value.search(/@/) == -1) {
                document.querySelector('.js-email-error').style.display = 'block';
                return false;
            } else {
                document.querySelector('.js-email-error').style.display = 'none';
            }
            if (document.querySelector('.js-password').value.length < 1) {
                document.querySelector('.js-password-error').style.display = 'block';
                return false;
            } else {
                document.querySelector('.js-password-error').style.display = 'none';
            }
            return true;
        }

        login () {
            if (!this.validate) {
                return;
            }
            let data = {
                email: document.querySelector('.js-email').value,
                password: document.querySelector('.js-password').value,
            };
            let response = request('/session', 'POST', data);
            console.log(response);
        }

    }
    window.LoginForm = LoginForm;

})();
