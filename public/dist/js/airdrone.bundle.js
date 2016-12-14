webpackJsonp([0],{

/***/ 116:
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _route = __webpack_require__(137);

var _route2 = _interopRequireDefault(_route);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** Класс роутера */
var Router = function () {
	/**
  * Создаёт новый роутер или возвращает уже созданный инстанс
  */
	function Router() {
		_classCallCheck(this, Router);

		if (Router.__instance) {
			return Router.__instance;
		}

		this.routes = [];
		this.activeRoute = null;

		this.history = window.history;

		Router.__instance = this;
	}

	/**
  * Добавляет новый Route в роутер
  * @param {string} pathname - Шаблон пути
  * @param {View} view - Класс конкретной View
  * @param {Object} [options={}] - Дополнительные параметры, которые будут переданы во view при её создании и инициализации
  * @returns {Router}
  */


	_createClass(Router, [{
		key: 'addRoute',
		value: function addRoute(pathname, view) {
			var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

			var route = new _route2.default(pathname, view, options);
			route.setRouter(this);
			this.routes.push(route);
			return this;
		}

		/**
   * Запускает роутер и переходит по текущему пути в приложении
   * @param {Object} [state={}] - Объект state, который передаётся в первый вызов onroute
   */

	}, {
		key: 'start',
		value: function start() {
			var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			window.onpopstate = function (event) {
				var state = event.state;
				var pathname = window.location.pathname;
				this.onroute(pathname, state);
			}.bind(this);

			var pathname = window.location.pathname;
			this.onroute(pathname, state);
		}

		/**
   * Функция, вызываемая при переходе на новый роут в приложении
   * @param {string} pathname - Путь, по которому происходит переход
   * @param {Object} [state={}] - Объект state, который передаётся в вызов метода navigate
   */

	}, {
		key: 'onroute',
		value: function onroute(pathname) {
			var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

			var route = this.routes.find(function (route) {
				return route.match(pathname);
			});
			if (!route) {
				return;
			}

			if (this.activeRoute) {
				this.activeRoute.leave();
			}

			this.activeRoute = route;
			this.activeRoute.navigate(pathname, state);
		}

		/**
   * Программный переход на новый путь
   * @param {string} pathname - Путь
   * @param {Object} [state={}] - Объект state, который передаётся в вызов history.pushState
   */

	}, {
		key: 'go',
		value: function go(pathname) {
			var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

			if (window.location.pathname === pathname) {
				return;
			}
			this.history.pushState(state, '', pathname);
			this.onroute(pathname, state);
		}

		/**
   * Позволяет установить свою собственную реализацию History API
   * @param {Object} history - должен предоставлять реализацию методов back(), forward(), pushState()
   */

	}, {
		key: 'setHistory',
		value: function setHistory(history) {
			this.history = history;
		}

		/**
   * Возврат на один шаг назад в истории браузера
   */

	}, {
		key: 'back',
		value: function back() {
			this.history.back();
		}

		/**
   * Переход на один шаг вперёд в истории браузера
   */

	}, {
		key: 'forward',
		value: function forward() {
			this.history.forward();
		}
	}]);

	return Router;
}();

exports.default = Router;

/***/ },

/***/ 117:
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _view = __webpack_require__(45);

var _view2 = _interopRequireDefault(_view);

var _gameTmpl = __webpack_require__(125);

var _gameTmpl2 = _interopRequireDefault(_gameTmpl);

var _GameModel = __webpack_require__(135);

var _GameModel2 = _interopRequireDefault(_GameModel);

var _canvas = __webpack_require__(130);

var _canvas2 = _interopRequireDefault(_canvas);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GameView = function (_View) {
    _inherits(GameView, _View);

    function GameView() {
        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, GameView);

        var _this = _possibleConstructorReturn(this, (GameView.__proto__ || Object.getPrototypeOf(GameView)).call(this, { element: '.js-game', bodyClass: 'body-game' }));

        _this._game = new _GameModel2.default();
        return _this;
    }

    _createClass(GameView, [{
        key: 'render',
        value: function render() {
            var self = this;
            self._el.innerHTML = (0, _gameTmpl2.default)({ source: self._game.getVideo() });
            (0, _canvas2.default)();
        }
    }]);

    return GameView;
}(_view2.default);

exports.default = GameView;

/***/ },

/***/ 118:
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _view = __webpack_require__(45);

var _view2 = _interopRequireDefault(_view);

var _UserModel = __webpack_require__(86);

var _UserModel2 = _interopRequireDefault(_UserModel);

var _loginTmpl = __webpack_require__(126);

var _loginTmpl2 = _interopRequireDefault(_loginTmpl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LoginView = function (_View) {
    _inherits(LoginView, _View);

    function LoginView() {
        _classCallCheck(this, LoginView);

        return _possibleConstructorReturn(this, (LoginView.__proto__ || Object.getPrototypeOf(LoginView)).call(this, { element: '.js-login', bodyClass: 'body-login' }));
    }

    _createClass(LoginView, [{
        key: 'render',
        value: function render() {
            var self = this;
            self._el.innerHTML = (0, _loginTmpl2.default)(self.data);
            self._form = self._el.querySelector('.js-login-form');
            self._form.onsubmit = function () {
                self.login();return false;
            };
            self._form.children.email.onblur = function () {
                self.validateEmail();
            };
            self._form.children.password.onblur = function () {
                self.validatePassword();
            };
            self._form.children.password.onkeyup = function (e) {
                if (e.keyCode !== 8 && e.keyCode !== 9) {
                    self.validatePassword();
                }
            };
            self._form.children.registration.onclick = function () {
                self.router.go('/registration');
            };
            self.emailError = self._form.children.emailError;
            self.passwordError = self._form.children.passwordError;
        }
    }, {
        key: 'validateEmail',
        value: function validateEmail() {
            var self = this;
            if (self._form.elements.email.value.search(/.@./) === -1) {
                self.emailError.hidden = false;
                self.emailError.innerHTML = 'Пожалуйста, проверьте правильность e-mail!';
                return false;
            }
            self.emailError.hidden = true;
            self.emailError.innerHTML = '';
            return true;
        }
    }, {
        key: 'validatePassword',
        value: function validatePassword() {
            var self = this;
            if (self._form.elements.password.value.length < 1) {
                self.passwordError.hidden = false;
                self.passwordError.innerHTML = 'Пожалуйста, введите пароль!';
                return false;
            }
            self.passwordError.hidden = true;
            self.passwordError.innerHTML = '';
            return true;
        }
    }, {
        key: 'validate',
        value: function validate() {
            var self = this;
            return self.validateEmail() && self.validatePassword();
        }
    }, {
        key: 'login',
        value: function login() {
            var self = this;
            if (!self.validate()) {
                return;
            }
            var user = new _UserModel2.default({
                email: self._form.elements.email.value,
                password: self._form.elements.password.value
            });

            var response = user.login();
            self._form.children.emailError.innerHTML = user.getEmailError();
            self._form.children.passwordError.innerHTML = user.getPasswordError();
            self._form.children.emailError.hidden = self._form.children.emailError.innerHTML ? false : true;
            self._form.children.passwordError.hidden = self._form.children.passwordError.innerHTML ? false : true;
            if (response.status == 200) {
                self.router.go('/rooms');
            }
        }
    }]);

    return LoginView;
}(_view2.default);

exports.default = LoginView;

/***/ },

/***/ 119:
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _view = __webpack_require__(45);

var _view2 = _interopRequireDefault(_view);

var _UserModel = __webpack_require__(86);

var _UserModel2 = _interopRequireDefault(_UserModel);

var _registrationTmpl = __webpack_require__(127);

var _registrationTmpl2 = _interopRequireDefault(_registrationTmpl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RegistrationView = function (_View) {
    _inherits(RegistrationView, _View);

    function RegistrationView() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, RegistrationView);

        return _possibleConstructorReturn(this, (RegistrationView.__proto__ || Object.getPrototypeOf(RegistrationView)).call(this, { element: '.js-registration', bodyClass: 'body-registration' }));
    }

    _createClass(RegistrationView, [{
        key: 'render',
        value: function render() {
            var self = this;
            self._el.innerHTML = (0, _registrationTmpl2.default)(self.data);
            self._form = self._el.querySelector('.js-registration-form');
            self._form.onsubmit = function () {
                self.register();return false;
            };
            self._form.children.email.onblur = function () {
                self.validateEmail();
            };
            self._form.children.password.onblur = function () {
                self.validatePassword();
            };
            self._form.children.password.onkeyup = function (e) {
                if (e.keyCode !== 8 && e.keyCode !== 9) {
                    self.validatePassword();
                }
            };
            self._form.children.password2.onblur = function () {
                self.validatePassword();
            };
            self._form.children.password2.onkeyup = function (e) {
                if (e.keyCode !== 8 && e.keyCode !== 9) {
                    self.validatePassword();
                }
            };
            self._form.children.login.onblur = function () {
                self.validateLogin();
            };
            self.emailError = self._form.children.emailError;
            self.passwordError = self._form.children.passwordError;
            self.loginError = self._form.children.loginError;
        }
    }, {
        key: 'validateEmail',
        value: function validateEmail() {
            var self = this;
            if (self._form.elements.email.value.search(/.+@.+\..+/) === -1) {
                self.emailError.innerHTML = 'Пожалуйста, проверьте правильность e-mail';
                self.emailError.style.display = 'block';
                return false;
            }
            self.emailError.hidden = true;
            self.emailError.innerHTML = '';
            return true;
        }
    }, {
        key: 'validatePassword',
        value: function validatePassword() {
            var self = this;
            if (self._form.elements.password.value.length < 1) {
                self.passwordError.innerHTML = 'Пожалуйста, введите пароль!';
                self.passwordError.hidden = false;
                return false;
            }
            if (self._form.elements.password.value.length < 8) {
                self.passwordError.innerHTML = 'Пароль нужен длиннее 8 символов =(';
                self.passwordError.hidden = false;
                return false;
            }
            if (self._form.elements.password2.value.length > 0 && self._form.elements.password.value != self._form.elements.password2.value) {
                self._form.children.passwordError.innerHTML = 'Пароли не совпадают!';
                self.passwordError.hidden = false;
                return false;
            }
            self.passwordError.innerHTML = '';
            self.passwordError.hidden = true;
            return true;
        }
    }, {
        key: 'validateLogin',
        value: function validateLogin() {
            var self = this;
            if (self._form.elements.login.value.length < 1) {
                self.loginError.innerHTML = 'Пожалуйста, введите кликуху!';
                self.loginError.style.display = 'block';
                return false;
            }
            self.loginError.hidden = true;
            self.loginError.innerHTML = '';
            return true;
        }
    }, {
        key: 'validate',
        value: function validate() {
            var self = this;
            return self.validateEmail(self) && self.validatePassword(self) && self.validateLogin(self);
        }
    }, {
        key: 'register',
        value: function register() {
            var self = this;
            if (!self.validate()) {
                return;
            }
            var user = new _UserModel2.default({
                username: self._form.elements.login.value,
                email: self._form.elements.email.value,
                password: self._form.elements.password.value
            });

            var response = user.save();
            self._form.children.emailError.textContent = user.getEmailError();
            self._form.children.passwordError.textContent = user.getPasswordError();
            self._form.children.loginError.textContent = user.getLoginError();
            self._form.children.emailError.hidden = self._form.children.emailError.textContent ? false : true;
            self._form.children.loginError.hidden = self._form.children.loginError.textContent ? false : true;
            self._form.children.passwordError.hidden = self._form.children.passwordError.textContent ? false : true;
            if (response.status === 200) {
                self.router.go('/rooms');
            } else {
                console.log('some server magic error');
                self._form.children.emailError.textContent = user.getEmailError();
                self._form.children.emailError.textContent = 'То ли e-mail, то ли пароль не подходят. Я так и не понял логику сервака';
                self._form.children.emailError.hidden = false;
            }
        }
    }]);

    return RegistrationView;
}(_view2.default);

exports.default = RegistrationView;

/***/ },

/***/ 120:
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _view = __webpack_require__(45);

var _view2 = _interopRequireDefault(_view);

var _RoomCollection = __webpack_require__(131);

var _RoomCollection2 = _interopRequireDefault(_RoomCollection);

var _DroneModel = __webpack_require__(134);

var _DroneModel2 = _interopRequireDefault(_DroneModel);

var _roomsTmpl = __webpack_require__(128);

