(function () {
    'use strict';

    let registrationData = {};

    class RegistrationForm1 {
        constructor () {
            let self = this;

            self.el = document.createElement('form');
            self.el.classList.add('registration__form');
            self.el.onsubmit = function() { self.nextStep(); return false; };

            self.h1 = new Header({
                text: 'Регистрация',
                attrs: {
                    class: 'registration__header'
                }
            });
    
            self.emailError = new Message({
                text: 'Пожалуйста, введите валидный e-mail!',
                attrs: {
                    hidden: 'hidden',
                    class: 'js-email-error registration__form__error'
                }
            });

            self.email = new Input({
                attrs: {
                    placeholder: 'E-mail',
                    type: 'email',
                    class: 'js-email registration__form__input'
                }
            });

            self.passwordError = new Message({
                text: 'Пожалуйста, введите пароль!',
                attrs: {
                    hidden: 'hidden',
                    class: ' js-password-error registration__form__error'
                }
            });
    
            self.password = new Input({
                attrs: {
                    placeholder: 'Password',
                    type: 'password',
                    class: 'js-password registration__form__input'
                }
            });
    
            self.submit = new Button({
                text: 'Продолжить',
                attrs: {
                    class: 'js_submit registration__form__button'
                }
            });
    
            self.el.appendChild(self.h1.render());
            self.el.appendChild(self.emailError.render());
            self.el.appendChild(self.email.render());
            self.el.appendChild(self.passwordError.render());
            self.el.appendChild(self.password.render());
            self.el.appendChild(self.submit.render());
        }

        render () {
            let self = this;
            return self.el;
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
            let self = this;
            if (!self.validate()) {
                return;
            }
            registrationData.email = self.email.value;
            registrationData.password = self.password.value;
            nextStepRegistration();
        }
    }

    class RegistrationForm2 {
        constructor () {
            let self = this;

            self.el = document.createElement('form');
            self.el.classList.add('registration__form');
            self.el.onsubmit = function() { self.register(); return false; };
    
            self.h1 = new Header({
                text: 'Познакомимся?',
                attrs: {
                    class: 'registration__header'
                }
            });
    
            self.loginError = new Message({
                text: 'Пожалуйста, введите логин!',
                attrs: {
                    hidden: 'hidden',
                    class: 'js-login-error registration__form__error'
                }
            });

            self.login = new Input({
                attrs: {
                    placeholder: 'Кликуха',
                    type: 'text',
                    class: 'js-login registration__form__input'
                }
            });
    
            self.submit = new Button({
                text: 'Зарегистрироваться!',
                attrs: {
                    class: 'js_submit registration__form__button'
                }
            });

            self.el.appendChild(self.h1.render());
            self.el.appendChild(self.loginError.render());
            self.el.appendChild(self.login.render());
            self.el.appendChild(self.submit.render());
        }

        render () {
            let self = this;
            return self.el;
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
            let self = this;
            if (!self.validate) {
                return;
            }
            registrationData.username = self.login.value;
            let response = request('https://air-drone.herokuapp.com/user', 'POST', registrationData);
            alert(response);
        }
    }

    window.RegistrationForm1 = RegistrationForm1;
    window.RegistrationForm2 = RegistrationForm2;
}) ();
