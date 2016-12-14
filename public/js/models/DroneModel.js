export default class RoomModel {
    constructor(data = {}) {
        this.id = data.id || 0;
        this.color = data.color || undefined;
        this.playerLogin = data.playerLogin || 'New Player';
        this.playerId = data.playerId || 0;
        this.error = '';
    }

    save(room) {
        self = this;
        if (!room) {
            self.error = 'No room!';
            return;
        }
        return fetch('/games', {
            method: 'PUT',
            body: JSON.stringify({
                room: room,
                drone: {
                    id: self.id,
                    color: self.color,
                    playerLogin: self.playerLogin,
                    playerId: self.playerId,
                },
            })
        }).then(response => {
            if (response.status !== 200) {
                reject(response);
            }
            return response.json();
        }).then(data => {
            self.error = '';
        }).catch(() => {
            self.error = 'Failed to save drone!';
        });
    }
}
