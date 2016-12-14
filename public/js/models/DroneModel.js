export default class RoomModel {
    constructor(data = {}) {
        this.id = data.id || 0;
        this.color = data.color || undefined;
        this.playerLogin = data.playerLogin || 'New Player';
        this.playerId = data.playerId || 0;
        this.error = '';
    }

    save(room) {
        if (!room) {
            this.error = 'No room!';
            return;
        }
        return fetch('/games', {
            method: 'PUT',
            body: JSON.stringify({
                room: room,
                drone: {
                    id: this.id,
                    color: this.color,
                    playerLogin: this.playerLogin,
                    playerId: this.playerId,
                },
            })
        }).then(response => {
            if (response.status !== 200) {
                reject(response);
            }
            return response.json();
        }).then(data => {
            this.error = '';
        }).catch(() => {
            this.error = 'Failed to save drone!';
        });
    }
}
