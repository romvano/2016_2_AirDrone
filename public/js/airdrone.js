import Router from './modules/router';
import LoginView from './views/loginView';
import RegistrationView from './views/registrationView';

let router = new Router();
router.addRoute('/login', LoginView)
router.addRoute('/registration', RegistrationView)
router.addRoute('/', LoginView);
router.start();
window.router = router;
