import View from '../modules/view';
import RegistrationForm from '../components/RegistrationForm';

export default class RegistrationView extends View {
    constructor (options = {}) {
        options.element = '.js-registration';
        options.router = window.router;
        super(options);
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
