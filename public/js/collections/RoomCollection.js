export default class RoomCollection {
    constructor() {
        this._data = [];
    }

    fetch() {
        const self = this;
        return fetch('/games').then(response => {
            if (response.status !== 200) {
                reject(response);
            }
            return response.json();
        }).then(data => {
            self._data = data;
            self.sort();
        }).catch();
    }

    sort() {
        this._data.sort((a, b) => a.drones.length - b.drones.length);
    }

    getCollection() {
        return this._data;
    }
}
