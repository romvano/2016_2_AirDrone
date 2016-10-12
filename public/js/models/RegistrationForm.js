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
                    class: 'js-email-error registration__form__error',
                    name: 'emailError'
                }
            });

            self.email = new Input({
                attrs: {
                    placeholder: 'E-mail',
                    type: 'text',
                    class: 'js-email registration__form__input',
                    name: 'email'
                },
                eventListeners: {
                    blur: function () { self.validateEmail(self); }
                }
            });

            self.passwordError = new Message({
                text: 'Пожалуйста, введите пароль!',
                attrs: {
                    hidden: 'hidden',
                    class: 'js-password-error registration__form__error',
                    name: 'passwordError'
                }
            });
    
            self.password = new Input({
                attrs: {
                    placeholder: 'Password',
                    type: 'password',
                    class: 'js-password registration__form__input',
                    name: 'password'
                }
            });
    
            self.submit = new Button({
                text: 'Продолжить',
                attrs: {
                    class: 'js_submit registration__form__button',
                    name: 'button'
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
        
        validateEmail (form) {
            if (form.el.elements.email.value.search(/.@./) == -1) {
                form.el.children.emailError.style.display = 'block';
                return false;
            }
            form.el.children.emailError.style.display = 'none';
            return true;
        }

        validatePassword (form) {
            if (form.el.elements.password.value.length < 1) {
                form.el.children.passwordError.style.display = 'block';
                return false;
            }
            form.el.children.passwordError.style.display = 'none';
            return true;
        }

        validate () {
            let self = this;
            return self.validateEmail(self) && self.validatePassword(self);
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
                    class: 'js-login-error registration__form__error',
                    name: 'loginError'
                }
            });

            self.login = new Input({
                attrs: {
                    placeholder: 'Кликуха',
                    type: 'text',
                    class: 'js-login registration__form__input',
                    name: 'login'
                }
            });
    
            self.submit = new Button({
                text: 'Зарегистрироваться!',
                attrs: {
                    class: 'js_submit registration__form__button',
                    name: 'login'
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

        validateLogin (form) {
            if (form.el.elements.login.value.length < 1) {
                form.el.children.loginError.style.display = 'block';
                return false;
            }
            form.el.children.loginError.style.display = 'none';
            return true;
        }

        validate () {
            let self = this;
            return self.validateLogin(self);
        }

        register () {
            let self = this;
            if (!self.validate()) {
                console.log('here');
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