var _roomsTmpl2 = _interopRequireDefault(_roomsTmpl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // TODO: user id from cookie to drone model


var RoomsView = function (_View) {
    _inherits(RoomsView, _View);

    function RoomsView() {
        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, RoomsView);

        var _this = _possibleConstructorReturn(this, (RoomsView.__proto__ || Object.getPrototypeOf(RoomsView)).call(this, { element: '.js-rooms', bodyClass: 'body-rooms' }));

        _this.roomCollection = new _RoomCollection2.default();
        _this.drone = new _DroneModel2.default();
        _this.selectedRoom = undefined;
        return _this;
    }

    _createClass(RoomsView, [{
        key: 'render',
        value: function render() {
            var self = this;
            self.roomCollection.fetch().then(function () {
                self._el.innerHTML = (0, _roomsTmpl2.default)(self.roomCollection.getCollection());

                self.error = self._el.querySelector('.js-error');

                self.rooms = self._el.querySelectorAll('.rooms__room');
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    var _loop = function _loop() {
                        var room = _step.value;

                        room.onclick = function () {
                            self.selectRoom(room, room.nextSibling);
                        };
                    };

                    for (var _iterator = self.rooms[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        _loop();
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                self.colors = self._el.querySelectorAll('.js-color');
                console.log(self.colors);
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    var _loop2 = function _loop2() {
                        var color = _step2.value;

                        console.log(color);
                        color.onclick = function () {
                            console.log('entered color click');self.selectColor(color);
                        };
                    };

                    for (var _iterator2 = self.colors[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        _loop2();
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }

                console.log('before join');

                self._join = self._el.querySelector('.js-join');
                console.log(self.join);
                self._join.onclick = function () {
                    self.join();
                };
                console.log('final');

                self._el.querySelector('.js-create').onclick = function () {
                    self.router.go('/scoreboard');
                };
            });
        }
    }, {
        key: 'selectRoom',
        value: function selectRoom(room, details) {
            var self = this;
            for (var i = 0; i < self.rooms.length; ++i) {
                if (self.rooms[i] !== room) {
                    self.rooms[i].hidden = true;
                } else {
                    self.selectedRoom = self.roomCollection.getCollection()[i].id;
                }
            }
            details.hidden = false;
        }
    }, {
        key: 'selectColor',
        value: function selectColor(color) {
            console.log(color);
            var self = this;
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = self.colors[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var c = _step3.value;

                    if (c === color) {
                        c.classList.add('rooms__details__colors__color-clicked');
                        c.classList.remove('rooms__details__colors__color');
                    } else {
                        c.classList.add('rooms__details__colors__color');
                        c.classList.remove('rooms__details__colors__color-clicked');
                    }
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }

            self.drone.color = color.style['background-color'];
            self.error.textContent = '';
            self.error.hidden = true;
        }
    }, {
        key: 'join',
        value: function join() {
            var self = this;
            console.log(self.drone);
            if (self.drone.color !== undefined) {
                console.log('if');
                self.error.textContent = '';
                self.error.hidden = true;
                self.drone.save(self.selectedRoom).then(function () {
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
    }, {
        key: 'back',
        value: function back(details) {
            var self = this;
            details.hidden = true;
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = self.rooms[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var r = _step4.value;

                    r.hidden = false;
                }
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                        _iterator4.return();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
                    }
                }
            }

            self.selectedRoom = undefined;
        }
    }]);

    return RoomsView;
}(_view2.default);

exports.default = RoomsView;

/***/ },

/***/ 121:
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _view = __webpack_require__(45);

var _view2 = _interopRequireDefault(_view);

var _UserCollection = __webpack_require__(132);

var _UserCollection2 = _interopRequireDefault(_UserCollection);

var _scoreboardTmpl = __webpack_require__(129);

var _scoreboardTmpl2 = _interopRequireDefault(_scoreboardTmpl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScoreboardView = function (_View) {
    _inherits(ScoreboardView, _View);

    function ScoreboardView() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, ScoreboardView);

        var _this = _possibleConstructorReturn(this, (ScoreboardView.__proto__ || Object.getPrototypeOf(ScoreboardView)).call(this, { element: '.js-scoreboard', bodyClass: 'body-scoreboard' }));

        _this.userCollection = new _UserCollection2.default();
        return _this;
    }

    _createClass(ScoreboardView, [{
        key: 'render',
        value: function render() {
            var self = this;
            self.userCollection.fetch().then(function () {
                self._el.innerHTML = (0, _scoreboardTmpl2.default)(self.userCollection.getCollection());
            });
        }
    }]);

    return ScoreboardView;
}(_view2.default);

exports.default = ScoreboardView;

/***/ },

/***/ 125:
/***/ function(module, exports) {


/** 
 * =============================================================
 * /home/ivan/Documents/2016_2_AirDrone/public/templates/game.tmpl template
 * =============================================================
 */

module.exports = function (__fest_context){"use strict";var __fest_self=this,__fest_buf="",__fest_chunks=[],__fest_chunk,__fest_attrs=[],__fest_select,__fest_if,__fest_iterator,__fest_to,__fest_fn,__fest_html="",__fest_blocks={},__fest_params,__fest_element,__fest_debug_file="",__fest_debug_line="",__fest_debug_block="",__fest_element_stack = [],__fest_short_tags = {"area": true, "base": true, "br": true, "col": true, "command": true, "embed": true, "hr": true, "img": true, "input": true, "keygen": true, "link": true, "meta": true, "param": true, "source": true, "wbr": true},__fest_jschars = /[\\'"\/\n\r\t\b\f<>]/g,__fest_jschars_test = /[\\'"\/\n\r\t\b\f<>]/,__fest_htmlchars = /[&<>"]/g,__fest_htmlchars_test = /[&<>"]/,__fest_jshash = {"\"": "\\\"", "\\": "\\\\", "/": "\\/", "\n": "\\n", "\r": "\\r", "\t": "\\t", "\b": "\\b", "\f": "\\f", "'": "\\'", "<": "\\u003C", ">": "\\u003E"},__fest_htmlhash = {"&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;"},__fest_escapeJS = function __fest_escapeJS(value) {
		if (typeof value === 'string') {
			if (__fest_jschars_test.test(value)) {
				return value.replace(__fest_jschars, __fest_replaceJS);
			}
		}

		return value == null ? '' : value;
	},__fest_replaceJS = function __fest_replaceJS(chr) {
		return __fest_jshash[chr];
	},__fest_escapeHTML = function __fest_escapeHTML(value) {
		if (typeof value === 'string') {
			if (__fest_htmlchars_test.test(value)) {
				return value.replace(__fest_htmlchars, __fest_replaceHTML);
			}
		}

		return value == null ? '' : value;
	},__fest_replaceHTML = function __fest_replaceHTML(chr) {
		return __fest_htmlhash[chr];
	},__fest_extend = function __fest_extend(dest, src) {
		for (var key in src) {
			if (src.hasOwnProperty(key)) {
				dest[key] = src[key];
			}
		}
	},__fest_param = function __fest_param(fn) {
		fn.param = true;
		return fn;
	},i18n=__fest_self && typeof __fest_self.i18n === "function" ? __fest_self.i18n : function (str) {return str;},___fest_log_error;if(typeof __fest_error === "undefined"){___fest_log_error = (typeof console !== "undefined" && console.error) ? function(){return Function.prototype.apply.call(console.error, console, arguments)} : function(){};}else{___fest_log_error=__fest_error};function __fest_log_error(msg){___fest_log_error(msg+"\nin block \""+__fest_debug_block+"\" at line: "+__fest_debug_line+"\nfile: "+__fest_debug_file)}function __fest_call(fn, params,cp){if(cp)for(var i in params)if(typeof params[i]=="function"&&params[i].param)params[i]=params[i]();return fn.call(__fest_self,params)}var json=__fest_context;__fest_buf+=("<img class=\"game__video\" src=\"");try{__fest_buf+=(__fest_escapeHTML(json.source))}catch(e){__fest_log_error(e.message + "3");}__fest_buf+=("\"/><canvas class=\"game__canvas\">Ваш браузер морально устарел. Обновите. Быстро.</canvas>");__fest_to=__fest_chunks.length;if (__fest_to) {__fest_iterator = 0;for (;__fest_iterator<__fest_to;__fest_iterator++) {__fest_chunk=__fest_chunks[__fest_iterator];if (typeof __fest_chunk==="string") {__fest_html+=__fest_chunk;} else {__fest_fn=__fest_blocks[__fest_chunk.name];if (__fest_fn) __fest_html+=__fest_call(__fest_fn,__fest_chunk.params,__fest_chunk.cp);}}return __fest_html+__fest_buf;} else {return __fest_buf;}}

/***/ },

/***/ 126:
/***/ function(module, exports) {


/** 
 * =============================================================
 * /home/ivan/Documents/2016_2_AirDrone/public/templates/login.tmpl template
 * =============================================================
 */

module.exports = function (__fest_context){"use strict";var __fest_self=this,__fest_buf="",__fest_chunks=[],__fest_chunk,__fest_attrs=[],__fest_select,__fest_if,__fest_iterator,__fest_to,__fest_fn,__fest_html="",__fest_blocks={},__fest_params,__fest_element,__fest_debug_file="",__fest_debug_line="",__fest_debug_block="",__fest_element_stack = [],__fest_short_tags = {"area": true, "base": true, "br": true, "col": true, "command": true, "embed": true, "hr": true, "img": true, "input": true, "keygen": true, "link": true, "meta": true, "param": true, "source": true, "wbr": true},__fest_jschars = /[\\'"\/\n\r\t\b\f<>]/g,__fest_jschars_test = /[\\'"\/\n\r\t\b\f<>]/,__fest_htmlchars = /[&<>"]/g,__fest_htmlchars_test = /[&<>"]/,__fest_jshash = {"\"": "\\\"", "\\": "\\\\", "/": "\\/", "\n": "\\n", "\r": "\\r", "\t": "\\t", "\b": "\\b", "\f": "\\f", "'": "\\'", "<": "\\u003C", ">": "\\u003E"},__fest_htmlhash = {"&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;"},__fest_escapeJS = function __fest_escapeJS(value) {
		if (typeof value === 'string') {
			if (__fest_jschars_test.test(value)) {
				return value.replace(__fest_jschars, __fest_replaceJS);
			}
		}

		return value == null ? '' : value;
	},__fest_replaceJS = function __fest_replaceJS(chr) {
		return __fest_jshash[chr];
	},__fest_escapeHTML = function __fest_escapeHTML(value) {
		if (typeof value === 'string') {
			if (__fest_htmlchars_test.test(value)) {
				return value.replace(__fest_htmlchars, __fest_replaceHTML);
			}
		}

		return value == null ? '' : value;
	},__fest_replaceHTML = function __fest_replaceHTML(chr) {
		return __fest_htmlhash[chr];
	},__fest_extend = function __fest_extend(dest, src) {
		for (var key in src) {
			if (src.hasOwnProperty(key)) {
				dest[key] = src[key];
			}
		}
	},__fest_param = function __fest_param(fn) {
		fn.param = true;
		return fn;
	},i18n=__fest_self && typeof __fest_self.i18n === "function" ? __fest_self.i18n : function (str) {return str;},___fest_log_error;if(typeof __fest_error === "undefined"){___fest_log_error = (typeof console !== "undefined" && console.error) ? function(){return Function.prototype.apply.call(console.error, console, arguments)} : function(){};}else{___fest_log_error=__fest_error};function __fest_log_error(msg){___fest_log_error(msg+"\nin block \""+__fest_debug_block+"\" at line: "+__fest_debug_line+"\nfile: "+__fest_debug_file)}function __fest_call(fn, params,cp){if(cp)for(var i in params)if(typeof params[i]=="function"&&params[i].param)params[i]=params[i]();return fn.call(__fest_self,params)}var json=__fest_context;__fest_buf+=("<form class=\"js-login-form login__form\" name=\"loginForm\"><h1 class=\"login__header\">Вход</h1><span class=\"js-email-error login__form__error\" name=\"emailError\" hidden=\"hidden\"></span><input placeholder=\"E-mail\" class=\"js-email login__form__input\" name=\"email\" type=\"text\"/><span class=\"js-password-error login__form__error\" name=\"passwordError\" hidden=\"hidden\"></span><input placeholder=\"Password\" class=\"js-password login__form__input\" name=\"password\" type=\"password\"/><button class=\"js_submit login__form__button\" name=\"button\">Войти!</button><a class=\"login__form__link\" name=\"registration\">Регистрация</a></form>");__fest_to=__fest_chunks.length;if (__fest_to) {__fest_iterator = 0;for (;__fest_iterator<__fest_to;__fest_iterator++) {__fest_chunk=__fest_chunks[__fest_iterator];if (typeof __fest_chunk==="string") {__fest_html+=__fest_chunk;} else {__fest_fn=__fest_blocks[__fest_chunk.name];if (__fest_fn) __fest_html+=__fest_call(__fest_fn,__fest_chunk.params,__fest_chunk.cp);}}return __fest_html+__fest_buf;} else {return __fest_buf;}}

/***/ },

/***/ 127:
/***/ function(module, exports) {


/** 
 * =============================================================
 * /home/ivan/Documents/2016_2_AirDrone/public/templates/registration.tmpl template
 * =============================================================
 */

module.exports = function (__fest_context){"use strict";var __fest_self=this,__fest_buf="",__fest_chunks=[],__fest_chunk,__fest_attrs=[],__fest_select,__fest_if,__fest_iterator,__fest_to,__fest_fn,__fest_html="",__fest_blocks={},__fest_params,__fest_element,__fest_debug_file="",__fest_debug_line="",__fest_debug_block="",__fest_element_stack = [],__fest_short_tags = {"area": true, "base": true, "br": true, "col": true, "command": true, "embed": true, "hr": true, "img": true, "input": true, "keygen": true, "link": true, "meta": true, "param": true, "source": true, "wbr": true},__fest_jschars = /[\\'"\/\n\r\t\b\f<>]/g,__fest_jschars_test = /[\\'"\/\n\r\t\b\f<>]/,__fest_htmlchars = /[&<>"]/g,__fest_htmlchars_test = /[&<>"]/,__fest_jshash = {"\"": "\\\"", "\\": "\\\\", "/": "\\/", "\n": "\\n", "\r": "\\r", "\t": "\\t", "\b": "\\b", "\f": "\\f", "'": "\\'", "<": "\\u003C", ">": "\\u003E"},__fest_htmlhash = {"&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;"},__fest_escapeJS = function __fest_escapeJS(value) {
		if (typeof value === 'string') {
			if (__fest_jschars_test.test(value)) {
				return value.replace(__fest_jschars, __fest_replaceJS);
			}
		}

		return value == null ? '' : value;
	},__fest_replaceJS = function __fest_replaceJS(chr) {
		return __fest_jshash[chr];
	},__fest_escapeHTML = function __fest_escapeHTML(value) {
		if (typeof value === 'string') {
			if (__fest_htmlchars_test.test(value)) {
				return value.replace(__fest_htmlchars, __fest_replaceHTML);
			}
		}

		return value == null ? '' : value;
	},__fest_replaceHTML = function __fest_replaceHTML(chr) {
		return __fest_htmlhash[chr];
	},__fest_extend = function __fest_extend(dest, src) {
		for (var key in src) {
			if (src.hasOwnProperty(key)) {
				dest[key] = src[key];
			}
		}
	},__fest_param = function __fest_param(fn) {
		fn.param = true;
		return fn;
	},i18n=__fest_self && typeof __fest_self.i18n === "function" ? __fest_self.i18n : function (str) {return str;},___fest_log_error;if(typeof __fest_error === "undefined"){___fest_log_error = (typeof console !== "undefined" && console.error) ? function(){return Function.prototype.apply.call(console.error, console, arguments)} : function(){};}else{___fest_log_error=__fest_error};function __fest_log_error(msg){___fest_log_error(msg+"\nin block \""+__fest_debug_block+"\" at line: "+__fest_debug_line+"\nfile: "+__fest_debug_file)}function __fest_call(fn, params,cp){if(cp)for(var i in params)if(typeof params[i]=="function"&&params[i].param)params[i]=params[i]();return fn.call(__fest_self,params)}var json=__fest_context;__fest_buf+=("<form class=\"js-registration-form registration__form\"><h1 class=\"registration__header\">Познакомимся?</h1><span class=\"js-email-error registration__form__error\" name=\"emailError\" hidden=\"hidden\"></span><input placeholder=\"E-mail\" class=\"js-email registration__form__input\" name=\"email\" type=\"text\"/><span class=\"js-password-error registration__form__error\" name=\"passwordError\" hidden=\"hidden\"></span><input placeholder=\"Password\" class=\"js-password registration__form__input\" name=\"password\" type=\"password\"/><input placeholder=\"Confirm password\" class=\"js-password2 registration__form__input\" name=\"password2\" type=\"password\"/><span class=\"js-login-error registration__form__error\" name=\"loginError\" hidden=\"hidden\"></span><input placeholder=\"Кликуха\" class=\"js-login registration__form__input\" name=\"login\" type=\"text\"/><button class=\"js-submit registration__form__button\" name=\"button\">Зарегистрироваться!</button></form>");__fest_to=__fest_chunks.length;if (__fest_to) {__fest_iterator = 0;for (;__fest_iterator<__fest_to;__fest_iterator++) {__fest_chunk=__fest_chunks[__fest_iterator];if (typeof __fest_chunk==="string") {__fest_html+=__fest_chunk;} else {__fest_fn=__fest_blocks[__fest_chunk.name];if (__fest_fn) __fest_html+=__fest_call(__fest_fn,__fest_chunk.params,__fest_chunk.cp);}}return __fest_html+__fest_buf;} else {return __fest_buf;}}

/***/ },

/***/ 128:
/***/ function(module, exports) {


/** 
 * =============================================================
 * /home/ivan/Documents/2016_2_AirDrone/public/templates/rooms.tmpl template
 * =============================================================
 */

module.exports = function (__fest_context){"use strict";var __fest_self=this,__fest_buf="",__fest_chunks=[],__fest_chunk,__fest_attrs=[],__fest_select,__fest_if,__fest_iterator,__fest_to,__fest_fn,__fest_html="",__fest_blocks={},__fest_params,__fest_element,__fest_debug_file="",__fest_debug_line="",__fest_debug_block="",__fest_element_stack = [],__fest_short_tags = {"area": true, "base": true, "br": true, "col": true, "command": true, "embed": true, "hr": true, "img": true, "input": true, "keygen": true, "link": true, "meta": true, "param": true, "source": true, "wbr": true},__fest_jschars = /[\\'"\/\n\r\t\b\f<>]/g,__fest_jschars_test = /[\\'"\/\n\r\t\b\f<>]/,__fest_htmlchars = /[&<>"]/g,__fest_htmlchars_test = /[&<>"]/,__fest_jshash = {"\"": "\\\"", "\\": "\\\\", "/": "\\/", "\n": "\\n", "\r": "\\r", "\t": "\\t", "\b": "\\b", "\f": "\\f", "'": "\\'", "<": "\\u003C", ">": "\\u003E"},__fest_htmlhash = {"&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;"},__fest_escapeJS = function __fest_escapeJS(value) {
		if (typeof value === 'string') {
			if (__fest_jschars_test.test(value)) {
				return value.replace(__fest_jschars, __fest_replaceJS);
			}
		}

		return value == null ? '' : value;
	},__fest_replaceJS = function __fest_replaceJS(chr) {
		return __fest_jshash[chr];
	},__fest_escapeHTML = function __fest_escapeHTML(value) {
		if (typeof value === 'string') {
			if (__fest_htmlchars_test.test(value)) {
				return value.replace(__fest_htmlchars, __fest_replaceHTML);
			}
		}

		return value == null ? '' : value;
	},__fest_replaceHTML = function __fest_replaceHTML(chr) {
		return __fest_htmlhash[chr];
	},__fest_extend = function __fest_extend(dest, src) {
		for (var key in src) {
			if (src.hasOwnProperty(key)) {
				dest[key] = src[key];
			}
		}
	},__fest_param = function __fest_param(fn) {
		fn.param = true;
		return fn;
	},i18n=__fest_self && typeof __fest_self.i18n === "function" ? __fest_self.i18n : function (str) {return str;},___fest_log_error;if(typeof __fest_error === "undefined"){___fest_log_error = (typeof console !== "undefined" && console.error) ? function(){return Function.prototype.apply.call(console.error, console, arguments)} : function(){};}else{___fest_log_error=__fest_error};function __fest_log_error(msg){___fest_log_error(msg+"\nin block \""+__fest_debug_block+"\" at line: "+__fest_debug_line+"\nfile: "+__fest_debug_file)}function __fest_call(fn, params,cp){if(cp)for(var i in params)if(typeof params[i]=="function"&&params[i].param)params[i]=params[i]();return fn.call(__fest_self,params)}var json=__fest_context;__fest_buf+=("<h1 class=\"rooms__header\">Выберите игру</h1>");var i,room,__fest_iterator0;try{__fest_iterator0=json || {};}catch(e){__fest_iterator={};__fest_log_error(e.message);}for(i in __fest_iterator0){room=__fest_iterator0[i];__fest_buf+=("<div class=\"rooms__room\"><h2 class=\"rooms__room__header\">");try{__fest_buf+=(__fest_escapeHTML(room.name))}catch(e){__fest_log_error(e.message + "4");}__fest_buf+=(" (");try{__fest_buf+=(__fest_escapeHTML(room.ip))}catch(e){__fest_log_error(e.message + "4");}__fest_buf+=(")</h2></div><div class=\"rooms__details\" hidden=\"hidden\"><h1 class=\"rooms__details__header\">Выберите квадрокоптер:</h1><div class=\"rooms__details__colors\">");var i,color,__fest_iterator1;try{__fest_iterator1=room.availableColors || {};}catch(e){__fest_iterator={};__fest_log_error(e.message);}for(i in __fest_iterator1){color=__fest_iterator1[i];__fest_buf+=("<input class=\"rooms__details__colors__color js-color\" style=\"background-color:");try{__fest_buf+=(__fest_escapeHTML(color))}catch(e){__fest_log_error(e.message + "12");}__fest_buf+=("; color:");try{__fest_buf+=(__fest_escapeHTML(color))}catch(e){__fest_log_error(e.message + "12");}__fest_buf+=(";\"/>");}__fest_buf+=("</div><p class=\"js-error rooms__details__error\" hidden=\"hidden\"></p><button class=\"rooms__details__join js-join\">Присоединиться!</button><hr/><h1 class=\"rooms__details__header\">Уже в игре:</h1><table class=\"rooms__details__ul\"><ul>");var i,drone,__fest_iterator2;try{__fest_iterator2=room.drones || {};}catch(e){__fest_iterator={};__fest_log_error(e.message);}for(i in __fest_iterator2){drone=__fest_iterator2[i];__fest_buf+=("<tr class=\"room__details__ul__li\"><td><li>");try{__fest_buf+=(__fest_escapeHTML(drone.playerLogin))}catch(e){__fest_log_error(e.message + "27");}__fest_buf+=("</li></td><td><input type=\"text\" class=\"rooms__details__ul__li__color\" disabled=\"disabled\" style=\"background-color:");try{__fest_buf+=(__fest_escapeHTML(drone.color))}catch(e){__fest_log_error(e.message + "33");}__fest_buf+=(";\"/></td></tr>");}__fest_buf+=("</ul></table></div>");}__fest_buf+=("<hr/><button class=\"js-create rooms__create\">Лидеры</button>");__fest_to=__fest_chunks.length;if (__fest_to) {__fest_iterator = 0;for (;__fest_iterator<__fest_to;__fest_iterator++) {__fest_chunk=__fest_chunks[__fest_iterator];if (typeof __fest_chunk==="string") {__fest_html+=__fest_chunk;} else {__fest_fn=__fest_blocks[__fest_chunk.name];if (__fest_fn) __fest_html+=__fest_call(__fest_fn,__fest_chunk.params,__fest_chunk.cp);}}return __fest_html+__fest_buf;} else {return __fest_buf;}}

/***/ },

/***/ 129:
/***/ function(module, exports) {


/** 
 * =============================================================
 * /home/ivan/Documents/2016_2_AirDrone/public/templates/scoreboard.tmpl template
 * =============================================================
 */

module.exports = function (__fest_context){"use strict";var __fest_self=this,__fest_buf="",__fest_chunks=[],__fest_chunk,__fest_attrs=[],__fest_select,__fest_if,__fest_iterator,__fest_to,__fest_fn,__fest_html="",__fest_blocks={},__fest_params,__fest_element,__fest_debug_file="",__fest_debug_line="",__fest_debug_block="",__fest_element_stack = [],__fest_short_tags = {"area": true, "base": true, "br": true, "col": true, "command": true, "embed": true, "hr": true, "img": true, "input": true, "keygen": true, "link": true, "meta": true, "param": true, "source": true, "wbr": true},__fest_jschars = /[\\'"\/\n\r\t\b\f<>]/g,__fest_jschars_test = /[\\'"\/\n\r\t\b\f<>]/,__fest_htmlchars = /[&<>"]/g,__fest_htmlchars_test = /[&<>"]/,__fest_jshash = {"\"": "\\\"", "\\": "\\\\", "/": "\\/", "\n": "\\n", "\r": "\\r", "\t": "\\t", "\b": "\\b", "\f": "\\f", "'": "\\'", "<": "\\u003C", ">": "\\u003E"},__fest_htmlhash = {"&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;"},__fest_escapeJS = function __fest_escapeJS(value) {
		if (typeof value === 'string') {
			if (__fest_jschars_test.test(value)) {
				return value.replace(__fest_jschars, __fest_replaceJS);
			}
		}

		return value == null ? '' : value;
	},__fest_replaceJS = function __fest_replaceJS(chr) {
		return __fest_jshash[chr];
	},__fest_escapeHTML = function __fest_escapeHTML(value) {
		if (typeof value === 'string') {
			if (__fest_htmlchars_test.test(value)) {
				return value.replace(__fest_htmlchars, __fest_replaceHTML);
			}
		}

		return value == null ? '' : value;
	},__fest_replaceHTML = function __fest_replaceHTML(chr) {
		return __fest_htmlhash[chr];
	},__fest_extend = function __fest_extend(dest, src) {
		for (var key in src) {
			if (src.hasOwnProperty(key)) {
				dest[key] = src[key];
			}
		}
	},__fest_param = function __fest_param(fn) {
		fn.param = true;
		return fn;
	},i18n=__fest_self && typeof __fest_self.i18n === "function" ? __fest_self.i18n : function (str) {return str;},___fest_log_error;if(typeof __fest_error === "undefined"){___fest_log_error = (typeof console !== "undefined" && console.error) ? function(){return Function.prototype.apply.call(console.error, console, arguments)} : function(){};}else{___fest_log_error=__fest_error};function __fest_log_error(msg){___fest_log_error(msg+"\nin block \""+__fest_debug_block+"\" at line: "+__fest_debug_line+"\nfile: "+__fest_debug_file)}function __fest_call(fn, params,cp){if(cp)for(var i in params)if(typeof params[i]=="function"&&params[i].param)params[i]=params[i]();return fn.call(__fest_self,params)}var json=__fest_context;__fest_buf+=("<h1 class=\"scoreboard__header\">Лидеры</h1><table class=\"scoreboard__table\"><tr class=\"scoreboard__table__tr\"><td class=\"scoreboard__table__tr__td\">#</td><td class=\"scoreboard__table__tr__td\">Имя</td><td class=\"scoreboard__table__tr__td\">Количество боев</td><td class=\"scoreboard__table__tr__td\">Процент побед</td></tr>");var i,data,__fest_iterator0;try{__fest_iterator0=json || {};}catch(e){__fest_iterator={};__fest_log_error(e.message);}for(i in __fest_iterator0){data=__fest_iterator0[i];__fest_buf+=("<tr class=\"scoreboard__table__tr\"><td class=\"scoreboard__table__tr__td\">");try{__fest_buf+=(__fest_escapeHTML(i))}catch(e){__fest_log_error(e.message + "12");}__fest_buf+=("</td><td class=\"scoreboard__table__tr__td\">");try{__fest_buf+=(__fest_escapeHTML(data.username))}catch(e){__fest_log_error(e.message + "13");}__fest_buf+=("</td><td class=\"scoreboard__table__tr__td\">");try{__fest_buf+=(__fest_escapeHTML(data.games))}catch(e){__fest_log_error(e.message + "14");}__fest_buf+=("</td><td class=\"scoreboard__table__tr__td\">");try{__fest_buf+=(__fest_escapeHTML(data.score))}catch(e){__fest_log_error(e.message + "15");}__fest_buf+=(" %</td></tr>");}__fest_buf+=("</table>");__fest_to=__fest_chunks.length;if (__fest_to) {__fest_iterator = 0;for (;__fest_iterator<__fest_to;__fest_iterator++) {__fest_chunk=__fest_chunks[__fest_iterator];if (typeof __fest_chunk==="string") {__fest_html+=__fest_chunk;} else {__fest_fn=__fest_blocks[__fest_chunk.name];if (__fest_fn) __fest_html+=__fest_call(__fest_fn,__fest_chunk.params,__fest_chunk.cp);}}return __fest_html+__fest_buf;} else {return __fest_buf;}}

/***/ },

/***/ 130:
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = gameCanvas;
function gameCanvas() {
    var mode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    var particles = [];

    // canvas and 2D context initialization
    var canvas = document.querySelector(".game__canvas");
    var context2D = canvas.getContext("2d");

    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    // starting the game loop at 60 frames per second
    var frameRate = 60.0;
    var frameDelay = 1000.0 / frameRate;

    var status = parseFloat(1.0);

    var startTime = 0;

    setInterval(function () {
        update(frameDelay);
    }, frameDelay);

    function randomFloat(min, max) {
        return min + Math.random() * (max - min);
    }

    /*
     * A single explosion particle
     */
    function Particle() {
        this.scale = 1.2;
        this.x = 0;
        this.y = 0;
        this.radius = 20;
        this.color = "#000";
        this.velocityX = 0;
        this.velocityY = 0;
        this.scaleSpeed = 0.5;
        this.update = function (ms) {
            // shrinking
            this.scale -= this.scaleSpeed * ms / 1000.0;

            if (this.scale <= 0) {
                this.scale = 0;
            }

            // moving away from explosion center
            this.x += this.velocityX * ms / 1000.0;
            this.y += this.velocityY * ms / 1000.0;
        };

        this.draw = function (context2D) {
            // translating the 2D context to the particle coordinates
            context2D.save();
            context2D.translate(this.x, this.y);
            context2D.scale(this.scale, this.scale);

            // drawing a filled circle in the particle's local space
            context2D.beginPath();
            context2D.arc(0, 0, this.radius, 0, Math.PI * 2, true);
            context2D.closePath();

            context2D.fillStyle = this.color;
            context2D.fill();

            context2D.restore();
        };
    }

    /*
     * Advanced Explosion effect
     * Each particle has a different size, move speed and scale speed.
     *
     * Parameters:
     * 	x, y - explosion center
     * 	color - particles' color
     */
    function createExplosion(x, y, color) {
        var minSize = 8;
        var maxSize = 30;
        var count = 15;
        var minSpeed = 80.0;
        var maxSpeed = 220.0;
        var minScaleSpeed = 1.0;
        var maxScaleSpeed = 2.0;

        for (var angle = 0; angle < 360; angle += Math.round(360 / count)) {
            var particle = new Particle();

            particle.x = x;
            particle.y = y;

            particle.radius = randomFloat(minSize, maxSize);

            particle.color = color;

            particle.scaleSpeed = randomFloat(minScaleSpeed, maxScaleSpeed);

            var speed = randomFloat(minSpeed, maxSpeed);

            particle.velocityX = speed * Math.cos(angle * Math.PI / 180.0);
            particle.velocityY = speed * Math.sin(angle * Math.PI / 180.0);

            particles.push(particle);
        }
    }

    //Const size variables
    var rectSize = window.innerWidth / 3;
    var marginY = (window.innerHeight - rectSize) * 0.5;
    var statusMargin = (window.innerHeight - rectSize) * 0.5 + rectSize + 5;
    var alertSize = 0.7 * rectSize;
    var alertMargin = 0.15 * rectSize;

    function update(frameDelay) {
        context2D.clearRect(0, 0, window.innerWidth, window.innerHeight);
        // update and draw particles
        for (var i = 0; i < particles.length; i++) {
            var particle = particles[i];

            particle.update(frameDelay);
            particle.draw(context2D);
            if (particle.scale == 0) {
                particles.splice(i, 1);
            }
        }
        // draw aiming window
        drawStatus(0.5 * rectSize, 0.1 * rectSize, marginY - rectSize * 0.1 - 5, "#4d4d4d", "Зона захвата", 1, 10);
        roundRect(context2D, rectSize, marginY, rectSize, rectSize, 20, "red", false);
        switch (mode) {
            case 1:
                drawStatus(rectSize, 0.2 * 0.7 * rectSize, statusMargin, "green", "Захват цели...", status, 20);
                status = parseFloat(status) + parseFloat(0.007);
                if (status > 1) {
                    var x = canvas.width * 0.5;
                    var y = canvas.height * 0.5;
                    createExplosion(x, y, "#525252");
                    createExplosion(x, y, "#FFA318");
                    createExplosion(x, y, "#525252");
                    createExplosion(x, y, "#FFA318");
                    mode = 0;
                }
                break;
            case 2:
                if (status < 1) {
                    drawStatus(rectSize, 0.2 * 0.7 * rectSize, statusMargin, "#cc0000", "Вы под ударом!", status, 20);
                    status = parseFloat(status) + parseFloat(0.007);
                } else {
                    if (startTime != 0) {
                        context2D.globalAlpha = 0.75;
                        roundRect(context2D, rectSize + alertMargin, marginY + alertMargin, alertSize, alertSize, 20, "#4d4d4d", true, false);
                        context2D.globalAlpha = 1;
                        context2D.font = '25px Helvetica';
                        context2D.fillStyle = 'white';
                        context2D.textAlign = "center";
                        context2D.fillText("Вы подбиты!", rectSize + rectSize * 0.5, marginY + alertMargin + 0.3 * alertSize, alertSize);
                        context2D.font = '20px Helvetica';
                        context2D.fillText("Ограничение действует:", rectSize + rectSize * 0.5, marginY + alertMargin + 0.5 * alertSize, alertSize);
                        seconds = 10 - (new Date().getTime() - startTime) / 1000;
                        seconds = parseInt(seconds);
                        context2D.fillText(seconds + " секунд", rectSize + rectSize * 0.5, marginY + alertMargin + 0.6 * alertSize, alertSize);
                        if (seconds <= 0) {
                            mode = 0;
                            startTime = 0;
                        }
                    } else {
                        startTime = new Date().getTime();
                    }
                    //                alert();
                    //                mode = 0;
                }
                break;
        }
    }

    function drawStatus(size, height, offsetY, color, label, realSize, radius) {
        context2D.globalAlpha = 0.5;
        var xMargin = (window.innerWidth - size) * 0.5;
        roundRect(context2D, xMargin, offsetY, size * realSize, height, radius, color, true, false);
        roundRect(context2D, xMargin, offsetY, size, height, radius, color, true, false);
        context2D.globalAlpha = 1;
        context2D.font = '20px Helvetica';
        context2D.fillStyle = 'white';
        context2D.textAlign = "center";
        context2D.fillText(label, xMargin + size * 0.5, offsetY + height * 0.6, size);
    }

    function roundRect(context2D, x, y, width, height, radius, color, fill, stroke) {
        if (typeof color == 'undefined') {
            color = "black";
        }
        if (typeof stroke == 'undefined') {
            stroke = true;
        }
        if (typeof radius === 'undefined') {
            radius = 5;
        }
        if (typeof radius === 'number') {
            radius = { tl: radius, tr: radius, br: radius, bl: radius };
        } else {
            var defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
            for (var side in defaultRadius) {
                radius[side] = radius[side] || defaultRadius[side];
            }
        }
        context2D.lineWidth = 10;
        context2D.strokeStyle = color;
        context2D.fillStyle = color;
        context2D.beginPath();
        context2D.moveTo(x + radius.tl, y);
        context2D.lineTo(x + width - radius.tr, y);
        context2D.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
        context2D.lineTo(x + width, y + height - radius.br);
        context2D.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
        context2D.lineTo(x + radius.bl, y + height);
        context2D.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
        context2D.lineTo(x, y + radius.tl);
        context2D.quadraticCurveTo(x, y, x + radius.tl, y);
        context2D.closePath();
        if (fill) {
            context2D.fill();
        }
        if (stroke) {
            context2D.stroke();
        }
    }

    //Чтобы сбросить выполнения анимации (бывает в этом надобность)
    //достаточно приравнять mode нулю!

    //Чтобы запустить анимации нужно просто выставить нужный mode
    //и обнулить переменную прогресс бара
    window.onkeydown = function (evt) {
        evt = evt || window.event;
        //Квадракоптер под ударом
        if (evt.keyCode == 90) {
            mode = 1;
            status = parseFloat(0.0);
        }
        //Захват противника
        else if (evt.keyCode == 88) {
                mode = 2;
                status = parseFloat(0.0);
            }
    };
}

/***/ },

/***/ 131:
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RoomCollection = function () {
    function RoomCollection() {
        _classCallCheck(this, RoomCollection);

        this._data = [];
    }

    _createClass(RoomCollection, [{
        key: 'fetch',
        value: function (_fetch) {
            function fetch() {
                return _fetch.apply(this, arguments);
            }

            fetch.toString = function () {
                return _fetch.toString();
            };

            return fetch;
        }(function () {
            var self = this;
            return fetch('/games').then(function (response) {
                if (response.status !== 200) {
                    reject(response);
                }
                return response.json();
            }).then(function (data) {
                self._data = data;
                self.sort();
            }).catch();
        })
    }, {
        key: 'sort',
        value: function sort() {
            this._data.sort(function (a, b) {
                return a.drones.length - b.drones.length;
            });
        }
    }, {
        key: 'getCollection',
        value: function getCollection() {
            return this._data;
        }
    }]);

    return RoomCollection;
}();

exports.default = RoomCollection;

/***/ },

/***/ 132:
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserCollection = function () {
    function UserCollection() {
        _classCallCheck(this, UserCollection);
    }

    _createClass(UserCollection, [{
        key: 'construtor',
        value: function construtor() {
            this._data = [];
        }
    }, {
        key: 'fetch',
        value: function (_fetch) {
            function fetch() {
                return _fetch.apply(this, arguments);
            }

            fetch.toString = function () {
                return _fetch.toString();
            };

            return fetch;
        }(function () {
            var self = this;
            return fetch('/rating').then(function (response) {
                console.log('promise');
                if (response.status !== 200) {
                    reject(response);
                }
                return response.json();
            }).then(function (data) {
                self._data = data;
                self.sort();
                console.log('then', self._data);
            }).catch();
        })
    }, {
        key: 'sort',
        value: function sort() {
            this._data.sort(function (a, b) {
                return b.score - a.score;
            });
        }
    }, {
        key: 'getCollection',
        value: function getCollection() {
            return this._data;
        }
    }]);

    return UserCollection;
}();

exports.default = UserCollection;

/***/ },

/***/ 133:
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = request;
function request(url, method, data) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url, false);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(data));

  return xhr;
}

/***/ },

/***/ 134:
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RoomModel = function () {
    function RoomModel() {
        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, RoomModel);

        this.id = data.id || 0;
        this.color = data.color || undefined;
        this.playerLogin = data.playerLogin || 'New Player';
        this.playerId = data.playerId || 0;
        this.error = '';
    }

    _createClass(RoomModel, [{
        key: 'save',
        value: function save(room) {
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
                        playerId: self.playerId
                    }
                })
            }).then(function (response) {
                if (response.status !== 200) {
                    reject(response);
                }
                return response.json();
            }).then(function (data) {
                self.error = '';
            }).catch(function () {
                self.error = 'Failed to save drone!';
            });
        }
    }]);

    return RoomModel;
}();

exports.default = RoomModel;

/***/ },

/***/ 135:
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameModel = function () {
    function GameModel() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, GameModel);

        this.host = options.host || '/image/fill.jpg';
        this.ws = []; // this is for websocket
        this.error = '';
    }

    _createClass(GameModel, [{
        key: 'getHost',
        value: function getHost() {
            var self = this;
            return fetch('/host').then(function (response) {
                if (response.status !== 200) {
                    response(reject);
                }
                return response.json();
            }).then(function (data) {
                self.host = data.host;
                self.error = '';
            }).catch(function () {
                self.error = 'Can\'t reach the host ' + self.host + '!';
            });
        }
    }, {
        key: 'getVideo',
        value: function getVideo() {
            this.getHost();
            return this.host;
        }
    }, {
        key: 'mechanics',
        value: function mechanics() {}
    }, {
        key: 'connect',
        value: function connect() {}
    }, {
        key: 'disconnect',
        value: function disconnect() {}
    }]);

    return GameModel;
}();

exports.default = GameModel;

/***/ },

/***/ 136:
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = pathToRegex;
function pathToRegex(pathname) {
	var keyNames = [];
	var parts = pathname.split('/').filter(function (part) {
		return part;
	}).map(function (part) {
		if (/^:/.exec(part)) {
			keyNames.push(part.slice(1));
			return new RegExp('^/([^/]+)', 'i');
		}
		return new RegExp('^/' + part, 'i');
	});

	return function (path) {

		var keys = [];
		var check = parts.every(function (regexp, step) {
			var tmp = regexp.exec(path);
			if (!tmp) {
				return false;
			}
			if (tmp.length === 2) {
				keys.push(tmp[1]);
			}
			path = path.replace(regexp, '');
			return true;
		});

		if (check) {
			return keys.reduce(function (prev, curr, pos) {
				prev[keyNames[pos]] = curr;
				return prev;
			}, {});
		}
		return null;
	};
};

/***/ },

/***/ 137:
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pathToRegex = __webpack_require__(136);

var _pathToRegex2 = _interopRequireDefault(_pathToRegex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var id = 0;

/** Класс представляет собой Путь в вашем приложении */
var Route = function () {
	/**
  * Создаёт новый Route - ассоциирует некоторую view с шаблоном пути
  * @param {string} pathname - Шаблон пути
  * @param {View} view - Класс конкретной View
  * @param {Object} [options={}] - Дополнительные параметры, которые будут переданы во view при её создании и инициализации
  */
	function Route(pathname, view) {
		var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

		_classCallCheck(this, Route);

		//TODO: Сущий адище, нам нужно менеджерить депсы
		this.pathToRegex = _pathToRegex2.default;

		this.id = 'p' + id;
		id++;
		this.pathname = pathname;
		this.regex = this.pathToRegex(pathname);
		this.View = view;
		this.options = options;
	}

	/**
  * Проверяет, соответствует ли переданный pathname текущему Route
  * @param {string} pathname - Путь в приложении
  * @returns {boolean} Результат проверки
  */


	_createClass(Route, [{
		key: 'match',
		value: function match(pathname) {
			return !!this.regex(pathname);
		}

		/**
   * Активирует текущий Route (переходит по нему)
   * @param {string} pathname - Путь в приложении
   * @param {Object} [state={}] - Объект state, который был передан в событие popstate для объекта window
   */

	}, {
		key: 'navigate',
		value: function navigate(pathname) {
			var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

			state = state || {};
			var keys = this.regex(pathname);
			if (!this._view) {
				var view = new this.View(this.options);
				view.init(this.options);
				view.setRouter(this.__router);
				this._view = view;
			}

			this._view.resume(Object.assign(state, keys));
		}

		/**
   * Деактивирует текущий Route
   */

	}, {
		key: 'leave',
		value: function leave() {
			this._view && this._view.pause();
		}

		/**
   * Устанавливает текущему Route инстанс роутера
   * @param {Router} router - Инстанс роутера
   */

	}, {
		key: 'setRouter',
		value: function setRouter(router) {
			this.__router = router;
		}
	}]);

	return Route;
}();

exports.default = Route;

/***/ },

/***/ 322:
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var _router = __webpack_require__(116);

var _router2 = _interopRequireDefault(_router);

var _loginView = __webpack_require__(118);

var _loginView2 = _interopRequireDefault(_loginView);

var _registrationView = __webpack_require__(119);

var _registrationView2 = _interopRequireDefault(_registrationView);

var _scoreboardView = __webpack_require__(121);

var _scoreboardView2 = _interopRequireDefault(_scoreboardView);

var _roomsView = __webpack_require__(120);

var _roomsView2 = _interopRequireDefault(_roomsView);

var _gameView = __webpack_require__(117);

var _gameView2 = _interopRequireDefault(_gameView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = new _router2.default();
router.addRoute('/login', _loginView2.default);
router.addRoute('/registration', _registrationView2.default);
router.addRoute('/scoreboard', _scoreboardView2.default);
router.addRoute('/rooms', _roomsView2.default);
router.addRoute('/game', _gameView2.default);
router.addRoute('/', _loginView2.default);
router.start();
window.router = router;

/***/ },

/***/ 45:
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Класс представляет собой view
 */
var View = function () {
	/**
  * Создаёт новую view
  * @param {Object} [options={}] - Объект с параметрами
  */
	function View() {
		var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

		_classCallCheck(this, View);

		this.setRouter(window.router);
		this.tagName = options.tagName || 'div';
		this._el = document.querySelector(options.element) || document.createElement(this.tagName);
		this.bodyClass = options.bodyClass;
		this.hide();
	}

	/**
  * Инициализация параметров view (выполняется сразу после создания)
  * Необходимо перепределять
  * @param {Object} [options={}] - Объект с параметрами
  */


	_createClass(View, [{
		key: 'init',
		value: function init() {
			var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			this.setAttrs(options.attrs);
		}

		/**
   * Вызывается при приостановке работы view (при скрытии view или переходе на другую view)
   * Необходимо переопределять своей логикой
   * @param {Object} [options={}] - Объект с параметрами
   */

	}, {
		key: 'pause',
		value: function pause() {
			var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			this.hide();
		}

		/**
   * Вызывается при начале или продолжении работы view (после того, как view была скрыта)
   * Необходимо переопределять своей логикой
   * @param {Object} [options={}] - Объект с параметрами
   */

	}, {
		key: 'resume',
		value: function resume() {
			var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			this.render();
			this.show();
		}

		/**
   * Показывает view
   * @param {Object} [options={}] - Объект с параметрами
   */

	}, {
		key: 'show',
		value: function show() {
			var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			var self = this;
			self._el.hidden = false;
			if (self.bodyClass) {
				document.body.classList.add(self.bodyClass);
			}
		}

		/**
   * Скрывает view
   * @param {Object} [options={}] - Объект с параметрами
   */

	}, {
		key: 'hide',
		value: function hide() {
			var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			var self = this;
			self._el.hidden = true;
			if (self.bodyClass) {
				document.body.classList.remove(self.bodyClass);
			}
		}

		/**
   * Рендерит view
   * Необходимо переопределять
   * @param {Object} [options={}] - Объект с параметрами
   */

	}, {
		key: 'render',
		value: function render() {
			var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
		}

		/**
   * Вставляет текущую view в переданный элемент
   * @param {HTMLElement} el - HTML-элемент, к которому добавляется элемент текущей view
   */

	}, {
		key: 'appendTo',
		value: function appendTo(el) {
			el.appendChild(this._el);
		}

		/**
   * Удаляет элемент текущей view
   */

	}, {
		key: 'remove',
		value: function remove() {
			this._el && this._el.remove();
		}

		/**
   * Заменяет элемент текущей view
   * @param {HTMLElement} el - HTML-элемент, который становится элементом текущей view
   */

	}, {
		key: 'setElement',
		value: function setElement(el) {
			this._el && this._el.remove();
			this._el = el;
		}

		/**
   * Устанавливает текущей view набор атрибутов
   * @param {Object} [attrs={}] - Объект с атрибутами, которые будут установлены у текущего элемента view
   */

	}, {
		key: 'setAttrs',
		value: function setAttrs() {
			var _this = this;

			var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			Object.keys(attrs).forEach(function (name) {
				_this._el.setAttribute(name, attrs[name]);
			});
		}

		/**
   * Возвращает строку, содержашую текстовое представление текущей view
   * @returns {string}
   */

	}, {
		key: 'toString',
		value: function toString() {
			return this._el.outerHTML;
		}

		/**
   * Устанавливает текущей view роутер
   * @param {Router} router - инстанс роутера
   */

	}, {
		key: 'setRouter',
		value: function setRouter(router) {
			this.router = router;
		}
	}]);

	return View;
}();

