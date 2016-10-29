(function () {
    class Gameplay {
        constructor (src = 'http://172.20.10.11:8080/stream/video.mjpeg') {
            const self = this;
            self.el = document.createElement('video');
            self.el.width = window.innerWidth;
            self.el.height = window.innerHeight;
            self.el.src = src;
            self.el.controls = false;
            self.el.autoplay = 'autoplay';
        }

        render () {
            return this.el;
        }
    }

    window.Gameplay = Gameplay;
}());
