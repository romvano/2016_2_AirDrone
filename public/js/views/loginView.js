(function () {

  function showLogin() {
    if (typeof window === 'object') {
      const LoginForm = window.LoginForm;
      document.body.classList.add('body-login'); // background image
      const loginForm = new LoginForm();
      let loginContainer = document.querySelector('.login');
      loginContainer.appendChild(loginForm.render());
      loginContainer.style.display = 'inline';
    }
  }

  function hideLogin() {
    document.body.classList.remove('body-login'); // bg image
    let loginContainer = document.querySelector('.login');
    loginContainer.innerHTML = '';
    loginContainer.style.display = 'none';
  }

  window.showLogin = showLogin;
  window.hideLogin = hideLogin;
}());