exports.default = View;

/***/ },

/***/ 86:
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _libs = __webpack_require__(133);

var _libs2 = _interopRequireDefault(_libs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserModel = function () {
    function UserModel() {
        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, UserModel);

        this.username = data.username || '';
        this.email = data.email;
        this.password = data.password;
        this.score = 0;
        this.games = 0;

        this.emailError = '';
        this.passwordError = '';
        this.loginError = '';
    }

    _createClass(UserModel, [{
        key: 'validateLogin',
        value: function validateLogin() {
            var self = this;
            if (self.username.length < 1) {
                self.loginError = 'Пожалуйста, введите кликуху!';
                return false;
            }
            self.loginError = '';
            return true;
        }
    }, {
        key: 'validatePassword',
        value: function validatePassword() {
            var self = this;
            if (self.password.length < 1) {
                self.passwordError = 'Пожалуйста, введите пароль!';
                return false;
            }
            if (self.password.length < 8) {
                self.passwordError = 'Пароль нужен длиннее 8 символов =(';
                return false;
            }
            self.passwordError = '';
            return true;
        }
    }, {
        key: 'validateEmail',
        value: function validateEmail() {
            var self = this;
            if (self.email.search(/.+@.+\..+/) === -1) {
                self.emailError = 'Пожалуйста, проверьте правильность e-mail';
                return false;
            }
            self.emailError = '';
            return true;
        }
    }, {
        key: 'validate',
        value: function validate() {
            var self = this;
            return self.validateEmail() && self.validateLogin() && self.validatePassword();
        }
    }, {
        key: 'getEmailError',
        value: function getEmailError() {
            return this.emailError;
        }
    }, {
        key: 'getLoginError',
        value: function getLoginError() {
            return this.loginError;
        }
    }, {
        key: 'getPasswordError',
        value: function getPasswordError() {
            return this.passwordError;
        }
    }, {
        key: 'save',
        value: function save() {
            var self = this;
            var data = {
                username: self.username,
                email: self.email,
                password: self.password,
                games: self.games,
                score: self.score
            };
            if (!self.validate()) {
                return null;
            }
            var response = (0, _libs2.default)('https://air-drone.herokuapp.com/user', 'POST', data);
            switch (response.status) {
                case 400:
                case 403:
                    self.emailError = 'Пользователь с таким адресом уже летает!';
                    self.passwordError = '';
                    break;
                case 200:
                    self.emailError = self.passwordError = self.loginError = '';
                    break;
                default:
                    console.log('Что-то не так, но не 400');
            }
            return response;
        }
    }, {
        key: 'delete',
        value: function _delete() {
            // TODO
        }
    }, {
        key: 'login',
        value: function login() {
            var self = this;
            var data = {
                email: self.email,
                password: self.password
            };
            var response = (0, _libs2.default)('https://air-drone.herokuapp.com/session', 'POST', data);
            console.log(response.status);
            switch (response.status) {
                case 400:
                case 403:
                    self.emailError = 'Неверный логин или пароль!';
                    self.passwordError = '';
                    break;
                case 200:
                    self.emailError = self.passwordError = self.loginError = '';
                    self.username = response.response.username; // Когда не будет работать, ошибку искать здесь.
                    self.score = response.response.score;
                    self.games = response.response.games;
                    break;
                default:
                    console.log('Что-то не так, но не 400');
            }
            return response;
        }
    }, {
        key: 'getScore',
        value: function getScore() {
            return this.score;
        }
    }]);

    return UserModel;
}();

exports.default = UserModel;

