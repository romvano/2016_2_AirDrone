(function () {
    class Gameplay {
        constructor (src = 'https://r8---sn-jvhnu5g-n8vz.googlevideo.com/videoplayback?ratebypass=yes&signature=6F2BC9EB6F0CED150735BB29F0AC853704699ABC.74F4E4E030ACB897E170F52B1B2E31E1F77E1EAC&ei=l-MTWKDpLoWMYMHkhPAD&itag=22&sparams=dur%2Cei%2Cid%2Cinitcwndbps%2Cip%2Cipbits%2Citag%2Clmt%2Cmime%2Cmm%2Cmn%2Cms%2Cmv%2Cpl%2Cratebypass%2Crequiressl%2Csource%2Cupn%2Cexpire&requiressl=yes&initcwndbps=907500&mm=31&ipbits=0&mn=sn-jvhnu5g-n8vz&id=o-AInk3u5a3dqhi45lQtqsQWqBm52sHjzvYiK_FtFa83fe&mt=1477698405&dur=1809.554&mv=m&ms=au&ip=213.87.131.52&lmt=1477678704841032&upn=oHKkaK4IP-o&expire=1477720055&key=yt6&source=youtube&mime=video%2Fmp4&pl=26') {
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
