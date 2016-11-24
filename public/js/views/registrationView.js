(function () {
    const View = window.View;
    const RegistrationForm = window.RegistrationForm;
    const fest = window.fest;

    class RegistrationView extends View {
        constructor (options = {}) {
            console.log('reg?')
            super(options);
            this.setRouter(window.router);
            this._el = document.querySelector('.js-registration');
            this.hide();
        }

        resume(options = {}) {
            const self = this;
            console.log('inresume: ', self._el)
            self._component = new RegistrationForm({
                el: self._el,
                router: self.router,
            });
            console.log('com: ', self._component)
            self._component.render();
            self.show();
        }

        show(options = {}) {
            super.show();
            this._el.hidden = false;
            document.body.classList.add('body-registration');
        }

        hide(options = {}) {
            super.hide();
            document.body.classList.remove('body-registration');
        }
    }

    // export
    window.RegistrationView = RegistrationView;
}());
