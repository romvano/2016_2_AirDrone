export default class GameModel {
    constructor (options = {}) {
        this.host = options.host || '/image/fill.jpg';
        this.ws = []; // this is for websocket
        this.error = '';
    }

    getHost () {
        const self = this;
        return fetch('/host').then(response => {
            if (response.status !== 200) {
                response(reject);
            }
            return response.json();
        }).then(data => {
            self.host = data.host;
            self.error = '';
        }).catch(() => {
            self.error = `Can't reach the host ${self.host}!`;
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
