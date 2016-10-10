(function () {
    'use strict';

    class LoginForm {

        constructor () {
            let self = this;

            self.el = document.createElement('form');
            self.el.classList.add('login__form');
            self.el.onsubmit = function() { self.login(); return 0; };

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
                    class: 'js-email-error login__form__error'
                }
            });
    
            self.email = new Input({
                attrs: {
                    placeholder: 'E-mail',
                    type: 'email',
                    class: 'js-email login__form__input'
                }
            });

            self.passwordError = new Message({
                text: 'Пожалуйста, введите пароль!',
                attrs: {
                    hidden: 'hidden',
                    class: ' js-password-error login__form__error'
                }
            });
    
            self.password = new Input({
                attrs: {
                    placeholder: 'Password',
                    type: 'password',
                    class: 'js-password login__form__input'
                }
            });
    
            self.submit = new Button({
                text: 'Войти!',
                attrs: {
                    class: 'js_submit login__form__button'
                }
            });

            self.registrationLink = document.createElement('div');
            self.registrationLink.classList.add('login__form__link');
            self.registrationLink.onclick = function() {
                console.log('click');
                hideLogin();
                showRegistration();
                return 0;
            };
            self.registrationLink.innerHTML = 'Регистрация';

            self.el.appendChild(self.h1.render());
            self.el.appendChild(self.emailError.render());
            self.el.appendChild(self.email.render());
            self.el.appendChild(self.passwordError.render());
            self.el.appendChild(self.password.render());
            self.el.appendChild(self.submit.render());
            self.el.appendChild(self.registrationLink);
        }

        render () {
            let self = this;
            return self.el.outerHTML;
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
            let self = this;
            if (!self.validate) {
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
