// (function () {
//   let loginContainer;
// 
//   function showLogin() {
//     if (typeof window === 'object') {
//       const LoginForm = window.LoginForm;
//       document.body.classList.add('body-login'); // background image
//       const loginForm = new LoginForm();
//       loginContainer = document.querySelector('.login');
//       loginContainer.appendChild(loginForm.render());
//       loginContainer.style.display = 'inline';
//     }
//   }
// 
//   function hideLogin() {
//     document.body.classList.remove('body-login'); // bg image
//     loginContainer.innerHTML = '';
//     loginContainer.style.display = 'none';
//   }
// 
//   window.showLogin = showLogin;
//   window.hideLogin = hideLogin;
// }());

(function () {
    const View = window.View;
    const LoginForm = window.LoginForm;

    class LoginView extends View {
        constructor (options = {}) {
            super(options);
            this._el = document.querySelector('.js-login');
            this.hide();
        }

        init (options = {}) {
            super.init();
            const self = this;
            const tmpl = '/templates/login.tmpl.xml';
            self.html = fest.render(tmpl, {});
            const lf = new LoginForm(self.html);
        }

        render (options = {}) {
            super.init();
            const self = this;
            self._el.innerHTML = self.html;
        }
    }

    // export
    window.LoginView = LoginView;
}());
