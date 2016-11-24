(function () {
    const View = window.View;
    const LoginForm = window.LoginForm;
    const fest = window.fest;

    class LoginView extends View {
        constructor (options = {}) {
            super(options);
            this.setRouter(window.router);
            this._el = document.querySelector('.js-login');
            this.hide();
        }

        resume(options = {}) {
            const self = this;
            console.log('inresume: ', self._el)
            self._component = new LoginForm({
                el: self._el,
                router: self.router,
            });
            console.log(self._component._form.children.registration)
            self._component.render();
            self.show();
        }

        show(options = {}) {
            super.show();
            document.body.classList.add('body-login');
        }

        hide(options = {}) {
            super.hide();
            document.body.classList.remove('body-login');
        }
    }

    // export
    window.LoginView = LoginView;
}());
