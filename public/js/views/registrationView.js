import View from '../modules/view';
import template from '../../templates/registration.tmpl.xml';

export default class RegistrationView extends View {
    constructor (options = {}) {
        super({ element: '.js-registration', bodyClass: 'body-registration' });
    }

    render() {
        const self = this;
        self._el.innerHTML = template(self.data);
        self._form = self._el.querySelector('.js-registration-form');
        self._form.onsubmit = function () { self.register(); return false; }
        self._form.children.email.onblur = function () { self.validateEmail(); }
        self._form.children.password.onblur = function () { self.validatePassword(); }
        self._form.children.password.onkeyup = function (e) { 
            if (e.keyCode !== 8 && e.keyCode !== 9) {
                self.validatePassword();
            }
        }
        self._form.children.password2.onblur = function () { self.validatePassword(); }
        self._form.children.password2.onkeyup = function (e) {
            if (e.keyCode !== 8 && e.keyCode !== 9) {
                self.validatePassword();
            }
        }
        self._form.children.login.onblur = function () { self.validateLogin(); }
        self.emailError = self._form.children.emailError;
        self.passwordError = self._form.children.passwordError;
        self.loginError = self._form.children.loginError;
    }

    validateEmail() {
        const self = this;
        if (self._form.elements.email.value.search(/.+@.+\..+/) === -1) {
            self.emailError.innerHTML = 'Пожалуйста, проверьте правильность e-mail';
            self.emailError.style.display = 'block';
            return false;
        }
        self.emailError.style.display = 'none';
        self.emailError.innerHTML = '';
        return true;
    }

    validatePassword() {
        const self = this;
        if (self._form.elements.password.value.length < 1) {
            self.passwordError.innerHTML = 'Пожалуйста, введите пароль!';
            self.passwordError.hidden = false;
            return false;
        }
        if (self._form.elements.password.value.length < 8) {
            self.passwordError.innerHTML = 'Пароль нужен длиннее 8 символов =(';
            self.passwordError.hidden = false;
            return false;
        }
        if (self._form.elements.password2.value.length > 0
            && self._form.elements.password.value != self._form.elements.password2.value) {
            self._form.children.passwordError.innerHTML = 'Пароли не совпадают!';
            self.passwordError.hidden = false;
            return false;
        }
        self.passwordError.innerHTML = '';
        self.passwordError.hidden = true;
        return true;
    }

    validateLogin() {
        const self = this;
        if (self._form.elements.login.value.length < 1) {
            self.loginError.innerHTML = 'Пожалуйста, введите кликуху!';
            self.loginError.style.display = 'block';
            return false;
        }
        self.loginError.style.display = 'none';
        self.loginError.innerHTML = '';
        return true;
    }

    validate() {
        const self = this;
        return self.validateEmail(self) && self.validatePassword(self) && self.validateLogin(self);
    }

    register() {
        const self = this;
        if (!self.validate()) {
            return;
        }
        const user = new UserModel({
            username: self._form.elements.login.value,
            email: self._form.elements.email.value,
            password: self._form.elements.password.value,
        });

        const response = user.save();
        self._form.children.emailError.textContent = user.getEmailError();
        self._form.children.passwordError.textContent = user.getPasswordError();
        self._form.children.loginError.textContent = user.getLoginError();
        self._form.children.emailError.hidden = self._form.children.emailError.textContent ? false : true;
        self._form.children.loginError.hidden = self._form.children.loginError.textContent ? false : true;
        self._form.children.passwordError.hidden = self._form.children.passwordError.textContent ? false : true;
        if (response.status == 200) {
            self.router.go('/rooms');
        }
    }
}
