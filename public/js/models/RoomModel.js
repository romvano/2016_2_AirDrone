export default class RoomModel {
    constructor(data = {}) {
        this.id = data.id || 0;
        this.name = data.name || 'New Room';
        this.ip = data.ip || '127.0.0.1';
        this.drones = data.drones || [];
        this.endCondition = data.endCondition || 0;
        this.endValue = data.endValue || 0;
        this.availableColors = data.availableColors || [];
        this.error = '';
    }

    fetch() {
        const self = this;
        return fetch('/room', {
            body: JSON.stringify({
                room: self.id,
            })
        }).then(response => {
            if (response.status !== 200) {
                reject(response);
            }
            return response.json();
        }).then(data => {
            self.id = data.id;
            self.name = data.name;
            self.ip = data.ip;
            self.drones = data.drones;
            self.endCondition = data.endCondition;
            self.endValue = data.endValue;
            self.availableColors = data.availableColors;
            self.error = 0;
        }).catch(() => {
            self.error = 'Wrong room name';
        });
    }

    save() {
        self = this;
        return fetch('/room', {
            method: 'POST',
            body: JSON.stringify({
                name: self.name,
                ip: self.ip,
                drones: [],
                endCondition: self.endCondition,
                endValue: self.endValue,
            }).then(response => {
                if (response.status !== 200) {
                    reject(response);
                }
                return response.json();
            }).then(data => {
                self.error = '';
            }).catch(() => {
                self.error = 'Duplicated rooms!';
            });
        });
    }

    listDrones() {
        return this.drones;
    }
}
