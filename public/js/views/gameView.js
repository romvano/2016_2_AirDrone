import View from '../modules/view';
import template from '../../templates/game.tmpl.xml';
import GameModel from '../models/GameModel';
import gameCanvas from '../canvas';

export default class GameView extends View {
    constructor (data = {}) {
        super({ element: '.js-game', bodyClass: 'body-game' });
        this._game = new GameModel();
    }

    render () {
        this._el.innerHTML = template({ source: this._game.getVideo() });
        gameCanvas();
    }
}
