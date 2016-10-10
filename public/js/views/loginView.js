(function () {
  let loginContainer;

  function showLogin() {
    if (typeof window === 'object') {
      const LoginForm = window.LoginForm;
      document.body.classList.add('body-login'); // background image
      const loginForm = new LoginForm();
      loginContainer = document.querySelector('.login');
      loginContainer.innerHTML = loginForm.render();
      loginContainer.style.display = 'inline';
    }
  }

  function hideLogin() {
    document.body.classList.remove('body-login'); // bg image
    loginContainer.setAttribute('hidden', 'hidden');
  }

  window.showLogin = showLogin;
  window.hideLogin = hideLogin;
}());
