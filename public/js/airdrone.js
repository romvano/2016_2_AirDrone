(function () {
//  const showLogin = window.showLogin;
//  showLogin();
    const Router = window.Router;
    const LoginView = window.LoginView;
    const RegistrationView = window.RegistrationView;

    (new Router)
        .addRoute('/login', LoginView)
        .addRoute('/registration', RegistrationView)
        .addRoute('/', LoginView)
        .start();
    console.log('It must havebeenstarted')
}());
