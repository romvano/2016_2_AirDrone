import Router from './modules/router';
import LoginView from './views/loginView';
import RegistrationView from './views/registrationView';
import ScoreboardView from './views/scoreboardView';

let router = new Router();
router.addRoute('/login', LoginView);
router.addRoute('/registration', RegistrationView);
router.addRoute('/scoreboard', ScoreboardView);
router.addRoute('/', LoginView);
router.start();
window.router = router;
