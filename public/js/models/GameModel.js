export default class GameModel {
    constructor (options = {}) {
        this.host = options.host || '/image/fill.jpg';
        this.ws = []; // this is for websocket
        this.error = '';
    }

    getHost () {
        return fetch('/host').then(response => {
            if (response.status !== 200) {
                return undefined;
            }
            return response.json();
        }).then(data => {
            this.host = data.host;
            this.error = '';
        }).catch(() => {
            this.error = `Can't reach the host ${this.host}!`;
        });
    }

    getVideo() {
        this.getHost();
        return this.host;
    }

    mechanics () {

    }

    connect () {

    }

    disconnect () {

    }
}
