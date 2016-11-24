(function () {
    const request = window.request;

    class RegistrationForm {
        constructor(options = {}) {
            console.log(options.el)
            this._el = options.el;
            this.template = window.fest['registration.tmpl'];
            console.log(window.fest);
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
            self._el.innerHTML = self.template(self.data);
            self._form = self._el.querySelector('.js-registration-form');
            self._form.onsubmit = function () { self.registration(); return false; }
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
            if (self._form.elements.email.value.search(/.@.\../) === -1) {
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
                self.passwordError.innerHTML = 'Пароли не совпадают!';
                self.passwordError.hidden = false;
            }
            self.passwordError.innerHTML = '';
            self.passwordError.hidden = true;
            return true;
        }

        validateLogin() {
            const self = this;
            if (self._form.elements.login.value.length < 1) {
                self.loginError.innerHTML = 'Пожалуйста, введите кликуху!';
                self.loginError.hidden = false;
                return false;
            }
            self.loginError.innerHTML = '';
            self.loginError.hidden = true;
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
            const data = {
                username: self._form.elements.login.value,
                email: self._form.elements.email.value,
                password: self._form.elements.password.value,
            }
            const response = request('https://air-drone.herokuapp.com/user', 'POST', data);
            switch (response.status) {
                case 400:
                case 403: self.emailError.innerHTML = 'Пользователь с таким адресом уже летает!';
                          self.passwordError.innerHTML = '';
                          self.emailError.hidden = false;
                          self.passwordError.hidden = true;
                          break;
                case 200: self.router.go('/rooms');
                          break;
                default: console.log('Что-то не так, но не 400');
            }
        }

    }

    // export
    window.RegistrationForm = RegistrationForm;
}());
