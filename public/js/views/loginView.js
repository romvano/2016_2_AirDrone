(function () {
  function showLogin() {
    if (typeof window === 'object') {
      const LoginForm = window.LoginForm;
      document.body.classList.add('body-login');
      const loginForm = new LoginForm();
    }
  }

  function hideLogin() {
    document.body.classList.remove('body-login');
    document.querySelector('.main__login').remove();
  }

  window.showLogin = showLogin;
  window.hideLogin = hideLogin;
}());
