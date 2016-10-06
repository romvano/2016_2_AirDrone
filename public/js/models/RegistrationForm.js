(function () {
    'use strict';

    let registrationData = {};

    class RegistrationForm1 {
        constructor () {
            let self = this;
            this.el = document.createElement('div');
            this.el.classList.add('main__login');
    
            let h1 = document.createElement('h1');
            h1.classList.add('main__login__header');
            h1.innerHTML = 'Регистрация';
            this.el.appendChild(h1);
    
            let form = document.createElement('form');
            form.classList.add('main__login__form');
            form.onsubmit = function() { self.nextStep(); return false; };
//            form.method = 'POST';

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
            submit.innerHTML = 'Продолжить';
//            submit.onSubmit = nextStepRegistration();

            form.appendChild(emailError);
            form.appendChild(email);
            form.appendChild(passwordError);
            form.appendChild(password);
            form.appendChild(submit);
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

        nextStep () {
            if (!this.validate()) {
                return;
            }
            registrationData.email = document.querySelector('.js-email');
            registrationData.password = document.querySelector('.js-password');
            nextStepRegistration();
        }
    }

    class RegistrationForm2 {
        constructor () {
            let self = this;
            this.el = document.createElement('div');
            this.el.classList.add('main__login');
    
            let h1 = document.createElement('h1');
            h1.classList.add('main__login__header');
            h1.innerHTML = 'Познакомимся?';
            this.el.appendChild(h1);
    
            let form = document.createElement('form');
            form.classList.add('main__login__form');
            form.onsubmit = function() { self.register(); return false; };
//            form.method = 'POST';

            let loginError = document.createElement('p');
            loginError.classList.add('main__login__form__error', 'js-login-error');
            loginError.style.display = 'none';
            loginError.innerHTML = 'Пожалуйста, введите логин!';
    
            let login = document.createElement('input');
            login.type = 'text';
            login.classList.add('main__login__form__input', 'js-login');
            login.required = true;
            login.placeholder = 'Кликуха';
            
            let submit = document.createElement('button');
            submit.classList.add('main__login__form__button', 'js-submit');
            submit.innerHTML = 'Продолжить';
            
            form.appendChild(loginError);
            form.appendChild(login);
            form.appendChild(submit);
            this.el.appendChild(form);
            document.querySelector('.main').appendChild(this.el);
        }

        validate () {
            if (document.querySelector('.js-login').value.length < 1) {
                document.querySelector('.js-login-error').style.display = 'block';
                return false;
            } else {
                document.querySelector('.js-login-error').style.display = 'none';
            }
            return true;
        }

        register () {
            if (!this.validate) {
                return;
            }
            registrationData.username = document.querySelector('.js-login').value;
            let response = request('https://air-drone.herokuapp.com/user', 'POST', registrationData);
            alert(response);
        }
    }

    window.RegistrationForm1 = RegistrationForm1;
    window.RegistrationForm2 = RegistrationForm2;
}) ();
