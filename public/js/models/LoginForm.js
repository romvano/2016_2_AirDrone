(function () {
    'use strict';

    class LoginForm {

        constructor () {
            let self = this;

            self.el = document.createElement('div');
            self.el.classList.add('login');
    
            self.form = document.createElement('form');
            self.form.classList.add('login__form');
            self.form.onsubmit = function() { self.login(); return 0; };

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
            self.registrationLink.onclick = function() { console.log('click'); hideLogin(); showRegistration(); return 0;};
            self.registrationLink.innerHTML = 'Регистрация';

            self.form.appendChild(self.h1.render());
            self.form.appendChild(self.emailError.render());
            self.form.appendChild(self.email.render());
            self.form.appendChild(self.passwordError.render());
            self.form.appendChild(self.password.render());
            self.form.appendChild(self.submit.render());
            self.form.appendChild(self.registrationLink);
            this.el.appendChild(self.form);
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
            if (!this.validate) {
                return;
            }
            let data = {
                email: document.querySelector('.js-email').value,
                password: document.querySelector('.js-password').value,
            };
            let response = request('https://air-drone.herokuapp.com/session', 'POST', data);
            alert(response);
        }

    }
    window.LoginForm = LoginForm;

})();
