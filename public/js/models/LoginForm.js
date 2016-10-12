(function () {
    'use strict';

    class LoginForm {

        constructor () {
            let self = this;

            self.el = document.createElement('form');
            self.el.classList.add('login__form');
            self.el.onsubmit = function() { self.login(); return false; };

            self.h1 = new Header({
                text: 'Вход',
                attrs: {
                    class: 'login__header'
                }
            });
    
            self.emailError = new Message({
                text: 'Пожалуйста, введите валидный e-mail!',
                attrs: {
                    hidden: 'hidden',
                    class: 'js-email-error login__form__error',
                    name: 'emailError'
                }
            });
    
            self.email = new Input({
                attrs: {
                    placeholder: 'E-mail',
                    type: 'text',
                    class: 'js-email login__form__input',
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
                    class: 'js-password-error login__form__error',
                    name: 'passwordError'
                }
            });
    
            self.password = new Input({
                attrs: {
                    placeholder: 'Password',
                    type: 'password',
                    class: 'js-password login__form__input',
                    name: 'password'
                },
                eventListeners: {
                    blur: function () { self.validatePassword(self); },
                    keyup: function (e) {
                        if (e.keyCode != 9 && e.keyCode != 8) {
                            self.validatePassword(self);
                        }
                    }
                }
            });
    
            self.submit = new Button({
                text: 'Войти!',
                attrs: {
                    class: 'js_submit login__form__button',
                    name: 'button'
                }
            });

            self.registrationLink = new Link({
                text: 'Регистрация',
                attrs: {
                    class: 'login__form__link',
                    onclick: 'hideLogin(); showRegistration();',
                    name: 'registration'
                }
            });

            self.el.appendChild(self.h1.render());
            self.el.appendChild(self.emailError.render());
            self.el.appendChild(self.email.render());
            self.el.appendChild(self.passwordError.render());
            self.el.appendChild(self.password.render());
            self.el.appendChild(self.submit.render());
            self.el.appendChild(self.registrationLink.render());
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

        login () {
            let self = this;
            if (!self.validate()) {
                return;
            }
            let data = {
                email: self.email.value,
                password: self.password.value,
            };
            let response = request('https://air-drone.herokuapp.com/session', 'POST', data);
            alert(response);
        }

    }
    window.LoginForm = LoginForm;

})();
