(function () {
    function showGameplay() {
//        const src = '';
        window.hideLogin();
        window.hideRegistration();
        const gp = new Gameplay();
        document.body.appendChild(gp.render());
    }
    window.showGameplay = showGameplay;
}());
