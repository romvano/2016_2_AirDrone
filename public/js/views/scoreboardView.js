import View from '../modules/view';
import UserCollection from '../collections/UserCollection';
import template from '../../templates/scoreboard.tmpl.xml';

export default class ScoreboardView extends View {
    constructor (options = {}) {
        super({ element: '.js-scoreboard' });
        this.userCollection = new UserCollection();
    }

    resume(options = {}) {
        const self = this;
        self.render();
        self.show();
    }

    render() {
        const self = this;
        self.userCollection.fetch().then(() => {
            console.log('got here');
//            console.log('heeeeeeeeeeere', this.getCollection(), self.userCollection.getCollection());
            self._el.innerHTML = template(self.userCollection.getCollection());
        }).catch(()=>{console.log('sth wro')});
    }
}
