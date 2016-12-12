export default class UserCollection {
    construtor() {
        this._data = [];
    }

    fetch() {
        const self = this;
        return fetch('/rating').then(response => {
                console.log('promise');
                    if (response.status !== 200) {
                        reject(response);
                    }
                    return response.json();
                }).then(data => {
                    self._data = data;
                    self.sort();
                    console.log('then', self._data);
                }).catch();
    }

    sort() {
        this._data.sort((a, b) => b.score - a.score);
    }

    getCollection() {
        return this._data;
    }
}
