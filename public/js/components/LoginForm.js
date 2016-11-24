(function () {
    const Button = window.Button;
    const Header = window.Header;
    const Input = window.Input;
    const Link = window.Link;
    const Message = window.Message;
    const request = window.request;

    class LoginForm {
        constructor(options = {}) {
            console.log(options.el)
            this._el = options.el;
            this.template = window.fest['login.tmpl'];
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
            self._form = self._el.querySelector('.js-login-form');
            self._form.onsubmit = function () { self.login(); return false; }
            self._form.children.email.onblur = function () { self.validateEmail(); }
            self._form.children.password.onblur = function () { self.validatePassword(); }
            self._form.children.password.onkeyup = function (e) { 
                if (e.keyCode !== 8 && e.keyCode !== 9) {
                    self.validatePassword();
                }
            }
            self._form.children.registration.onclick = function () { console.log('gotoreg'); self.router.go('/registration'); }
            self.emailError = self._form.children.emailError;
            self.passwordError = self._form.children.passwordError;
        }

        validateEmail() {
            const self = this;
            if (self._form.elements.email.value.search(/.@./) === -1) {
                self.emailError.style.display = 'block';
                self.emailError.innerHTML = 'Пожалуйста, проверьте правильность e-mail!';
                return false;
            }
            self.emailError.style.display = 'none';
            self.emailError.innerHTML = '';
            return true;
        }

        validatePassword() {
            const self = this;
            if (self._form.elements.password.value.length < 1) {
                self.passwordError.style.display = 'block';
                self.passwordError.innerHTML = 'Пожалуйста, введите пароль!';
                return false;
            }
            self.passwordError.style.display = 'none';
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
            const data = {
                email: self._form.elements.email.value,
                password: self._form.elements.password.value,
            };
            const response = request('https://air-drone.herokuapp.com/session', 'POST', data);
            switch (response.status) {
                case 400:
                case 403: self.emailError.innerHTML = 'Логин или пароль введены неверно!';
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
    window.LoginForm = LoginForm;
}());
