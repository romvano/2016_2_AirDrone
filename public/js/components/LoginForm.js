import template from '../../templates/login.tmpl.xml';
console.log('imported: ', template);
//import template from '../templates/login.tmpl';
import request from '../libs';

export default class LoginForm {
    constructor(options = {}) {
        console.log(options.el)
        this._el = options.el;
        this.template = template;//window.fest['login.tmpl'];
        this.router = options.router;
        this.init();
        this.render();
        console.log(this._el.innerHTML)
    }

    init() {
        const self = this;
    }

    render() {
        const self = this;
        self._updateHtml();
    }
    
    _updateHtml() {
        const self = this;
        console.log(self.template);
        self._el.innerHTML = self.template(self.data);
        self._form = self._el.querySelector('.js-login-form');
        self._form.onsubmit = function () { self.login(); return false; }
        self._form.children.email.onblur = function () { self.validateEmail(); }
        self._form.children.password.onblur = function () { self.validatePassword(); }
        self._form.children.password.onkeyup = function (e) { 
            if (e.keyCode !== 8 && e.keyCode !== 9) {
                self.validatePassword();
            }
        }
        self._form.children.registration.onclick = function () { self.router.go('/registration'); }
        self.emailError = self._form.children.emailError;
        self.passwordError = self._form.children.passwordError;
    }

    validateEmail() {
        const self = this;
        if (self._form.elements.email.value.search(/.@./) === -1) {
            self.emailError.hidden = false;
            self.emailError.innerHTML = 'Пожалуйста, проверьте правильность e-mail!';
            return false;
        }
        self.emailError.hidden = true;
        self.emailError.innerHTML = '';
        return true;
    }

    validatePassword() {
        const self = this;
        if (self._form.elements.password.value.length < 1) {
            self.passwordError.hidden = false;
            self.passwordError.innerHTML = 'Пожалуйста, введите пароль!';
            return false;
        }
        self.passwordError.hidden = true;
        self.passwordError.innerHTML = '';
        return true;
    }

    validate() {
        const self = this;
        return self.validateEmail() && self.validatePassword();
    }

    login() {
        const self = this;
        if (!self.validate()) {
            return;
        }
        const user = new UserModel({
            email: self._form.elements.email.value,
            password: self._form.elements.password.value,
        });

        const response = user.login();
        self._form.children.emailError.innerHTML = user.getEmailError();
        self._form.children.passwordError.innerHTML = user.getPasswordError();
        self._form.children.emailError.hidden = self._form.children.emailError.innerHTML ? false : true;
        self._form.children.passwordError.hidden = self._form.children.passwordError.innerHTML ? false : true;
        if (response.status == 200) {
            self.router.go('/rooms');
        }
    }
}