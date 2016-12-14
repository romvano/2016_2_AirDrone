// TODO: user id from cookie to drone model
import View from '../modules/view';
import RoomCollection from '../collections/RoomCollection';
import DroneModel from '../models/DroneModel';
import template from '../../templates/rooms.tmpl.xml';

export default class RoomsView extends View {
    constructor (data = {}) {
        super({ element: '.js-rooms', bodyClass: 'body-rooms' });
        this.roomCollection = new RoomCollection();
        this.drone = new DroneModel();
        this.selectedRoom = undefined;
    }

    render () {
        const self = this;
        self.roomCollection.fetch().then(() => {
            self._el.innerHTML = template(self.roomCollection.getCollection());

            self.error = self._el.querySelector('.js-error');
    
            self.rooms = self._el.querySelectorAll('.rooms__room');
            for (const room of self.rooms) {
                room.onclick = function () { self.selectRoom(room, room.nextSibling) };
            }
    
            self.colors = self._el.querySelectorAll('.js-color');
            console.log(self.colors);
            for (const color of self.colors) {
                console.log(color);
                color.onclick = function () { console.log('entered color click'); self.selectColor(color) };
            }
            console.log('before join');
    
            self._join = self._el.querySelector('.js-join');
            console.log(self.join);
            self._join.onclick = function () { self.join(); };
            console.log('final');

            self._el.querySelector('.js-create').onclick = function () { self.router.go('/scoreboard'); };
        });
    }

    selectRoom (room, details) {
        const self = this;
        for (let i = 0; i < self.rooms.length; ++i) {
            if (self.rooms[i] !== room) {
                self.rooms[i].hidden = true;
            } else {
                self.selectedRoom = self.roomCollection.getCollection()[i].id;
            }
        }
        details.hidden = false;
    }

    selectColor(color) {
        console.log(color);
        const self = this;
        for (const c of self.colors) {
            if (c === color) {
                c.classList.add('rooms__details__colors__color-clicked');
                c.classList.remove('rooms__details__colors__color');
            } else {
                c.classList.add('rooms__details__colors__color');
                c.classList.remove('rooms__details__colors__color-clicked');
            }
        }
        self.drone.color = color.style['background-color'];
        self.error.textContent = '';
        self.error.hidden = true;
    }

    join() {
        const self = this;
        console.log(self.drone);
        if (self.drone.color !== undefined) {
            console.log('if');
            self.error.textContent = '';
            self.error.hidden = true;
            self.drone.save(self.selectedRoom).then(() => {
                if (self.drone.error !== '') {
                    self.error.textContent = 'Что-то пошло не так. Попробуйте еще раз!';
                    self.error.hidden = false;
                }
                self.router.go('/game');
            });
        } else {
            console.log('else');
            self.error.textContent = 'Выберите цвет дрона!';
            self.error.hidden = false;
        }
    }

    back (details) {
        const self = this;
        details.hidden = true;
        for (const r of self.rooms) {
            r.hidden = false;
        }
        self.selectedRoom = undefined;
    }

}