/***/ }

},[322]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvbW9kdWxlcy9yb3V0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL3ZpZXdzL2dhbWVWaWV3LmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy92aWV3cy9sb2dpblZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL3ZpZXdzL3JlZ2lzdHJhdGlvblZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL3ZpZXdzL3Jvb21zVmlldy5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvdmlld3Mvc2NvcmVib2FyZFZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL3RlbXBsYXRlcy9nYW1lLnRtcGwueG1sIiwid2VicGFjazovLy8uL3B1YmxpYy90ZW1wbGF0ZXMvbG9naW4udG1wbC54bWwiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL3RlbXBsYXRlcy9yZWdpc3RyYXRpb24udG1wbC54bWwiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL3RlbXBsYXRlcy9yb29tcy50bXBsLnhtbCIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvdGVtcGxhdGVzL3Njb3JlYm9hcmQudG1wbC54bWwiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL2NhbnZhcy5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvY29sbGVjdGlvbnMvUm9vbUNvbGxlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL2NvbGxlY3Rpb25zL1VzZXJDb2xsZWN0aW9uLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy9saWJzLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy9tb2RlbHMvRHJvbmVNb2RlbC5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvbW9kZWxzL0dhbWVNb2RlbC5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvbW9kdWxlcy9wYXRoVG9SZWdleC5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvbW9kdWxlcy9yb3V0ZS5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvYWlyZHJvbmUuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL21vZHVsZXMvdmlldy5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvbW9kZWxzL1VzZXJNb2RlbC5qcyJdLCJuYW1lcyI6WyJSb3V0ZXIiLCJfX2luc3RhbmNlIiwicm91dGVzIiwiYWN0aXZlUm91dGUiLCJoaXN0b3J5Iiwid2luZG93IiwicGF0aG5hbWUiLCJ2aWV3Iiwib3B0aW9ucyIsInJvdXRlIiwic2V0Um91dGVyIiwicHVzaCIsInN0YXRlIiwib25wb3BzdGF0ZSIsImV2ZW50IiwibG9jYXRpb24iLCJvbnJvdXRlIiwiYmluZCIsImZpbmQiLCJtYXRjaCIsImxlYXZlIiwibmF2aWdhdGUiLCJwdXNoU3RhdGUiLCJiYWNrIiwiZm9yd2FyZCIsIkdhbWVWaWV3IiwiZGF0YSIsImVsZW1lbnQiLCJib2R5Q2xhc3MiLCJfZ2FtZSIsInNlbGYiLCJfZWwiLCJpbm5lckhUTUwiLCJzb3VyY2UiLCJnZXRWaWRlbyIsIkxvZ2luVmlldyIsIl9mb3JtIiwicXVlcnlTZWxlY3RvciIsIm9uc3VibWl0IiwibG9naW4iLCJjaGlsZHJlbiIsImVtYWlsIiwib25ibHVyIiwidmFsaWRhdGVFbWFpbCIsInBhc3N3b3JkIiwidmFsaWRhdGVQYXNzd29yZCIsIm9ua2V5dXAiLCJlIiwia2V5Q29kZSIsInJlZ2lzdHJhdGlvbiIsIm9uY2xpY2siLCJyb3V0ZXIiLCJnbyIsImVtYWlsRXJyb3IiLCJwYXNzd29yZEVycm9yIiwiZWxlbWVudHMiLCJ2YWx1ZSIsInNlYXJjaCIsImhpZGRlbiIsImxlbmd0aCIsInZhbGlkYXRlIiwidXNlciIsInJlc3BvbnNlIiwiZ2V0RW1haWxFcnJvciIsImdldFBhc3N3b3JkRXJyb3IiLCJzdGF0dXMiLCJSZWdpc3RyYXRpb25WaWV3IiwicmVnaXN0ZXIiLCJwYXNzd29yZDIiLCJ2YWxpZGF0ZUxvZ2luIiwibG9naW5FcnJvciIsInN0eWxlIiwiZGlzcGxheSIsInVzZXJuYW1lIiwic2F2ZSIsInRleHRDb250ZW50IiwiZ2V0TG9naW5FcnJvciIsImNvbnNvbGUiLCJsb2ciLCJSb29tc1ZpZXciLCJyb29tQ29sbGVjdGlvbiIsImRyb25lIiwic2VsZWN0ZWRSb29tIiwidW5kZWZpbmVkIiwiZmV0Y2giLCJ0aGVuIiwiZ2V0Q29sbGVjdGlvbiIsImVycm9yIiwicm9vbXMiLCJxdWVyeVNlbGVjdG9yQWxsIiwicm9vbSIsInNlbGVjdFJvb20iLCJuZXh0U2libGluZyIsImNvbG9ycyIsImNvbG9yIiwic2VsZWN0Q29sb3IiLCJfam9pbiIsImpvaW4iLCJkZXRhaWxzIiwiaSIsImlkIiwiYyIsImNsYXNzTGlzdCIsImFkZCIsInJlbW92ZSIsInIiLCJTY29yZWJvYXJkVmlldyIsInVzZXJDb2xsZWN0aW9uIiwiZ2FtZUNhbnZhcyIsIm1vZGUiLCJwYXJ0aWNsZXMiLCJjYW52YXMiLCJkb2N1bWVudCIsImNvbnRleHQyRCIsImdldENvbnRleHQiLCJoZWlnaHQiLCJpbm5lckhlaWdodCIsIndpZHRoIiwiaW5uZXJXaWR0aCIsImZyYW1lUmF0ZSIsImZyYW1lRGVsYXkiLCJwYXJzZUZsb2F0Iiwic3RhcnRUaW1lIiwic2V0SW50ZXJ2YWwiLCJ1cGRhdGUiLCJyYW5kb21GbG9hdCIsIm1pbiIsIm1heCIsIk1hdGgiLCJyYW5kb20iLCJQYXJ0aWNsZSIsInNjYWxlIiwieCIsInkiLCJyYWRpdXMiLCJ2ZWxvY2l0eVgiLCJ2ZWxvY2l0eVkiLCJzY2FsZVNwZWVkIiwibXMiLCJkcmF3IiwidHJhbnNsYXRlIiwiYmVnaW5QYXRoIiwiYXJjIiwiUEkiLCJjbG9zZVBhdGgiLCJmaWxsU3R5bGUiLCJmaWxsIiwicmVzdG9yZSIsImNyZWF0ZUV4cGxvc2lvbiIsIm1pblNpemUiLCJtYXhTaXplIiwiY291bnQiLCJtaW5TcGVlZCIsIm1heFNwZWVkIiwibWluU2NhbGVTcGVlZCIsIm1heFNjYWxlU3BlZWQiLCJhbmdsZSIsInJvdW5kIiwicGFydGljbGUiLCJzcGVlZCIsImNvcyIsInNpbiIsInJlY3RTaXplIiwibWFyZ2luWSIsInN0YXR1c01hcmdpbiIsImFsZXJ0U2l6ZSIsImFsZXJ0TWFyZ2luIiwiY2xlYXJSZWN0Iiwic3BsaWNlIiwiZHJhd1N0YXR1cyIsInJvdW5kUmVjdCIsImdsb2JhbEFscGhhIiwiZm9udCIsInRleHRBbGlnbiIsImZpbGxUZXh0Iiwic2Vjb25kcyIsIkRhdGUiLCJnZXRUaW1lIiwicGFyc2VJbnQiLCJzaXplIiwib2Zmc2V0WSIsImxhYmVsIiwicmVhbFNpemUiLCJ4TWFyZ2luIiwic3Ryb2tlIiwidGwiLCJ0ciIsImJyIiwiYmwiLCJkZWZhdWx0UmFkaXVzIiwic2lkZSIsImxpbmVXaWR0aCIsInN0cm9rZVN0eWxlIiwibW92ZVRvIiwibGluZVRvIiwicXVhZHJhdGljQ3VydmVUbyIsIm9ua2V5ZG93biIsImV2dCIsIlJvb21Db2xsZWN0aW9uIiwiX2RhdGEiLCJyZWplY3QiLCJqc29uIiwic29ydCIsImNhdGNoIiwiYSIsImIiLCJkcm9uZXMiLCJVc2VyQ29sbGVjdGlvbiIsInNjb3JlIiwicmVxdWVzdCIsInVybCIsIm1ldGhvZCIsInhociIsIlhNTEh0dHBSZXF1ZXN0Iiwib3BlbiIsInNldFJlcXVlc3RIZWFkZXIiLCJzZW5kIiwiSlNPTiIsInN0cmluZ2lmeSIsIlJvb21Nb2RlbCIsInBsYXllckxvZ2luIiwicGxheWVySWQiLCJib2R5IiwiR2FtZU1vZGVsIiwiaG9zdCIsIndzIiwiZ2V0SG9zdCIsInBhdGhUb1JlZ2V4Iiwia2V5TmFtZXMiLCJwYXJ0cyIsInNwbGl0IiwiZmlsdGVyIiwicGFydCIsIm1hcCIsImV4ZWMiLCJzbGljZSIsIlJlZ0V4cCIsInBhdGgiLCJrZXlzIiwiY2hlY2siLCJldmVyeSIsInJlZ2V4cCIsInN0ZXAiLCJ0bXAiLCJyZXBsYWNlIiwicmVkdWNlIiwicHJldiIsImN1cnIiLCJwb3MiLCJSb3V0ZSIsInJlZ2V4IiwiVmlldyIsIl92aWV3IiwiaW5pdCIsIl9fcm91dGVyIiwicmVzdW1lIiwiT2JqZWN0IiwiYXNzaWduIiwicGF1c2UiLCJhZGRSb3V0ZSIsInN0YXJ0IiwidGFnTmFtZSIsImNyZWF0ZUVsZW1lbnQiLCJoaWRlIiwic2V0QXR0cnMiLCJhdHRycyIsInJlbmRlciIsInNob3ciLCJlbCIsImFwcGVuZENoaWxkIiwiZm9yRWFjaCIsInNldEF0dHJpYnV0ZSIsIm5hbWUiLCJvdXRlckhUTUwiLCJVc2VyTW9kZWwiLCJnYW1lcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7QUFFQTtJQUNxQkEsTTtBQUNwQjs7O0FBR0EsbUJBQWM7QUFBQTs7QUFDYixNQUFJQSxPQUFPQyxVQUFYLEVBQXVCO0FBQ3RCLFVBQU9ELE9BQU9DLFVBQWQ7QUFDQTs7QUFFRCxPQUFLQyxNQUFMLEdBQWMsRUFBZDtBQUNBLE9BQUtDLFdBQUwsR0FBbUIsSUFBbkI7O0FBRUEsT0FBS0MsT0FBTCxHQUFlQyxPQUFPRCxPQUF0Qjs7QUFFQUosU0FBT0MsVUFBUCxHQUFvQixJQUFwQjtBQUNBOztBQUVEOzs7Ozs7Ozs7OzsyQkFPU0ssUSxFQUFVQyxJLEVBQW9CO0FBQUEsT0FBZEMsT0FBYyx1RUFBSixFQUFJOztBQUN0QyxPQUFJQyxRQUFRLG9CQUFVSCxRQUFWLEVBQW9CQyxJQUFwQixFQUEwQkMsT0FBMUIsQ0FBWjtBQUNBQyxTQUFNQyxTQUFOLENBQWdCLElBQWhCO0FBQ0EsUUFBS1IsTUFBTCxDQUFZUyxJQUFaLENBQWlCRixLQUFqQjtBQUNBLFVBQU8sSUFBUDtBQUNBOztBQUVEOzs7Ozs7OzBCQUlrQjtBQUFBLE9BQVpHLEtBQVksdUVBQUosRUFBSTs7QUFDakJQLFVBQU9RLFVBQVAsR0FBb0IsVUFBVUMsS0FBVixFQUFpQjtBQUNwQyxRQUFJRixRQUFRRSxNQUFNRixLQUFsQjtBQUNBLFFBQUlOLFdBQVdELE9BQU9VLFFBQVAsQ0FBZ0JULFFBQS9CO0FBQ0EsU0FBS1UsT0FBTCxDQUFhVixRQUFiLEVBQXVCTSxLQUF2QjtBQUNBLElBSm1CLENBSWxCSyxJQUprQixDQUliLElBSmEsQ0FBcEI7O0FBTUEs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LFNBQVNBLFFBQVQsQ0FBa0JXLFFBQWxDLENBRFYsQ0FDc0Q7QUFDNUMzQyx5QkFBS2tMLEtBQUwsR0FBYWxKLFNBQVNBLFFBQVQsQ0FBa0JrSixLQUEvQjtBQUNBbEwseUJBQUtxUCxLQUFMLEdBQWFyTixTQUFTQSxRQUFULENBQWtCcU4sS0FBL0I7QUFDQTtBQUNWO0FBQVN0TSw0QkFBUUMsR0FBUixDQUFZLDBCQUFaO0FBVmI7QUFZQSxtQkFBT2hCLFFBQVA7QUFDSDs7O21DQUVVO0FBQ1AsbUJBQU8sS0FBS2tKLEtBQVo7QUFDSDs7Ozs7O2tCQXRIZ0JrRSxTIiwiZmlsZSI6ImpzL2FpcmRyb25lLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSb3V0ZSBmcm9tICcuL3JvdXRlJztcblxuLyoqINCa0LvQsNGB0YEg0YDQvtGD0YLQtdGA0LAgKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvdXRlciB7XG5cdC8qKlxuXHQgKiDQodC+0LfQtNCw0ZHRgiDQvdC+0LLRi9C5INGA0L7Rg9GC0LXRgCDQuNC70Lgg0LLQvtC30LLRgNCw0YnQsNC10YIg0YPQttC1INGB0L7Qt9C00LDQvdC90YvQuSDQuNC90YHRgtCw0L3RgVxuXHQgKi9cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0aWYgKFJvdXRlci5fX2luc3RhbmNlKSB7XG5cdFx0XHRyZXR1cm4gUm91dGVyLl9faW5zdGFuY2U7XG5cdFx0fVxuXG5cdFx0dGhpcy5yb3V0ZXMgPSBbXTtcblx0XHR0aGlzLmFjdGl2ZVJvdXRlID0gbnVsbDtcblxuXHRcdHRoaXMuaGlzdG9yeSA9IHdpbmRvdy5oaXN0b3J5O1xuXG5cdFx0Um91dGVyLl9faW5zdGFuY2UgPSB0aGlzO1xuXHR9XG5cblx0LyoqXG5cdCAqINCU0L7QsdCw0LLQu9GP0LXRgiDQvdC+0LLRi9C5IFJvdXRlINCyINGA0L7Rg9GC0LXRgFxuXHQgKiBAcGFyYW0ge3N0cmluZ30gcGF0aG5hbWUgLSDQqNCw0LHQu9C+0L0g0L/Rg9GC0Lhcblx0ICogQHBhcmFtIHtWaWV3fSB2aWV3IC0g0JrQu9Cw0YHRgSDQutC+0L3QutGA0LXRgtC90L7QuSBWaWV3XG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gLSDQlNC+0L/QvtC70L3QuNGC0LXQu9GM0L3Ri9C1INC/0LDRgNCw0LzQtdGC0YDRiywg0LrQvtGC0L7RgNGL0LUg0LHRg9C00YPRgiDQv9C10YDQtdC00LDQvdGLINCy0L4gdmlldyDQv9GA0Lgg0LXRkSDRgdC+0LfQtNCw0L3QuNC4INC4INC40L3QuNGG0LjQsNC70LjQt9Cw0YbQuNC4XG5cdCAqIEByZXR1cm5zIHtSb3V0ZXJ9XG5cdCAqL1xuXHRhZGRSb3V0ZShwYXRobmFtZSwgdmlldywgb3B0aW9ucyA9IHt9KSB7XG5cdFx0bGV0IHJvdXRlID0gbmV3IFJvdXRlKHBhdGhuYW1lLCB2aWV3LCBvcHRpb25zKTtcblx0XHRyb3V0ZS5zZXRSb3V0ZXIodGhpcyk7XG5cdFx0dGhpcy5yb3V0ZXMucHVzaChyb3V0ZSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHQvKipcblx0ICog0JfQsNC/0YPRgdC60LDQtdGCINGA0L7Rg9GC0LXRgCDQuCDQv9C10YDQtdGF0L7QtNC40YIg0L/QviDRgtC10LrRg9GJ0LXQvNGDINC/0YPRgtC4INCyINC/0YDQuNC70L7QttC10L3QuNC4XG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbc3RhdGU9e31dIC0g0J7QsdGK0LXQutGCIHN0YXRlLCDQutC+0YLQvtGA0YvQuSDQv9C10YDQtdC00LDRkdGC0YHRjyDQsiDQv9C10YDQstGL0Lkg0LLRi9C30L7QsiBvbnJvdXRlXG5cdCAqL1xuXHRzdGFydChzdGF0ZSA9IHt9KSB7XG5cdFx0d2luZG93Lm9ucG9wc3RhdGUgPSBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRcdGxldCBzdGF0ZSA9IGV2ZW50LnN0YXRlO1xuXHRcdFx0bGV0IHBhdGhuYW1lID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lO1xuXHRcdFx0dGhpcy5vbnJvdXRlKHBhdGhuYW1lLCBzdGF0ZSk7XG5cdFx0fS5iaW5kKHRoaXMpO1xuXG5cdFx0Y29uc3QgcGF0aG5hbWUgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG5cdFx0dGhpcy5vbnJvdXRlKHBhdGhuYW1lLCBzdGF0ZSk7XG5cdH1cblxuXHQvKipcblx0ICog0KTRg9C90LrRhtC40Y8sINCy0YvQt9GL0LLQsNC10LzQsNGPINC/0YDQuCDQv9C10YDQtdGF0L7QtNC1INC90LAg0L3QvtCy0YvQuSDRgNC+0YPRgiDQsiDQv9GA0LjQu9C+0LbQtdC90LjQuFxuXHQgKiBAcGFyYW0ge3N0cmluZ30gcGF0aG5hbWUgLSDQn9GD0YLRjCwg0L/QviDQutC+0YLQvtGA0L7QvNGDINC/0YDQvtC40YHRhdC+0LTQuNGCINC/0LXRgNC10YXQvtC0XG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbc3RhdGU9e31dIC0g0J7QsdGK0LXQutGCIHN0YXRlLCDQutC+0YLQvtGA0YvQuSDQv9C10YDQtdC00LDRkdGC0YHRjyDQsiDQstGL0LfQvtCyINC80LXRgtC+0LTQsCBuYXZpZ2F0ZVxuXHQgKi9cblx0b25yb3V0ZShwYXRobmFtZSwgc3RhdGUgPSB7fSkge1xuXHRcdGxldCByb3V0ZSA9IHRoaXMucm91dGVzLmZpbmQocm91dGUgPT4gcm91dGUubWF0Y2gocGF0aG5hbWUpKTtcblx0XHRpZiAoIXJvdXRlKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuYWN0aXZlUm91dGUpIHtcblx0XHRcdHRoaXMuYWN0aXZlUm91dGUubGVhdmUoKTtcblx0XHR9XG5cblx0XHR0aGlzLmFjdGl2ZVJvdXRlID0gcm91dGU7XG5cdFx0dGhpcy5hY3RpdmVSb3V0ZS5uYXZpZ2F0ZShwYXRobmFtZSwgc3RhdGUpO1xuXHR9XG5cblx0LyoqXG5cdCAqINCf0YDQvtCz0YDQsNC80LzQvdGL0Lkg0L/QtdGA0LXRhdC+0LQg0L3QsCDQvdC+0LLRi9C5INC/0YPRgtGMXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBwYXRobmFtZSAtINCf0YPRgtGMXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbc3RhdGU9e31dIC0g0J7QsdGK0LXQutGCIHN0YXRlLCDQutC+0YLQvtGA0YvQuSDQv9C10YDQtdC00LDRkdGC0YHRjyDQsiDQstGL0LfQvtCyIGhpc3RvcnkucHVzaFN0YXRlXG5cdCAqL1xuXHRnbyhwYXRobmFtZSwgc3RhdGUgPSB7fSkge1xuXHRcdGlmICh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPT09IHBhdGhuYW1lKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdHRoaXMuaGlzdG9yeS5wdXNoU3RhdGUoc3RhdGUsICcnLCBwYXRobmFtZSk7XG5cdFx0dGhpcy5vbnJvdXRlKHBhdGhuYW1lLCBzdGF0ZSk7XG5cdH1cblxuXHQvKipcblx0ICog0J/QvtC30LLQvtC70Y/QtdGCINGD0YHRgtCw0L3QvtCy0LjRgtGMINGB0LLQvtGOINGB0L7QsdGB0YLQstC10L3QvdGD0Y4g0YDQtdCw0LvQuNC30LDRhtC40Y4gSGlzdG9yeSBBUElcblx0ICogQHBhcmFtIHtPYmplY3R9IGhpc3RvcnkgLSDQtNC+0LvQttC10L0g0L/RgNC10LTQvtGB0YLQsNCy0LvRj9GC0Ywg0YDQtdCw0LvQuNC30LDRhtC40Y4g0LzQtdGC0L7QtNC+0LIgYmFjaygpLCBmb3J3YXJkKCksIHB1c2hTdGF0ZSgpXG5cdCAqL1xuXHRzZXRIaXN0b3J5KGhpc3RvcnkpIHtcblx0XHR0aGlzLmhpc3RvcnkgPSBoaXN0b3J5O1xuXHR9XG5cblx0LyoqXG5cdCAqINCS0L7Qt9Cy0YDQsNGCINC90LAg0L7QtNC40L0g0YjQsNCzINC90LDQt9Cw0LQg0LIg0LjRgdGC0L7RgNC40Lgg0LHRgNCw0YPQt9C10YDQsFxuXHQgKi9cblx0YmFjaygpIHtcblx0XHR0aGlzLmhpc3RvcnkuYmFjaygpO1xuXHR9XG5cblx0LyoqXG5cdCAqINCf0LXRgNC10YXQvtC0INC90LAg0L7QtNC40L0g0YjQsNCzINCy0L/QtdGA0ZHQtCDQsiDQuNGB0YLQvtGA0LjQuCDQsdGA0LDRg9C30LXRgNCwXG5cdCAqL1xuXHRmb3J3YXJkKCkge1xuXHRcdHRoaXMuaGlzdG9yeS5mb3J3YXJkKCk7XG5cdH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3B1YmxpYy9qcy9tb2R1bGVzL3JvdXRlci5qcyIsImltcG9ydCBWaWV3IGZyb20gJy4uL21vZHVsZXMvdmlldyc7XG5pbXBvcnQgdGVtcGxhdGUgZnJvbSAnLi4vLi4vdGVtcGxhdGVzL2dhbWUudG1wbC54bWwnO1xuaW1wb3J0IEdhbWVNb2RlbCBmcm9tICcuLi9tb2RlbHMvR2FtZU1vZGVsJztcbmltcG9ydCBnYW1lQ2FudmFzIGZyb20gJy4uL2NhbnZhcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVWaWV3IGV4dGVuZHMgVmlldyB7XG4gICAgY29uc3RydWN0b3IgKGRhdGEgPSB7fSkge1xuICAgICAgICBzdXBlcih7IGVsZW1lbnQ6ICcuanMtZ2FtZScsIGJvZHlDbGFzczogJ2JvZHktZ2FtZScgfSk7XG4gICAgICAgIHRoaXMuX2dhbWUgPSBuZXcgR2FtZU1vZGVsKCk7XG4gICAgfVxuXG4gICAgcmVuZGVyICgpIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgICAgIHNlbGYuX2VsLmlubmVySFRNTCA9IHRlbXBsYXRlKHsgc291cmNlOiBzZWxmLl9nYW1lLmdldFZpZGVvKCkgfSk7XG4gICAgICAgIGdhbWVDYW52YXMoKTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wdWJsaWMvanMvdmlld3MvZ2FtZVZpZXcuanMiLCJpbXBvcnQgVmlldyBmcm9tICcuLi9tb2R1bGVzL3ZpZXcnO1xuaW1wb3J0IFVzZXJNb2RlbCBmcm9tICcuLi9tb2RlbHMvVXNlck1vZGVsJztcbmltcG9ydCB0ZW1wbGF0ZSBmcm9tICcuLi8uLi90ZW1wbGF0ZXMvbG9naW4udG1wbC54bWwnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2dpblZpZXcgZXh0ZW5kcyBWaWV3IHtcbiAgICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgICAgIHN1cGVyKHsgZWxlbWVudDogJy5qcy1sb2dpbicsIGJvZHlDbGFzczogJ2JvZHktbG9naW4nIH0pO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgICAgIHNlbGYuX2VsLmlubmVySFRNTCA9IHRlbXBsYXRlKHNlbGYuZGF0YSk7XG4gICAgICAgIHNlbGYuX2Zvcm0gPSBzZWxmLl9lbC5xdWVyeVNlbGVjdG9yKCcuanMtbG9naW4tZm9ybScpO1xuICAgICAgICBzZWxmLl9mb3JtLm9uc3VibWl0ID0gZnVuY3Rpb24gKCkgeyBzZWxmLmxvZ2luKCk7IHJldHVybiBmYWxzZTsgfVxuICAgICAgICBzZWxmLl9mb3JtLmNoaWxkcmVuLmVtYWlsLm9uYmx1ciA9IGZ1bmN0aW9uICgpIHsgc2VsZi52YWxpZGF0ZUVtYWlsKCk7IH1cbiAgICAgICAgc2VsZi5fZm9ybS5jaGlsZHJlbi5wYXNzd29yZC5vbmJsdXIgPSBmdW5jdGlvbiAoKSB7IHNlbGYudmFsaWRhdGVQYXNzd29yZCgpOyB9XG4gICAgICAgIHNlbGYuX2Zvcm0uY2hpbGRyZW4ucGFzc3dvcmQub25rZXl1cCA9IGZ1bmN0aW9uIChlKSB7IFxuICAgICAgICAgICAgaWYgKGUua2V5Q29kZSAhPT0gOCAmJiBlLmtleUNvZGUgIT09IDkpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnZhbGlkYXRlUGFzc3dvcmQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzZWxmLl9mb3JtLmNoaWxkcmVuLnJlZ2lzdHJhdGlvbi5vbmNsaWNrID0gZnVuY3Rpb24gKCkgeyBzZWxmLnJvdXRlci5nbygnL3JlZ2lzdHJhdGlvbicpOyB9XG4gICAgICAgIHNlbGYuZW1haWxFcnJvciA9IHNlbGYuX2Zvcm0uY2hpbGRyZW4uZW1haWxFcnJvcjtcbiAgICAgICAgc2VsZi5wYXNzd29yZEVycm9yID0gc2VsZi5fZm9ybS5jaGlsZHJlbi5wYXNzd29yZEVycm9yO1xuICAgIH1cblxuICAgIHZhbGlkYXRlRW1haWwoKSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgICBpZiAoc2VsZi5fZm9ybS5lbGVtZW50cy5lbWFpbC52YWx1ZS5zZWFyY2goLy5ALi8pID09PSAtMSkge1xuICAgICAgICAgICAgc2VsZi5lbWFpbEVycm9yLmhpZGRlbiA9IGZhbHNlO1xuICAgICAgICAgICAgc2VsZi5lbWFpbEVycm9yLmlubmVySFRNTCA9ICfQn9C+0LbQsNC70YPQudGB0YLQsCwg0L/RgNC+0LLQtdGA0YzRgtC1INC/0YDQsNCy0LjQu9GM0L3QvtGB0YLRjCBlLW1haWwhJztcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBzZWxmLmVtYWlsRXJyb3IuaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgc2VsZi5lbWFpbEVycm9yLmlubmVySFRNTCA9ICcnO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICB2YWxpZGF0ZVBhc3N3b3JkKCkge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgaWYgKHNlbGYuX2Zvcm0uZWxlbWVudHMucGFzc3dvcmQudmFsdWUubGVuZ3RoIDwgMSkge1xuICAgICAgICAgICAgc2VsZi5wYXNzd29yZEVycm9yLmhpZGRlbiA9IGZhbHNlO1xuICAgICAgICAgICAgc2VsZi5wYXNzd29yZEVycm9yLmlubmVySFRNTCA9ICfQn9C+0LbQsNC70YPQudGB0YLQsCwg0LLQstC10LTQuNGC0LUg0L/QsNGA0L7Qu9GMISc7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgc2VsZi5wYXNzd29yZEVycm9yLmhpZGRlbiA9IHRydWU7XG4gICAgICAgIHNlbGYucGFzc3dvcmRFcnJvci5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgdmFsaWRhdGUoKSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgICByZXR1cm4gc2VsZi52YWxpZGF0ZUVtYWlsKCkgJiYgc2VsZi52YWxpZGF0ZVBhc3N3b3JkKCk7XG4gICAgfVxuXG4gICAgbG9naW4oKSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgICBpZiAoIXNlbGYudmFsaWRhdGUoKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHVzZXIgPSBuZXcgVXNlck1vZGVsKHtcbiAgICAgICAgICAgIGVtYWlsOiBzZWxmLl9mb3JtLmVsZW1lbnRzLmVtYWlsLnZhbHVlLFxuICAgICAgICAgICAgcGFzc3dvcmQ6IHNlbGYuX2Zvcm0uZWxlbWVudHMucGFzc3dvcmQudmFsdWUsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gdXNlci5sb2dpbigpO1xuICAgICAgICBzZWxmLl9mb3JtLmNoaWxkcmVuLmVtYWlsRXJyb3IuaW5uZXJIVE1MID0gdXNlci5nZXRFbWFpbEVycm9yKCk7XG4gICAgICAgIHNlbGYuX2Zvcm0uY2hpbGRyZW4ucGFzc3dvcmRFcnJvci5pbm5lckhUTUwgPSB1c2VyLmdldFBhc3N3b3JkRXJyb3IoKTtcbiAgICAgICAgc2VsZi5fZm9ybS5jaGlsZHJlbi5lbWFpbEVycm9yLmhpZGRlbiA9IHNlbGYuX2Zvcm0uY2hpbGRyZW4uZW1haWxFcnJvci5pbm5lckhUTUwgPyBmYWxzZSA6IHRydWU7XG4gICAgICAgIHNlbGYuX2Zvcm0uY2hpbGRyZW4ucGFzc3dvcmRFcnJvci5oaWRkZW4gPSBzZWxmLl9mb3JtLmNoaWxkcmVuLnBhc3N3b3JkRXJyb3IuaW5uZXJIVE1MID8gZmFsc2UgOiB0cnVlO1xuICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09IDIwMCkge1xuICAgICAgICAgICAgc2VsZi5yb3V0ZXIuZ28oJy9yb29tcycpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcHVibGljL2pzL3ZpZXdzL2xvZ2luVmlldy5qcyIsImltcG9ydCBWaWV3IGZyb20gJy4uL21vZHVsZXMvdmlldyc7XG5pbXBvcnQgVXNlck1vZGVsIGZyb20gJy4uL21vZGVscy9Vc2VyTW9kZWwnO1xuaW1wb3J0IHRlbXBsYXRlIGZyb20gJy4uLy4uL3RlbXBsYXRlcy9yZWdpc3RyYXRpb24udG1wbC54bWwnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWdpc3RyYXRpb25WaWV3IGV4dGVuZHMgVmlldyB7XG4gICAgY29uc3RydWN0b3IgKG9wdGlvbnMgPSB7fSkge1xuICAgICAgICBzdXBlcih7IGVsZW1lbnQ6ICcuanMtcmVnaXN0cmF0aW9uJywgYm9keUNsYXNzOiAnYm9keS1yZWdpc3RyYXRpb24nIH0pO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgICAgIHNlbGYuX2VsLmlubmVySFRNTCA9IHRlbXBsYXRlKHNlbGYuZGF0YSk7XG4gICAgICAgIHNlbGYuX2Zvcm0gPSBzZWxmLl9lbC5xdWVyeVNlbGVjdG9yKCcuanMtcmVnaXN0cmF0aW9uLWZvcm0nKTtcbiAgICAgICAgc2VsZi5fZm9ybS5vbnN1Ym1pdCA9IGZ1bmN0aW9uICgpIHsgc2VsZi5yZWdpc3RlcigpOyByZXR1cm4gZmFsc2U7IH1cbiAgICAgICAgc2VsZi5fZm9ybS5jaGlsZHJlbi5lbWFpbC5vbmJsdXIgPSBmdW5jdGlvbiAoKSB7IHNlbGYudmFsaWRhdGVFbWFpbCgpOyB9XG4gICAgICAgIHNlbGYuX2Zvcm0uY2hpbGRyZW4ucGFzc3dvcmQub25ibHVyID0gZnVuY3Rpb24gKCkgeyBzZWxmLnZhbGlkYXRlUGFzc3dvcmQoKTsgfVxuICAgICAgICBzZWxmLl9mb3JtLmNoaWxkcmVuLnBhc3N3b3JkLm9ua2V5dXAgPSBmdW5jdGlvbiAoZSkgeyBcbiAgICAgICAgICAgIGlmIChlLmtleUNvZGUgIT09IDggJiYgZS5rZXlDb2RlICE9PSA5KSB7XG4gICAgICAgICAgICAgICAgc2VsZi52YWxpZGF0ZVBhc3N3b3JkKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc2VsZi5fZm9ybS5jaGlsZHJlbi5wYXNzd29yZDIub25ibHVyID0gZnVuY3Rpb24gKCkgeyBzZWxmLnZhbGlkYXRlUGFzc3dvcmQoKTsgfVxuICAgICAgICBzZWxmLl9mb3JtLmNoaWxkcmVuLnBhc3N3b3JkMi5vbmtleXVwID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGlmIChlLmtleUNvZGUgIT09IDggJiYgZS5rZXlDb2RlICE9PSA5KSB7XG4gICAgICAgICAgICAgICAgc2VsZi52YWxpZGF0ZVBhc3N3b3JkKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc2VsZi5fZm9ybS5jaGlsZHJlbi5sb2dpbi5vbmJsdXIgPSBmdW5jdGlvbiAoKSB7IHNlbGYudmFsaWRhdGVMb2dpbigpOyB9XG4gICAgICAgIHNlbGYuZW1haWxFcnJvciA9IHNlbGYuX2Zvcm0uY2hpbGRyZW4uZW1haWxFcnJvcjtcbiAgICAgICAgc2VsZi5wYXNzd29yZEVycm9yID0gc2VsZi5fZm9ybS5jaGlsZHJlbi5wYXNzd29yZEVycm9yO1xuICAgICAgICBzZWxmLmxvZ2luRXJyb3IgPSBzZWxmLl9mb3JtLmNoaWxkcmVuLmxvZ2luRXJyb3I7XG4gICAgfVxuXG4gICAgdmFsaWRhdGVFbWFpbCgpIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgICAgIGlmIChzZWxmLl9mb3JtLmVsZW1lbnRzLmVtYWlsLnZhbHVlLnNlYXJjaCgvLitALitcXC4uKy8pID09PSAtMSkge1xuICAgICAgICAgICAgc2VsZi5lbWFpbEVycm9yLmlubmVySFRNTCA9ICfQn9C+0LbQsNC70YPQudGB0YLQsCwg0L/RgNC+0LLQtdGA0YzRgtC1INC/0YDQsNCy0LjQu9GM0L3QvtGB0YLRjCBlLW1haWwnO1xuICAgICAgICAgICAgc2VsZi5lbWFpbEVycm9yLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHNlbGYuZW1haWxFcnJvci5oaWRkZW4gPSB0cnVlO1xuICAgICAgICBzZWxmLmVtYWlsRXJyb3IuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHZhbGlkYXRlUGFzc3dvcmQoKSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgICBpZiAoc2VsZi5fZm9ybS5lbGVtZW50cy5wYXNzd29yZC52YWx1ZS5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgICBzZWxmLnBhc3N3b3JkRXJyb3IuaW5uZXJIVE1MID0gJ9Cf0L7QttCw0LvRg9C50YHRgtCwLCDQstCy0LXQtNC40YLQtSDQv9Cw0YDQvtC70YwhJztcbiAgICAgICAgICAgIHNlbGYucGFzc3dvcmRFcnJvci5oaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2VsZi5fZm9ybS5lbGVtZW50cy5wYXNzd29yZC52YWx1ZS5sZW5ndGggPCA4KSB7XG4gICAgICAgICAgICBzZWxmLnBhc3N3b3JkRXJyb3IuaW5uZXJIVE1MID0gJ9Cf0LDRgNC+0LvRjCDQvdGD0LbQtdC9INC00LvQuNC90L3QtdC1IDgg0YHQuNC80LLQvtC70L7QsiA9KCc7XG4gICAgICAgICAgICBzZWxmLnBhc3N3b3JkRXJyb3IuaGlkZGVuID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNlbGYuX2Zvcm0uZWxlbWVudHMucGFzc3dvcmQyLnZhbHVlLmxlbmd0aCA+IDBcbiAgICAgICAgICAgICYmIHNlbGYuX2Zvcm0uZWxlbWVudHMucGFzc3dvcmQudmFsdWUgIT0gc2VsZi5fZm9ybS5lbGVtZW50cy5wYXNzd29yZDIudmFsdWUpIHtcbiAgICAgICAgICAgIHNlbGYuX2Zvcm0uY2hpbGRyZW4ucGFzc3dvcmRFcnJvci5pbm5lckhUTUwgPSAn0J/QsNGA0L7Qu9C4INC90LUg0YHQvtCy0L/QsNC00LDRjtGCISc7XG4gICAgICAgICAgICBzZWxmLnBhc3N3b3JkRXJyb3IuaGlkZGVuID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgc2VsZi5wYXNzd29yZEVycm9yLmlubmVySFRNTCA9ICcnO1xuICAgICAgICBzZWxmLnBhc3N3b3JkRXJyb3IuaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgdmFsaWRhdGVMb2dpbigpIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgICAgIGlmIChzZWxmLl9mb3JtLmVsZW1lbnRzLmxvZ2luLnZhbHVlLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICAgIHNlbGYubG9naW5FcnJvci5pbm5lckhUTUwgPSAn0J/QvtC20LDQu9GD0LnRgdGC0LAsINCy0LLQtdC00LjRgtC1INC60LvQuNC60YPRhdGDISc7XG4gICAgICAgICAgICBzZWxmLmxvZ2luRXJyb3Iuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgc2VsZi5sb2dpbkVycm9yLmhpZGRlbiA9IHRydWU7XG4gICAgICAgIHNlbGYubG9naW5FcnJvci5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgdmFsaWRhdGUoKSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgICByZXR1cm4gc2VsZi52YWxpZGF0ZUVtYWlsKHNlbGYpICYmIHNlbGYudmFsaWRhdGVQYXNzd29yZChzZWxmKSAmJiBzZWxmLnZhbGlkYXRlTG9naW4oc2VsZik7XG4gICAgfVxuXG4gICAgcmVnaXN0ZXIoKSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgICBpZiAoIXNlbGYudmFsaWRhdGUoKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHVzZXIgPSBuZXcgVXNlck1vZGVsKHtcbiAgICAgICAgICAgIHVzZXJuYW1lOiBzZWxmLl9mb3JtLmVsZW1lbnRzLmxvZ2luLnZhbHVlLFxuICAgICAgICAgICAgZW1haWw6IHNlbGYuX2Zvcm0uZWxlbWVudHMuZW1haWwudmFsdWUsXG4gICAgICAgICAgICBwYXNzd29yZDogc2VsZi5fZm9ybS5lbGVtZW50cy5wYXNzd29yZC52YWx1ZSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSB1c2VyLnNhdmUoKTtcbiAgICAgICAgc2VsZi5fZm9ybS5jaGlsZHJlbi5lbWFpbEVycm9yLnRleHRDb250ZW50ID0gdXNlci5nZXRFbWFpbEVycm9yKCk7XG4gICAgICAgIHNlbGYuX2Zvcm0uY2hpbGRyZW4ucGFzc3dvcmRFcnJvci50ZXh0Q29udGVudCA9IHVzZXIuZ2V0UGFzc3dvcmRFcnJvcigpO1xuICAgICAgICBzZWxmLl9mb3JtLmNoaWxkcmVuLmxvZ2luRXJyb3IudGV4dENvbnRlbnQgPSB1c2VyLmdldExvZ2luRXJyb3IoKTtcbiAgICAgICAgc2VsZi5fZm9ybS5jaGlsZHJlbi5lbWFpbEVycm9yLmhpZGRlbiA9IHNlbGYuX2Zvcm0uY2hpbGRyZW4uZW1haWxFcnJvci50ZXh0Q29udGVudCA/IGZhbHNlIDogdHJ1ZTtcbiAgICAgICAgc2VsZi5fZm9ybS5jaGlsZHJlbi5sb2dpbkVycm9yLmhpZGRlbiA9IHNlbGYuX2Zvcm0uY2hpbGRyZW4ubG9naW5FcnJvci50ZXh0Q29udGVudCA/IGZhbHNlIDogdHJ1ZTtcbiAgICAgICAgc2VsZi5fZm9ybS5jaGlsZHJlbi5wYXNzd29yZEVycm9yLmhpZGRlbiA9IHNlbGYuX2Zvcm0uY2hpbGRyZW4ucGFzc3dvcmRFcnJvci50ZXh0Q29udGVudCA/IGZhbHNlIDogdHJ1ZTtcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICAgICAgICBzZWxmLnJvdXRlci5nbygnL3Jvb21zJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnc29tZSBzZXJ2ZXIgbWFnaWMgZXJyb3InKTtcbiAgICAgICAgICAgIHNlbGYuX2Zvcm0uY2hpbGRyZW4uZW1haWxFcnJvci50ZXh0Q29udGVudCA9IHVzZXIuZ2V0RW1haWxFcnJvcigpO1xuICAgICAgICAgICAgc2VsZi5fZm9ybS5jaGlsZHJlbi5lbWFpbEVycm9yLnRleHRDb250ZW50ID0gJ9Ci0L4g0LvQuCBlLW1haWwsINGC0L4g0LvQuCDQv9Cw0YDQvtC70Ywg0L3QtSDQv9C+0LTRhdC+0LTRj9GCLiDQryDRgtCw0Log0Lgg0L3QtSDQv9C+0L3Rj9C7INC70L7Qs9C40LrRgyDRgdC10YDQstCw0LrQsCc7XG4gICAgICAgICAgICBzZWxmLl9mb3JtLmNoaWxkcmVuLmVtYWlsRXJyb3IuaGlkZGVuID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wdWJsaWMvanMvdmlld3MvcmVnaXN0cmF0aW9uVmlldy5qcyIsIi8vIFRPRE86IHVzZXIgaWQgZnJvbSBjb29raWUgdG8gZHJvbmUgbW9kZWxcbmltcG9ydCBWaWV3IGZyb20gJy4uL21vZHVsZXMvdmlldyc7XG5pbXBvcnQgUm9vbUNvbGxlY3Rpb24gZnJvbSAnLi4vY29sbGVjdGlvbnMvUm9vbUNvbGxlY3Rpb24nO1xuaW1wb3J0IERyb25lTW9kZWwgZnJvbSAnLi4vbW9kZWxzL0Ryb25lTW9kZWwnO1xuaW1wb3J0IHRlbXBsYXRlIGZyb20gJy4uLy4uL3RlbXBsYXRlcy9yb29tcy50bXBsLnhtbCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvb21zVmlldyBleHRlbmRzIFZpZXcge1xuICAgIGNvbnN0cnVjdG9yIChkYXRhID0ge30pIHtcbiAgICAgICAgc3VwZXIoeyBlbGVtZW50OiAnLmpzLXJvb21zJywgYm9keUNsYXNzOiAnYm9keS1yb29tcycgfSk7XG4gICAgICAgIHRoaXMucm9vbUNvbGxlY3Rpb24gPSBuZXcgUm9vbUNvbGxlY3Rpb24oKTtcbiAgICAgICAgdGhpcy5kcm9uZSA9IG5ldyBEcm9uZU1vZGVsKCk7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRSb29tID0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHJlbmRlciAoKSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgICBzZWxmLnJvb21Db2xsZWN0aW9uLmZldGNoKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBzZWxmLl9lbC5pbm5lckhUTUwgPSB0ZW1wbGF0ZShzZWxmLnJvb21Db2xsZWN0aW9uLmdldENvbGxlY3Rpb24oKSk7XG5cbiAgICAgICAgICAgIHNlbGYuZXJyb3IgPSBzZWxmLl9lbC5xdWVyeVNlbGVjdG9yKCcuanMtZXJyb3InKTtcbiAgICBcbiAgICAgICAgICAgIHNlbGYucm9vbXMgPSBzZWxmLl9lbC5xdWVyeVNlbGVjdG9yQWxsKCcucm9vbXNfX3Jvb20nKTtcbiAgICAgICAgICAgIGZvciAoY29uc3Qgcm9vbSBvZiBzZWxmLnJvb21zKSB7XG4gICAgICAgICAgICAgICAgcm9vbS5vbmNsaWNrID0gZnVuY3Rpb24gKCkgeyBzZWxmLnNlbGVjdFJvb20ocm9vbSwgcm9vbS5uZXh0U2libGluZykgfTtcbiAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgIHNlbGYuY29sb3JzID0gc2VsZi5fZWwucXVlcnlTZWxlY3RvckFsbCgnLmpzLWNvbG9yJyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhzZWxmLmNvbG9ycyk7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGNvbG9yIG9mIHNlbGYuY29sb3JzKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coY29sb3IpO1xuICAgICAgICAgICAgICAgIGNvbG9yLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7IGNvbnNvbGUubG9nKCdlbnRlcmVkIGNvbG9yIGNsaWNrJyk7IHNlbGYuc2VsZWN0Q29sb3IoY29sb3IpIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnYmVmb3JlIGpvaW4nKTtcbiAgICBcbiAgICAgICAgICAgIHNlbGYuX2pvaW4gPSBzZWxmLl9lbC5xdWVyeVNlbGVjdG9yKCcuanMtam9pbicpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coc2VsZi5qb2luKTtcbiAgICAgICAgICAgIHNlbGYuX2pvaW4ub25jbGljayA9IGZ1bmN0aW9uICgpIHsgc2VsZi5qb2luKCk7IH07XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZmluYWwnKTtcblxuICAgICAgICAgICAgc2VsZi5fZWwucXVlcnlTZWxlY3RvcignLmpzLWNyZWF0ZScpLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7IHNlbGYucm91dGVyLmdvKCcvc2NvcmVib2FyZCcpOyB9O1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzZWxlY3RSb29tIChyb29tLCBkZXRhaWxzKSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlbGYucm9vbXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGlmIChzZWxmLnJvb21zW2ldICE9PSByb29tKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5yb29tc1tpXS5oaWRkZW4gPSB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZWxmLnNlbGVjdGVkUm9vbSA9IHNlbGYucm9vbUNvbGxlY3Rpb24uZ2V0Q29sbGVjdGlvbigpW2ldLmlkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGRldGFpbHMuaGlkZGVuID0gZmFsc2U7XG4gICAgfVxuXG4gICAgc2VsZWN0Q29sb3IoY29sb3IpIHtcbiAgICAgICAgY29uc29sZS5sb2coY29sb3IpO1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgZm9yIChjb25zdCBjIG9mIHNlbGYuY29sb3JzKSB7XG4gICAgICAgICAgICBpZiAoYyA9PT0gY29sb3IpIHtcbiAgICAgICAgICAgICAgICBjLmNsYXNzTGlzdC5hZGQoJ3Jvb21zX19kZXRhaWxzX19jb2xvcnNfX2NvbG9yLWNsaWNrZWQnKTtcbiAgICAgICAgICAgICAgICBjLmNsYXNzTGlzdC5yZW1vdmUoJ3Jvb21zX19kZXRhaWxzX19jb2xvcnNfX2NvbG9yJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGMuY2xhc3NMaXN0LmFkZCgncm9vbXNfX2RldGFpbHNfX2NvbG9yc19fY29sb3InKTtcbiAgICAgICAgICAgICAgICBjLmNsYXNzTGlzdC5yZW1vdmUoJ3Jvb21zX19kZXRhaWxzX19jb2xvcnNfX2NvbG9yLWNsaWNrZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzZWxmLmRyb25lLmNvbG9yID0gY29sb3Iuc3R5bGVbJ2JhY2tncm91bmQtY29sb3InXTtcbiAgICAgICAgc2VsZi5lcnJvci50ZXh0Q29udGVudCA9ICcnO1xuICAgICAgICBzZWxmLmVycm9yLmhpZGRlbiA9IHRydWU7XG4gICAgfVxuXG4gICAgam9pbigpIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgICAgIGNvbnNvbGUubG9nKHNlbGYuZHJvbmUpO1xuICAgICAgICBpZiAoc2VsZi5kcm9uZS5jb2xvciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnaWYnKTtcbiAgICAgICAgICAgIHNlbGYuZXJyb3IudGV4dENvbnRlbnQgPSAnJztcbiAgICAgICAgICAgIHNlbGYuZXJyb3IuaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgICAgIHNlbGYuZHJvbmUuc2F2ZShzZWxmLnNlbGVjdGVkUm9vbSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuZHJvbmUuZXJyb3IgIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZXJyb3IudGV4dENvbnRlbnQgPSAn0KfRgtC+LdGC0L4g0L/QvtGI0LvQviDQvdC1INGC0LDQui4g0J/QvtC/0YDQvtCx0YPQudGC0LUg0LXRidC1INGA0LDQtyEnO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmVycm9yLmhpZGRlbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzZWxmLnJvdXRlci5nbygnL2dhbWUnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2Vsc2UnKTtcbiAgICAgICAgICAgIHNlbGYuZXJyb3IudGV4dENvbnRlbnQgPSAn0JLRi9Cx0LXRgNC40YLQtSDRhtCy0LXRgiDQtNGA0L7QvdCwISc7XG4gICAgICAgICAgICBzZWxmLmVycm9yLmhpZGRlbiA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYmFjayAoZGV0YWlscykge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgZGV0YWlscy5oaWRkZW4gPSB0cnVlO1xuICAgICAgICBmb3IgKGNvbnN0IHIgb2Ygc2VsZi5yb29tcykge1xuICAgICAgICAgICAgci5oaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBzZWxmLnNlbGVjdGVkUm9vbSA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3B1YmxpYy9qcy92aWV3cy9yb29tc1ZpZXcuanMiLCJpbXBvcnQgVmlldyBmcm9tICcuLi9tb2R1bGVzL3ZpZXcnO1xuaW1wb3J0IFVzZXJDb2xsZWN0aW9uIGZyb20gJy4uL2NvbGxlY3Rpb25zL1VzZXJDb2xsZWN0aW9uJztcbmltcG9ydCB0ZW1wbGF0ZSBmcm9tICcuLi8uLi90ZW1wbGF0ZXMvc2NvcmVib2FyZC50bXBsLnhtbCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjb3JlYm9hcmRWaWV3IGV4dGVuZHMgVmlldyB7XG4gICAgY29uc3RydWN0b3IgKG9wdGlvbnMgPSB7fSkge1xuICAgICAgICBzdXBlcih7IGVsZW1lbnQ6ICcuanMtc2NvcmVib2FyZCcsIGJvZHlDbGFzczogJ2JvZHktc2NvcmVib2FyZCcgfSk7XG4gICAgICAgIHRoaXMudXNlckNvbGxlY3Rpb24gPSBuZXcgVXNlckNvbGxlY3Rpb24oKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgICBzZWxmLnVzZXJDb2xsZWN0aW9uLmZldGNoKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBzZWxmLl9lbC5pbm5lckhUTUwgPSB0ZW1wbGF0ZShzZWxmLnVzZXJDb2xsZWN0aW9uLmdldENvbGxlY3Rpb24oKSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3B1YmxpYy9qcy92aWV3cy9zY29yZWJvYXJkVmlldy5qcyIsIlxuLyoqIFxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogL2hvbWUvaXZhbi9Eb2N1bWVudHMvMjAxNl8yX0FpckRyb25lL3B1YmxpYy90ZW1wbGF0ZXMvZ2FtZS50bXBsIHRlbXBsYXRlXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoX19mZXN0X2NvbnRleHQpe1widXNlIHN0cmljdFwiO3ZhciBfX2Zlc3Rfc2VsZj10aGlzLF9fZmVzdF9idWY9XCJcIixfX2Zlc3RfY2h1bmtzPVtdLF9fZmVzdF9jaHVuayxfX2Zlc3RfYXR0cnM9W10sX19mZXN0X3NlbGVjdCxfX2Zlc3RfaWYsX19mZXN0X2l0ZXJhdG9yLF9fZmVzdF90byxfX2Zlc3RfZm4sX19mZXN0X2h0bWw9XCJcIixfX2Zlc3RfYmxvY2tzPXt9LF9fZmVzdF9wYXJhbXMsX19mZXN0X2VsZW1lbnQsX19mZXN0X2RlYnVnX2ZpbGU9XCJcIixfX2Zlc3RfZGVidWdfbGluZT1cIlwiLF9fZmVzdF9kZWJ1Z19ibG9jaz1cIlwiLF9fZmVzdF9lbGVtZW50X3N0YWNrID0gW10sX19mZXN0X3Nob3J0X3RhZ3MgPSB7XCJhcmVhXCI6IHRydWUsIFwiYmFzZVwiOiB0cnVlLCBcImJyXCI6IHRydWUsIFwiY29sXCI6IHRydWUsIFwiY29tbWFuZFwiOiB0cnVlLCBcImVtYmVkXCI6IHRydWUsIFwiaHJcIjogdHJ1ZSwgXCJpbWdcIjogdHJ1ZSwgXCJpbnB1dFwiOiB0cnVlLCBcImtleWdlblwiOiB0cnVlLCBcImxpbmtcIjogdHJ1ZSwgXCJtZXRhXCI6IHRydWUsIFwicGFyYW1cIjogdHJ1ZSwgXCJzb3VyY2VcIjogdHJ1ZSwgXCJ3YnJcIjogdHJ1ZX0sX19mZXN0X2pzY2hhcnMgPSAvW1xcXFwnXCJcXC9cXG5cXHJcXHRcXGJcXGY8Pl0vZyxfX2Zlc3RfanNjaGFyc190ZXN0ID0gL1tcXFxcJ1wiXFwvXFxuXFxyXFx0XFxiXFxmPD5dLyxfX2Zlc3RfaHRtbGNoYXJzID0gL1smPD5cIl0vZyxfX2Zlc3RfaHRtbGNoYXJzX3Rlc3QgPSAvWyY8PlwiXS8sX19mZXN0X2pzaGFzaCA9IHtcIlxcXCJcIjogXCJcXFxcXFxcIlwiLCBcIlxcXFxcIjogXCJcXFxcXFxcXFwiLCBcIi9cIjogXCJcXFxcL1wiLCBcIlxcblwiOiBcIlxcXFxuXCIsIFwiXFxyXCI6IFwiXFxcXHJcIiwgXCJcXHRcIjogXCJcXFxcdFwiLCBcIlxcYlwiOiBcIlxcXFxiXCIsIFwiXFxmXCI6IFwiXFxcXGZcIiwgXCInXCI6IFwiXFxcXCdcIiwgXCI8XCI6IFwiXFxcXHUwMDNDXCIsIFwiPlwiOiBcIlxcXFx1MDAzRVwifSxfX2Zlc3RfaHRtbGhhc2ggPSB7XCImXCI6IFwiJmFtcDtcIiwgXCI8XCI6IFwiJmx0O1wiLCBcIj5cIjogXCImZ3Q7XCIsIFwiXFxcIlwiOiBcIiZxdW90O1wifSxfX2Zlc3RfZXNjYXBlSlMgPSBmdW5jdGlvbiBfX2Zlc3RfZXNjYXBlSlModmFsdWUpIHtcblx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuXHRcdFx0aWYgKF9fZmVzdF9qc2NoYXJzX3Rlc3QudGVzdCh2YWx1ZSkpIHtcblx0XHRcdFx0cmV0dXJuIHZhbHVlLnJlcGxhY2UoX19mZXN0X2pzY2hhcnMsIF9fZmVzdF9yZXBsYWNlSlMpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiB2YWx1ZTtcblx0fSxfX2Zlc3RfcmVwbGFjZUpTID0gZnVuY3Rpb24gX19mZXN0X3JlcGxhY2VKUyhjaHIpIHtcblx0XHRyZXR1cm4gX19mZXN0X2pzaGFzaFtjaHJdO1xuXHR9LF9fZmVzdF9lc2NhcGVIVE1MID0gZnVuY3Rpb24gX19mZXN0X2VzY2FwZUhUTUwodmFsdWUpIHtcblx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuXHRcdFx0aWYgKF9fZmVzdF9odG1sY2hhcnNfdGVzdC50ZXN0KHZhbHVlKSkge1xuXHRcdFx0XHRyZXR1cm4gdmFsdWUucmVwbGFjZShfX2Zlc3RfaHRtbGNoYXJzLCBfX2Zlc3RfcmVwbGFjZUhUTUwpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiB2YWx1ZTtcblx0fSxfX2Zlc3RfcmVwbGFjZUhUTUwgPSBmdW5jdGlvbiBfX2Zlc3RfcmVwbGFjZUhUTUwoY2hyKSB7XG5cdFx0cmV0dXJuIF9fZmVzdF9odG1saGFzaFtjaHJdO1xuXHR9LF9fZmVzdF9leHRlbmQgPSBmdW5jdGlvbiBfX2Zlc3RfZXh0ZW5kKGRlc3QsIHNyYykge1xuXHRcdGZvciAodmFyIGtleSBpbiBzcmMpIHtcblx0XHRcdGlmIChzcmMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRkZXN0W2tleV0gPSBzcmNba2V5XTtcblx0XHRcdH1cblx0XHR9XG5cdH0sX19mZXN0X3BhcmFtID0gZnVuY3Rpb24gX19mZXN0X3BhcmFtKGZuKSB7XG5cdFx0Zm4ucGFyYW0gPSB0cnVlO1xuXHRcdHJldHVybiBmbjtcblx0fSxpMThuPV9fZmVzdF9zZWxmICYmIHR5cGVvZiBfX2Zlc3Rfc2VsZi5pMThuID09PSBcImZ1bmN0aW9uXCIgPyBfX2Zlc3Rfc2VsZi5pMThuIDogZnVuY3Rpb24gKHN0cikge3JldHVybiBzdHI7fSxfX19mZXN0X2xvZ19lcnJvcjtpZih0eXBlb2YgX19mZXN0X2Vycm9yID09PSBcInVuZGVmaW5lZFwiKXtfX19mZXN0X2xvZ19lcnJvciA9ICh0eXBlb2YgY29uc29sZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBjb25zb2xlLmVycm9yKSA/IGZ1bmN0aW9uKCl7cmV0dXJuIEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseS5jYWxsKGNvbnNvbGUuZXJyb3IsIGNvbnNvbGUsIGFyZ3VtZW50cyl9IDogZnVuY3Rpb24oKXt9O31lbHNle19fX2Zlc3RfbG9nX2Vycm9yPV9fZmVzdF9lcnJvcn07ZnVuY3Rpb24gX19mZXN0X2xvZ19lcnJvcihtc2cpe19fX2Zlc3RfbG9nX2Vycm9yKG1zZytcIlxcbmluIGJsb2NrIFxcXCJcIitfX2Zlc3RfZGVidWdfYmxvY2srXCJcXFwiIGF0IGxpbmU6IFwiK19fZmVzdF9kZWJ1Z19saW5lK1wiXFxuZmlsZTogXCIrX19mZXN0X2RlYnVnX2ZpbGUpfWZ1bmN0aW9uIF9fZmVzdF9jYWxsKGZuLCBwYXJhbXMsY3Ape2lmKGNwKWZvcih2YXIgaSBpbiBwYXJhbXMpaWYodHlwZW9mIHBhcmFtc1tpXT09XCJmdW5jdGlvblwiJiZwYXJhbXNbaV0ucGFyYW0pcGFyYW1zW2ldPXBhcmFtc1tpXSgpO3JldHVybiBmbi5jYWxsKF9fZmVzdF9zZWxmLHBhcmFtcyl9dmFyIGpzb249X19mZXN0X2NvbnRleHQ7X19mZXN0X2J1Zis9KFwiPGltZyBjbGFzcz1cXFwiZ2FtZV9fdmlkZW9cXFwiIHNyYz1cXFwiXCIpO3RyeXtfX2Zlc3RfYnVmKz0oX19mZXN0X2VzY2FwZUhUTUwoanNvbi5zb3VyY2UpKX1jYXRjaChlKXtfX2Zlc3RfbG9nX2Vycm9yKGUubWVzc2FnZSArIFwiM1wiKTt9X19mZXN0X2J1Zis9KFwiXFxcIi8+PGNhbnZhcyBjbGFzcz1cXFwiZ2FtZV9fY2FudmFzXFxcIj7QktCw0Ygg0LHRgNCw0YPQt9C10YAg0LzQvtGA0LDQu9GM0L3QviDRg9GB0YLQsNGA0LXQuy4g0J7QsdC90L7QstC40YLQtS4g0JHRi9GB0YLRgNC+LjwvY2FudmFzPlwiKTtfX2Zlc3RfdG89X19mZXN0X2NodW5rcy5sZW5ndGg7aWYgKF9fZmVzdF90bykge19fZmVzdF9pdGVyYXRvciA9IDA7Zm9yICg7X19mZXN0X2l0ZXJhdG9yPF9fZmVzdF90bztfX2Zlc3RfaXRlcmF0b3IrKykge19fZmVzdF9jaHVuaz1fX2Zlc3RfY2h1bmtzW19fZmVzdF9pdGVyYXRvcl07aWYgKHR5cGVvZiBfX2Zlc3RfY2h1bms9PT1cInN0cmluZ1wiKSB7X19mZXN0X2h0bWwrPV9fZmVzdF9jaHVuazt9IGVsc2Uge19fZmVzdF9mbj1fX2Zlc3RfYmxvY2tzW19fZmVzdF9jaHVuay5uYW1lXTtpZiAoX19mZXN0X2ZuKSBfX2Zlc3RfaHRtbCs9X19mZXN0X2NhbGwoX19mZXN0X2ZuLF9fZmVzdF9jaHVuay5wYXJhbXMsX19mZXN0X2NodW5rLmNwKTt9fXJldHVybiBfX2Zlc3RfaHRtbCtfX2Zlc3RfYnVmO30gZWxzZSB7cmV0dXJuIF9fZmVzdF9idWY7fX1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3B1YmxpYy90ZW1wbGF0ZXMvZ2FtZS50bXBsLnhtbFxuLy8gbW9kdWxlIGlkID0gMTI1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxuLyoqIFxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogL2hvbWUvaXZhbi9Eb2N1bWVudHMvMjAxNl8yX0FpckRyb25lL3B1YmxpYy90ZW1wbGF0ZXMvbG9naW4udG1wbCB0ZW1wbGF0ZVxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKF9fZmVzdF9jb250ZXh0KXtcInVzZSBzdHJpY3RcIjt2YXIgX19mZXN0X3NlbGY9dGhpcyxfX2Zlc3RfYnVmPVwiXCIsX19mZXN0X2NodW5rcz1bXSxfX2Zlc3RfY2h1bmssX19mZXN0X2F0dHJzPVtdLF9fZmVzdF9zZWxlY3QsX19mZXN0X2lmLF9fZmVzdF9pdGVyYXRvcixfX2Zlc3RfdG8sX19mZXN0X2ZuLF9fZmVzdF9odG1sPVwiXCIsX19mZXN0X2Jsb2Nrcz17fSxfX2Zlc3RfcGFyYW1zLF9fZmVzdF9lbGVtZW50LF9fZmVzdF9kZWJ1Z19maWxlPVwiXCIsX19mZXN0X2RlYnVnX2xpbmU9XCJcIixfX2Zlc3RfZGVidWdfYmxvY2s9XCJcIixfX2Zlc3RfZWxlbWVudF9zdGFjayA9IFtdLF9fZmVzdF9zaG9ydF90YWdzID0ge1wiYXJlYVwiOiB0cnVlLCBcImJhc2VcIjogdHJ1ZSwgXCJiclwiOiB0cnVlLCBcImNvbFwiOiB0cnVlLCBcImNvbW1hbmRcIjogdHJ1ZSwgXCJlbWJlZFwiOiB0cnVlLCBcImhyXCI6IHRydWUsIFwiaW1nXCI6IHRydWUsIFwiaW5wdXRcIjogdHJ1ZSwgXCJrZXlnZW5cIjogdHJ1ZSwgXCJsaW5rXCI6IHRydWUsIFwibWV0YVwiOiB0cnVlLCBcInBhcmFtXCI6IHRydWUsIFwic291cmNlXCI6IHRydWUsIFwid2JyXCI6IHRydWV9LF9fZmVzdF9qc2NoYXJzID0gL1tcXFxcJ1wiXFwvXFxuXFxyXFx0XFxiXFxmPD5dL2csX19mZXN0X2pzY2hhcnNfdGVzdCA9IC9bXFxcXCdcIlxcL1xcblxcclxcdFxcYlxcZjw+XS8sX19mZXN0X2h0bWxjaGFycyA9IC9bJjw+XCJdL2csX19mZXN0X2h0bWxjaGFyc190ZXN0ID0gL1smPD5cIl0vLF9fZmVzdF9qc2hhc2ggPSB7XCJcXFwiXCI6IFwiXFxcXFxcXCJcIiwgXCJcXFxcXCI6IFwiXFxcXFxcXFxcIiwgXCIvXCI6IFwiXFxcXC9cIiwgXCJcXG5cIjogXCJcXFxcblwiLCBcIlxcclwiOiBcIlxcXFxyXCIsIFwiXFx0XCI6IFwiXFxcXHRcIiwgXCJcXGJcIjogXCJcXFxcYlwiLCBcIlxcZlwiOiBcIlxcXFxmXCIsIFwiJ1wiOiBcIlxcXFwnXCIsIFwiPFwiOiBcIlxcXFx1MDAzQ1wiLCBcIj5cIjogXCJcXFxcdTAwM0VcIn0sX19mZXN0X2h0bWxoYXNoID0ge1wiJlwiOiBcIiZhbXA7XCIsIFwiPFwiOiBcIiZsdDtcIiwgXCI+XCI6IFwiJmd0O1wiLCBcIlxcXCJcIjogXCImcXVvdDtcIn0sX19mZXN0X2VzY2FwZUpTID0gZnVuY3Rpb24gX19mZXN0X2VzY2FwZUpTKHZhbHVlKSB7XG5cdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdGlmIChfX2Zlc3RfanNjaGFyc190ZXN0LnRlc3QodmFsdWUpKSB7XG5cdFx0XHRcdHJldHVybiB2YWx1ZS5yZXBsYWNlKF9fZmVzdF9qc2NoYXJzLCBfX2Zlc3RfcmVwbGFjZUpTKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gdmFsdWUgPT0gbnVsbCA/ICcnIDogdmFsdWU7XG5cdH0sX19mZXN0X3JlcGxhY2VKUyA9IGZ1bmN0aW9uIF9fZmVzdF9yZXBsYWNlSlMoY2hyKSB7XG5cdFx0cmV0dXJuIF9fZmVzdF9qc2hhc2hbY2hyXTtcblx0fSxfX2Zlc3RfZXNjYXBlSFRNTCA9IGZ1bmN0aW9uIF9fZmVzdF9lc2NhcGVIVE1MKHZhbHVlKSB7XG5cdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdGlmIChfX2Zlc3RfaHRtbGNoYXJzX3Rlc3QudGVzdCh2YWx1ZSkpIHtcblx0XHRcdFx0cmV0dXJuIHZhbHVlLnJlcGxhY2UoX19mZXN0X2h0bWxjaGFycywgX19mZXN0X3JlcGxhY2VIVE1MKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gdmFsdWUgPT0gbnVsbCA/ICcnIDogdmFsdWU7XG5cdH0sX19mZXN0X3JlcGxhY2VIVE1MID0gZnVuY3Rpb24gX19mZXN0X3JlcGxhY2VIVE1MKGNocikge1xuXHRcdHJldHVybiBfX2Zlc3RfaHRtbGhhc2hbY2hyXTtcblx0fSxfX2Zlc3RfZXh0ZW5kID0gZnVuY3Rpb24gX19mZXN0X2V4dGVuZChkZXN0LCBzcmMpIHtcblx0XHRmb3IgKHZhciBrZXkgaW4gc3JjKSB7XG5cdFx0XHRpZiAoc3JjLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdFx0ZGVzdFtrZXldID0gc3JjW2tleV07XG5cdFx0XHR9XG5cdFx0fVxuXHR9LF9fZmVzdF9wYXJhbSA9IGZ1bmN0aW9uIF9fZmVzdF9wYXJhbShmbikge1xuXHRcdGZuLnBhcmFtID0gdHJ1ZTtcblx0XHRyZXR1cm4gZm47XG5cdH0saTE4bj1fX2Zlc3Rfc2VsZiAmJiB0eXBlb2YgX19mZXN0X3NlbGYuaTE4biA9PT0gXCJmdW5jdGlvblwiID8gX19mZXN0X3NlbGYuaTE4biA6IGZ1bmN0aW9uIChzdHIpIHtyZXR1cm4gc3RyO30sX19fZmVzdF9sb2dfZXJyb3I7aWYodHlwZW9mIF9fZmVzdF9lcnJvciA9PT0gXCJ1bmRlZmluZWRcIil7X19fZmVzdF9sb2dfZXJyb3IgPSAodHlwZW9mIGNvbnNvbGUgIT09IFwidW5kZWZpbmVkXCIgJiYgY29uc29sZS5lcnJvcikgPyBmdW5jdGlvbigpe3JldHVybiBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHkuY2FsbChjb25zb2xlLmVycm9yLCBjb25zb2xlLCBhcmd1bWVudHMpfSA6IGZ1bmN0aW9uKCl7fTt9ZWxzZXtfX19mZXN0X2xvZ19lcnJvcj1fX2Zlc3RfZXJyb3J9O2Z1bmN0aW9uIF9fZmVzdF9sb2dfZXJyb3IobXNnKXtfX19mZXN0X2xvZ19lcnJvcihtc2crXCJcXG5pbiBibG9jayBcXFwiXCIrX19mZXN0X2RlYnVnX2Jsb2NrK1wiXFxcIiBhdCBsaW5lOiBcIitfX2Zlc3RfZGVidWdfbGluZStcIlxcbmZpbGU6IFwiK19fZmVzdF9kZWJ1Z19maWxlKX1mdW5jdGlvbiBfX2Zlc3RfY2FsbChmbiwgcGFyYW1zLGNwKXtpZihjcClmb3IodmFyIGkgaW4gcGFyYW1zKWlmKHR5cGVvZiBwYXJhbXNbaV09PVwiZnVuY3Rpb25cIiYmcGFyYW1zW2ldLnBhcmFtKXBhcmFtc1tpXT1wYXJhbXNbaV0oKTtyZXR1cm4gZm4uY2FsbChfX2Zlc3Rfc2VsZixwYXJhbXMpfXZhciBqc29uPV9fZmVzdF9jb250ZXh0O19fZmVzdF9idWYrPShcIjxmb3JtIGNsYXNzPVxcXCJqcy1sb2dpbi1mb3JtIGxvZ2luX19mb3JtXFxcIiBuYW1lPVxcXCJsb2dpbkZvcm1cXFwiPjxoMSBjbGFzcz1cXFwibG9naW5fX2hlYWRlclxcXCI+0JLRhdC+0LQ8L2gxPjxzcGFuIGNsYXNzPVxcXCJqcy1lbWFpbC1lcnJvciBsb2dpbl9fZm9ybV9fZXJyb3JcXFwiIG5hbWU9XFxcImVtYWlsRXJyb3JcXFwiIGhpZGRlbj1cXFwiaGlkZGVuXFxcIj48L3NwYW4+PGlucHV0IHBsYWNlaG9sZGVyPVxcXCJFLW1haWxcXFwiIGNsYXNzPVxcXCJqcy1lbWFpbCBsb2dpbl9fZm9ybV9faW5wdXRcXFwiIG5hbWU9XFxcImVtYWlsXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIi8+PHNwYW4gY2xhc3M9XFxcImpzLXBhc3N3b3JkLWVycm9yIGxvZ2luX19mb3JtX19lcnJvclxcXCIgbmFtZT1cXFwicGFzc3dvcmRFcnJvclxcXCIgaGlkZGVuPVxcXCJoaWRkZW5cXFwiPjwvc3Bhbj48aW5wdXQgcGxhY2Vob2xkZXI9XFxcIlBhc3N3b3JkXFxcIiBjbGFzcz1cXFwianMtcGFzc3dvcmQgbG9naW5fX2Zvcm1fX2lucHV0XFxcIiBuYW1lPVxcXCJwYXNzd29yZFxcXCIgdHlwZT1cXFwicGFzc3dvcmRcXFwiLz48YnV0dG9uIGNsYXNzPVxcXCJqc19zdWJtaXQgbG9naW5fX2Zvcm1fX2J1dHRvblxcXCIgbmFtZT1cXFwiYnV0dG9uXFxcIj7QktC+0LnRgtC4ITwvYnV0dG9uPjxhIGNsYXNzPVxcXCJsb2dpbl9fZm9ybV9fbGlua1xcXCIgbmFtZT1cXFwicmVnaXN0cmF0aW9uXFxcIj7QoNC10LPQuNGB0YLRgNCw0YbQuNGPPC9hPjwvZm9ybT5cIik7X19mZXN0X3RvPV9fZmVzdF9jaHVua3MubGVuZ3RoO2lmIChfX2Zlc3RfdG8pIHtfX2Zlc3RfaXRlcmF0b3IgPSAwO2ZvciAoO19fZmVzdF9pdGVyYXRvcjxfX2Zlc3RfdG87X19mZXN0X2l0ZXJhdG9yKyspIHtfX2Zlc3RfY2h1bms9X19mZXN0X2NodW5rc1tfX2Zlc3RfaXRlcmF0b3JdO2lmICh0eXBlb2YgX19mZXN0X2NodW5rPT09XCJzdHJpbmdcIikge19fZmVzdF9odG1sKz1fX2Zlc3RfY2h1bms7fSBlbHNlIHtfX2Zlc3RfZm49X19mZXN0X2Jsb2Nrc1tfX2Zlc3RfY2h1bmsubmFtZV07aWYgKF9fZmVzdF9mbikgX19mZXN0X2h0bWwrPV9fZmVzdF9jYWxsKF9fZmVzdF9mbixfX2Zlc3RfY2h1bmsucGFyYW1zLF9fZmVzdF9jaHVuay5jcCk7fX1yZXR1cm4gX19mZXN0X2h0bWwrX19mZXN0X2J1Zjt9IGVsc2Uge3JldHVybiBfX2Zlc3RfYnVmO319XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9wdWJsaWMvdGVtcGxhdGVzL2xvZ2luLnRtcGwueG1sXG4vLyBtb2R1bGUgaWQgPSAxMjZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXG4vKiogXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiAvaG9tZS9pdmFuL0RvY3VtZW50cy8yMDE2XzJfQWlyRHJvbmUvcHVibGljL3RlbXBsYXRlcy9yZWdpc3RyYXRpb24udG1wbCB0ZW1wbGF0ZVxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKF9fZmVzdF9jb250ZXh0KXtcInVzZSBzdHJpY3RcIjt2YXIgX19mZXN0X3NlbGY9dGhpcyxfX2Zlc3RfYnVmPVwiXCIsX19mZXN0X2NodW5rcz1bXSxfX2Zlc3RfY2h1bmssX19mZXN0X2F0dHJzPVtdLF9fZmVzdF9zZWxlY3QsX19mZXN0X2lmLF9fZmVzdF9pdGVyYXRvcixfX2Zlc3RfdG8sX19mZXN0X2ZuLF9fZmVzdF9odG1sPVwiXCIsX19mZXN0X2Jsb2Nrcz17fSxfX2Zlc3RfcGFyYW1zLF9fZmVzdF9lbGVtZW50LF9fZmVzdF9kZWJ1Z19maWxlPVwiXCIsX19mZXN0X2RlYnVnX2xpbmU9XCJcIixfX2Zlc3RfZGVidWdfYmxvY2s9XCJcIixfX2Zlc3RfZWxlbWVudF9zdGFjayA9IFtdLF9fZmVzdF9zaG9ydF90YWdzID0ge1wiYXJlYVwiOiB0cnVlLCBcImJhc2VcIjogdHJ1ZSwgXCJiclwiOiB0cnVlLCBcImNvbFwiOiB0cnVlLCBcImNvbW1hbmRcIjogdHJ1ZSwgXCJlbWJlZFwiOiB0cnVlLCBcImhyXCI6IHRydWUsIFwiaW1nXCI6IHRydWUsIFwiaW5wdXRcIjogdHJ1ZSwgXCJrZXlnZW5cIjogdHJ1ZSwgXCJsaW5rXCI6IHRydWUsIFwibWV0YVwiOiB0cnVlLCBcInBhcmFtXCI6IHRydWUsIFwic291cmNlXCI6IHRydWUsIFwid2JyXCI6IHRydWV9LF9fZmVzdF9qc2NoYXJzID0gL1tcXFxcJ1wiXFwvXFxuXFxyXFx0XFxiXFxmPD5dL2csX19mZXN0X2pzY2hhcnNfdGVzdCA9IC9bXFxcXCdcIlxcL1xcblxcclxcdFxcYlxcZjw+XS8sX19mZXN0X2h0bWxjaGFycyA9IC9bJjw+XCJdL2csX19mZXN0X2h0bWxjaGFyc190ZXN0ID0gL1smPD5cIl0vLF9fZmVzdF9qc2hhc2ggPSB7XCJcXFwiXCI6IFwiXFxcXFxcXCJcIiwgXCJcXFxcXCI6IFwiXFxcXFxcXFxcIiwgXCIvXCI6IFwiXFxcXC9cIiwgXCJcXG5cIjogXCJcXFxcblwiLCBcIlxcclwiOiBcIlxcXFxyXCIsIFwiXFx0XCI6IFwiXFxcXHRcIiwgXCJcXGJcIjogXCJcXFxcYlwiLCBcIlxcZlwiOiBcIlxcXFxmXCIsIFwiJ1wiOiBcIlxcXFwnXCIsIFwiPFwiOiBcIlxcXFx1MDAzQ1wiLCBcIj5cIjogXCJcXFxcdTAwM0VcIn0sX19mZXN0X2h0bWxoYXNoID0ge1wiJlwiOiBcIiZhbXA7XCIsIFwiPFwiOiBcIiZsdDtcIiwgXCI+XCI6IFwiJmd0O1wiLCBcIlxcXCJcIjogXCImcXVvdDtcIn0sX19mZXN0X2VzY2FwZUpTID0gZnVuY3Rpb24gX19mZXN0X2VzY2FwZUpTKHZhbHVlKSB7XG5cdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdGlmIChfX2Zlc3RfanNjaGFyc190ZXN0LnRlc3QodmFsdWUpKSB7XG5cdFx0XHRcdHJldHVybiB2YWx1ZS5yZXBsYWNlKF9fZmVzdF9qc2NoYXJzLCBfX2Zlc3RfcmVwbGFjZUpTKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gdmFsdWUgPT0gbnVsbCA/ICcnIDogdmFsdWU7XG5cdH0sX19mZXN0X3JlcGxhY2VKUyA9IGZ1bmN0aW9uIF9fZmVzdF9yZXBsYWNlSlMoY2hyKSB7XG5cdFx0cmV0dXJuIF9fZmVzdF9qc2hhc2hbY2hyXTtcblx0fSxfX2Zlc3RfZXNjYXBlSFRNTCA9IGZ1bmN0aW9uIF9fZmVzdF9lc2NhcGVIVE1MKHZhbHVlKSB7XG5cdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdGlmIChfX2Zlc3RfaHRtbGNoYXJzX3Rlc3QudGVzdCh2YWx1ZSkpIHtcblx0XHRcdFx0cmV0dXJuIHZhbHVlLnJlcGxhY2UoX19mZXN0X2h0bWxjaGFycywgX19mZXN0X3JlcGxhY2VIVE1MKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gdmFsdWUgPT0gbnVsbCA/ICcnIDogdmFsdWU7XG5cdH0sX19mZXN0X3JlcGxhY2VIVE1MID0gZnVuY3Rpb24gX19mZXN0X3JlcGxhY2VIVE1MKGNocikge1xuXHRcdHJldHVybiBfX2Zlc3RfaHRtbGhhc2hbY2hyXTtcblx0fSxfX2Zlc3RfZXh0ZW5kID0gZnVuY3Rpb24gX19mZXN0X2V4dGVuZChkZXN0LCBzcmMpIHtcblx0XHRmb3IgKHZhciBrZXkgaW4gc3JjKSB7XG5cdFx0XHRpZiAoc3JjLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdFx0ZGVzdFtrZXldID0gc3JjW2tleV07XG5cdFx0XHR9XG5cdFx0fVxuXHR9LF9fZmVzdF9wYXJhbSA9IGZ1bmN0aW9uIF9fZmVzdF9wYXJhbShmbikge1xuXHRcdGZuLnBhcmFtID0gdHJ1ZTtcblx0XHRyZXR1cm4gZm47XG5cdH0saTE4bj1fX2Zlc3Rfc2VsZiAmJiB0eXBlb2YgX19mZXN0X3NlbGYuaTE4biA9PT0gXCJmdW5jdGlvblwiID8gX19mZXN0X3NlbGYuaTE4biA6IGZ1bmN0aW9uIChzdHIpIHtyZXR1cm4gc3RyO30sX19fZmVzdF9sb2dfZXJyb3I7aWYodHlwZW9mIF9fZmVzdF9lcnJvciA9PT0gXCJ1bmRlZmluZWRcIil7X19fZmVzdF9sb2dfZXJyb3IgPSAodHlwZW9mIGNvbnNvbGUgIT09IFwidW5kZWZpbmVkXCIgJiYgY29uc29sZS5lcnJvcikgPyBmdW5jdGlvbigpe3JldHVybiBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHkuY2FsbChjb25zb2xlLmVycm9yLCBjb25zb2xlLCBhcmd1bWVudHMpfSA6IGZ1bmN0aW9uKCl7fTt9ZWxzZXtfX19mZXN0X2xvZ19lcnJvcj1fX2Zlc3RfZXJyb3J9O2Z1bmN0aW9uIF9fZmVzdF9sb2dfZXJyb3IobXNnKXtfX19mZXN0X2xvZ19lcnJvcihtc2crXCJcXG5pbiBibG9jayBcXFwiXCIrX19mZXN0X2RlYnVnX2Jsb2NrK1wiXFxcIiBhdCBsaW5lOiBcIitfX2Zlc3RfZGVidWdfbGluZStcIlxcbmZpbGU6IFwiK19fZmVzdF9kZWJ1Z19maWxlKX1mdW5jdGlvbiBfX2Zlc3RfY2FsbChmbiwgcGFyYW1zLGNwKXtpZihjcClmb3IodmFyIGkgaW4gcGFyYW1zKWlmKHR5cGVvZiBwYXJhbXNbaV09PVwiZnVuY3Rpb25cIiYmcGFyYW1zW2ldLnBhcmFtKXBhcmFtc1tpXT1wYXJhbXNbaV0oKTtyZXR1cm4gZm4uY2FsbChfX2Zlc3Rfc2VsZixwYXJhbXMpfXZhciBqc29uPV9fZmVzdF9jb250ZXh0O19fZmVzdF9idWYrPShcIjxmb3JtIGNsYXNzPVxcXCJqcy1yZWdpc3RyYXRpb24tZm9ybSByZWdpc3RyYXRpb25fX2Zvcm1cXFwiPjxoMSBjbGFzcz1cXFwicmVnaXN0cmF0aW9uX19oZWFkZXJcXFwiPtCf0L7Qt9C90LDQutC+0LzQuNC80YHRjz88L2gxPjxzcGFuIGNsYXNzPVxcXCJqcy1lbWFpbC1lcnJvciByZWdpc3RyYXRpb25fX2Zvcm1fX2Vycm9yXFxcIiBuYW1lPVxcXCJlbWFpbEVycm9yXFxcIiBoaWRkZW49XFxcImhpZGRlblxcXCI+PC9zcGFuPjxpbnB1dCBwbGFjZWhvbGRlcj1cXFwiRS1tYWlsXFxcIiBjbGFzcz1cXFwianMtZW1haWwgcmVnaXN0cmF0aW9uX19mb3JtX19pbnB1dFxcXCIgbmFtZT1cXFwiZW1haWxcXFwiIHR5cGU9XFxcInRleHRcXFwiLz48c3BhbiBjbGFzcz1cXFwianMtcGFzc3dvcmQtZXJyb3IgcmVnaXN0cmF0aW9uX19mb3JtX19lcnJvclxcXCIgbmFtZT1cXFwicGFzc3dvcmRFcnJvclxcXCIgaGlkZGVuPVxcXCJoaWRkZW5cXFwiPjwvc3Bhbj48aW5wdXQgcGxhY2Vob2xkZXI9XFxcIlBhc3N3b3JkXFxcIiBjbGFzcz1cXFwianMtcGFzc3dvcmQgcmVnaXN0cmF0aW9uX19mb3JtX19pbnB1dFxcXCIgbmFtZT1cXFwicGFzc3dvcmRcXFwiIHR5cGU9XFxcInBhc3N3b3JkXFxcIi8+PGlucHV0IHBsYWNlaG9sZGVyPVxcXCJDb25maXJtIHBhc3N3b3JkXFxcIiBjbGFzcz1cXFwianMtcGFzc3dvcmQyIHJlZ2lzdHJhdGlvbl9fZm9ybV9faW5wdXRcXFwiIG5hbWU9XFxcInBhc3N3b3JkMlxcXCIgdHlwZT1cXFwicGFzc3dvcmRcXFwiLz48c3BhbiBjbGFzcz1cXFwianMtbG9naW4tZXJyb3IgcmVnaXN0cmF0aW9uX19mb3JtX19lcnJvclxcXCIgbmFtZT1cXFwibG9naW5FcnJvclxcXCIgaGlkZGVuPVxcXCJoaWRkZW5cXFwiPjwvc3Bhbj48aW5wdXQgcGxhY2Vob2xkZXI9XFxcItCa0LvQuNC60YPRhdCwXFxcIiBjbGFzcz1cXFwianMtbG9naW4gcmVnaXN0cmF0aW9uX19mb3JtX19pbnB1dFxcXCIgbmFtZT1cXFwibG9naW5cXFwiIHR5cGU9XFxcInRleHRcXFwiLz48YnV0dG9uIGNsYXNzPVxcXCJqcy1zdWJtaXQgcmVnaXN0cmF0aW9uX19mb3JtX19idXR0b25cXFwiIG5hbWU9XFxcImJ1dHRvblxcXCI+0JfQsNGA0LXQs9C40YHRgtGA0LjRgNC+0LLQsNGC0YzRgdGPITwvYnV0dG9uPjwvZm9ybT5cIik7X19mZXN0X3RvPV9fZmVzdF9jaHVua3MubGVuZ3RoO2lmIChfX2Zlc3RfdG8pIHtfX2Zlc3RfaXRlcmF0b3IgPSAwO2ZvciAoO19fZmVzdF9pdGVyYXRvcjxfX2Zlc3RfdG87X19mZXN0X2l0ZXJhdG9yKyspIHtfX2Zlc3RfY2h1bms9X19mZXN0X2NodW5rc1tfX2Zlc3RfaXRlcmF0b3JdO2lmICh0eXBlb2YgX19mZXN0X2NodW5rPT09XCJzdHJpbmdcIikge19fZmVzdF9odG1sKz1fX2Zlc3RfY2h1bms7fSBlbHNlIHtfX2Zlc3RfZm49X19mZXN0X2Jsb2Nrc1tfX2Zlc3RfY2h1bmsubmFtZV07aWYgKF9fZmVzdF9mbikgX19mZXN0X2h0bWwrPV9fZmVzdF9jYWxsKF9fZmVzdF9mbixfX2Zlc3RfY2h1bmsucGFyYW1zLF9fZmVzdF9jaHVuay5jcCk7fX1yZXR1cm4gX19mZXN0X2h0bWwrX19mZXN0X2J1Zjt9IGVsc2Uge3JldHVybiBfX2Zlc3RfYnVmO319XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9wdWJsaWMvdGVtcGxhdGVzL3JlZ2lzdHJhdGlvbi50bXBsLnhtbFxuLy8gbW9kdWxlIGlkID0gMTI3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxuLyoqIFxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogL2hvbWUvaXZhbi9Eb2N1bWVudHMvMjAxNl8yX0FpckRyb25lL3B1YmxpYy90ZW1wbGF0ZXMvcm9vbXMudG1wbCB0ZW1wbGF0ZVxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKF9fZmVzdF9jb250ZXh0KXtcInVzZSBzdHJpY3RcIjt2YXIgX19mZXN0X3NlbGY9dGhpcyxfX2Zlc3RfYnVmPVwiXCIsX19mZXN0X2NodW5rcz1bXSxfX2Zlc3RfY2h1bmssX19mZXN0X2F0dHJzPVtdLF9fZmVzdF9zZWxlY3QsX19mZXN0X2lmLF9fZmVzdF9pdGVyYXRvcixfX2Zlc3RfdG8sX19mZXN0X2ZuLF9fZmVzdF9odG1sPVwiXCIsX19mZXN0X2Jsb2Nrcz17fSxfX2Zlc3RfcGFyYW1zLF9fZmVzdF9lbGVtZW50LF9fZmVzdF9kZWJ1Z19maWxlPVwiXCIsX19mZXN0X2RlYnVnX2xpbmU9XCJcIixfX2Zlc3RfZGVidWdfYmxvY2s9XCJcIixfX2Zlc3RfZWxlbWVudF9zdGFjayA9IFtdLF9fZmVzdF9zaG9ydF90YWdzID0ge1wiYXJlYVwiOiB0cnVlLCBcImJhc2VcIjogdHJ1ZSwgXCJiclwiOiB0cnVlLCBcImNvbFwiOiB0cnVlLCBcImNvbW1hbmRcIjogdHJ1ZSwgXCJlbWJlZFwiOiB0cnVlLCBcImhyXCI6IHRydWUsIFwiaW1nXCI6IHRydWUsIFwiaW5wdXRcIjogdHJ1ZSwgXCJrZXlnZW5cIjogdHJ1ZSwgXCJsaW5rXCI6IHRydWUsIFwibWV0YVwiOiB0cnVlLCBcInBhcmFtXCI6IHRydWUsIFwic291cmNlXCI6IHRydWUsIFwid2JyXCI6IHRydWV9LF9fZmVzdF9qc2NoYXJzID0gL1tcXFxcJ1wiXFwvXFxuXFxyXFx0XFxiXFxmPD5dL2csX19mZXN0X2pzY2hhcnNfdGVzdCA9IC9bXFxcXCdcIlxcL1xcblxcclxcdFxcYlxcZjw+XS8sX19mZXN0X2h0bWxjaGFycyA9IC9bJjw+XCJdL2csX19mZXN0X2h0bWxjaGFyc190ZXN0ID0gL1smPD5cIl0vLF9fZmVzdF9qc2hhc2ggPSB7XCJcXFwiXCI6IFwiXFxcXFxcXCJcIiwgXCJcXFxcXCI6IFwiXFxcXFxcXFxcIiwgXCIvXCI6IFwiXFxcXC9cIiwgXCJcXG5cIjogXCJcXFxcblwiLCBcIlxcclwiOiBcIlxcXFxyXCIsIFwiXFx0XCI6IFwiXFxcXHRcIiwgXCJcXGJcIjogXCJcXFxcYlwiLCBcIlxcZlwiOiBcIlxcXFxmXCIsIFwiJ1wiOiBcIlxcXFwnXCIsIFwiPFwiOiBcIlxcXFx1MDAzQ1wiLCBcIj5cIjogXCJcXFxcdTAwM0VcIn0sX19mZXN0X2h0bWxoYXNoID0ge1wiJlwiOiBcIiZhbXA7XCIsIFwiPFwiOiBcIiZsdDtcIiwgXCI+XCI6IFwiJmd0O1wiLCBcIlxcXCJcIjogXCImcXVvdDtcIn0sX19mZXN0X2VzY2FwZUpTID0gZnVuY3Rpb24gX19mZXN0X2VzY2FwZUpTKHZhbHVlKSB7XG5cdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdGlmIChfX2Zlc3RfanNjaGFyc190ZXN0LnRlc3QodmFsdWUpKSB7XG5cdFx0XHRcdHJldHVybiB2YWx1ZS5yZXBsYWNlKF9fZmVzdF9qc2NoYXJzLCBfX2Zlc3RfcmVwbGFjZUpTKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gdmFsdWUgPT0gbnVsbCA/ICcnIDogdmFsdWU7XG5cdH0sX19mZXN0X3JlcGxhY2VKUyA9IGZ1bmN0aW9uIF9fZmVzdF9yZXBsYWNlSlMoY2hyKSB7XG5cdFx0cmV0dXJuIF9fZmVzdF9qc2hhc2hbY2hyXTtcblx0fSxfX2Zlc3RfZXNjYXBlSFRNTCA9IGZ1bmN0aW9uIF9fZmVzdF9lc2NhcGVIVE1MKHZhbHVlKSB7XG5cdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdGlmIChfX2Zlc3RfaHRtbGNoYXJzX3Rlc3QudGVzdCh2YWx1ZSkpIHtcblx0XHRcdFx0cmV0dXJuIHZhbHVlLnJlcGxhY2UoX19mZXN0X2h0bWxjaGFycywgX19mZXN0X3JlcGxhY2VIVE1MKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gdmFsdWUgPT0gbnVsbCA/ICcnIDogdmFsdWU7XG5cdH0sX19mZXN0X3JlcGxhY2VIVE1MID0gZnVuY3Rpb24gX19mZXN0X3JlcGxhY2VIVE1MKGNocikge1xuXHRcdHJldHVybiBfX2Zlc3RfaHRtbGhhc2hbY2hyXTtcblx0fSxfX2Zlc3RfZXh0ZW5kID0gZnVuY3Rpb24gX19mZXN0X2V4dGVuZChkZXN0LCBzcmMpIHtcblx0XHRmb3IgKHZhciBrZXkgaW4gc3JjKSB7XG5cdFx0XHRpZiAoc3JjLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdFx0ZGVzdFtrZXldID0gc3JjW2tleV07XG5cdFx0XHR9XG5cdFx0fVxuXHR9LF9fZmVzdF9wYXJhbSA9IGZ1bmN0aW9uIF9fZmVzdF9wYXJhbShmbikge1xuXHRcdGZuLnBhcmFtID0gdHJ1ZTtcblx0XHRyZXR1cm4gZm47XG5cdH0saTE4bj1fX2Zlc3Rfc2VsZiAmJiB0eXBlb2YgX19mZXN0X3NlbGYuaTE4biA9PT0gXCJmdW5jdGlvblwiID8gX19mZXN0X3NlbGYuaTE4biA6IGZ1bmN0aW9uIChzdHIpIHtyZXR1cm4gc3RyO30sX19fZmVzdF9sb2dfZXJyb3I7aWYodHlwZW9mIF9fZmVzdF9lcnJvciA9PT0gXCJ1bmRlZmluZWRcIil7X19fZmVzdF9sb2dfZXJyb3IgPSAodHlwZW9mIGNvbnNvbGUgIT09IFwidW5kZWZpbmVkXCIgJiYgY29uc29sZS5lcnJvcikgPyBmdW5jdGlvbigpe3JldHVybiBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHkuY2FsbChjb25zb2xlLmVycm9yLCBjb25zb2xlLCBhcmd1bWVudHMpfSA6IGZ1bmN0aW9uKCl7fTt9ZWxzZXtfX19mZXN0X2xvZ19lcnJvcj1fX2Zlc3RfZXJyb3J9O2Z1bmN0aW9uIF9fZmVzdF9sb2dfZXJyb3IobXNnKXtfX19mZXN0X2xvZ19lcnJvcihtc2crXCJcXG5pbiBibG9jayBcXFwiXCIrX19mZXN0X2RlYnVnX2Jsb2NrK1wiXFxcIiBhdCBsaW5lOiBcIitfX2Zlc3RfZGVidWdfbGluZStcIlxcbmZpbGU6IFwiK19fZmVzdF9kZWJ1Z19maWxlKX1mdW5jdGlvbiBfX2Zlc3RfY2FsbChmbiwgcGFyYW1zLGNwKXtpZihjcClmb3IodmFyIGkgaW4gcGFyYW1zKWlmKHR5cGVvZiBwYXJhbXNbaV09PVwiZnVuY3Rpb25cIiYmcGFyYW1zW2ldLnBhcmFtKXBhcmFtc1tpXT1wYXJhbXNbaV0oKTtyZXR1cm4gZm4uY2FsbChfX2Zlc3Rfc2VsZixwYXJhbXMpfXZhciBqc29uPV9fZmVzdF9jb250ZXh0O19fZmVzdF9idWYrPShcIjxoMSBjbGFzcz1cXFwicm9vbXNfX2hlYWRlclxcXCI+0JLRi9Cx0LXRgNC40YLQtSDQuNCz0YDRgzwvaDE+XCIpO3ZhciBpLHJvb20sX19mZXN0X2l0ZXJhdG9yMDt0cnl7X19mZXN0X2l0ZXJhdG9yMD1qc29uIHx8IHt9O31jYXRjaChlKXtfX2Zlc3RfaXRlcmF0b3I9e307X19mZXN0X2xvZ19lcnJvcihlLm1lc3NhZ2UpO31mb3IoaSBpbiBfX2Zlc3RfaXRlcmF0b3IwKXtyb29tPV9fZmVzdF9pdGVyYXRvcjBbaV07X19mZXN0X2J1Zis9KFwiPGRpdiBjbGFzcz1cXFwicm9vbXNfX3Jvb21cXFwiPjxoMiBjbGFzcz1cXFwicm9vbXNfX3Jvb21fX2hlYWRlclxcXCI+XCIpO3RyeXtfX2Zlc3RfYnVmKz0oX19mZXN0X2VzY2FwZUhUTUwocm9vbS5uYW1lKSl9Y2F0Y2goZSl7X19mZXN0X2xvZ19lcnJvcihlLm1lc3NhZ2UgKyBcIjRcIik7fV9fZmVzdF9idWYrPShcIiAoXCIpO3RyeXtfX2Zlc3RfYnVmKz0oX19mZXN0X2VzY2FwZUhUTUwocm9vbS5pcCkpfWNhdGNoKGUpe19fZmVzdF9sb2dfZXJyb3IoZS5tZXNzYWdlICsgXCI0XCIpO31fX2Zlc3RfYnVmKz0oXCIpPC9oMj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJyb29tc19fZGV0YWlsc1xcXCIgaGlkZGVuPVxcXCJoaWRkZW5cXFwiPjxoMSBjbGFzcz1cXFwicm9vbXNfX2RldGFpbHNfX2hlYWRlclxcXCI+0JLRi9Cx0LXRgNC40YLQtSDQutCy0LDQtNGA0L7QutC+0L/RgtC10YA6PC9oMT48ZGl2IGNsYXNzPVxcXCJyb29tc19fZGV0YWlsc19fY29sb3JzXFxcIj5cIik7dmFyIGksY29sb3IsX19mZXN0X2l0ZXJhdG9yMTt0cnl7X19mZXN0X2l0ZXJhdG9yMT1yb29tLmF2YWlsYWJsZUNvbG9ycyB8fCB7fTt9Y2F0Y2goZSl7X19mZXN0X2l0ZXJhdG9yPXt9O19fZmVzdF9sb2dfZXJyb3IoZS5tZXNzYWdlKTt9Zm9yKGkgaW4gX19mZXN0X2l0ZXJhdG9yMSl7Y29sb3I9X19mZXN0X2l0ZXJhdG9yMVtpXTtfX2Zlc3RfYnVmKz0oXCI8aW5wdXQgY2xhc3M9XFxcInJvb21zX19kZXRhaWxzX19jb2xvcnNfX2NvbG9yIGpzLWNvbG9yXFxcIiBzdHlsZT1cXFwiYmFja2dyb3VuZC1jb2xvcjpcIik7dHJ5e19fZmVzdF9idWYrPShfX2Zlc3RfZXNjYXBlSFRNTChjb2xvcikpfWNhdGNoKGUpe19fZmVzdF9sb2dfZXJyb3IoZS5tZXNzYWdlICsgXCIxMlwiKTt9X19mZXN0X2J1Zis9KFwiOyBjb2xvcjpcIik7dHJ5e19fZmVzdF9idWYrPShfX2Zlc3RfZXNjYXBlSFRNTChjb2xvcikpfWNhdGNoKGUpe19fZmVzdF9sb2dfZXJyb3IoZS5tZXNzYWdlICsgXCIxMlwiKTt9X19mZXN0X2J1Zis9KFwiO1xcXCIvPlwiKTt9X19mZXN0X2J1Zis9KFwiPC9kaXY+PHAgY2xhc3M9XFxcImpzLWVycm9yIHJvb21zX19kZXRhaWxzX19lcnJvclxcXCIgaGlkZGVuPVxcXCJoaWRkZW5cXFwiPjwvcD48YnV0dG9uIGNsYXNzPVxcXCJyb29tc19fZGV0YWlsc19fam9pbiBqcy1qb2luXFxcIj7Qn9GA0LjRgdC+0LXQtNC40L3QuNGC0YzRgdGPITwvYnV0dG9uPjxoci8+PGgxIGNsYXNzPVxcXCJyb29tc19fZGV0YWlsc19faGVhZGVyXFxcIj7Qo9C20LUg0LIg0LjQs9GA0LU6PC9oMT48dGFibGUgY2xhc3M9XFxcInJvb21zX19kZXRhaWxzX191bFxcXCI+PHVsPlwiKTt2YXIgaSxkcm9uZSxfX2Zlc3RfaXRlcmF0b3IyO3RyeXtfX2Zlc3RfaXRlcmF0b3IyPXJvb20uZHJvbmVzIHx8IHt9O31jYXRjaChlKXtfX2Zlc3RfaXRlcmF0b3I9e307X19mZXN0X2xvZ19lcnJvcihlLm1lc3NhZ2UpO31mb3IoaSBpbiBfX2Zlc3RfaXRlcmF0b3IyKXtkcm9uZT1fX2Zlc3RfaXRlcmF0b3IyW2ldO19fZmVzdF9idWYrPShcIjx0ciBjbGFzcz1cXFwicm9vbV9fZGV0YWlsc19fdWxfX2xpXFxcIj48dGQ+PGxpPlwiKTt0cnl7X19mZXN0X2J1Zis9KF9fZmVzdF9lc2NhcGVIVE1MKGRyb25lLnBsYXllckxvZ2luKSl9Y2F0Y2goZSl7X19mZXN0X2xvZ19lcnJvcihlLm1lc3NhZ2UgKyBcIjI3XCIpO31fX2Zlc3RfYnVmKz0oXCI8L2xpPjwvdGQ+PHRkPjxpbnB1dCB0eXBlPVxcXCJ0ZXh0XFxcIiBjbGFzcz1cXFwicm9vbXNfX2RldGFpbHNfX3VsX19saV9fY29sb3JcXFwiIGRpc2FibGVkPVxcXCJkaXNhYmxlZFxcXCIgc3R5bGU9XFxcImJhY2tncm91bmQtY29sb3I6XCIpO3RyeXtfX2Zlc3RfYnVmKz0oX19mZXN0X2VzY2FwZUhUTUwoZHJvbmUuY29sb3IpKX1jYXRjaChlKXtfX2Zlc3RfbG9nX2Vycm9yKGUubWVzc2FnZSArIFwiMzNcIik7fV9fZmVzdF9idWYrPShcIjtcXFwiLz48L3RkPjwvdHI+XCIpO31fX2Zlc3RfYnVmKz0oXCI8L3VsPjwvdGFibGU+PC9kaXY+XCIpO31fX2Zlc3RfYnVmKz0oXCI8aHIvPjxidXR0b24gY2xhc3M9XFxcImpzLWNyZWF0ZSByb29tc19fY3JlYXRlXFxcIj7Qm9C40LTQtdGA0Ys8L2J1dHRvbj5cIik7X19mZXN0X3RvPV9fZmVzdF9jaHVua3MubGVuZ3RoO2lmIChfX2Zlc3RfdG8pIHtfX2Zlc3RfaXRlcmF0b3IgPSAwO2ZvciAoO19fZmVzdF9pdGVyYXRvcjxfX2Zlc3RfdG87X19mZXN0X2l0ZXJhdG9yKyspIHtfX2Zlc3RfY2h1bms9X19mZXN0X2NodW5rc1tfX2Zlc3RfaXRlcmF0b3JdO2lmICh0eXBlb2YgX19mZXN0X2NodW5rPT09XCJzdHJpbmdcIikge19fZmVzdF9odG1sKz1fX2Zlc3RfY2h1bms7fSBlbHNlIHtfX2Zlc3RfZm49X19mZXN0X2Jsb2Nrc1tfX2Zlc3RfY2h1bmsubmFtZV07aWYgKF9fZmVzdF9mbikgX19mZXN0X2h0bWwrPV9fZmVzdF9jYWxsKF9fZmVzdF9mbixfX2Zlc3RfY2h1bmsucGFyYW1zLF9fZmVzdF9jaHVuay5jcCk7fX1yZXR1cm4gX19mZXN0X2h0bWwrX19mZXN0X2J1Zjt9IGVsc2Uge3JldHVybiBfX2Zlc3RfYnVmO319XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9wdWJsaWMvdGVtcGxhdGVzL3Jvb21zLnRtcGwueG1sXG4vLyBtb2R1bGUgaWQgPSAxMjhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXG4vKiogXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiAvaG9tZS9pdmFuL0RvY3VtZW50cy8yMDE2XzJfQWlyRHJvbmUvcHVibGljL3RlbXBsYXRlcy9zY29yZWJvYXJkLnRtcGwgdGVtcGxhdGVcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChfX2Zlc3RfY29udGV4dCl7XCJ1c2Ugc3RyaWN0XCI7dmFyIF9fZmVzdF9zZWxmPXRoaXMsX19mZXN0X2J1Zj1cIlwiLF9fZmVzdF9jaHVua3M9W10sX19mZXN0X2NodW5rLF9fZmVzdF9hdHRycz1bXSxfX2Zlc3Rfc2VsZWN0LF9fZmVzdF9pZixfX2Zlc3RfaXRlcmF0b3IsX19mZXN0X3RvLF9fZmVzdF9mbixfX2Zlc3RfaHRtbD1cIlwiLF9fZmVzdF9ibG9ja3M9e30sX19mZXN0X3BhcmFtcyxfX2Zlc3RfZWxlbWVudCxfX2Zlc3RfZGVidWdfZmlsZT1cIlwiLF9fZmVzdF9kZWJ1Z19saW5lPVwiXCIsX19mZXN0X2RlYnVnX2Jsb2NrPVwiXCIsX19mZXN0X2VsZW1lbnRfc3RhY2sgPSBbXSxfX2Zlc3Rfc2hvcnRfdGFncyA9IHtcImFyZWFcIjogdHJ1ZSwgXCJiYXNlXCI6IHRydWUsIFwiYnJcIjogdHJ1ZSwgXCJjb2xcIjogdHJ1ZSwgXCJjb21tYW5kXCI6IHRydWUsIFwiZW1iZWRcIjogdHJ1ZSwgXCJoclwiOiB0cnVlLCBcImltZ1wiOiB0cnVlLCBcImlucHV0XCI6IHRydWUsIFwia2V5Z2VuXCI6IHRydWUsIFwibGlua1wiOiB0cnVlLCBcIm1ldGFcIjogdHJ1ZSwgXCJwYXJhbVwiOiB0cnVlLCBcInNvdXJjZVwiOiB0cnVlLCBcIndiclwiOiB0cnVlfSxfX2Zlc3RfanNjaGFycyA9IC9bXFxcXCdcIlxcL1xcblxcclxcdFxcYlxcZjw+XS9nLF9fZmVzdF9qc2NoYXJzX3Rlc3QgPSAvW1xcXFwnXCJcXC9cXG5cXHJcXHRcXGJcXGY8Pl0vLF9fZmVzdF9odG1sY2hhcnMgPSAvWyY8PlwiXS9nLF9fZmVzdF9odG1sY2hhcnNfdGVzdCA9IC9bJjw+XCJdLyxfX2Zlc3RfanNoYXNoID0ge1wiXFxcIlwiOiBcIlxcXFxcXFwiXCIsIFwiXFxcXFwiOiBcIlxcXFxcXFxcXCIsIFwiL1wiOiBcIlxcXFwvXCIsIFwiXFxuXCI6IFwiXFxcXG5cIiwgXCJcXHJcIjogXCJcXFxcclwiLCBcIlxcdFwiOiBcIlxcXFx0XCIsIFwiXFxiXCI6IFwiXFxcXGJcIiwgXCJcXGZcIjogXCJcXFxcZlwiLCBcIidcIjogXCJcXFxcJ1wiLCBcIjxcIjogXCJcXFxcdTAwM0NcIiwgXCI+XCI6IFwiXFxcXHUwMDNFXCJ9LF9fZmVzdF9odG1saGFzaCA9IHtcIiZcIjogXCImYW1wO1wiLCBcIjxcIjogXCImbHQ7XCIsIFwiPlwiOiBcIiZndDtcIiwgXCJcXFwiXCI6IFwiJnF1b3Q7XCJ9LF9fZmVzdF9lc2NhcGVKUyA9IGZ1bmN0aW9uIF9fZmVzdF9lc2NhcGVKUyh2YWx1ZSkge1xuXHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRpZiAoX19mZXN0X2pzY2hhcnNfdGVzdC50ZXN0KHZhbHVlKSkge1xuXHRcdFx0XHRyZXR1cm4gdmFsdWUucmVwbGFjZShfX2Zlc3RfanNjaGFycywgX19mZXN0X3JlcGxhY2VKUyk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHZhbHVlID09IG51bGwgPyAnJyA6IHZhbHVlO1xuXHR9LF9fZmVzdF9yZXBsYWNlSlMgPSBmdW5jdGlvbiBfX2Zlc3RfcmVwbGFjZUpTKGNocikge1xuXHRcdHJldHVybiBfX2Zlc3RfanNoYXNoW2Nocl07XG5cdH0sX19mZXN0X2VzY2FwZUhUTUwgPSBmdW5jdGlvbiBfX2Zlc3RfZXNjYXBlSFRNTCh2YWx1ZSkge1xuXHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRpZiAoX19mZXN0X2h0bWxjaGFyc190ZXN0LnRlc3QodmFsdWUpKSB7XG5cdFx0XHRcdHJldHVybiB2YWx1ZS5yZXBsYWNlKF9fZmVzdF9odG1sY2hhcnMsIF9fZmVzdF9yZXBsYWNlSFRNTCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHZhbHVlID09IG51bGwgPyAnJyA6IHZhbHVlO1xuXHR9LF9fZmVzdF9yZXBsYWNlSFRNTCA9IGZ1bmN0aW9uIF9fZmVzdF9yZXBsYWNlSFRNTChjaHIpIHtcblx0XHRyZXR1cm4gX19mZXN0X2h0bWxoYXNoW2Nocl07XG5cdH0sX19mZXN0X2V4dGVuZCA9IGZ1bmN0aW9uIF9fZmVzdF9leHRlbmQoZGVzdCwgc3JjKSB7XG5cdFx0Zm9yICh2YXIga2V5IGluIHNyYykge1xuXHRcdFx0aWYgKHNyYy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRcdGRlc3Rba2V5XSA9IHNyY1trZXldO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxfX2Zlc3RfcGFyYW0gPSBmdW5jdGlvbiBfX2Zlc3RfcGFyYW0oZm4pIHtcblx0XHRmbi5wYXJhbSA9IHRydWU7XG5cdFx0cmV0dXJuIGZuO1xuXHR9LGkxOG49X19mZXN0X3NlbGYgJiYgdHlwZW9mIF9fZmVzdF9zZWxmLmkxOG4gPT09IFwiZnVuY3Rpb25cIiA/IF9fZmVzdF9zZWxmLmkxOG4gOiBmdW5jdGlvbiAoc3RyKSB7cmV0dXJuIHN0cjt9LF9fX2Zlc3RfbG9nX2Vycm9yO2lmKHR5cGVvZiBfX2Zlc3RfZXJyb3IgPT09IFwidW5kZWZpbmVkXCIpe19fX2Zlc3RfbG9nX2Vycm9yID0gKHR5cGVvZiBjb25zb2xlICE9PSBcInVuZGVmaW5lZFwiICYmIGNvbnNvbGUuZXJyb3IpID8gZnVuY3Rpb24oKXtyZXR1cm4gRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5LmNhbGwoY29uc29sZS5lcnJvciwgY29uc29sZSwgYXJndW1lbnRzKX0gOiBmdW5jdGlvbigpe307fWVsc2V7X19fZmVzdF9sb2dfZXJyb3I9X19mZXN0X2Vycm9yfTtmdW5jdGlvbiBfX2Zlc3RfbG9nX2Vycm9yKG1zZyl7X19fZmVzdF9sb2dfZXJyb3IobXNnK1wiXFxuaW4gYmxvY2sgXFxcIlwiK19fZmVzdF9kZWJ1Z19ibG9jaytcIlxcXCIgYXQgbGluZTogXCIrX19mZXN0X2RlYnVnX2xpbmUrXCJcXG5maWxlOiBcIitfX2Zlc3RfZGVidWdfZmlsZSl9ZnVuY3Rpb24gX19mZXN0X2NhbGwoZm4sIHBhcmFtcyxjcCl7aWYoY3ApZm9yKHZhciBpIGluIHBhcmFtcylpZih0eXBlb2YgcGFyYW1zW2ldPT1cImZ1bmN0aW9uXCImJnBhcmFtc1tpXS5wYXJhbSlwYXJhbXNbaV09cGFyYW1zW2ldKCk7cmV0dXJuIGZuLmNhbGwoX19mZXN0X3NlbGYscGFyYW1zKX12YXIganNvbj1fX2Zlc3RfY29udGV4dDtfX2Zlc3RfYnVmKz0oXCI8aDEgY2xhc3M9XFxcInNjb3JlYm9hcmRfX2hlYWRlclxcXCI+0JvQuNC00LXRgNGLPC9oMT48dGFibGUgY2xhc3M9XFxcInNjb3JlYm9hcmRfX3RhYmxlXFxcIj48dHIgY2xhc3M9XFxcInNjb3JlYm9hcmRfX3RhYmxlX190clxcXCI+PHRkIGNsYXNzPVxcXCJzY29yZWJvYXJkX190YWJsZV9fdHJfX3RkXFxcIj4jPC90ZD48dGQgY2xhc3M9XFxcInNjb3JlYm9hcmRfX3RhYmxlX190cl9fdGRcXFwiPtCY0LzRjzwvdGQ+PHRkIGNsYXNzPVxcXCJzY29yZWJvYXJkX190YWJsZV9fdHJfX3RkXFxcIj7QmtC+0LvQuNGH0LXRgdGC0LLQviDQsdC+0LXQsjwvdGQ+PHRkIGNsYXNzPVxcXCJzY29yZWJvYXJkX190YWJsZV9fdHJfX3RkXFxcIj7Qn9GA0L7RhtC10L3RgiDQv9C+0LHQtdC0PC90ZD48L3RyPlwiKTt2YXIgaSxkYXRhLF9fZmVzdF9pdGVyYXRvcjA7dHJ5e19fZmVzdF9pdGVyYXRvcjA9anNvbiB8fCB7fTt9Y2F0Y2goZSl7X19mZXN0X2l0ZXJhdG9yPXt9O19fZmVzdF9sb2dfZXJyb3IoZS5tZXNzYWdlKTt9Zm9yKGkgaW4gX19mZXN0X2l0ZXJhdG9yMCl7ZGF0YT1fX2Zlc3RfaXRlcmF0b3IwW2ldO19fZmVzdF9idWYrPShcIjx0ciBjbGFzcz1cXFwic2NvcmVib2FyZF9fdGFibGVfX3RyXFxcIj48dGQgY2xhc3M9XFxcInNjb3JlYm9hcmRfX3RhYmxlX190cl9fdGRcXFwiPlwiKTt0cnl7X19mZXN0X2J1Zis9KF9fZmVzdF9lc2NhcGVIVE1MKGkpKX1jYXRjaChlKXtfX2Zlc3RfbG9nX2Vycm9yKGUubWVzc2FnZSArIFwiMTJcIik7fV9fZmVzdF9idWYrPShcIjwvdGQ+PHRkIGNsYXNzPVxcXCJzY29yZWJvYXJkX190YWJsZV9fdHJfX3RkXFxcIj5cIik7dHJ5e19fZmVzdF9idWYrPShfX2Zlc3RfZXNjYXBlSFRNTChkYXRhLnVzZXJuYW1lKSl9Y2F0Y2goZSl7X19mZXN0X2xvZ19lcnJvcihlLm1lc3NhZ2UgKyBcIjEzXCIpO31fX2Zlc3RfYnVmKz0oXCI8L3RkPjx0ZCBjbGFzcz1cXFwic2NvcmVib2FyZF9fdGFibGVfX3RyX190ZFxcXCI+XCIpO3RyeXtfX2Zlc3RfYnVmKz0oX19mZXN0X2VzY2FwZUhUTUwoZGF0YS5nYW1lcykpfWNhdGNoKGUpe19fZmVzdF9sb2dfZXJyb3IoZS5tZXNzYWdlICsgXCIxNFwiKTt9X19mZXN0X2J1Zis9KFwiPC90ZD48dGQgY2xhc3M9XFxcInNjb3JlYm9hcmRfX3RhYmxlX190cl9fdGRcXFwiPlwiKTt0cnl7X19mZXN0X2J1Zis9KF9fZmVzdF9lc2NhcGVIVE1MKGRhdGEuc2NvcmUpKX1jYXRjaChlKXtfX2Zlc3RfbG9nX2Vycm9yKGUubWVzc2FnZSArIFwiMTVcIik7fV9fZmVzdF9idWYrPShcIiAlPC90ZD48L3RyPlwiKTt9X19mZXN0X2J1Zis9KFwiPC90YWJsZT5cIik7X19mZXN0X3RvPV9fZmVzdF9jaHVua3MubGVuZ3RoO2lmIChfX2Zlc3RfdG8pIHtfX2Zlc3RfaXRlcmF0b3IgPSAwO2ZvciAoO19fZmVzdF9pdGVyYXRvcjxfX2Zlc3RfdG87X19mZXN0X2l0ZXJhdG9yKyspIHtfX2Zlc3RfY2h1bms9X19mZXN0X2NodW5rc1tfX2Zlc3RfaXRlcmF0b3JdO2lmICh0eXBlb2YgX19mZXN0X2NodW5rPT09XCJzdHJpbmdcIikge19fZmVzdF9odG1sKz1fX2Zlc3RfY2h1bms7fSBlbHNlIHtfX2Zlc3RfZm49X19mZXN0X2Jsb2Nrc1tfX2Zlc3RfY2h1bmsubmFtZV07aWYgKF9fZmVzdF9mbikgX19mZXN0X2h0bWwrPV9fZmVzdF9jYWxsKF9fZmVzdF9mbixfX2Zlc3RfY2h1bmsucGFyYW1zLF9fZmVzdF9jaHVuay5jcCk7fX1yZXR1cm4gX19mZXN0X2h0bWwrX19mZXN0X2J1Zjt9IGVsc2Uge3JldHVybiBfX2Zlc3RfYnVmO319XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9wdWJsaWMvdGVtcGxhdGVzL3Njb3JlYm9hcmQudG1wbC54bWxcbi8vIG1vZHVsZSBpZCA9IDEyOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnYW1lQ2FudmFzKG1vZGUgPSAwKSB7XHJcbiAgICBsZXQgcGFydGljbGVzID0gW107XHJcbiAgICBcclxuICAgIC8vIGNhbnZhcyBhbmQgMkQgY29udGV4dCBpbml0aWFsaXphdGlvblxyXG4gICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5nYW1lX19jYW52YXNcIik7XHJcbiAgICBjb25zdCBjb250ZXh0MkQgPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgXHJcbiAgICBjYW52YXMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xyXG4gICAgY2FudmFzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XHJcbiAgICBcclxuICAgIC8vIHN0YXJ0aW5nIHRoZSBnYW1lIGxvb3AgYXQgNjAgZnJhbWVzIHBlciBzZWNvbmRcclxuICAgIGNvbnN0IGZyYW1lUmF0ZSA9IDYwLjA7XHJcbiAgICBjb25zdCBmcmFtZURlbGF5ID0gMTAwMC4wL2ZyYW1lUmF0ZTtcclxuICAgIFxyXG4gICAgbGV0IHN0YXR1cyA9IHBhcnNlRmxvYXQoMS4wKTtcclxuICAgIFxyXG4gICAgbGV0IHN0YXJ0VGltZSA9IDA7XHJcbiAgICBcclxuICAgIHNldEludGVydmFsKGZ1bmN0aW9uKClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB1cGRhdGUoZnJhbWVEZWxheSk7XHJcbiAgICAgICAgICAgICAgICB9LCBmcmFtZURlbGF5KTtcclxuICAgIFxyXG4gICAgZnVuY3Rpb24gcmFuZG9tRmxvYXQgKG1pbiwgbWF4KVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBtaW4gKyBNYXRoLnJhbmRvbSgpKihtYXgtbWluKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLypcclxuICAgICAqIEEgc2luZ2xlIGV4cGxvc2lvbiBwYXJ0aWNsZVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBQYXJ0aWNsZSAoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuc2NhbGUgPSAxLjI7XHJcbiAgICAgICAgdGhpcy54ID0gMDtcclxuICAgICAgICB0aGlzLnkgPSAwO1xyXG4gICAgICAgIHRoaXMucmFkaXVzID0gMjA7XHJcbiAgICAgICAgdGhpcy5jb2xvciA9IFwiIzAwMFwiO1xyXG4gICAgICAgIHRoaXMudmVsb2NpdHlYID0gMDtcclxuICAgICAgICB0aGlzLnZlbG9jaXR5WSA9IDA7XHJcbiAgICAgICAgdGhpcy5zY2FsZVNwZWVkID0gMC41O1xyXG4gICAgICAgIHRoaXMudXBkYXRlID0gZnVuY3Rpb24obXMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyBzaHJpbmtpbmdcclxuICAgICAgICAgICAgdGhpcy5zY2FsZSAtPSB0aGlzLnNjYWxlU3BlZWQgKiBtcyAvIDEwMDAuMDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNjYWxlIDw9IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NhbGUgPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBtb3ZpbmcgYXdheSBmcm9tIGV4cGxvc2lvbiBjZW50ZXJcclxuICAgICAgICAgICAgdGhpcy54ICs9IHRoaXMudmVsb2NpdHlYICogbXMvMTAwMC4wO1xyXG4gICAgICAgICAgICB0aGlzLnkgKz0gdGhpcy52ZWxvY2l0eVkgKiBtcy8xMDAwLjA7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmRyYXcgPSBmdW5jdGlvbihjb250ZXh0MkQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyB0cmFuc2xhdGluZyB0aGUgMkQgY29udGV4dCB0byB0aGUgcGFydGljbGUgY29vcmRpbmF0ZXNcclxuICAgICAgICAgICAgY29udGV4dDJELnNhdmUoKTtcclxuICAgICAgICAgICAgY29udGV4dDJELnRyYW5zbGF0ZSh0aGlzLngsIHRoaXMueSk7XHJcbiAgICAgICAgICAgIGNvbnRleHQyRC5zY2FsZSh0aGlzLnNjYWxlLCB0aGlzLnNjYWxlKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIGRyYXdpbmcgYSBmaWxsZWQgY2lyY2xlIGluIHRoZSBwYXJ0aWNsZSdzIGxvY2FsIHNwYWNlXHJcbiAgICAgICAgICAgIGNvbnRleHQyRC5iZWdpblBhdGgoKTtcclxuICAgICAgICAgICAgY29udGV4dDJELmFyYygwLCAwLCB0aGlzLnJhZGl1cywgMCwgTWF0aC5QSSoyLCB0cnVlKTtcclxuICAgICAgICAgICAgY29udGV4dDJELmNsb3NlUGF0aCgpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY29udGV4dDJELmZpbGxTdHlsZSA9IHRoaXMuY29sb3I7XHJcbiAgICAgICAgICAgIGNvbnRleHQyRC5maWxsKCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjb250ZXh0MkQucmVzdG9yZSgpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qXHJcbiAgICAgKiBBZHZhbmNlZCBFeHBsb3Npb24gZWZmZWN0XHJcbiAgICAgKiBFYWNoIHBhcnRpY2xlIGhhcyBhIGRpZmZlcmVudCBzaXplLCBtb3ZlIHNwZWVkIGFuZCBzY2FsZSBzcGVlZC5cclxuICAgICAqXHJcbiAgICAgKiBQYXJhbWV0ZXJzOlxyXG4gICAgICogXHR4LCB5IC0gZXhwbG9zaW9uIGNlbnRlclxyXG4gICAgICogXHRjb2xvciAtIHBhcnRpY2xlcycgY29sb3JcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gY3JlYXRlRXhwbG9zaW9uKHgsIHksIGNvbG9yKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBtaW5TaXplID0gODtcclxuICAgICAgICBsZXQgbWF4U2l6ZSA9IDMwO1xyXG4gICAgICAgIGxldCBjb3VudCA9IDE1O1xyXG4gICAgICAgIGxldCBtaW5TcGVlZCA9IDgwLjA7XHJcbiAgICAgICAgbGV0IG1heFNwZWVkID0gMjIwLjA7XHJcbiAgICAgICAgbGV0IG1pblNjYWxlU3BlZWQgPSAxLjA7XHJcbiAgICAgICAgbGV0IG1heFNjYWxlU3BlZWQgPSAyLjA7XHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgZm9yIChsZXQgYW5nbGU9MDsgYW5nbGU8MzYwOyBhbmdsZSArPSBNYXRoLnJvdW5kKDM2MC9jb3VudCkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgcGFydGljbGUgPSBuZXcgUGFydGljbGUoKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHBhcnRpY2xlLnggPSB4O1xyXG4gICAgICAgICAgICBwYXJ0aWNsZS55ID0geTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHBhcnRpY2xlLnJhZGl1cyA9IHJhbmRvbUZsb2F0KG1pblNpemUsIG1heFNpemUpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcGFydGljbGUuY29sb3IgPSBjb2xvcjtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHBhcnRpY2xlLnNjYWxlU3BlZWQgPSByYW5kb21GbG9hdChtaW5TY2FsZVNwZWVkLCBtYXhTY2FsZVNwZWVkKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBzcGVlZCA9IHJhbmRvbUZsb2F0KG1pblNwZWVkLCBtYXhTcGVlZCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBwYXJ0aWNsZS52ZWxvY2l0eVggPSBzcGVlZCAqIE1hdGguY29zKGFuZ2xlICogTWF0aC5QSSAvIDE4MC4wKTtcclxuICAgICAgICAgICAgcGFydGljbGUudmVsb2NpdHlZID0gc3BlZWQgKiBNYXRoLnNpbihhbmdsZSAqIE1hdGguUEkgLyAxODAuMCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBwYXJ0aWNsZXMucHVzaChwYXJ0aWNsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL0NvbnN0IHNpemUgdmFyaWFibGVzXHJcbiAgICBjb25zdCByZWN0U2l6ZSA9IHdpbmRvdy5pbm5lcldpZHRoIC8gMztcclxuICAgIGNvbnN0IG1hcmdpblkgPSAod2luZG93LmlubmVySGVpZ2h0IC0gcmVjdFNpemUpICogMC41O1xyXG4gICAgY29uc3Qgc3RhdHVzTWFyZ2luID0gKCh3aW5kb3cuaW5uZXJIZWlnaHQgLSByZWN0U2l6ZSkgKiAwLjUpICsgcmVjdFNpemUgKyA1O1xyXG4gICAgY29uc3QgYWxlcnRTaXplID0gMC43ICogcmVjdFNpemU7XHJcbiAgICBjb25zdCBhbGVydE1hcmdpbiA9IDAuMTUgKiByZWN0U2l6ZTtcclxuICAgIFxyXG4gICAgZnVuY3Rpb24gdXBkYXRlIChmcmFtZURlbGF5KVxyXG4gICAge1xyXG4gICAgICAgIGNvbnRleHQyRC5jbGVhclJlY3QoMCwgMCwgd2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCk7XHJcbiAgICAgICAgLy8gdXBkYXRlIGFuZCBkcmF3IHBhcnRpY2xlc1xyXG4gICAgICAgIGZvciAobGV0IGk9MDsgaTxwYXJ0aWNsZXMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgcGFydGljbGUgPSBwYXJ0aWNsZXNbaV07XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBwYXJ0aWNsZS51cGRhdGUoZnJhbWVEZWxheSk7XHJcbiAgICAgICAgICAgIHBhcnRpY2xlLmRyYXcoY29udGV4dDJEKTtcclxuICAgICAgICAgICAgaWYgKHBhcnRpY2xlLnNjYWxlID09IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHBhcnRpY2xlcy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gZHJhdyBhaW1pbmcgd2luZG93XHJcbiAgICAgICAgZHJhd1N0YXR1cygwLjUgKiByZWN0U2l6ZSwgMC4xICogcmVjdFNpemUsIG1hcmdpblkgLSByZWN0U2l6ZSAqIDAuMSAtIDUsIFwiIzRkNGQ0ZFwiLCBcItCX0L7QvdCwINC30LDRhdCy0LDRgtCwXCIsIDEsIDEwKTtcclxuICAgICAgICByb3VuZFJlY3QoY29udGV4dDJELCByZWN0U2l6ZSwgbWFyZ2luWSwgcmVjdFNpemUsIHJlY3RTaXplLCAyMCwgXCJyZWRcIiwgZmFsc2UpO1xyXG4gICAgICAgIHN3aXRjaCAobW9kZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgIGRyYXdTdGF0dXMocmVjdFNpemUsIDAuMiAqIDAuNyAqIHJlY3RTaXplLCBzdGF0dXNNYXJnaW4sIFwiZ3JlZW5cIiwgXCLQl9Cw0YXQstCw0YIg0YbQtdC70LguLi5cIiwgc3RhdHVzLCAyMCk7XHJcbiAgICAgICAgICAgICAgICBzdGF0dXMgPSBwYXJzZUZsb2F0KHN0YXR1cykgKyBwYXJzZUZsb2F0KDAuMDA3KTtcclxuICAgICAgICAgICAgICAgIGlmIChzdGF0dXMgPiAxKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB4ID0gY2FudmFzLndpZHRoICAqIDAuNTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgeSA9IGNhbnZhcy5oZWlnaHQgKiAwLjU7XHJcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlRXhwbG9zaW9uKHgsIHksIFwiIzUyNTI1MlwiKTtcclxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVFeHBsb3Npb24oeCwgeSwgXCIjRkZBMzE4XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZUV4cGxvc2lvbih4LCB5LCBcIiM1MjUyNTJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlRXhwbG9zaW9uKHgsIHksIFwiI0ZGQTMxOFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBtb2RlID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICBpZiAoc3RhdHVzIDwgMSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBkcmF3U3RhdHVzKHJlY3RTaXplLCAwLjIgKiAwLjcgKiByZWN0U2l6ZSwgc3RhdHVzTWFyZ2luLCBcIiNjYzAwMDBcIiwgXCLQktGLINC/0L7QtCDRg9C00LDRgNC+0LwhXCIsIHN0YXR1cywgMjApO1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1cyA9IHBhcnNlRmxvYXQoc3RhdHVzKSArIHBhcnNlRmxvYXQoMC4wMDcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHN0YXJ0VGltZSAhPSAwKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dDJELmdsb2JhbEFscGhhID0gMC43NTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm91bmRSZWN0KGNvbnRleHQyRCwgcmVjdFNpemUgKyBhbGVydE1hcmdpbiwgbWFyZ2luWSArIGFsZXJ0TWFyZ2luLCBhbGVydFNpemUsIGFsZXJ0U2l6ZSwgMjAsIFwiIzRkNGQ0ZFwiLCB0cnVlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQyRC5nbG9iYWxBbHBoYSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQyRC5mb250PScyNXB4IEhlbHZldGljYSc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQyRC5maWxsU3R5bGUgPSAnd2hpdGUnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0MkQudGV4dEFsaWduPVwiY2VudGVyXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQyRC5maWxsVGV4dChcItCS0Ysg0L/QvtC00LHQuNGC0YshXCIsIHJlY3RTaXplICsgcmVjdFNpemUgKiAwLjUsIG1hcmdpblkgKyBhbGVydE1hcmdpbiArIDAuMyAqIGFsZXJ0U2l6ZSwgYWxlcnRTaXplKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dDJELmZvbnQ9JzIwcHggSGVsdmV0aWNhJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dDJELmZpbGxUZXh0KFwi0J7Qs9GA0LDQvdC40YfQtdC90LjQtSDQtNC10LnRgdGC0LLRg9C10YI6XCIsIHJlY3RTaXplICsgcmVjdFNpemUgKiAwLjUsIG1hcmdpblkgKyBhbGVydE1hcmdpbiArIDAuNSAqIGFsZXJ0U2l6ZSwgYWxlcnRTaXplKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2Vjb25kcyA9IDEwIC0gKChuZXcgRGF0ZSgpKS5nZXRUaW1lKCkgLSBzdGFydFRpbWUpIC8gMTAwMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2Vjb25kcyA9IHBhcnNlSW50KHNlY29uZHMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0MkQuZmlsbFRleHQoc2Vjb25kcyArIFwiINGB0LXQutGD0L3QtFwiLCByZWN0U2l6ZSArIHJlY3RTaXplICogMC41LCBtYXJnaW5ZICsgYWxlcnRNYXJnaW4gKyAwLjYgKiBhbGVydFNpemUsIGFsZXJ0U2l6ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlY29uZHMgPD0gMClcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydFRpbWUgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0VGltZSA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICAgICAgICAgYWxlcnQoKTtcclxuICAgIC8vICAgICAgICAgICAgICAgIG1vZGUgPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBmdW5jdGlvbiBkcmF3U3RhdHVzKHNpemUsIGhlaWdodCwgb2Zmc2V0WSwgY29sb3IsIGxhYmVsLCByZWFsU2l6ZSwgcmFkaXVzKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnRleHQyRC5nbG9iYWxBbHBoYSA9IDAuNTtcclxuICAgICAgICBjb25zdCB4TWFyZ2luID0gKHdpbmRvdy5pbm5lcldpZHRoIC0gc2l6ZSkgKiAwLjU7XHJcbiAgICAgICAgcm91bmRSZWN0KGNvbnRleHQyRCwgeE1hcmdpbiwgb2Zmc2V0WSwgc2l6ZSAqIHJlYWxTaXplLCBoZWlnaHQsIHJhZGl1cywgY29sb3IsIHRydWUsIGZhbHNlKTtcclxuICAgICAgICByb3VuZFJlY3QoY29udGV4dDJELCB4TWFyZ2luLCBvZmZzZXRZLCBzaXplLCBoZWlnaHQsIHJhZGl1cywgY29sb3IsIHRydWUsIGZhbHNlKTtcclxuICAgICAgICBjb250ZXh0MkQuZ2xvYmFsQWxwaGEgPSAxO1xyXG4gICAgICAgIGNvbnRleHQyRC5mb250PScyMHB4IEhlbHZldGljYSc7XHJcbiAgICAgICAgY29udGV4dDJELmZpbGxTdHlsZSA9ICd3aGl0ZSc7XHJcbiAgICAgICAgY29udGV4dDJELnRleHRBbGlnbj1cImNlbnRlclwiO1xyXG4gICAgICAgIGNvbnRleHQyRC5maWxsVGV4dChsYWJlbCx4TWFyZ2luICsgc2l6ZSAqIDAuNSxvZmZzZXRZICsgaGVpZ2h0ICogMC42LCBzaXplKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZnVuY3Rpb24gcm91bmRSZWN0KGNvbnRleHQyRCwgeCwgeSwgd2lkdGgsIGhlaWdodCwgcmFkaXVzLCBjb2xvciwgZmlsbCwgc3Ryb2tlKVxyXG4gICAge1xyXG4gICAgICAgIGlmICh0eXBlb2YgY29sb3IgPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgY29sb3IgPSBcImJsYWNrXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2Ygc3Ryb2tlID09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIHN0cm9rZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2YgcmFkaXVzID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICByYWRpdXMgPSA1O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIHJhZGl1cyA9PT0gJ251bWJlcicpIHtcclxuICAgICAgICAgICAgcmFkaXVzID0ge3RsOiByYWRpdXMsIHRyOiByYWRpdXMsIGJyOiByYWRpdXMsIGJsOiByYWRpdXN9O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBkZWZhdWx0UmFkaXVzID0ge3RsOiAwLCB0cjogMCwgYnI6IDAsIGJsOiAwfTtcclxuICAgICAgICAgICAgZm9yIChsZXQgc2lkZSBpbiBkZWZhdWx0UmFkaXVzKSB7XHJcbiAgICAgICAgICAgICAgICByYWRpdXNbc2lkZV0gPSByYWRpdXNbc2lkZV0gfHwgZGVmYXVsdFJhZGl1c1tzaWRlXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb250ZXh0MkQubGluZVdpZHRoPTEwO1xyXG4gICAgICAgIGNvbnRleHQyRC5zdHJva2VTdHlsZSA9IGNvbG9yO1xyXG4gICAgICAgIGNvbnRleHQyRC5maWxsU3R5bGUgPSBjb2xvcjtcclxuICAgICAgICBjb250ZXh0MkQuYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgY29udGV4dDJELm1vdmVUbyh4ICsgcmFkaXVzLnRsLCB5KTtcclxuICAgICAgICBjb250ZXh0MkQubGluZVRvKHggKyB3aWR0aCAtIHJhZGl1cy50ciwgeSk7XHJcbiAgICAgICAgY29udGV4dDJELnF1YWRyYXRpY0N1cnZlVG8oeCArIHdpZHRoLCB5LCB4ICsgd2lkdGgsIHkgKyByYWRpdXMudHIpO1xyXG4gICAgICAgIGNvbnRleHQyRC5saW5lVG8oeCArIHdpZHRoLCB5ICsgaGVpZ2h0IC0gcmFkaXVzLmJyKTtcclxuICAgICAgICBjb250ZXh0MkQucXVhZHJhdGljQ3VydmVUbyh4ICsgd2lkdGgsIHkgKyBoZWlnaHQsIHggKyB3aWR0aCAtIHJhZGl1cy5iciwgeSArIGhlaWdodCk7XHJcbiAgICAgICAgY29udGV4dDJELmxpbmVUbyh4ICsgcmFkaXVzLmJsLCB5ICsgaGVpZ2h0KTtcclxuICAgICAgICBjb250ZXh0MkQucXVhZHJhdGljQ3VydmVUbyh4LCB5ICsgaGVpZ2h0LCB4LCB5ICsgaGVpZ2h0IC0gcmFkaXVzLmJsKTtcclxuICAgICAgICBjb250ZXh0MkQubGluZVRvKHgsIHkgKyByYWRpdXMudGwpO1xyXG4gICAgICAgIGNvbnRleHQyRC5xdWFkcmF0aWNDdXJ2ZVRvKHgsIHksIHggKyByYWRpdXMudGwsIHkpO1xyXG4gICAgICAgIGNvbnRleHQyRC5jbG9zZVBhdGgoKTtcclxuICAgICAgICBpZiAoZmlsbCkge1xyXG4gICAgICAgICAgICBjb250ZXh0MkQuZmlsbCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc3Ryb2tlKSB7XHJcbiAgICAgICAgICAgIGNvbnRleHQyRC5zdHJva2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8v0KfRgtC+0LHRiyDRgdCx0YDQvtGB0LjRgtGMINCy0YvQv9C+0LvQvdC10L3QuNGPINCw0L3QuNC80LDRhtC40LggKNCx0YvQstCw0LXRgiDQsiDRjdGC0L7QvCDQvdCw0LTQvtCx0L3QvtGB0YLRjClcclxuICAgIC8v0LTQvtGB0YLQsNGC0L7Rh9C90L4g0L/RgNC40YDQsNCy0L3Rj9GC0YwgbW9kZSDQvdGD0LvRjiFcclxuICAgIFxyXG4gICAgLy/Qp9GC0L7QsdGLINC30LDQv9GD0YHRgtC40YLRjCDQsNC90LjQvNCw0YbQuNC4INC90YPQttC90L4g0L/RgNC+0YHRgtC+INCy0YvRgdGC0LDQstC40YLRjCDQvdGD0LbQvdGL0LkgbW9kZVxyXG4gICAgLy/QuCDQvtCx0L3Rg9C70LjRgtGMINC/0LXRgNC10LzQtdC90L3Rg9GOINC/0YDQvtCz0YDQtdGB0YEg0LHQsNGA0LBcclxuICAgIHdpbmRvdy5vbmtleWRvd24gPSBmdW5jdGlvbihldnQpXHJcbiAgICB7XHJcbiAgICAgICAgZXZ0ID0gZXZ0IHx8IHdpbmRvdy5ldmVudDtcclxuICAgICAgICAvL9Ca0LLQsNC00YDQsNC60L7Qv9GC0LXRgCDQv9C+0LQg0YPQtNCw0YDQvtC8XHJcbiAgICAgICAgaWYgKGV2dC5rZXlDb2RlID09IDkwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbW9kZSA9IDE7XHJcbiAgICAgICAgICAgIHN0YXR1cyA9IHBhcnNlRmxvYXQoMC4wKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/Ql9Cw0YXQstCw0YIg0L/RgNC+0YLQuNCy0L3QuNC60LBcclxuICAgICAgICBlbHNlIGlmIChldnQua2V5Q29kZSA9PSA4OClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG1vZGUgPSAyO1xyXG4gICAgICAgICAgICBzdGF0dXMgPSBwYXJzZUZsb2F0KDAuMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wdWJsaWMvanMvY2FudmFzLmpzIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm9vbUNvbGxlY3Rpb24ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLl9kYXRhID0gW107XG4gICAgfVxuXG4gICAgZmV0Y2goKSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgICByZXR1cm4gZmV0Y2goJy9nYW1lcycpLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gICAgICAgIH0pLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICBzZWxmLl9kYXRhID0gZGF0YTtcbiAgICAgICAgICAgIHNlbGYuc29ydCgpO1xuICAgICAgICB9KS5jYXRjaCgpO1xuICAgIH1cblxuICAgIHNvcnQoKSB7XG4gICAgICAgIHRoaXMuX2RhdGEuc29ydCgoYSwgYikgPT4gYS5kcm9uZXMubGVuZ3RoIC0gYi5kcm9uZXMubGVuZ3RoKTtcbiAgICB9XG5cbiAgICBnZXRDb2xsZWN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wdWJsaWMvanMvY29sbGVjdGlvbnMvUm9vbUNvbGxlY3Rpb24uanMiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBVc2VyQ29sbGVjdGlvbiB7XG4gICAgY29uc3RydXRvcigpIHtcbiAgICAgICAgdGhpcy5fZGF0YSA9IFtdO1xuICAgIH1cblxuICAgIGZldGNoKCkge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgcmV0dXJuIGZldGNoKCcvcmF0aW5nJykudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3Byb21pc2UnKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gICAgICAgICAgICAgICAgfSkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5fZGF0YSA9IGRhdGE7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc29ydCgpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygndGhlbicsIHNlbGYuX2RhdGEpO1xuICAgICAgICAgICAgICAgIH0pLmNhdGNoKCk7XG4gICAgfVxuXG4gICAgc29ydCgpIHtcbiAgICAgICAgdGhpcy5fZGF0YS5zb3J0KChhLCBiKSA9PiBiLnNjb3JlIC0gYS5zY29yZSk7XG4gICAgfVxuXG4gICAgZ2V0Q29sbGVjdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGE7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcHVibGljL2pzL2NvbGxlY3Rpb25zL1VzZXJDb2xsZWN0aW9uLmpzIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVxdWVzdCh1cmwsIG1ldGhvZCwgZGF0YSkge1xuICBjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgeGhyLm9wZW4obWV0aG9kLCB1cmwsIGZhbHNlKTtcbiAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XG4gIHhoci5zZW5kKEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcblxuICByZXR1cm4geGhyO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcHVibGljL2pzL2xpYnMuanMiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBSb29tTW9kZWwge1xuICAgIGNvbnN0cnVjdG9yKGRhdGEgPSB7fSkge1xuICAgICAgICB0aGlzLmlkID0gZGF0YS5pZCB8fCAwO1xuICAgICAgICB0aGlzLmNvbG9yID0gZGF0YS5jb2xvciB8fCB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMucGxheWVyTG9naW4gPSBkYXRhLnBsYXllckxvZ2luIHx8ICdOZXcgUGxheWVyJztcbiAgICAgICAgdGhpcy5wbGF5ZXJJZCA9IGRhdGEucGxheWVySWQgfHwgMDtcbiAgICAgICAgdGhpcy5lcnJvciA9ICcnO1xuICAgIH1cblxuICAgIHNhdmUocm9vbSkge1xuICAgICAgICBzZWxmID0gdGhpcztcbiAgICAgICAgaWYgKCFyb29tKSB7XG4gICAgICAgICAgICBzZWxmLmVycm9yID0gJ05vIHJvb20hJztcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmV0Y2goJy9nYW1lcycsIHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1BVVCcsXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgcm9vbTogcm9vbSxcbiAgICAgICAgICAgICAgICBkcm9uZToge1xuICAgICAgICAgICAgICAgICAgICBpZDogc2VsZi5pZCxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6IHNlbGYuY29sb3IsXG4gICAgICAgICAgICAgICAgICAgIHBsYXllckxvZ2luOiBzZWxmLnBsYXllckxvZ2luLFxuICAgICAgICAgICAgICAgICAgICBwbGF5ZXJJZDogc2VsZi5wbGF5ZXJJZCxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgICAgICAgICAgICByZWplY3QocmVzcG9uc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgfSkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIHNlbGYuZXJyb3IgPSAnJztcbiAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgc2VsZi5lcnJvciA9ICdGYWlsZWQgdG8gc2F2ZSBkcm9uZSEnO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wdWJsaWMvanMvbW9kZWxzL0Ryb25lTW9kZWwuanMiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lTW9kZWwge1xuICAgIGNvbnN0cnVjdG9yIChvcHRpb25zID0ge30pIHtcbiAgICAgICAgdGhpcy5ob3N0ID0gb3B0aW9ucy5ob3N0IHx8ICcvaW1hZ2UvZmlsbC5qcGcnO1xuICAgICAgICB0aGlzLndzID0gW107IC8vIHRoaXMgaXMgZm9yIHdlYnNvY2tldFxuICAgICAgICB0aGlzLmVycm9yID0gJyc7XG4gICAgfVxuXG4gICAgZ2V0SG9zdCAoKSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgICByZXR1cm4gZmV0Y2goJy9ob3N0JykudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZShyZWplY3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgfSkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIHNlbGYuaG9zdCA9IGRhdGEuaG9zdDtcbiAgICAgICAgICAgIHNlbGYuZXJyb3IgPSAnJztcbiAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgc2VsZi5lcnJvciA9IGBDYW4ndCByZWFjaCB0aGUgaG9zdCAke3NlbGYuaG9zdH0hYDtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0VmlkZW8oKSB7XG4gICAgICAgIHRoaXMuZ2V0SG9zdCgpO1xuICAgICAgICByZXR1cm4gdGhpcy5ob3N0O1xuICAgIH1cblxuICAgIG1lY2hhbmljcyAoKSB7XG5cbiAgICB9XG5cbiAgICBjb25uZWN0ICgpIHtcblxuICAgIH1cblxuICAgIGRpc2Nvbm5lY3QgKCkge1xuXG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcHVibGljL2pzL21vZGVscy9HYW1lTW9kZWwuanMiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwYXRoVG9SZWdleCAocGF0aG5hbWUpIHtcblx0bGV0IGtleU5hbWVzID0gW107XG5cdGxldCBwYXJ0cyA9IHBhdGhuYW1lXG5cdFx0LnNwbGl0KCcvJylcblx0XHQuZmlsdGVyKHBhcnQgPT4gcGFydClcblx0XHQubWFwKHBhcnQgPT4ge1xuXHRcdFx0aWYgKC9eOi8uZXhlYyhwYXJ0KSkge1xuXHRcdFx0XHRrZXlOYW1lcy5wdXNoKHBhcnQuc2xpY2UoMSkpO1xuXHRcdFx0XHRyZXR1cm4gbmV3IFJlZ0V4cChgXlxcLyhbXi9dKylgLCBgaWApO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG5ldyBSZWdFeHAoYF5cXC8ke3BhcnR9YCwgYGlgKTtcblx0XHR9KTtcblxuXG5cdHJldHVybiBmdW5jdGlvbiAocGF0aCkge1xuXG5cdFx0bGV0IGtleXMgPSBbXTtcblx0XHRsZXQgY2hlY2sgPSBwYXJ0cy5ldmVyeSgocmVnZXhwLCBzdGVwKSA9PiB7XG5cdFx0XHRsZXQgdG1wID0gcmVnZXhwLmV4ZWMocGF0aCk7XG5cdFx0XHRpZiAoIXRtcCkge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0XHRpZiAodG1wLmxlbmd0aCA9PT0gMikge1xuXHRcdFx0XHRrZXlzLnB1c2godG1wWzFdKTtcblx0XHRcdH1cblx0XHRcdHBhdGggPSBwYXRoLnJlcGxhY2UocmVnZXhwLCAnJyk7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9KTtcblxuXHRcdGlmIChjaGVjaykge1xuXHRcdFx0cmV0dXJuIGtleXMucmVkdWNlKChwcmV2LCBjdXJyLCBwb3MpID0+IHtcblx0XHRcdFx0cHJldltrZXlOYW1lc1twb3NdXSA9IGN1cnI7XG5cdFx0XHRcdHJldHVybiBwcmV2O1xuXHRcdFx0fSwge30pO1xuXHRcdH1cblx0XHRyZXR1cm4gbnVsbDtcblx0fTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wdWJsaWMvanMvbW9kdWxlcy9wYXRoVG9SZWdleC5qcyIsImxldCBpZCA9IDA7XG5pbXBvcnQgcGF0aFRvUmVnZXggZnJvbSAnLi9wYXRoVG9SZWdleCc7XG5cbi8qKiDQmtC70LDRgdGBINC/0YDQtdC00YHRgtCw0LLQu9GP0LXRgiDRgdC+0LHQvtC5INCf0YPRgtGMINCyINCy0LDRiNC10Lwg0L/RgNC40LvQvtC20LXQvdC40LggKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvdXRlIHtcblx0LyoqXG5cdCAqINCh0L7Qt9C00LDRkdGCINC90L7QstGL0LkgUm91dGUgLSDQsNGB0YHQvtGG0LjQuNGA0YPQtdGCINC90LXQutC+0YLQvtGA0YPRjiB2aWV3INGBINGI0LDQsdC70L7QvdC+0Lwg0L/Rg9GC0Lhcblx0ICogQHBhcmFtIHtzdHJpbmd9IHBhdGhuYW1lIC0g0KjQsNCx0LvQvtC9INC/0YPRgtC4XG5cdCAqIEBwYXJhbSB7Vmlld30gdmlldyAtINCa0LvQsNGB0YEg0LrQvtC90LrRgNC10YLQvdC+0LkgVmlld1xuXHQgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIC0g0JTQvtC/0L7Qu9C90LjRgtC10LvRjNC90YvQtSDQv9Cw0YDQsNC80LXRgtGA0YssINC60L7RgtC+0YDRi9C1INCx0YPQtNGD0YIg0L/QtdGA0LXQtNCw0L3RiyDQstC+IHZpZXcg0L/RgNC4INC10ZEg0YHQvtC30LTQsNC90LjQuCDQuCDQuNC90LjRhtC40LDQu9C40LfQsNGG0LjQuFxuXHQgKi9cblx0Y29uc3RydWN0b3IocGF0aG5hbWUsIHZpZXcsIG9wdGlvbnMgPSB7fSkge1xuXHRcdC8vVE9ETzog0KHRg9GJ0LjQuSDQsNC00LjRidC1LCDQvdCw0Lwg0L3Rg9C20L3QviDQvNC10L3QtdC00LbQtdGA0LjRgtGMINC00LXQv9GB0Ytcblx0XHR0aGlzLnBhdGhUb1JlZ2V4ID0gcGF0aFRvUmVnZXg7XG5cblx0XHR0aGlzLmlkID0gJ3AnICsgaWQ7XG5cdFx0aWQrKztcblx0XHR0aGlzLnBhdGhuYW1lID0gcGF0aG5hbWU7XG5cdFx0dGhpcy5yZWdleCA9IHRoaXMucGF0aFRvUmVnZXgocGF0aG5hbWUpO1xuXHRcdHRoaXMuVmlldyA9IHZpZXc7XG5cdFx0dGhpcy5vcHRpb25zID0gb3B0aW9ucztcblx0fVxuXG5cdC8qKlxuXHQgKiDQn9GA0L7QstC10YDRj9C10YIsINGB0L7QvtGC0LLQtdGC0YHRgtCy0YPQtdGCINC70Lgg0L/QtdGA0LXQtNCw0L3QvdGL0LkgcGF0aG5hbWUg0YLQtdC60YPRidC10LzRgyBSb3V0ZVxuXHQgKiBAcGFyYW0ge3N0cmluZ30gcGF0aG5hbWUgLSDQn9GD0YLRjCDQsiDQv9GA0LjQu9C+0LbQtdC90LjQuFxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn0g0KDQtdC30YPQu9GM0YLQsNGCINC/0YDQvtCy0LXRgNC60Lhcblx0ICovXG5cdG1hdGNoKHBhdGhuYW1lKSB7XG5cdFx0cmV0dXJuICEhdGhpcy5yZWdleChwYXRobmFtZSk7XG5cdH1cblxuXHQvKipcblx0ICog0JDQutGC0LjQstC40YDRg9C10YIg0YLQtdC60YPRidC40LkgUm91dGUgKNC/0LXRgNC10YXQvtC00LjRgiDQv9C+INC90LXQvNGDKVxuXHQgKiBAcGFyYW0ge3N0cmluZ30gcGF0aG5hbWUgLSDQn9GD0YLRjCDQsiDQv9GA0LjQu9C+0LbQtdC90LjQuFxuXHQgKiBAcGFyYW0ge09iamVjdH0gW3N0YXRlPXt9XSAtINCe0LHRitC10LrRgiBzdGF0ZSwg0LrQvtGC0L7RgNGL0Lkg0LHRi9C7INC/0LXRgNC10LTQsNC9INCyINGB0L7QsdGL0YLQuNC1IHBvcHN0YXRlINC00LvRjyDQvtCx0YrQtdC60YLQsCB3aW5kb3dcblx0ICovXG5cdG5hdmlnYXRlKHBhdGhuYW1lLCBzdGF0ZSA9IHt9KSB7XG5cdFx0c3RhdGUgPSBzdGF0ZSB8fCB7fTtcblx0XHRsZXQga2V5cyA9IHRoaXMucmVnZXgocGF0aG5hbWUpO1xuXHRcdGlmICghdGhpcy5fdmlldykge1xuXHRcdFx0bGV0IHZpZXcgPSBuZXcgdGhpcy5WaWV3KHRoaXMub3B0aW9ucyk7XG5cdFx0XHR2aWV3LmluaXQodGhpcy5vcHRpb25zKTtcblx0XHRcdHZpZXcuc2V0Um91dGVyKHRoaXMuX19yb3V0ZXIpO1xuXHRcdFx0dGhpcy5fdmlldyA9IHZpZXc7XG5cdFx0fVxuXG5cdFx0dGhpcy5fdmlldy5yZXN1bWUoT2JqZWN0LmFzc2lnbihzdGF0ZSwga2V5cykpO1xuXHR9XG5cblx0LyoqXG5cdCAqINCU0LXQsNC60YLQuNCy0LjRgNGD0LXRgiDRgtC10LrRg9GJ0LjQuSBSb3V0ZVxuXHQgKi9cblx0bGVhdmUoKSB7XG5cdFx0dGhpcy5fdmlldyAmJiB0aGlzLl92aWV3LnBhdXNlKCk7XG5cdH1cblxuXHQvKipcblx0ICog0KPRgdGC0LDQvdCw0LLQu9C40LLQsNC10YIg0YLQtdC60YPRidC10LzRgyBSb3V0ZSDQuNC90YHRgtCw0L3RgSDRgNC+0YPRgtC10YDQsFxuXHQgKiBAcGFyYW0ge1JvdXRlcn0gcm91dGVyIC0g0JjQvdGB0YLQsNC90YEg0YDQvtGD0YLQtdGA0LBcblx0ICovXG5cdHNldFJvdXRlcihyb3V0ZXIpIHtcblx0XHR0aGlzLl9fcm91dGVyID0gcm91dGVyO1xuXHR9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wdWJsaWMvanMvbW9kdWxlcy9yb3V0ZS5qcyIsImltcG9ydCBSb3V0ZXIgZnJvbSAnLi9tb2R1bGVzL3JvdXRlcic7XG5pbXBvcnQgTG9naW5WaWV3IGZyb20gJy4vdmlld3MvbG9naW5WaWV3JztcbmltcG9ydCBSZWdpc3RyYXRpb25WaWV3IGZyb20gJy4vdmlld3MvcmVnaXN0cmF0aW9uVmlldyc7XG5pbXBvcnQgU2NvcmVib2FyZFZpZXcgZnJvbSAnLi92aWV3cy9zY29yZWJvYXJkVmlldyc7XG5pbXBvcnQgUm9vbXNWaWV3IGZyb20gJy4vdmlld3Mvcm9vbXNWaWV3JztcbmltcG9ydCBHYW1lVmlldyBmcm9tICcuL3ZpZXdzL2dhbWVWaWV3JztcblxubGV0IHJvdXRlciA9IG5ldyBSb3V0ZXIoKTtcbnJvdXRlci5hZGRSb3V0ZSgnL2xvZ2luJywgTG9naW5WaWV3KTtcbnJvdXRlci5hZGRSb3V0ZSgnL3JlZ2lzdHJhdGlvbicsIFJlZ2lzdHJhdGlvblZpZXcpO1xucm91dGVyLmFkZFJvdXRlKCcvc2NvcmVib2FyZCcsIFNjb3JlYm9hcmRWaWV3KTtcbnJvdXRlci5hZGRSb3V0ZSgnL3Jvb21zJywgUm9vbXNWaWV3KTtcbnJvdXRlci5hZGRSb3V0ZSgnL2dhbWUnLCBHYW1lVmlldyk7XG5yb3V0ZXIuYWRkUm91dGUoJy8nLCBMb2dpblZpZXcpO1xucm91dGVyLnN0YXJ0KCk7XG53aW5kb3cucm91dGVyID0gcm91dGVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcHVibGljL2pzL2FpcmRyb25lLmpzIiwiLyoqXG4gKiDQmtC70LDRgdGBINC/0YDQtdC00YHRgtCw0LLQu9GP0LXRgiDRgdC+0LHQvtC5IHZpZXdcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmlldyB7XG5cdC8qKlxuXHQgKiDQodC+0LfQtNCw0ZHRgiDQvdC+0LLRg9GOIHZpZXdcblx0ICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSAtINCe0LHRitC10LrRgiDRgSDQv9Cw0YDQsNC80LXRgtGA0LDQvNC4XG5cdCAqL1xuXHRjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICAgICAgdGhpcy5zZXRSb3V0ZXIod2luZG93LnJvdXRlcik7XG5cdFx0dGhpcy50YWdOYW1lID0gb3B0aW9ucy50YWdOYW1lIHx8ICdkaXYnO1xuICAgICAgICB0aGlzLl9lbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iob3B0aW9ucy5lbGVtZW50KSB8fCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRoaXMudGFnTmFtZSk7XG4gICAgICAgIHRoaXMuYm9keUNsYXNzID0gb3B0aW9ucy5ib2R5Q2xhc3M7XG4gICAgICAgIHRoaXMuaGlkZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqINCY0L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPINC/0LDRgNCw0LzQtdGC0YDQvtCyIHZpZXcgKNCy0YvQv9C+0LvQvdGP0LXRgtGB0Y8g0YHRgNCw0LfRgyDQv9C+0YHQu9C1INGB0L7Qt9C00LDQvdC40Y8pXG5cdCAqINCd0LXQvtCx0YXQvtC00LjQvNC+INC/0LXRgNC10L/RgNC10LTQtdC70Y/RgtGMXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gLSDQntCx0YrQtdC60YIg0YEg0L/QsNGA0LDQvNC10YLRgNCw0LzQuFxuXHQgKi9cblx0aW5pdChvcHRpb25zID0ge30pIHtcblx0XHR0aGlzLnNldEF0dHJzKG9wdGlvbnMuYXR0cnMpO1xuXHR9XG5cblx0LyoqXG5cdCAqINCS0YvQt9GL0LLQsNC10YLRgdGPINC/0YDQuCDQv9GA0LjQvtGB0YLQsNC90L7QstC60LUg0YDQsNCx0L7RgtGLIHZpZXcgKNC/0YDQuCDRgdC60YDRi9GC0LjQuCB2aWV3INC40LvQuCDQv9C10YDQtdGF0L7QtNC1INC90LAg0LTRgNGD0LPRg9GOIHZpZXcpXG5cdCAqINCd0LXQvtCx0YXQvtC00LjQvNC+INC/0LXRgNC10L7Qv9GA0LXQtNC10LvRj9GC0Ywg0YHQstC+0LXQuSDQu9C+0LPQuNC60L7QuVxuXHQgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIC0g0J7QsdGK0LXQutGCINGBINC/0LDRgNCw0LzQtdGC0YDQsNC80Lhcblx0ICovXG5cdHBhdXNlKG9wdGlvbnMgPSB7fSkge1xuXHRcdHRoaXMuaGlkZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqINCS0YvQt9GL0LLQsNC10YLRgdGPINC/0YDQuCDQvdCw0YfQsNC70LUg0LjQu9C4INC/0YDQvtC00L7Qu9C20LXQvdC40Lgg0YDQsNCx0L7RgtGLIHZpZXcgKNC/0L7RgdC70LUg0YLQvtCz0L4sINC60LDQuiB2aWV3INCx0YvQu9CwINGB0LrRgNGL0YLQsClcblx0ICog0J3QtdC+0LHRhdC+0LTQuNC80L4g0L/QtdGA0LXQvtC/0YDQtdC00LXQu9GP0YLRjCDRgdCy0L7QtdC5INC70L7Qs9C40LrQvtC5XG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gLSDQntCx0YrQtdC60YIg0YEg0L/QsNGA0LDQvNC10YLRgNCw0LzQuFxuXHQgKi9cblx0cmVzdW1lKG9wdGlvbnMgPSB7fSkge1xuICAgICAgICB0aGlzLnJlbmRlcigpO1xuXHRcdHRoaXMuc2hvdygpO1xuXHR9XG5cblx0LyoqXG5cdCAqINCf0L7QutCw0LfRi9Cy0LDQtdGCIHZpZXdcblx0ICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSAtINCe0LHRitC10LrRgiDRgSDQv9Cw0YDQsNC80LXRgtGA0LDQvNC4XG5cdCAqL1xuXHRzaG93KG9wdGlvbnMgPSB7fSkge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcblx0XHRzZWxmLl9lbC5oaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgaWYgKHNlbGYuYm9keUNsYXNzKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoc2VsZi5ib2R5Q2xhc3MpO1xuICAgICAgICB9XG5cdH1cblxuXHQvKipcblx0ICog0KHQutGA0YvQstCw0LXRgiB2aWV3XG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gLSDQntCx0YrQtdC60YIg0YEg0L/QsNGA0LDQvNC10YLRgNCw0LzQuFxuXHQgKi9cblx0aGlkZShvcHRpb25zID0ge30pIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG5cdFx0c2VsZi5fZWwuaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgaWYgKHNlbGYuYm9keUNsYXNzKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoc2VsZi5ib2R5Q2xhc3MpO1xuICAgICAgICB9XG5cdH1cblxuXHQvKipcblx0ICog0KDQtdC90LTQtdGA0LjRgiB2aWV3XG5cdCAqINCd0LXQvtCx0YXQvtC00LjQvNC+INC/0LXRgNC10L7Qv9GA0LXQtNC10LvRj9GC0Yxcblx0ICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSAtINCe0LHRitC10LrRgiDRgSDQv9Cw0YDQsNC80LXRgtGA0LDQvNC4XG5cdCAqL1xuXHRyZW5kZXIob3B0aW9ucyA9IHt9KSB7XG5cblx0fVxuXG5cdC8qKlxuXHQgKiDQktGB0YLQsNCy0LvRj9C10YIg0YLQtdC60YPRidGD0Y4gdmlldyDQsiDQv9C10YDQtdC00LDQvdC90YvQuSDRjdC70LXQvNC10L3RglxuXHQgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbCAtIEhUTUwt0Y3Qu9C10LzQtdC90YIsINC6INC60L7RgtC+0YDQvtC80YMg0LTQvtCx0LDQstC70Y/QtdGC0YHRjyDRjdC70LXQvNC10L3RgiDRgtC10LrRg9GJ0LXQuSB2aWV3XG5cdCAqL1xuXHRhcHBlbmRUbyhlbCkge1xuXHRcdGVsLmFwcGVuZENoaWxkKHRoaXMuX2VsKTtcblx0fVxuXG5cdC8qKlxuXHQgKiDQo9C00LDQu9GP0LXRgiDRjdC70LXQvNC10L3RgiDRgtC10LrRg9GJ0LXQuSB2aWV3XG5cdCAqL1xuXHRyZW1vdmUoKSB7XG5cdFx0dGhpcy5fZWwgJiYgdGhpcy5fZWwucmVtb3ZlKCk7XG5cdH1cblxuXHQvKipcblx0ICog0JfQsNC80LXQvdGP0LXRgiDRjdC70LXQvNC10L3RgiDRgtC10LrRg9GJ0LXQuSB2aWV3XG5cdCAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsIC0gSFRNTC3RjdC70LXQvNC10L3Rgiwg0LrQvtGC0L7RgNGL0Lkg0YHRgtCw0L3QvtCy0LjRgtGB0Y8g0Y3Qu9C10LzQtdC90YLQvtC8INGC0LXQutGD0YnQtdC5IHZpZXdcblx0ICovXG5cdHNldEVsZW1lbnQoZWwpIHtcblx0XHR0aGlzLl9lbCAmJiB0aGlzLl9lbC5yZW1vdmUoKTtcblx0XHR0aGlzLl9lbCA9IGVsO1xuXHR9XG5cblx0LyoqXG5cdCAqINCj0YHRgtCw0L3QsNCy0LvQuNCy0LDQtdGCINGC0LXQutGD0YnQtdC5IHZpZXcg0L3QsNCx0L7RgCDQsNGC0YDQuNCx0YPRgtC+0LJcblx0ICogQHBhcmFtIHtPYmplY3R9IFthdHRycz17fV0gLSDQntCx0YrQtdC60YIg0YEg0LDRgtGA0LjQsdGD0YLQsNC80LgsINC60L7RgtC+0YDRi9C1INCx0YPQtNGD0YIg0YPRgdGC0LDQvdC+0LLQu9C10L3RiyDRgyDRgtC10LrRg9GJ0LXQs9C+INGN0LvQtdC80LXQvdGC0LAgdmlld1xuXHQgKi9cblx0c2V0QXR0cnMoYXR0cnMgPSB7fSkge1xuXHRcdE9iamVjdC5rZXlzKGF0dHJzKS5mb3JFYWNoKG5hbWUgPT4ge1xuXHRcdFx0dGhpcy5fZWwuc2V0QXR0cmlidXRlKG5hbWUsIGF0dHJzW25hbWVdKTtcblx0XHR9KVxuXHR9XG5cblx0LyoqXG5cdCAqINCS0L7Qt9Cy0YDQsNGJ0LDQtdGCINGB0YLRgNC+0LrRgywg0YHQvtC00LXRgNC20LDRiNGD0Y4g0YLQtdC60YHRgtC+0LLQvtC1INC/0YDQtdC00YHRgtCw0LLQu9C10L3QuNC1INGC0LXQutGD0YnQtdC5IHZpZXdcblx0ICogQHJldHVybnMge3N0cmluZ31cblx0ICovXG5cdHRvU3RyaW5nKCkge1xuXHRcdHJldHVybiB0aGlzLl9lbC5vdXRlckhUTUw7XG5cdH1cblxuXHQvKipcblx0ICog0KPRgdGC0LDQvdCw0LLQu9C40LLQsNC10YIg0YLQtdC60YPRidC10LkgdmlldyDRgNC+0YPRgtC10YBcblx0ICogQHBhcmFtIHtSb3V0ZXJ9IHJvdXRlciAtINC40L3RgdGC0LDQvdGBINGA0L7Rg9GC0LXRgNCwXG5cdCAqL1xuXHRzZXRSb3V0ZXIocm91dGVyKSB7XG5cdFx0dGhpcy5yb3V0ZXIgPSByb3V0ZXI7XG5cdH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3B1YmxpYy9qcy9tb2R1bGVzL3ZpZXcuanMiLCJpbXBvcnQgcmVxdWVzdCBmcm9tICcuLi9saWJzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlck1vZGVsIHtcbiAgICBjb25zdHJ1Y3RvcihkYXRhID0ge30pIHtcbiAgICAgICAgdGhpcy51c2VybmFtZSA9IGRhdGEudXNlcm5hbWUgfHwgJyc7XG4gICAgICAgIHRoaXMuZW1haWwgPSBkYXRhLmVtYWlsO1xuICAgICAgICB0aGlzLnBhc3N3b3JkID0gZGF0YS5wYXNzd29yZDtcbiAgICAgICAgdGhpcy5zY29yZSA9IDA7XG4gICAgICAgIHRoaXMuZ2FtZXMgPSAwO1xuXG4gICAgICAgIHRoaXMuZW1haWxFcnJvciA9ICcnO1xuICAgICAgICB0aGlzLnBhc3N3b3JkRXJyb3IgPSAnJztcbiAgICAgICAgdGhpcy5sb2dpbkVycm9yID0gJyc7XG4gICAgfVxuXG4gICAgdmFsaWRhdGVMb2dpbiAoKSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgICBpZiAoc2VsZi51c2VybmFtZS5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgICBzZWxmLmxvZ2luRXJyb3IgPSAn0J/QvtC20LDQu9GD0LnRgdGC0LAsINCy0LLQtdC00LjRgtC1INC60LvQuNC60YPRhdGDISc7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgc2VsZi5sb2dpbkVycm9yID0gJyc7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHZhbGlkYXRlUGFzc3dvcmQoKSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgICBpZiAoc2VsZi5wYXNzd29yZC5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgICBzZWxmLnBhc3N3b3JkRXJyb3IgPSAn0J/QvtC20LDQu9GD0LnRgdGC0LAsINCy0LLQtdC00LjRgtC1INC/0LDRgNC+0LvRjCEnO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzZWxmLnBhc3N3b3JkLmxlbmd0aCA8IDgpIHtcbiAgICAgICAgICAgIHNlbGYucGFzc3dvcmRFcnJvciA9ICfQn9Cw0YDQvtC70Ywg0L3Rg9C20LXQvSDQtNC70LjQvdC90LXQtSA4INGB0LjQvNCy0L7Qu9C+0LIgPSgnO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHNlbGYucGFzc3dvcmRFcnJvciA9ICcnO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICB2YWxpZGF0ZUVtYWlsKCkge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgaWYgKHNlbGYuZW1haWwuc2VhcmNoKC8uK0AuK1xcLi4rLykgPT09IC0xKSB7XG4gICAgICAgICAgICBzZWxmLmVtYWlsRXJyb3IgPSAn0J/QvtC20LDQu9GD0LnRgdGC0LAsINC/0YDQvtCy0LXRgNGM0YLQtSDQv9GA0LDQstC40LvRjNC90L7RgdGC0YwgZS1tYWlsJztcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBzZWxmLmVtYWlsRXJyb3IgPSAnJztcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgdmFsaWRhdGUoKSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgICByZXR1cm4gc2VsZi52YWxpZGF0ZUVtYWlsKCkgJiYgc2VsZi52YWxpZGF0ZUxvZ2luKCkgJiYgc2VsZi52YWxpZGF0ZVBhc3N3b3JkKCk7XG4gICAgfVxuXG4gICAgZ2V0RW1haWxFcnJvciAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVtYWlsRXJyb3I7XG4gICAgfVxuXG4gICAgZ2V0TG9naW5FcnJvciAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxvZ2luRXJyb3I7XG4gICAgfVxuXG4gICAgZ2V0UGFzc3dvcmRFcnJvciAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhc3N3b3JkRXJyb3I7XG4gICAgfVxuXG4gICAgc2F2ZSAoKSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICAgICAgdXNlcm5hbWU6IHNlbGYudXNlcm5hbWUsXG4gICAgICAgICAgICBlbWFpbDogc2VsZi5lbWFpbCxcbiAgICAgICAgICAgIHBhc3N3b3JkOiBzZWxmLnBhc3N3b3JkLFxuICAgICAgICAgICAgZ2FtZXM6IHNlbGYuZ2FtZXMsXG4gICAgICAgICAgICBzY29yZTogc2VsZi5zY29yZSxcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKCFzZWxmLnZhbGlkYXRlKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gcmVxdWVzdCgnaHR0cHM6Ly9haXItZHJvbmUuaGVyb2t1YXBwLmNvbS91c2VyJywgJ1BPU1QnLCBkYXRhKTtcbiAgICAgICAgc3dpdGNoIChyZXNwb25zZS5zdGF0dXMpIHtcbiAgICAgICAgICAgIGNhc2UgNDAwOlxuICAgICAgICAgICAgY2FzZSA0MDM6IHNlbGYuZW1haWxFcnJvciA9ICfQn9C+0LvRjNC30L7QstCw0YLQtdC70Ywg0YEg0YLQsNC60LjQvCDQsNC00YDQtdGB0L7QvCDRg9C20LUg0LvQtdGC0LDQtdGCISc7XG4gICAgICAgICAgICAgICAgICAgICAgc2VsZi5wYXNzd29yZEVycm9yID0gJyc7XG4gICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDIwMDogc2VsZi5lbWFpbEVycm9yID0gc2VsZi5wYXNzd29yZEVycm9yID0gc2VsZi5sb2dpbkVycm9yID0gJyc7XG4gICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OiBjb25zb2xlLmxvZygn0KfRgtC+LdGC0L4g0L3QtSDRgtCw0LosINC90L4g0L3QtSA0MDAnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgZGVsZXRlICgpIHtcbiAgICAgICAgLy8gVE9ET1xuICAgIH1cblxuICAgIGxvZ2luICgpIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgICAgICBlbWFpbDogc2VsZi5lbWFpbCxcbiAgICAgICAgICAgIHBhc3N3b3JkOiBzZWxmLnBhc3N3b3JkLFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IHJlcXVlc3QoJ2h0dHBzOi8vYWlyLWRyb25lLmhlcm9rdWFwcC5jb20vc2Vzc2lvbicsICdQT1NUJywgZGF0YSk7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlLnN0YXR1cylcbiAgICAgICAgc3dpdGNoIChyZXNwb25zZS5zdGF0dXMpIHtcbiAgICAgICAgICAgIGNhc2UgNDAwOlxuICAgICAgICAgICAgY2FzZSA0MDM6IHNlbGYuZW1haWxFcnJvciA9ICfQndC10LLQtdGA0L3Ri9C5INC70L7Qs9C40L0g0LjQu9C4INC/0LDRgNC+0LvRjCEnO1xuICAgICAgICAgICAgICAgICAgICAgIHNlbGYucGFzc3dvcmRFcnJvciA9ICcnO1xuICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyMDA6IHNlbGYuZW1haWxFcnJvciA9IHNlbGYucGFzc3dvcmRFcnJvciA9IHNlbGYubG9naW5FcnJvciA9ICcnO1xuICAgICAgICAgICAgICAgICAgICAgIHNlbGYudXNlcm5hbWUgPSByZXNwb25zZS5yZXNwb25zZS51c2VybmFtZTsgLy8g0JrQvtCz0LTQsCDQvdC1INCx0YPQtNC10YIg0YDQsNCx0L7RgtCw0YLRjCwg0L7RiNC40LHQutGDINC40YHQutCw0YLRjCDQt9C00LXRgdGMLlxuICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc2NvcmUgPSByZXNwb25zZS5yZXNwb25zZS5zY29yZTtcbiAgICAgICAgICAgICAgICAgICAgICBzZWxmLmdhbWVzID0gcmVzcG9uc2UucmVzcG9uc2UuZ2FtZXM7XG4gICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OiBjb25zb2xlLmxvZygn0KfRgtC+LdGC0L4g0L3QtSDRgtCw0LosINC90L4g0L3QtSA0MDAnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgZ2V0U2NvcmUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNjb3JlO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3B1YmxpYy9qcy9tb2RlbHMvVXNlck1vZGVsLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==