import View from '../modules/view';
import UserCollection from '../collections/UserCollection';
import template from '../../templates/scoreboard.tmpl.xml';

export default class ScoreboardView extends View {
    constructor (options = {}) {
        super({ element: '.js-scoreboard', bodyClass: 'body-scoreboard' });
        this.userCollection = new UserCollection();
    }

    render() {
        const self = this;
        self.userCollection.fetch().then(() => {
            self._el.innerHTML = template(self.userCollection.getCollection());
        });
    }
}
