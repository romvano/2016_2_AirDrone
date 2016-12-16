(function () {
    'use strict';

    describe('GameModel class', function () {
        beforeEach(function () {
            this.model = new GameModel({ host: '128.0.2.33:8088' });
        });

		it('host is to be 128...', function () {
			expect(this.model.host).toBeDefined();
			expect(this.model.host.toBe('128.0.2.33:8088'));
		});
    })
}());
