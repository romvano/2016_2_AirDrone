webpackJsonp([0],{

/***/ 116:
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _route = __webpack_require__(138);

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
            this._el.innerHTML = (0, _gameTmpl2.default)({ source: this._game.getVideo() });
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
            this._el.innerHTML = (0, _loginTmpl2.default)(this.data);
            this._form = this._el.querySelector('.js-login-form');
            this._form.onsubmit = function () {
                this.login();return false;
            }.bind(this);
            this._form.children.email.onblur = function () {
                this.validateEmail();
            }.bind(this);
            this._form.children.password.onblur = function () {
                this.validatePassword();
            }.bind(this);
            this._form.children.password.onkeyup = function (e) {
                if (e.keyCode !== 8 && e.keyCode !== 9) {
                    this.validatePassword();
                }
            }.bind(this);
            this._form.children.registration.onclick = function () {
                this.router.go('/registration');
            }.bind(this);
            this.emailError = this._form.children.emailError;
            this.passwordError = this._form.children.passwordError;
        }
    }, {
        key: 'validateEmail',
        value: function validateEmail() {
            if (this._form.elements.email.value.search(/.@./) === -1) {
                this.emailError.hidden = false;
                this.emailError.innerHTML = 'Пожалуйста, проверьте правильность e-mail!';
                return false;
            }
            this.emailError.hidden = true;
            this.emailError.innerHTML = '';
            return true;
        }
    }, {
        key: 'validatePassword',
        value: function validatePassword() {
            if (this._form.elements.password.value.length < 1) {
                this.passwordError.hidden = false;
                this.passwordError.innerHTML = 'Пожалуйста, введите пароль!';
                return false;
            }
            this.passwordError.hidden = true;
            this.passwordError.innerHTML = '';
            return true;
        }
    }, {
        key: 'validate',
        value: function validate() {
            return this.validateEmail() && this.validatePassword();
        }
    }, {
        key: 'login',
        value: function login() {
            if (!this.validate()) {
                return;
            }
            var user = new _UserModel2.default({
                email: this._form.elements.email.value,
                password: this._form.elements.password.value
            });

            var response = user.login();
            this._form.children.emailError.innerHTML = user.getEmailError();
            this._form.children.passwordError.innerHTML = user.getPasswordError();
            this._form.children.emailError.hidden = this._form.children.emailError.innerHTML ? false : true;
            this._form.children.passwordError.hidden = this._form.children.passwordError.innerHTML ? false : true;
            if (response.status == 200) {
                this.router.go('/rooms');
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
            this._el.innerHTML = (0, _registrationTmpl2.default)(this.data);
            this._form = this._el.querySelector('.js-registration-form');
            this._form.onsubmit = function () {
                this.register();return false;
            }.bind(this);
            this._form.children.email.onblur = function () {
                this.validateEmail();
            }.bind(this);
            this._form.children.password.onblur = function () {
                this.validatePassword();
            }.bind(this);
            this._form.children.password.onkeyup = function (e) {
                if (e.keyCode !== 8 && e.keyCode !== 9) {
                    this.validatePassword();
                }
            }.bind(this);
            this._form.children.password2.onblur = function () {
                this.validatePassword();
            }.bind(this);
            this._form.children.password2.onkeyup = function (e) {
                if (e.keyCode !== 8 && e.keyCode !== 9) {
                    this.validatePassword();
                }
            }.bind(this);
            this._form.children.login.onblur = function () {
                this.validateLogin();
            }.bind(this);
            this.emailError = this._form.children.emailError;
            this.passwordError = this._form.children.passwordError;
            this.loginError = this._form.children.loginError;
        }
    }, {
        key: 'validateEmail',
        value: function validateEmail() {
            if (this._form.elements.email.value.search(/.+@.+\..+/) === -1) {
                this.emailError.innerHTML = 'Пожалуйста, проверьте правильность e-mail';
                this.emailError.style.display = 'block';
                return false;
            }
            this.emailError.hidden = true;
            this.emailError.innerHTML = '';
            return true;
        }
    }, {
        key: 'validatePassword',
        value: function validatePassword() {
            if (this._form.elements.password.value.length < 1) {
                this.passwordError.innerHTML = 'Пожалуйста, введите пароль!';
                this.passwordError.hidden = false;
                return false;
            }
            if (this._form.elements.password.value.length < 8) {
                this.passwordError.innerHTML = 'Пароль нужен длиннее 8 символов =(';
                this.passwordError.hidden = false;
                return false;
            }
            if (this._form.elements.password2.value.length > 0 && this._form.elements.password.value != this._form.elements.password2.value) {
                this._form.children.passwordError.innerHTML = 'Пароли не совпадают!';
                this.passwordError.hidden = false;
                return false;
            }
            this.passwordError.innerHTML = '';
            this.passwordError.hidden = true;
            return true;
        }
    }, {
        key: 'validateLogin',
        value: function validateLogin() {
            if (this._form.elements.login.value.length < 1) {
                this.loginError.innerHTML = 'Пожалуйста, введите кликуху!';
                this.loginError.style.display = 'block';
                return false;
            }
            this.loginError.hidden = true;
            this.loginError.innerHTML = '';
            return true;
        }
    }, {
        key: 'validate',
        value: function validate() {
            return this.validateEmail(this) && this.validatePassword(this) && this.validateLogin(this);
        }
    }, {
        key: 'register',
        value: function register() {
            if (!this.validate()) {
                return;
            }
            var user = new _UserModel2.default({
                username: this._form.elements.login.value,
                email: this._form.elements.email.value,
                password: this._form.elements.password.value
            });

            var response = user.save();
            this._form.children.emailError.textContent = user.getEmailError();
            this._form.children.passwordError.textContent = user.getPasswordError();
            this._form.children.loginError.textContent = user.getLoginError();
            this._form.children.emailError.hidden = this._form.children.emailError.textContent ? false : true;
            this._form.children.loginError.hidden = this._form.children.loginError.textContent ? false : true;
            this._form.children.passwordError.hidden = this._form.children.passwordError.textContent ? false : true;
            if (response.status === 200) {
                this.router.go('/rooms');
            } else {
                console.log('some server magic error');
                this._form.children.emailError.textContent = user.getEmailError();
                this._form.children.emailError.textContent = 'То ли e-mail, то ли пароль не подходят. Я так и не понял логику сервака';
                this._form.children.emailError.hidden = false;
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
            var _this2 = this;

            this.roomCollection.fetch().then(function () {
                _this2._el.innerHTML = (0, _roomsTmpl2.default)(_this2.roomCollection.getCollection());

                _this2.error = _this2._el.querySelector('.js-error');

                _this2.rooms = _this2._el.querySelectorAll('.rooms__room');
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    var _loop = function _loop() {
                        var room = _step.value;

                        room.onclick = function () {
                            this.selectRoom(room, room.nextSibling);
                        }.bind(_this2);
                    };

                    for (var _iterator = _this2.rooms[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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

                _this2.colors = _this2._el.querySelectorAll('.js-color');
                console.log(_this2.colors);
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    var _loop2 = function _loop2() {
                        var color = _step2.value;

                        console.log(color);
                        color.onclick = function () {
                            console.log('entered color click');this.selectColor(color);
                        }.bind(_this2);
                    };

                    for (var _iterator2 = _this2.colors[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
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

                _this2._join = _this2._el.querySelector('.js-join');
                console.log(_this2.join);
                _this2._join.onclick = function () {
                    this.join();
                }.bind(_this2);
                console.log('final');

                _this2._el.querySelector('.js-create').onclick = function () {
                    this.router.go('/scoreboard');
                }.bind(_this2);
            });
        }
    }, {
        key: 'selectRoom',
        value: function selectRoom(room, details) {
            for (var i = 0; i < this.rooms.length; ++i) {
                if (this.rooms[i] !== room) {
                    this.rooms[i].hidden = true;
                } else {
                    this.selectedRoom = this.roomCollection.getCollection()[i].id;
                }
            }
            details.hidden = false;
        }
    }, {
        key: 'selectColor',
        value: function selectColor(color) {
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = this.colors[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
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

            this.drone.color = color.style['background-color'];
            this.error.textContent = '';
            this.error.hidden = true;
        }
    }, {
        key: 'join',
        value: function join() {
            var _this3 = this;

            if (this.drone.color !== undefined) {
                this.error.textContent = '';
                this.error.hidden = true;
                this.drone.save(this.selectedRoom).then(function () {
                    if (_this3.drone.error !== '') {
                        _this3.error.textContent = 'Что-то пошло не так. Попробуйте еще раз!';
                        _this3.error.hidden = false;
                    }
                    _this3.router.go('/game');
                });
            } else {
                this.error.textContent = 'Выберите цвет дрона!';
                this.error.hidden = false;
            }
        }
    }, {
        key: 'back',
        value: function back(details) {
            details.hidden = true;
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = this.rooms[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
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

            this.selectedRoom = undefined;
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

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

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

        var _this = _possibleConstructorReturn(this, (ScoreboardView.__proto__ || Object.getPrototypeOf(ScoreboardView)).call(this, { element: '.js-scoreboard' }));

        _this.userCollection = new _UserCollection2.default();
        return _this;
    }

    _createClass(ScoreboardView, [{
        key: 'resume',
        value: function resume() {
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            this.render();
            this.show();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            this.userCollection.fetch().then(function () {
                console.log('got here');
                _this2._el.innerHTML = (0, _scoreboardTmpl2.default)(_this2.userCollection.getCollection());
            });
        }
    }, {
        key: 'show',
        value: function show() {
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            _get(ScoreboardView.prototype.__proto__ || Object.getPrototypeOf(ScoreboardView.prototype), 'show', this).call(this);
            document.body.classList.add('body-scoreboard');
        }
    }, {
        key: 'hide',
        value: function hide() {
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            _get(ScoreboardView.prototype.__proto__ || Object.getPrototypeOf(ScoreboardView.prototype), 'hide', this).call(this);
            document.body.classList.remove('body-scoreboard');
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
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _RoomModel = __webpack_require__(136);

var _RoomModel2 = _interopRequireDefault(_RoomModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
            var _this = this;

            return fetch('/games').then(function (response) {
                if (response.status !== 200) {
                    reject(response);
                }
                return response.json();
            }).then(function (data) {
                _this._data = data;
            }).catch();
        })
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
            var _this = this;

            return fetch('/rating').then(function (response) {
                if (response.status !== 200) {
                    reject(response);
                }
                return response.json();
            }).then(function (data) {
                _this._data = data;
                _this.sort();
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
            var _this = this;

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
                        playerId: this.playerId
                    }
                })
            }).then(function (response) {
                if (response.status !== 200) {
                    reject(response);
                }
                return response.json();
            }).then(function (data) {
                _this.error = '';
            }).catch(function () {
                _this.error = 'Failed to save drone!';
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
            var _this = this;

            return fetch('/host').then(function (response) {
                if (response.status !== 200) {
                    response(reject);
                }
                return response.json();
            }).then(function (data) {
                _this.host = data.host;
                _this.error = '';
            }).catch(function () {
                _this.error = 'Can\'t reach the host ' + _this.host + '!';
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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RoomModel = function () {
    function RoomModel() {
        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, RoomModel);

        this.id = data.id || 0;
        this.name = data.name || 'New Room';
        this.ip = data.ip || '127.0.0.1';
        this.drones = data.drones || [];
        this.endCondition = data.endCondition || 0;
        this.endValue = data.endValue || 0;
        this.availableColors = data.availableColors || [];
        this.error = '';
    }

    _createClass(RoomModel, [{
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
            var _this = this;

            return fetch('/room', {
                body: JSON.stringify({
                    room: this.id
                })
            }).then(function (response) {
                if (response.status !== 200) {
                    reject(response);
                }
                return response.json();
            }).then(function (data) {
                _this.id = data.id;
                _this.name = data.name;
                _this.ip = data.ip;
                _this.drones = data.drones;
                _this.endCondition = data.endCondition;
                _this.endValue = data.endValue;
                _this.availableColors = data.availableColors;
                _this.error = 0;
            }).catch(function () {
                _this.error = 'Wrong room name';
            });
        })
    }, {
        key: 'save',
        value: function save() {
            var _this2 = this;

            return fetch('/room', {
                method: 'POST',
                body: JSON.stringify({
                    name: this.name,
                    ip: this.ip,
                    drones: [],
                    endCondition: this.endCondition,
                    endValue: this.endValue
                }).then(function (response) {
                    if (response.status !== 200) {
                        reject(response);
                    }
                    return response.json();
                }).then(function (data) {
                    _this2.error = '';
                }).catch(function () {
                    _this2.error = 'Duplicated rooms!';
                })
            });
        }
    }, {
        key: 'listDrones',
        value: function listDrones() {
            return this.drones;
        }
    }]);

    return RoomModel;
}();

exports.default = RoomModel;

/***/ },

/***/ 137:
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

/***/ 138:
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pathToRegex = __webpack_require__(137);

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

/***/ 323:
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
            if (this.username.length < 1) {
                this.loginError = 'Пожалуйста, введите кликуху!';
                return false;
            }
            this.loginError = '';
            return true;
        }
    }, {
        key: 'validatePassword',
        value: function validatePassword() {
            if (this.password.length < 1) {
                this.passwordError = 'Пожалуйста, введите пароль!';
                return false;
            }
            if (this.password.length < 8) {
                this.passwordError = 'Пароль нужен длиннее 8 символов =(';
                return false;
            }
            this.passwordError = '';
            return true;
        }
    }, {
        key: 'validateEmail',
        value: function validateEmail() {
            if (this.email.search(/.+@.+\..+/) === -1) {
                this.emailError = 'Пожалуйста, проверьте правильность e-mail';
                return false;
            }
            this.emailError = '';
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
            var data = {
                username: this.username,
                email: this.email,
                password: this.password,
                games: this.games,
                score: this.score
            };
            if (!this.validate()) {
                return null;
            }
            var response = (0, _libs2.default)('https://air-drone.herokuapp.com/user', 'POST', data);
            switch (response.status) {
                case 400:
                case 403:
                    this.emailError = 'Пользователь с таким адресом уже летает!';
                    this.passwordError = '';
                    break;
                case 200:
                    this.emailError = this.passwordError = this.loginError = '';
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
            var data = {
                email: this.email,
                password: this.password
            };
            var response = (0, _libs2.default)('https://air-drone.herokuapp.com/session', 'POST', data);
            console.log(response.status);
            switch (response.status) {
                case 400:
                case 403:
                    this.emailError = 'Неверный логин или пароль!';
                    this.passwordError = '';
                    break;
                case 200:
                    this.emailError = this.passwordError = this.loginError = '';
                    this.username = response.response.username; // Когда не будет работать, ошибку искать здесь.
                    this.score = response.response.score;
                    this.games = response.response.games;
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

},[323]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvbW9kdWxlcy9yb3V0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL3ZpZXdzL2dhbWVWaWV3LmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy92aWV3cy9sb2dpblZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL3ZpZXdzL3JlZ2lzdHJhdGlvblZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL3ZpZXdzL3Jvb21zVmlldy5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvdmlld3Mvc2NvcmVib2FyZFZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL3RlbXBsYXRlcy9nYW1lLnRtcGwueG1sIiwid2VicGFjazovLy8uL3B1YmxpYy90ZW1wbGF0ZXMvbG9naW4udG1wbC54bWwiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL3RlbXBsYXRlcy9yZWdpc3RyYXRpb24udG1wbC54bWwiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL3RlbXBsYXRlcy9yb29tcy50bXBsLnhtbCIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvdGVtcGxhdGVzL3Njb3JlYm9hcmQudG1wbC54bWwiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL2NhbnZhcy5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvY29sbGVjdGlvbnMvUm9vbUNvbGxlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL2NvbGxlY3Rpb25zL1VzZXJDb2xsZWN0aW9uLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy9saWJzLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy9tb2RlbHMvRHJvbmVNb2RlbC5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvbW9kZWxzL0dhbWVNb2RlbC5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvbW9kZWxzL1Jvb21Nb2RlbC5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvbW9kdWxlcy9wYXRoVG9SZWdleC5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvbW9kdWxlcy9yb3V0ZS5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvYWlyZHJvbmUuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL21vZHVsZXMvdmlldy5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvbW9kZWxzL1VzZXJNb2RlbC5qcyJdLCJuYW1lcyI6WyJSb3V0ZXIiLCJfX2luc3RhbmNlIiwicm91dGVzIiwiYWN0aXZlUm91dGUiLCJoaXN0b3J5Iiwid2luZG93IiwicGF0aG5hbWUiLCJ2aWV3Iiwib3B0aW9ucyIsInJvdXRlIiwic2V0Um91dGVyIiwicHVzaCIsInN0YXRlIiwib25wb3BzdGF0ZSIsImV2ZW50IiwibG9jYXRpb24iLCJvbnJvdXRlIiwiYmluZCIsImZpbmQiLCJtYXRjaCIsImxlYXZlIiwibmF2aWdhdGUiLCJwdXNoU3RhdGUiLCJiYWNrIiwiZm9yd2FyZCIsIkdhbWVWaWV3IiwiZGF0YSIsImVsZW1lbnQiLCJib2R5Q2xhc3MiLCJfZ2FtZSIsIl9lbCIsImlubmVySFRNTCIsInNvdXJjZSIsImdldFZpZGVvIiwiTG9naW5WaWV3IiwiX2Zvcm0iLCJxdWVyeVNlbGVjdG9yIiwib25zdWJtaXQiLCJsb2dpbiIsImNoaWxkcmVuIiwiZW1haWwiLCJvbmJsdXIiLCJ2YWxpZGF0ZUVtYWlsIiwicGFzc3dvcmQiLCJ2YWxpZGF0ZVBhc3N3b3JkIiwib25rZXl1cCIsImUiLCJrZXlDb2RlIiwicmVnaXN0cmF0aW9uIiwib25jbGljayIsInJvdXRlciIsImdvIiwiZW1haWxFcnJvciIsInBhc3N3b3JkRXJyb3IiLCJlbGVtZW50cyIsInZhbHVlIiwic2VhcmNoIiwiaGlkZGVuIiwibGVuZ3RoIiwidmFsaWRhdGUiLCJ1c2VyIiwicmVzcG9uc2UiLCJnZXRFbWFpbEVycm9yIiwiZ2V0UGFzc3dvcmRFcnJvciIsInN0YXR1cyIsIlJlZ2lzdHJhdGlvblZpZXciLCJyZWdpc3RlciIsInBhc3N3b3JkMiIsInZhbGlkYXRlTG9naW4iLCJsb2dpbkVycm9yIiwic3R5bGUiLCJkaXNwbGF5IiwidXNlcm5hbWUiLCJzYXZlIiwidGV4dENvbnRlbnQiLCJnZXRMb2dpbkVycm9yIiwiY29uc29sZSIsImxvZyIsIlJvb21zVmlldyIsInJvb21Db2xsZWN0aW9uIiwiZHJvbmUiLCJzZWxlY3RlZFJvb20iLCJ1bmRlZmluZWQiLCJmZXRjaCIsInRoZW4iLCJnZXRDb2xsZWN0aW9uIiwiZXJyb3IiLCJyb29tcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJyb29tIiwic2VsZWN0Um9vbSIsIm5leHRTaWJsaW5nIiwiY29sb3JzIiwiY29sb3IiLCJzZWxlY3RDb2xvciIsIl9qb2luIiwiam9pbiIsImRldGFpbHMiLCJpIiwiaWQiLCJjIiwiY2xhc3NMaXN0IiwiYWRkIiwicmVtb3ZlIiwiciIsIlNjb3JlYm9hcmRWaWV3IiwidXNlckNvbGxlY3Rpb24iLCJyZW5kZXIiLCJzaG93IiwiZG9jdW1lbnQiLCJib2R5IiwiZ2FtZUNhbnZhcyIsIm1vZGUiLCJwYXJ0aWNsZXMiLCJjYW52YXMiLCJjb250ZXh0MkQiLCJnZXRDb250ZXh0IiwiaGVpZ2h0IiwiaW5uZXJIZWlnaHQiLCJ3aWR0aCIsImlubmVyV2lkdGgiLCJmcmFtZVJhdGUiLCJmcmFtZURlbGF5IiwicGFyc2VGbG9hdCIsInN0YXJ0VGltZSIsInNldEludGVydmFsIiwidXBkYXRlIiwicmFuZG9tRmxvYXQiLCJtaW4iLCJtYXgiLCJNYXRoIiwicmFuZG9tIiwiUGFydGljbGUiLCJzY2FsZSIsIngiLCJ5IiwicmFkaXVzIiwidmVsb2NpdHlYIiwidmVsb2NpdHlZIiwic2NhbGVTcGVlZCIsIm1zIiwiZHJhdyIsInRyYW5zbGF0ZSIsImJlZ2luUGF0aCIsImFyYyIsIlBJIiwiY2xvc2VQYXRoIiwiZmlsbFN0eWxlIiwiZmlsbCIsInJlc3RvcmUiLCJjcmVhdGVFeHBsb3Npb24iLCJtaW5TaXplIiwibWF4U2l6ZSIsImNvdW50IiwibWluU3BlZWQiLCJtYXhTcGVlZCIsIm1pblNjYWxlU3BlZWQiLCJtYXhTY2FsZVNwZWVkIiwiYW5nbGUiLCJyb3VuZCIsInBhcnRpY2xlIiwic3BlZWQiLCJjb3MiLCJzaW4iLCJyZWN0U2l6ZSIsIm1hcmdpblkiLCJzdGF0dXNNYXJnaW4iLCJhbGVydFNpemUiLCJhbGVydE1hcmdpbiIsImNsZWFyUmVjdCIsInNwbGljZSIsImRyYXdTdGF0dXMiLCJyb3VuZFJlY3QiLCJnbG9iYWxBbHBoYSIsImZvbnQiLCJ0ZXh0QWxpZ24iLCJmaWxsVGV4dCIsInNlY29uZHMiLCJEYXRlIiwiZ2V0VGltZSIsInBhcnNlSW50Iiwic2l6ZSIsIm9mZnNldFkiLCJsYWJlbCIsInJlYWxTaXplIiwieE1hcmdpbiIsInN0cm9rZSIsInRsIiwidHIiLCJiciIsImJsIiwiZGVmYXVsdFJhZGl1cyIsInNpZGUiLCJsaW5lV2lkdGgiLCJzdHJva2VTdHlsZSIsIm1vdmVUbyIsImxpbmVUbyIsInF1YWRyYXRpY0N1cnZlVG8iLCJvbmtleWRvd24iLCJldnQiLCJSb29tQ29sbGVjdGlvbiIsIl9kYXRhIiwicmVqZWN0IiwianNvbiIsImNhdGNoIiwiVXNlckNvbGxlY3Rpb24iLCJzb3J0IiwiYSIsImIiLCJzY29yZSIsInJlcXVlc3QiLCJ1cmwiLCJtZXRob2QiLCJ4aHIiLCJYTUxIdHRwUmVxdWVzdCIsIm9wZW4iLCJzZXRSZXF1ZXN0SGVhZGVyIiwic2VuZCIsIkpTT04iLCJzdHJpbmdpZnkiLCJSb29tTW9kZWwiLCJwbGF5ZXJMb2dpbiIsInBsYXllcklkIiwiR2FtZU1vZGVsIiwiaG9zdCIsIndzIiwiZ2V0SG9zdCIsIm5hbWUiLCJpcCIsImRyb25lcyIsImVuZENvbmRpdGlvbiIsImVuZFZhbHVlIiwiYXZhaWxhYmxlQ29sb3JzIiwicGF0aFRvUmVnZXgiLCJrZXlOYW1lcyIsInBhcnRzIiwic3BsaXQiLCJmaWx0ZXIiLCJwYXJ0IiwibWFwIiwiZXhlYyIsInNsaWNlIiwiUmVnRXhwIiwicGF0aCIsImtleXMiLCJjaGVjayIsImV2ZXJ5IiwicmVnZXhwIiwic3RlcCIsInRtcCIsInJlcGxhY2UiLCJyZWR1Y2UiLCJwcmV2IiwiY3VyciIsInBvcyIsIlJvdXRlIiwicmVnZXgiLCJWaWV3IiwiX3ZpZXciLCJpbml0IiwiX19yb3V0ZXIiLCJyZXN1bWUiLCJPYmplY3QiLCJhc3NpZ24iLCJwYXVzZSIsImFkZFJvdXRlIiwic3RhcnQiLCJ0YWdOYW1lIiwiY3JlYXRlRWxlbWVudCIsImhpZGUiLCJzZXRBdHRycyIsImF0dHJzIiwic2VsZiIsImVsIiwiYXBwZW5kQ2hpbGQiLCJmb3JFYWNoIiwic2V0QXR0cmlidXRlIiwib3V0ZXJIVE1MIiwiVXNlck1vZGVsIiwiZ2FtZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7O0FBRUE7SUFDcUJBLE07QUFDcEI7OztBQUdBLG1CQUFjO0FBQUE7O0FBQ2IsTUFBSUEsT0FBT0MsVUFBWCxFQUF1QjtBQUN0QixVQUFPRCxPQUFPQyxVQUFkO0FBQ0E7O0FBRUQsT0FBS0MsTUFBTCxHQUFjLEVBQWQ7QUFDQSxPQUFLQyxXQUFMLEdBQW1CLElBQW5COztBQUVBLE9BQUtDLE9BQUwsR0FBZUMsT0FBT0QsT0FBdEI7O0FBRUFKLFNBQU9DLFVBQVAsR0FBb0IsSUFBcEI7QUFDQTs7QUFFRDs7Ozs7Ozs7Ozs7MkJBT1NLLFEsRUFBVUMsSSxFQUFvQjtBQUFBLE9BQWRDLE9BQWMsdUVBQUosRUFBSTs7QUFDdEMsT0FBSUMsUUFBUSxvQkFBVUgsUUFBVixFQUFvQkMsSUFBcEIsRUFBMEJDLE9BQTFCLENBQVo7QUFDQUMsU0FBTUMsU0FBTixDQUFnQixJQUFoQjtBQUNBLFFBQUtSLE1BQUwsQ0FBWVMsSUFBWixDQUFpQkYsS0FBakI7QUFDQSxVQUFPLElBQVA7QUFDQTs7QUFFRDs7Ozs7OzswQkFJa0I7QUFBQSxPQUFaRyxLQUFZLHVFQUFKLEVBQUk7O0FBQ2pCUCxVQUFPUSxVQUFQLEdBQW9CLFVBQVVDLEtBQVYsRUFBaUI7QUFDcEMsUUFBSUYsUUFBUUUsTUFBTUYsS0FBbEI7QUFDQSxRQUFJTixXQUFXRCxPQUFPVSxRQUFQLENBQWdC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QUFJQSxnQkFBTWtCLFdBQVcsb0JBQVEseUNBQVIsRUFBbUQsTUFBbkQsRUFBMkRuQyxJQUEzRCxDQUFqQjtBQUNBa0Qsb0JBQVFDLEdBQVIsQ0FBWWhCLFNBQVNHLE1BQXJCO0FBQ0Esb0JBQVFILFNBQVNHLE1BQWpCO0FBQ0kscUJBQUssR0FBTDtBQUNBLHFCQUFLLEdBQUw7QUFBVSx5QkFBS1osVUFBTCxHQUFrQiw0QkFBbEI7QUFDQSx5QkFBS0MsYUFBTCxHQUFxQixFQUFyQjtBQUNBO0FBQ1YscUJBQUssR0FBTDtBQUFVLHlCQUFLRCxVQUFMLEdBQWtCLEtBQUtDLGFBQUwsR0FBcUIsS0FBS2dCLFVBQUwsR0FBa0IsRUFBekQ7QUFDQSx5QkFBS0csUUFBTCxHQUFnQlgsU0FBU0EsUUFBVCxDQUFrQlcsUUFBbEMsQ0FEVixDQUNzRDtBQUM1Qyx5QkFBS3lJLEtBQUwsR0FBYXBKLFNBQVNBLFFBQVQsQ0FBa0JvSixLQUEvQjtBQUNBLHlCQUFLc0UsS0FBTCxHQUFhMU4sU0FBU0EsUUFBVCxDQUFrQjBOLEtBQS9CO0FBQ0E7QUFDVjtBQUFTM00sNEJBQVFDLEdBQVIsQ0FBWSwwQkFBWjtBQVZiO0FBWUEsbUJBQU9oQixRQUFQO0FBQ0g7OzttQ0FFVTtBQUNQLG1CQUFPLEtBQUtvSixLQUFaO0FBQ0g7Ozs7OztrQkFqSGdCcUUsUyIsImZpbGUiOiJqcy9haXJkcm9uZS5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUm91dGUgZnJvbSAnLi9yb3V0ZSc7XG5cbi8qKiDQmtC70LDRgdGBINGA0L7Rg9GC0LXRgNCwICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb3V0ZXIge1xuXHQvKipcblx0ICog0KHQvtC30LTQsNGR0YIg0L3QvtCy0YvQuSDRgNC+0YPRgtC10YAg0LjQu9C4INCy0L7Qt9Cy0YDQsNGJ0LDQtdGCINGD0LbQtSDRgdC+0LfQtNCw0L3QvdGL0Lkg0LjQvdGB0YLQsNC90YFcblx0ICovXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdGlmIChSb3V0ZXIuX19pbnN0YW5jZSkge1xuXHRcdFx0cmV0dXJuIFJvdXRlci5fX2luc3RhbmNlO1xuXHRcdH1cblxuXHRcdHRoaXMucm91dGVzID0gW107XG5cdFx0dGhpcy5hY3RpdmVSb3V0ZSA9IG51bGw7XG5cblx0XHR0aGlzLmhpc3RvcnkgPSB3aW5kb3cuaGlzdG9yeTtcblxuXHRcdFJvdXRlci5fX2luc3RhbmNlID0gdGhpcztcblx0fVxuXG5cdC8qKlxuXHQgKiDQlNC+0LHQsNCy0LvRj9C10YIg0L3QvtCy0YvQuSBSb3V0ZSDQsiDRgNC+0YPRgtC10YBcblx0ICogQHBhcmFtIHtzdHJpbmd9IHBhdGhuYW1lIC0g0KjQsNCx0LvQvtC9INC/0YPRgtC4XG5cdCAqIEBwYXJhbSB7Vmlld30gdmlldyAtINCa0LvQsNGB0YEg0LrQvtC90LrRgNC10YLQvdC+0LkgVmlld1xuXHQgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIC0g0JTQvtC/0L7Qu9C90LjRgtC10LvRjNC90YvQtSDQv9Cw0YDQsNC80LXRgtGA0YssINC60L7RgtC+0YDRi9C1INCx0YPQtNGD0YIg0L/QtdGA0LXQtNCw0L3RiyDQstC+IHZpZXcg0L/RgNC4INC10ZEg0YHQvtC30LTQsNC90LjQuCDQuCDQuNC90LjRhtC40LDQu9C40LfQsNGG0LjQuFxuXHQgKiBAcmV0dXJucyB7Um91dGVyfVxuXHQgKi9cblx0YWRkUm91dGUocGF0aG5hbWUsIHZpZXcsIG9wdGlvbnMgPSB7fSkge1xuXHRcdGxldCByb3V0ZSA9IG5ldyBSb3V0ZShwYXRobmFtZSwgdmlldywgb3B0aW9ucyk7XG5cdFx0cm91dGUuc2V0Um91dGVyKHRoaXMpO1xuXHRcdHRoaXMucm91dGVzLnB1c2gocm91dGUpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0LyoqXG5cdCAqINCX0LDQv9GD0YHQutCw0LXRgiDRgNC+0YPRgtC10YAg0Lgg0L/QtdGA0LXRhdC+0LTQuNGCINC/0L4g0YLQtdC60YPRidC10LzRgyDQv9GD0YLQuCDQsiDQv9GA0LjQu9C+0LbQtdC90LjQuFxuXHQgKiBAcGFyYW0ge09iamVjdH0gW3N0YXRlPXt9XSAtINCe0LHRitC10LrRgiBzdGF0ZSwg0LrQvtGC0L7RgNGL0Lkg0L/QtdGA0LXQtNCw0ZHRgtGB0Y8g0LIg0L/QtdGA0LLRi9C5INCy0YvQt9C+0LIgb25yb3V0ZVxuXHQgKi9cblx0c3RhcnQoc3RhdGUgPSB7fSkge1xuXHRcdHdpbmRvdy5vbnBvcHN0YXRlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0XHRsZXQgc3RhdGUgPSBldmVudC5zdGF0ZTtcblx0XHRcdGxldCBwYXRobmFtZSA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcblx0XHRcdHRoaXMub25yb3V0ZShwYXRobmFtZSwgc3RhdGUpO1xuXHRcdH0uYmluZCh0aGlzKTtcblxuXHRcdGNvbnN0IHBhdGhuYW1lID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lO1xuXHRcdHRoaXMub25yb3V0ZShwYXRobmFtZSwgc3RhdGUpO1xuXHR9XG5cblx0LyoqXG5cdCAqINCk0YPQvdC60YbQuNGPLCDQstGL0LfRi9Cy0LDQtdC80LDRjyDQv9GA0Lgg0L/QtdGA0LXRhdC+0LTQtSDQvdCwINC90L7QstGL0Lkg0YDQvtGD0YIg0LIg0L/RgNC40LvQvtC20LXQvdC40Lhcblx0ICogQHBhcmFtIHtzdHJpbmd9IHBhdGhuYW1lIC0g0J/Rg9GC0YwsINC/0L4g0LrQvtGC0L7RgNC+0LzRgyDQv9GA0L7QuNGB0YXQvtC00LjRgiDQv9C10YDQtdGF0L7QtFxuXHQgKiBAcGFyYW0ge09iamVjdH0gW3N0YXRlPXt9XSAtINCe0LHRitC10LrRgiBzdGF0ZSwg0LrQvtGC0L7RgNGL0Lkg0L/QtdGA0LXQtNCw0ZHRgtGB0Y8g0LIg0LLRi9C30L7QsiDQvNC10YLQvtC00LAgbmF2aWdhdGVcblx0ICovXG5cdG9ucm91dGUocGF0aG5hbWUsIHN0YXRlID0ge30pIHtcblx0XHRsZXQgcm91dGUgPSB0aGlzLnJvdXRlcy5maW5kKHJvdXRlID0+IHJvdXRlLm1hdGNoKHBhdGhuYW1lKSk7XG5cdFx0aWYgKCFyb3V0ZSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLmFjdGl2ZVJvdXRlKSB7XG5cdFx0XHR0aGlzLmFjdGl2ZVJvdXRlLmxlYXZlKCk7XG5cdFx0fVxuXG5cdFx0dGhpcy5hY3RpdmVSb3V0ZSA9IHJvdXRlO1xuXHRcdHRoaXMuYWN0aXZlUm91dGUubmF2aWdhdGUocGF0aG5hbWUsIHN0YXRlKTtcblx0fVxuXG5cdC8qKlxuXHQgKiDQn9GA0L7Qs9GA0LDQvNC80L3Ri9C5INC/0LXRgNC10YXQvtC0INC90LAg0L3QvtCy0YvQuSDQv9GD0YLRjFxuXHQgKiBAcGFyYW0ge3N0cmluZ30gcGF0aG5hbWUgLSDQn9GD0YLRjFxuXHQgKiBAcGFyYW0ge09iamVjdH0gW3N0YXRlPXt9XSAtINCe0LHRitC10LrRgiBzdGF0ZSwg0LrQvtGC0L7RgNGL0Lkg0L/QtdGA0LXQtNCw0ZHRgtGB0Y8g0LIg0LLRi9C30L7QsiBoaXN0b3J5LnB1c2hTdGF0ZVxuXHQgKi9cblx0Z28ocGF0aG5hbWUsIHN0YXRlID0ge30pIHtcblx0XHRpZiAod2luZG93LmxvY2F0aW9uLnBhdGhuYW1lID09PSBwYXRobmFtZSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHR0aGlzLmhpc3RvcnkucHVzaFN0YXRlKHN0YXRlLCAnJywgcGF0aG5hbWUpO1xuXHRcdHRoaXMub25yb3V0ZShwYXRobmFtZSwgc3RhdGUpO1xuXHR9XG5cblx0LyoqXG5cdCAqINCf0L7Qt9Cy0L7Qu9GP0LXRgiDRg9GB0YLQsNC90L7QstC40YLRjCDRgdCy0L7RjiDRgdC+0LHRgdGC0LLQtdC90L3Rg9GOINGA0LXQsNC70LjQt9Cw0YbQuNGOIEhpc3RvcnkgQVBJXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBoaXN0b3J5IC0g0LTQvtC70LbQtdC9INC/0YDQtdC00L7RgdGC0LDQstC70Y/RgtGMINGA0LXQsNC70LjQt9Cw0YbQuNGOINC80LXRgtC+0LTQvtCyIGJhY2soKSwgZm9yd2FyZCgpLCBwdXNoU3RhdGUoKVxuXHQgKi9cblx0c2V0SGlzdG9yeShoaXN0b3J5KSB7XG5cdFx0dGhpcy5oaXN0b3J5ID0gaGlzdG9yeTtcblx0fVxuXG5cdC8qKlxuXHQgKiDQktC+0LfQstGA0LDRgiDQvdCwINC+0LTQuNC9INGI0LDQsyDQvdCw0LfQsNC0INCyINC40YHRgtC+0YDQuNC4INCx0YDQsNGD0LfQtdGA0LBcblx0ICovXG5cdGJhY2soKSB7XG5cdFx0dGhpcy5oaXN0b3J5LmJhY2soKTtcblx0fVxuXG5cdC8qKlxuXHQgKiDQn9C10YDQtdGF0L7QtCDQvdCwINC+0LTQuNC9INGI0LDQsyDQstC/0LXRgNGR0LQg0LIg0LjRgdGC0L7RgNC40Lgg0LHRgNCw0YPQt9C10YDQsFxuXHQgKi9cblx0Zm9yd2FyZCgpIHtcblx0XHR0aGlzLmhpc3RvcnkuZm9yd2FyZCgpO1xuXHR9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wdWJsaWMvanMvbW9kdWxlcy9yb3V0ZXIuanMiLCJpbXBvcnQgVmlldyBmcm9tICcuLi9tb2R1bGVzL3ZpZXcnO1xuaW1wb3J0IHRlbXBsYXRlIGZyb20gJy4uLy4uL3RlbXBsYXRlcy9nYW1lLnRtcGwueG1sJztcbmltcG9ydCBHYW1lTW9kZWwgZnJvbSAnLi4vbW9kZWxzL0dhbWVNb2RlbCc7XG5pbXBvcnQgZ2FtZUNhbnZhcyBmcm9tICcuLi9jYW52YXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lVmlldyBleHRlbmRzIFZpZXcge1xuICAgIGNvbnN0cnVjdG9yIChkYXRhID0ge30pIHtcbiAgICAgICAgc3VwZXIoeyBlbGVtZW50OiAnLmpzLWdhbWUnLCBib2R5Q2xhc3M6ICdib2R5LWdhbWUnIH0pO1xuICAgICAgICB0aGlzLl9nYW1lID0gbmV3IEdhbWVNb2RlbCgpO1xuICAgIH1cblxuICAgIHJlbmRlciAoKSB7XG4gICAgICAgIHRoaXMuX2VsLmlubmVySFRNTCA9IHRlbXBsYXRlKHsgc291cmNlOiB0aGlzLl9nYW1lLmdldFZpZGVvKCkgfSk7XG4gICAgICAgIGdhbWVDYW52YXMoKTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wdWJsaWMvanMvdmlld3MvZ2FtZVZpZXcuanMiLCJpbXBvcnQgVmlldyBmcm9tICcuLi9tb2R1bGVzL3ZpZXcnO1xuaW1wb3J0IFVzZXJNb2RlbCBmcm9tICcuLi9tb2RlbHMvVXNlck1vZGVsJztcbmltcG9ydCB0ZW1wbGF0ZSBmcm9tICcuLi8uLi90ZW1wbGF0ZXMvbG9naW4udG1wbC54bWwnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2dpblZpZXcgZXh0ZW5kcyBWaWV3IHtcbiAgICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgICAgIHN1cGVyKHsgZWxlbWVudDogJy5qcy1sb2dpbicsIGJvZHlDbGFzczogJ2JvZHktbG9naW4nIH0pO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgdGhpcy5fZWwuaW5uZXJIVE1MID0gdGVtcGxhdGUodGhpcy5kYXRhKTtcbiAgICAgICAgdGhpcy5fZm9ybSA9IHRoaXMuX2VsLnF1ZXJ5U2VsZWN0b3IoJy5qcy1sb2dpbi1mb3JtJyk7XG4gICAgICAgIHRoaXMuX2Zvcm0ub25zdWJtaXQgPSAoZnVuY3Rpb24gKCkgeyB0aGlzLmxvZ2luKCk7IHJldHVybiBmYWxzZTsgfSkuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5fZm9ybS5jaGlsZHJlbi5lbWFpbC5vbmJsdXIgPSAoZnVuY3Rpb24gKCkgeyB0aGlzLnZhbGlkYXRlRW1haWwoKTsgfSkuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5fZm9ybS5jaGlsZHJlbi5wYXNzd29yZC5vbmJsdXIgPSAoZnVuY3Rpb24gKCkgeyB0aGlzLnZhbGlkYXRlUGFzc3dvcmQoKTsgfSkuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5fZm9ybS5jaGlsZHJlbi5wYXNzd29yZC5vbmtleXVwID0gKGZ1bmN0aW9uIChlKSB7IFxuICAgICAgICAgICAgaWYgKGUua2V5Q29kZSAhPT0gOCAmJiBlLmtleUNvZGUgIT09IDkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZhbGlkYXRlUGFzc3dvcmQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5fZm9ybS5jaGlsZHJlbi5yZWdpc3RyYXRpb24ub25jbGljayA9IChmdW5jdGlvbiAoKSB7IHRoaXMucm91dGVyLmdvKCcvcmVnaXN0cmF0aW9uJyk7IH0pLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuZW1haWxFcnJvciA9IHRoaXMuX2Zvcm0uY2hpbGRyZW4uZW1haWxFcnJvcjtcbiAgICAgICAgdGhpcy5wYXNzd29yZEVycm9yID0gdGhpcy5fZm9ybS5jaGlsZHJlbi5wYXNzd29yZEVycm9yO1xuICAgIH1cblxuICAgIHZhbGlkYXRlRW1haWwoKSB7XG4gICAgICAgIGlmICh0aGlzLl9mb3JtLmVsZW1lbnRzLmVtYWlsLnZhbHVlLnNlYXJjaCgvLkAuLykgPT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLmVtYWlsRXJyb3IuaGlkZGVuID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmVtYWlsRXJyb3IuaW5uZXJIVE1MID0gJ9Cf0L7QttCw0LvRg9C50YHRgtCwLCDQv9GA0L7QstC10YDRjNGC0LUg0L/RgNCw0LLQuNC70YzQvdC+0YHRgtGMIGUtbWFpbCEnO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZW1haWxFcnJvci5oaWRkZW4gPSB0cnVlO1xuICAgICAgICB0aGlzLmVtYWlsRXJyb3IuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHZhbGlkYXRlUGFzc3dvcmQoKSB7XG4gICAgICAgIGlmICh0aGlzLl9mb3JtLmVsZW1lbnRzLnBhc3N3b3JkLnZhbHVlLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICAgIHRoaXMucGFzc3dvcmRFcnJvci5oaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMucGFzc3dvcmRFcnJvci5pbm5lckhUTUwgPSAn0J/QvtC20LDQu9GD0LnRgdGC0LAsINCy0LLQtdC00LjRgtC1INC/0LDRgNC+0LvRjCEnO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucGFzc3dvcmRFcnJvci5oaWRkZW4gPSB0cnVlO1xuICAgICAgICB0aGlzLnBhc3N3b3JkRXJyb3IuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHZhbGlkYXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy52YWxpZGF0ZUVtYWlsKCkgJiYgdGhpcy52YWxpZGF0ZVBhc3N3b3JkKCk7XG4gICAgfVxuXG4gICAgbG9naW4oKSB7XG4gICAgICAgIGlmICghdGhpcy52YWxpZGF0ZSgpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdXNlciA9IG5ldyBVc2VyTW9kZWwoe1xuICAgICAgICAgICAgZW1haWw6IHRoaXMuX2Zvcm0uZWxlbWVudHMuZW1haWwudmFsdWUsXG4gICAgICAgICAgICBwYXNzd29yZDogdGhpcy5fZm9ybS5lbGVtZW50cy5wYXNzd29yZC52YWx1ZSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSB1c2VyLmxvZ2luKCk7XG4gICAgICAgIHRoaXMuX2Zvcm0uY2hpbGRyZW4uZW1haWxFcnJvci5pbm5lckhUTUwgPSB1c2VyLmdldEVtYWlsRXJyb3IoKTtcbiAgICAgICAgdGhpcy5fZm9ybS5jaGlsZHJlbi5wYXNzd29yZEVycm9yLmlubmVySFRNTCA9IHVzZXIuZ2V0UGFzc3dvcmRFcnJvcigpO1xuICAgICAgICB0aGlzLl9mb3JtLmNoaWxkcmVuLmVtYWlsRXJyb3IuaGlkZGVuID0gdGhpcy5fZm9ybS5jaGlsZHJlbi5lbWFpbEVycm9yLmlubmVySFRNTCA/IGZhbHNlIDogdHJ1ZTtcbiAgICAgICAgdGhpcy5fZm9ybS5jaGlsZHJlbi5wYXNzd29yZEVycm9yLmhpZGRlbiA9IHRoaXMuX2Zvcm0uY2hpbGRyZW4ucGFzc3dvcmRFcnJvci5pbm5lckhUTUwgPyBmYWxzZSA6IHRydWU7XG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT0gMjAwKSB7XG4gICAgICAgICAgICB0aGlzLnJvdXRlci5nbygnL3Jvb21zJyk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wdWJsaWMvanMvdmlld3MvbG9naW5WaWV3LmpzIiwiaW1wb3J0IFZpZXcgZnJvbSAnLi4vbW9kdWxlcy92aWV3JztcbmltcG9ydCBVc2VyTW9kZWwgZnJvbSAnLi4vbW9kZWxzL1VzZXJNb2RlbCc7XG5pbXBvcnQgdGVtcGxhdGUgZnJvbSAnLi4vLi4vdGVtcGxhdGVzL3JlZ2lzdHJhdGlvbi50bXBsLnhtbCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlZ2lzdHJhdGlvblZpZXcgZXh0ZW5kcyBWaWV3IHtcbiAgICBjb25zdHJ1Y3RvciAob3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIHN1cGVyKHsgZWxlbWVudDogJy5qcy1yZWdpc3RyYXRpb24nLCBib2R5Q2xhc3M6ICdib2R5LXJlZ2lzdHJhdGlvbicgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICB0aGlzLl9lbC5pbm5lckhUTUwgPSB0ZW1wbGF0ZSh0aGlzLmRhdGEpO1xuICAgICAgICB0aGlzLl9mb3JtID0gdGhpcy5fZWwucXVlcnlTZWxlY3RvcignLmpzLXJlZ2lzdHJhdGlvbi1mb3JtJyk7XG4gICAgICAgIHRoaXMuX2Zvcm0ub25zdWJtaXQgPSAoZnVuY3Rpb24gKCkgeyB0aGlzLnJlZ2lzdGVyKCk7IHJldHVybiBmYWxzZTsgfSkuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5fZm9ybS5jaGlsZHJlbi5lbWFpbC5vbmJsdXIgPSAoZnVuY3Rpb24gKCkgeyB0aGlzLnZhbGlkYXRlRW1haWwoKTsgfSkuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5fZm9ybS5jaGlsZHJlbi5wYXNzd29yZC5vbmJsdXIgPSAoZnVuY3Rpb24gKCkgeyB0aGlzLnZhbGlkYXRlUGFzc3dvcmQoKTsgfSkuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5fZm9ybS5jaGlsZHJlbi5wYXNzd29yZC5vbmtleXVwID0gKGZ1bmN0aW9uIChlKSB7IFxuICAgICAgICAgICAgaWYgKGUua2V5Q29kZSAhPT0gOCAmJiBlLmtleUNvZGUgIT09IDkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZhbGlkYXRlUGFzc3dvcmQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5fZm9ybS5jaGlsZHJlbi5wYXNzd29yZDIub25ibHVyID0gKGZ1bmN0aW9uICgpIHsgdGhpcy52YWxpZGF0ZVBhc3N3b3JkKCk7IH0pLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuX2Zvcm0uY2hpbGRyZW4ucGFzc3dvcmQyLm9ua2V5dXAgPSAoZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGlmIChlLmtleUNvZGUgIT09IDggJiYgZS5rZXlDb2RlICE9PSA5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy52YWxpZGF0ZVBhc3N3b3JkKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuX2Zvcm0uY2hpbGRyZW4ubG9naW4ub25ibHVyID0gKGZ1bmN0aW9uICgpIHsgdGhpcy52YWxpZGF0ZUxvZ2luKCk7IH0pLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuZW1haWxFcnJvciA9IHRoaXMuX2Zvcm0uY2hpbGRyZW4uZW1haWxFcnJvcjtcbiAgICAgICAgdGhpcy5wYXNzd29yZEVycm9yID0gdGhpcy5fZm9ybS5jaGlsZHJlbi5wYXNzd29yZEVycm9yO1xuICAgICAgICB0aGlzLmxvZ2luRXJyb3IgPSB0aGlzLl9mb3JtLmNoaWxkcmVuLmxvZ2luRXJyb3I7XG4gICAgfVxuXG4gICAgdmFsaWRhdGVFbWFpbCgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2Zvcm0uZWxlbWVudHMuZW1haWwudmFsdWUuc2VhcmNoKC8uK0AuK1xcLi4rLykgPT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLmVtYWlsRXJyb3IuaW5uZXJIVE1MID0gJ9Cf0L7QttCw0LvRg9C50YHRgtCwLCDQv9GA0L7QstC10YDRjNGC0LUg0L/RgNCw0LLQuNC70YzQvdC+0YHRgtGMIGUtbWFpbCc7XG4gICAgICAgICAgICB0aGlzLmVtYWlsRXJyb3Iuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5lbWFpbEVycm9yLmhpZGRlbiA9IHRydWU7XG4gICAgICAgIHRoaXMuZW1haWxFcnJvci5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgdmFsaWRhdGVQYXNzd29yZCgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2Zvcm0uZWxlbWVudHMucGFzc3dvcmQudmFsdWUubGVuZ3RoIDwgMSkge1xuICAgICAgICAgICAgdGhpcy5wYXNzd29yZEVycm9yLmlubmVySFRNTCA9ICfQn9C+0LbQsNC70YPQudGB0YLQsCwg0LLQstC10LTQuNGC0LUg0L/QsNGA0L7Qu9GMISc7XG4gICAgICAgICAgICB0aGlzLnBhc3N3b3JkRXJyb3IuaGlkZGVuID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2Zvcm0uZWxlbWVudHMucGFzc3dvcmQudmFsdWUubGVuZ3RoIDwgOCkge1xuICAgICAgICAgICAgdGhpcy5wYXNzd29yZEVycm9yLmlubmVySFRNTCA9ICfQn9Cw0YDQvtC70Ywg0L3Rg9C20LXQvSDQtNC70LjQvdC90LXQtSA4INGB0LjQvNCy0L7Qu9C+0LIgPSgnO1xuICAgICAgICAgICAgdGhpcy5wYXNzd29yZEVycm9yLmhpZGRlbiA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9mb3JtLmVsZW1lbnRzLnBhc3N3b3JkMi52YWx1ZS5sZW5ndGggPiAwXG4gICAgICAgICAgICAmJiB0aGlzLl9mb3JtLmVsZW1lbnRzLnBhc3N3b3JkLnZhbHVlICE9IHRoaXMuX2Zvcm0uZWxlbWVudHMucGFzc3dvcmQyLnZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl9mb3JtLmNoaWxkcmVuLnBhc3N3b3JkRXJyb3IuaW5uZXJIVE1MID0gJ9Cf0LDRgNC+0LvQuCDQvdC1INGB0L7QstC/0LDQtNCw0Y7RgiEnO1xuICAgICAgICAgICAgdGhpcy5wYXNzd29yZEVycm9yLmhpZGRlbiA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucGFzc3dvcmRFcnJvci5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgdGhpcy5wYXNzd29yZEVycm9yLmhpZGRlbiA9IHRydWU7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHZhbGlkYXRlTG9naW4oKSB7XG4gICAgICAgIGlmICh0aGlzLl9mb3JtLmVsZW1lbnRzLmxvZ2luLnZhbHVlLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICAgIHRoaXMubG9naW5FcnJvci5pbm5lckhUTUwgPSAn0J/QvtC20LDQu9GD0LnRgdGC0LAsINCy0LLQtdC00LjRgtC1INC60LvQuNC60YPRhdGDISc7XG4gICAgICAgICAgICB0aGlzLmxvZ2luRXJyb3Iuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5sb2dpbkVycm9yLmhpZGRlbiA9IHRydWU7XG4gICAgICAgIHRoaXMubG9naW5FcnJvci5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgdmFsaWRhdGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRlRW1haWwodGhpcykgJiYgdGhpcy52YWxpZGF0ZVBhc3N3b3JkKHRoaXMpICYmIHRoaXMudmFsaWRhdGVMb2dpbih0aGlzKTtcbiAgICB9XG5cbiAgICByZWdpc3RlcigpIHtcbiAgICAgICAgaWYgKCF0aGlzLnZhbGlkYXRlKCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB1c2VyID0gbmV3IFVzZXJNb2RlbCh7XG4gICAgICAgICAgICB1c2VybmFtZTogdGhpcy5fZm9ybS5lbGVtZW50cy5sb2dpbi52YWx1ZSxcbiAgICAgICAgICAgIGVtYWlsOiB0aGlzLl9mb3JtLmVsZW1lbnRzLmVtYWlsLnZhbHVlLFxuICAgICAgICAgICAgcGFzc3dvcmQ6IHRoaXMuX2Zvcm0uZWxlbWVudHMucGFzc3dvcmQudmFsdWUsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gdXNlci5zYXZlKCk7XG4gICAgICAgIHRoaXMuX2Zvcm0uY2hpbGRyZW4uZW1haWxFcnJvci50ZXh0Q29udGVudCA9IHVzZXIuZ2V0RW1haWxFcnJvcigpO1xuICAgICAgICB0aGlzLl9mb3JtLmNoaWxkcmVuLnBhc3N3b3JkRXJyb3IudGV4dENvbnRlbnQgPSB1c2VyLmdldFBhc3N3b3JkRXJyb3IoKTtcbiAgICAgICAgdGhpcy5fZm9ybS5jaGlsZHJlbi5sb2dpbkVycm9yLnRleHRDb250ZW50ID0gdXNlci5nZXRMb2dpbkVycm9yKCk7XG4gICAgICAgIHRoaXMuX2Zvcm0uY2hpbGRyZW4uZW1haWxFcnJvci5oaWRkZW4gPSB0aGlzLl9mb3JtLmNoaWxkcmVuLmVtYWlsRXJyb3IudGV4dENvbnRlbnQgPyBmYWxzZSA6IHRydWU7XG4gICAgICAgIHRoaXMuX2Zvcm0uY2hpbGRyZW4ubG9naW5FcnJvci5oaWRkZW4gPSB0aGlzLl9mb3JtLmNoaWxkcmVuLmxvZ2luRXJyb3IudGV4dENvbnRlbnQgPyBmYWxzZSA6IHRydWU7XG4gICAgICAgIHRoaXMuX2Zvcm0uY2hpbGRyZW4ucGFzc3dvcmRFcnJvci5oaWRkZW4gPSB0aGlzLl9mb3JtLmNoaWxkcmVuLnBhc3N3b3JkRXJyb3IudGV4dENvbnRlbnQgPyBmYWxzZSA6IHRydWU7XG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgICAgICAgdGhpcy5yb3V0ZXIuZ28oJy9yb29tcycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3NvbWUgc2VydmVyIG1hZ2ljIGVycm9yJyk7XG4gICAgICAgICAgICB0aGlzLl9mb3JtLmNoaWxkcmVuLmVtYWlsRXJyb3IudGV4dENvbnRlbnQgPSB1c2VyLmdldEVtYWlsRXJyb3IoKTtcbiAgICAgICAgICAgIHRoaXMuX2Zvcm0uY2hpbGRyZW4uZW1haWxFcnJvci50ZXh0Q29udGVudCA9ICfQotC+INC70LggZS1tYWlsLCDRgtC+INC70Lgg0L/QsNGA0L7Qu9GMINC90LUg0L/QvtC00YXQvtC00Y/Rgi4g0K8g0YLQsNC6INC4INC90LUg0L/QvtC90Y/QuyDQu9C+0LPQuNC60YMg0YHQtdGA0LLQsNC60LAnO1xuICAgICAgICAgICAgdGhpcy5fZm9ybS5jaGlsZHJlbi5lbWFpbEVycm9yLmhpZGRlbiA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcHVibGljL2pzL3ZpZXdzL3JlZ2lzdHJhdGlvblZpZXcuanMiLCIvLyBUT0RPOiB1c2VyIGlkIGZyb20gY29va2llIHRvIGRyb25lIG1vZGVsXG5pbXBvcnQgVmlldyBmcm9tICcuLi9tb2R1bGVzL3ZpZXcnO1xuaW1wb3J0IFJvb21Db2xsZWN0aW9uIGZyb20gJy4uL2NvbGxlY3Rpb25zL1Jvb21Db2xsZWN0aW9uJztcbmltcG9ydCBEcm9uZU1vZGVsIGZyb20gJy4uL21vZGVscy9Ecm9uZU1vZGVsJztcbmltcG9ydCB0ZW1wbGF0ZSBmcm9tICcuLi8uLi90ZW1wbGF0ZXMvcm9vbXMudG1wbC54bWwnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb29tc1ZpZXcgZXh0ZW5kcyBWaWV3IHtcbiAgICBjb25zdHJ1Y3RvciAoZGF0YSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKHsgZWxlbWVudDogJy5qcy1yb29tcycsIGJvZHlDbGFzczogJ2JvZHktcm9vbXMnIH0pO1xuICAgICAgICB0aGlzLnJvb21Db2xsZWN0aW9uID0gbmV3IFJvb21Db2xsZWN0aW9uKCk7XG4gICAgICAgIHRoaXMuZHJvbmUgPSBuZXcgRHJvbmVNb2RlbCgpO1xuICAgICAgICB0aGlzLnNlbGVjdGVkUm9vbSA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICByZW5kZXIgKCkge1xuICAgICAgICB0aGlzLnJvb21Db2xsZWN0aW9uLmZldGNoKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9lbC5pbm5lckhUTUwgPSB0ZW1wbGF0ZSh0aGlzLnJvb21Db2xsZWN0aW9uLmdldENvbGxlY3Rpb24oKSk7XG5cbiAgICAgICAgICAgIHRoaXMuZXJyb3IgPSB0aGlzLl9lbC5xdWVyeVNlbGVjdG9yKCcuanMtZXJyb3InKTtcbiAgICBcbiAgICAgICAgICAgIHRoaXMucm9vbXMgPSB0aGlzLl9lbC5xdWVyeVNlbGVjdG9yQWxsKCcucm9vbXNfX3Jvb20nKTtcbiAgICAgICAgICAgIGZvciAoY29uc3Qgcm9vbSBvZiB0aGlzLnJvb21zKSB7XG4gICAgICAgICAgICAgICAgcm9vbS5vbmNsaWNrID0gKGZ1bmN0aW9uICgpIHsgdGhpcy5zZWxlY3RSb29tKHJvb20sIHJvb20ubmV4dFNpYmxpbmcpIH0pLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICB0aGlzLmNvbG9ycyA9IHRoaXMuX2VsLnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy1jb2xvcicpO1xuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5jb2xvcnMpO1xuICAgICAgICAgICAgZm9yIChjb25zdCBjb2xvciBvZiB0aGlzLmNvbG9ycykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGNvbG9yKTtcbiAgICAgICAgICAgICAgICBjb2xvci5vbmNsaWNrID0gKGZ1bmN0aW9uICgpIHsgY29uc29sZS5sb2coJ2VudGVyZWQgY29sb3IgY2xpY2snKTsgdGhpcy5zZWxlY3RDb2xvcihjb2xvcikgfSkuYmluZCh0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdiZWZvcmUgam9pbicpO1xuICAgIFxuICAgICAgICAgICAgdGhpcy5fam9pbiA9IHRoaXMuX2VsLnF1ZXJ5U2VsZWN0b3IoJy5qcy1qb2luJyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmpvaW4pO1xuICAgICAgICAgICAgdGhpcy5fam9pbi5vbmNsaWNrID0gKGZ1bmN0aW9uICgpIHsgdGhpcy5qb2luKCk7IH0pLmJpbmQodGhpcyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZmluYWwnKTtcblxuICAgICAgICAgICAgdGhpcy5fZWwucXVlcnlTZWxlY3RvcignLmpzLWNyZWF0ZScpLm9uY2xpY2sgPSAoZnVuY3Rpb24gKCkgeyB0aGlzLnJvdXRlci5nbygnL3Njb3JlYm9hcmQnKTsgfSkuYmluZCh0aGlzKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2VsZWN0Um9vbSAocm9vbSwgZGV0YWlscykge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucm9vbXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnJvb21zW2ldICE9PSByb29tKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yb29tc1tpXS5oaWRkZW4gPSB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkUm9vbSA9IHRoaXMucm9vbUNvbGxlY3Rpb24uZ2V0Q29sbGVjdGlvbigpW2ldLmlkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGRldGFpbHMuaGlkZGVuID0gZmFsc2U7XG4gICAgfVxuXG4gICAgc2VsZWN0Q29sb3IoY29sb3IpIHtcbiAgICAgICAgZm9yIChjb25zdCBjIG9mIHRoaXMuY29sb3JzKSB7XG4gICAgICAgICAgICBpZiAoYyA9PT0gY29sb3IpIHtcbiAgICAgICAgICAgICAgICBjLmNsYXNzTGlzdC5hZGQoJ3Jvb21zX19kZXRhaWxzX19jb2xvcnNfX2NvbG9yLWNsaWNrZWQnKTtcbiAgICAgICAgICAgICAgICBjLmNsYXNzTGlzdC5yZW1vdmUoJ3Jvb21zX19kZXRhaWxzX19jb2xvcnNfX2NvbG9yJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGMuY2xhc3NMaXN0LmFkZCgncm9vbXNfX2RldGFpbHNfX2NvbG9yc19fY29sb3InKTtcbiAgICAgICAgICAgICAgICBjLmNsYXNzTGlzdC5yZW1vdmUoJ3Jvb21zX19kZXRhaWxzX19jb2xvcnNfX2NvbG9yLWNsaWNrZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRyb25lLmNvbG9yID0gY29sb3Iuc3R5bGVbJ2JhY2tncm91bmQtY29sb3InXTtcbiAgICAgICAgdGhpcy5lcnJvci50ZXh0Q29udGVudCA9ICcnO1xuICAgICAgICB0aGlzLmVycm9yLmhpZGRlbiA9IHRydWU7XG4gICAgfVxuXG4gICAgam9pbigpIHtcbiAgICAgICAgaWYgKHRoaXMuZHJvbmUuY29sb3IgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5lcnJvci50ZXh0Q29udGVudCA9ICcnO1xuICAgICAgICAgICAgdGhpcy5lcnJvci5oaWRkZW4gPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5kcm9uZS5zYXZlKHRoaXMuc2VsZWN0ZWRSb29tKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kcm9uZS5lcnJvciAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lcnJvci50ZXh0Q29udGVudCA9ICfQp9GC0L4t0YLQviDQv9C+0YjQu9C+INC90LUg0YLQsNC6LiDQn9C+0L/RgNC+0LHRg9C50YLQtSDQtdGJ0LUg0YDQsNC3ISc7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXJyb3IuaGlkZGVuID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLmdvKCcvZ2FtZScpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmVycm9yLnRleHRDb250ZW50ID0gJ9CS0YvQsdC10YDQuNGC0LUg0YbQstC10YIg0LTRgNC+0L3QsCEnO1xuICAgICAgICAgICAgdGhpcy5lcnJvci5oaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJhY2sgKGRldGFpbHMpIHtcbiAgICAgICAgZGV0YWlscy5oaWRkZW4gPSB0cnVlO1xuICAgICAgICBmb3IgKGNvbnN0IHIgb2YgdGhpcy5yb29tcykge1xuICAgICAgICAgICAgci5oaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNlbGVjdGVkUm9vbSA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3B1YmxpYy9qcy92aWV3cy9yb29tc1ZpZXcuanMiLCJpbXBvcnQgVmlldyBmcm9tICcuLi9tb2R1bGVzL3ZpZXcnO1xuaW1wb3J0IFVzZXJDb2xsZWN0aW9uIGZyb20gJy4uL2NvbGxlY3Rpb25zL1VzZXJDb2xsZWN0aW9uJztcbmltcG9ydCB0ZW1wbGF0ZSBmcm9tICcuLi8uLi90ZW1wbGF0ZXMvc2NvcmVib2FyZC50bXBsLnhtbCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjb3JlYm9hcmRWaWV3IGV4dGVuZHMgVmlldyB7XG4gICAgY29uc3RydWN0b3IgKG9wdGlvbnMgPSB7fSkge1xuICAgICAgICBzdXBlcih7IGVsZW1lbnQ6ICcuanMtc2NvcmVib2FyZCcgfSk7XG4gICAgICAgIHRoaXMudXNlckNvbGxlY3Rpb24gPSBuZXcgVXNlckNvbGxlY3Rpb24oKTtcbiAgICB9XG5cbiAgICByZXN1bWUob3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIHRoaXMuc2hvdygpO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgdGhpcy51c2VyQ29sbGVjdGlvbi5mZXRjaCgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2dvdCBoZXJlJyk7XG4gICAgICAgICAgICB0aGlzLl9lbC5pbm5lckhUTUwgPSB0ZW1wbGF0ZSh0aGlzLnVzZXJDb2xsZWN0aW9uLmdldENvbGxlY3Rpb24oKSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNob3cob3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIHN1cGVyLnNob3coKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdib2R5LXNjb3JlYm9hcmQnKTtcbiAgICB9XG5cbiAgICBoaWRlKG9wdGlvbnMgPSB7fSkge1xuICAgICAgICBzdXBlci5oaWRlKCk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnYm9keS1zY29yZWJvYXJkJyk7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcHVibGljL2pzL3ZpZXdzL3Njb3JlYm9hcmRWaWV3LmpzIiwiXG4vKiogXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiAvaG9tZS9pdmFuL0RvY3VtZW50cy8yMDE2XzJfQWlyRHJvbmUvcHVibGljL3RlbXBsYXRlcy9nYW1lLnRtcGwgdGVtcGxhdGVcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChfX2Zlc3RfY29udGV4dCl7XCJ1c2Ugc3RyaWN0XCI7dmFyIF9fZmVzdF9zZWxmPXRoaXMsX19mZXN0X2J1Zj1cIlwiLF9fZmVzdF9jaHVua3M9W10sX19mZXN0X2NodW5rLF9fZmVzdF9hdHRycz1bXSxfX2Zlc3Rfc2VsZWN0LF9fZmVzdF9pZixfX2Zlc3RfaXRlcmF0b3IsX19mZXN0X3RvLF9fZmVzdF9mbixfX2Zlc3RfaHRtbD1cIlwiLF9fZmVzdF9ibG9ja3M9e30sX19mZXN0X3BhcmFtcyxfX2Zlc3RfZWxlbWVudCxfX2Zlc3RfZGVidWdfZmlsZT1cIlwiLF9fZmVzdF9kZWJ1Z19saW5lPVwiXCIsX19mZXN0X2RlYnVnX2Jsb2NrPVwiXCIsX19mZXN0X2VsZW1lbnRfc3RhY2sgPSBbXSxfX2Zlc3Rfc2hvcnRfdGFncyA9IHtcImFyZWFcIjogdHJ1ZSwgXCJiYXNlXCI6IHRydWUsIFwiYnJcIjogdHJ1ZSwgXCJjb2xcIjogdHJ1ZSwgXCJjb21tYW5kXCI6IHRydWUsIFwiZW1iZWRcIjogdHJ1ZSwgXCJoclwiOiB0cnVlLCBcImltZ1wiOiB0cnVlLCBcImlucHV0XCI6IHRydWUsIFwia2V5Z2VuXCI6IHRydWUsIFwibGlua1wiOiB0cnVlLCBcIm1ldGFcIjogdHJ1ZSwgXCJwYXJhbVwiOiB0cnVlLCBcInNvdXJjZVwiOiB0cnVlLCBcIndiclwiOiB0cnVlfSxfX2Zlc3RfanNjaGFycyA9IC9bXFxcXCdcIlxcL1xcblxcclxcdFxcYlxcZjw+XS9nLF9fZmVzdF9qc2NoYXJzX3Rlc3QgPSAvW1xcXFwnXCJcXC9cXG5cXHJcXHRcXGJcXGY8Pl0vLF9fZmVzdF9odG1sY2hhcnMgPSAvWyY8PlwiXS9nLF9fZmVzdF9odG1sY2hhcnNfdGVzdCA9IC9bJjw+XCJdLyxfX2Zlc3RfanNoYXNoID0ge1wiXFxcIlwiOiBcIlxcXFxcXFwiXCIsIFwiXFxcXFwiOiBcIlxcXFxcXFxcXCIsIFwiL1wiOiBcIlxcXFwvXCIsIFwiXFxuXCI6IFwiXFxcXG5cIiwgXCJcXHJcIjogXCJcXFxcclwiLCBcIlxcdFwiOiBcIlxcXFx0XCIsIFwiXFxiXCI6IFwiXFxcXGJcIiwgXCJcXGZcIjogXCJcXFxcZlwiLCBcIidcIjogXCJcXFxcJ1wiLCBcIjxcIjogXCJcXFxcdTAwM0NcIiwgXCI+XCI6IFwiXFxcXHUwMDNFXCJ9LF9fZmVzdF9odG1saGFzaCA9IHtcIiZcIjogXCImYW1wO1wiLCBcIjxcIjogXCImbHQ7XCIsIFwiPlwiOiBcIiZndDtcIiwgXCJcXFwiXCI6IFwiJnF1b3Q7XCJ9LF9fZmVzdF9lc2NhcGVKUyA9IGZ1bmN0aW9uIF9fZmVzdF9lc2NhcGVKUyh2YWx1ZSkge1xuXHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRpZiAoX19mZXN0X2pzY2hhcnNfdGVzdC50ZXN0KHZhbHVlKSkge1xuXHRcdFx0XHRyZXR1cm4gdmFsdWUucmVwbGFjZShfX2Zlc3RfanNjaGFycywgX19mZXN0X3JlcGxhY2VKUyk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHZhbHVlID09IG51bGwgPyAnJyA6IHZhbHVlO1xuXHR9LF9fZmVzdF9yZXBsYWNlSlMgPSBmdW5jdGlvbiBfX2Zlc3RfcmVwbGFjZUpTKGNocikge1xuXHRcdHJldHVybiBfX2Zlc3RfanNoYXNoW2Nocl07XG5cdH0sX19mZXN0X2VzY2FwZUhUTUwgPSBmdW5jdGlvbiBfX2Zlc3RfZXNjYXBlSFRNTCh2YWx1ZSkge1xuXHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRpZiAoX19mZXN0X2h0bWxjaGFyc190ZXN0LnRlc3QodmFsdWUpKSB7XG5cdFx0XHRcdHJldHVybiB2YWx1ZS5yZXBsYWNlKF9fZmVzdF9odG1sY2hhcnMsIF9fZmVzdF9yZXBsYWNlSFRNTCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHZhbHVlID09IG51bGwgPyAnJyA6IHZhbHVlO1xuXHR9LF9fZmVzdF9yZXBsYWNlSFRNTCA9IGZ1bmN0aW9uIF9fZmVzdF9yZXBsYWNlSFRNTChjaHIpIHtcblx0XHRyZXR1cm4gX19mZXN0X2h0bWxoYXNoW2Nocl07XG5cdH0sX19mZXN0X2V4dGVuZCA9IGZ1bmN0aW9uIF9fZmVzdF9leHRlbmQoZGVzdCwgc3JjKSB7XG5cdFx0Zm9yICh2YXIga2V5IGluIHNyYykge1xuXHRcdFx0aWYgKHNyYy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRcdGRlc3Rba2V5XSA9IHNyY1trZXldO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxfX2Zlc3RfcGFyYW0gPSBmdW5jdGlvbiBfX2Zlc3RfcGFyYW0oZm4pIHtcblx0XHRmbi5wYXJhbSA9IHRydWU7XG5cdFx0cmV0dXJuIGZuO1xuXHR9LGkxOG49X19mZXN0X3NlbGYgJiYgdHlwZW9mIF9fZmVzdF9zZWxmLmkxOG4gPT09IFwiZnVuY3Rpb25cIiA/IF9fZmVzdF9zZWxmLmkxOG4gOiBmdW5jdGlvbiAoc3RyKSB7cmV0dXJuIHN0cjt9LF9fX2Zlc3RfbG9nX2Vycm9yO2lmKHR5cGVvZiBfX2Zlc3RfZXJyb3IgPT09IFwidW5kZWZpbmVkXCIpe19fX2Zlc3RfbG9nX2Vycm9yID0gKHR5cGVvZiBjb25zb2xlICE9PSBcInVuZGVmaW5lZFwiICYmIGNvbnNvbGUuZXJyb3IpID8gZnVuY3Rpb24oKXtyZXR1cm4gRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5LmNhbGwoY29uc29sZS5lcnJvciwgY29uc29sZSwgYXJndW1lbnRzKX0gOiBmdW5jdGlvbigpe307fWVsc2V7X19fZmVzdF9sb2dfZXJyb3I9X19mZXN0X2Vycm9yfTtmdW5jdGlvbiBfX2Zlc3RfbG9nX2Vycm9yKG1zZyl7X19fZmVzdF9sb2dfZXJyb3IobXNnK1wiXFxuaW4gYmxvY2sgXFxcIlwiK19fZmVzdF9kZWJ1Z19ibG9jaytcIlxcXCIgYXQgbGluZTogXCIrX19mZXN0X2RlYnVnX2xpbmUrXCJcXG5maWxlOiBcIitfX2Zlc3RfZGVidWdfZmlsZSl9ZnVuY3Rpb24gX19mZXN0X2NhbGwoZm4sIHBhcmFtcyxjcCl7aWYoY3ApZm9yKHZhciBpIGluIHBhcmFtcylpZih0eXBlb2YgcGFyYW1zW2ldPT1cImZ1bmN0aW9uXCImJnBhcmFtc1tpXS5wYXJhbSlwYXJhbXNbaV09cGFyYW1zW2ldKCk7cmV0dXJuIGZuLmNhbGwoX19mZXN0X3NlbGYscGFyYW1zKX12YXIganNvbj1fX2Zlc3RfY29udGV4dDtfX2Zlc3RfYnVmKz0oXCI8aW1nIGNsYXNzPVxcXCJnYW1lX192aWRlb1xcXCIgc3JjPVxcXCJcIik7dHJ5e19fZmVzdF9idWYrPShfX2Zlc3RfZXNjYXBlSFRNTChqc29uLnNvdXJjZSkpfWNhdGNoKGUpe19fZmVzdF9sb2dfZXJyb3IoZS5tZXNzYWdlICsgXCIzXCIpO31fX2Zlc3RfYnVmKz0oXCJcXFwiLz48Y2FudmFzIGNsYXNzPVxcXCJnYW1lX19jYW52YXNcXFwiPtCS0LDRiCDQsdGA0LDRg9C30LXRgCDQvNC+0YDQsNC70YzQvdC+INGD0YHRgtCw0YDQtdC7LiDQntCx0L3QvtCy0LjRgtC1LiDQkdGL0YHRgtGA0L4uPC9jYW52YXM+XCIpO19fZmVzdF90bz1fX2Zlc3RfY2h1bmtzLmxlbmd0aDtpZiAoX19mZXN0X3RvKSB7X19mZXN0X2l0ZXJhdG9yID0gMDtmb3IgKDtfX2Zlc3RfaXRlcmF0b3I8X19mZXN0X3RvO19fZmVzdF9pdGVyYXRvcisrKSB7X19mZXN0X2NodW5rPV9fZmVzdF9jaHVua3NbX19mZXN0X2l0ZXJhdG9yXTtpZiAodHlwZW9mIF9fZmVzdF9jaHVuaz09PVwic3RyaW5nXCIpIHtfX2Zlc3RfaHRtbCs9X19mZXN0X2NodW5rO30gZWxzZSB7X19mZXN0X2ZuPV9fZmVzdF9ibG9ja3NbX19mZXN0X2NodW5rLm5hbWVdO2lmIChfX2Zlc3RfZm4pIF9fZmVzdF9odG1sKz1fX2Zlc3RfY2FsbChfX2Zlc3RfZm4sX19mZXN0X2NodW5rLnBhcmFtcyxfX2Zlc3RfY2h1bmsuY3ApO319cmV0dXJuIF9fZmVzdF9odG1sK19fZmVzdF9idWY7fSBlbHNlIHtyZXR1cm4gX19mZXN0X2J1Zjt9fVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcHVibGljL3RlbXBsYXRlcy9nYW1lLnRtcGwueG1sXG4vLyBtb2R1bGUgaWQgPSAxMjVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXG4vKiogXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiAvaG9tZS9pdmFuL0RvY3VtZW50cy8yMDE2XzJfQWlyRHJvbmUvcHVibGljL3RlbXBsYXRlcy9sb2dpbi50bXBsIHRlbXBsYXRlXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoX19mZXN0X2NvbnRleHQpe1widXNlIHN0cmljdFwiO3ZhciBfX2Zlc3Rfc2VsZj10aGlzLF9fZmVzdF9idWY9XCJcIixfX2Zlc3RfY2h1bmtzPVtdLF9fZmVzdF9jaHVuayxfX2Zlc3RfYXR0cnM9W10sX19mZXN0X3NlbGVjdCxfX2Zlc3RfaWYsX19mZXN0X2l0ZXJhdG9yLF9fZmVzdF90byxfX2Zlc3RfZm4sX19mZXN0X2h0bWw9XCJcIixfX2Zlc3RfYmxvY2tzPXt9LF9fZmVzdF9wYXJhbXMsX19mZXN0X2VsZW1lbnQsX19mZXN0X2RlYnVnX2ZpbGU9XCJcIixfX2Zlc3RfZGVidWdfbGluZT1cIlwiLF9fZmVzdF9kZWJ1Z19ibG9jaz1cIlwiLF9fZmVzdF9lbGVtZW50X3N0YWNrID0gW10sX19mZXN0X3Nob3J0X3RhZ3MgPSB7XCJhcmVhXCI6IHRydWUsIFwiYmFzZVwiOiB0cnVlLCBcImJyXCI6IHRydWUsIFwiY29sXCI6IHRydWUsIFwiY29tbWFuZFwiOiB0cnVlLCBcImVtYmVkXCI6IHRydWUsIFwiaHJcIjogdHJ1ZSwgXCJpbWdcIjogdHJ1ZSwgXCJpbnB1dFwiOiB0cnVlLCBcImtleWdlblwiOiB0cnVlLCBcImxpbmtcIjogdHJ1ZSwgXCJtZXRhXCI6IHRydWUsIFwicGFyYW1cIjogdHJ1ZSwgXCJzb3VyY2VcIjogdHJ1ZSwgXCJ3YnJcIjogdHJ1ZX0sX19mZXN0X2pzY2hhcnMgPSAvW1xcXFwnXCJcXC9cXG5cXHJcXHRcXGJcXGY8Pl0vZyxfX2Zlc3RfanNjaGFyc190ZXN0ID0gL1tcXFxcJ1wiXFwvXFxuXFxyXFx0XFxiXFxmPD5dLyxfX2Zlc3RfaHRtbGNoYXJzID0gL1smPD5cIl0vZyxfX2Zlc3RfaHRtbGNoYXJzX3Rlc3QgPSAvWyY8PlwiXS8sX19mZXN0X2pzaGFzaCA9IHtcIlxcXCJcIjogXCJcXFxcXFxcIlwiLCBcIlxcXFxcIjogXCJcXFxcXFxcXFwiLCBcIi9cIjogXCJcXFxcL1wiLCBcIlxcblwiOiBcIlxcXFxuXCIsIFwiXFxyXCI6IFwiXFxcXHJcIiwgXCJcXHRcIjogXCJcXFxcdFwiLCBcIlxcYlwiOiBcIlxcXFxiXCIsIFwiXFxmXCI6IFwiXFxcXGZcIiwgXCInXCI6IFwiXFxcXCdcIiwgXCI8XCI6IFwiXFxcXHUwMDNDXCIsIFwiPlwiOiBcIlxcXFx1MDAzRVwifSxfX2Zlc3RfaHRtbGhhc2ggPSB7XCImXCI6IFwiJmFtcDtcIiwgXCI8XCI6IFwiJmx0O1wiLCBcIj5cIjogXCImZ3Q7XCIsIFwiXFxcIlwiOiBcIiZxdW90O1wifSxfX2Zlc3RfZXNjYXBlSlMgPSBmdW5jdGlvbiBfX2Zlc3RfZXNjYXBlSlModmFsdWUpIHtcblx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuXHRcdFx0aWYgKF9fZmVzdF9qc2NoYXJzX3Rlc3QudGVzdCh2YWx1ZSkpIHtcblx0XHRcdFx0cmV0dXJuIHZhbHVlLnJlcGxhY2UoX19mZXN0X2pzY2hhcnMsIF9fZmVzdF9yZXBsYWNlSlMpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiB2YWx1ZTtcblx0fSxfX2Zlc3RfcmVwbGFjZUpTID0gZnVuY3Rpb24gX19mZXN0X3JlcGxhY2VKUyhjaHIpIHtcblx0XHRyZXR1cm4gX19mZXN0X2pzaGFzaFtjaHJdO1xuXHR9LF9fZmVzdF9lc2NhcGVIVE1MID0gZnVuY3Rpb24gX19mZXN0X2VzY2FwZUhUTUwodmFsdWUpIHtcblx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuXHRcdFx0aWYgKF9fZmVzdF9odG1sY2hhcnNfdGVzdC50ZXN0KHZhbHVlKSkge1xuXHRcdFx0XHRyZXR1cm4gdmFsdWUucmVwbGFjZShfX2Zlc3RfaHRtbGNoYXJzLCBfX2Zlc3RfcmVwbGFjZUhUTUwpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiB2YWx1ZTtcblx0fSxfX2Zlc3RfcmVwbGFjZUhUTUwgPSBmdW5jdGlvbiBfX2Zlc3RfcmVwbGFjZUhUTUwoY2hyKSB7XG5cdFx0cmV0dXJuIF9fZmVzdF9odG1saGFzaFtjaHJdO1xuXHR9LF9fZmVzdF9leHRlbmQgPSBmdW5jdGlvbiBfX2Zlc3RfZXh0ZW5kKGRlc3QsIHNyYykge1xuXHRcdGZvciAodmFyIGtleSBpbiBzcmMpIHtcblx0XHRcdGlmIChzcmMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRkZXN0W2tleV0gPSBzcmNba2V5XTtcblx0XHRcdH1cblx0XHR9XG5cdH0sX19mZXN0X3BhcmFtID0gZnVuY3Rpb24gX19mZXN0X3BhcmFtKGZuKSB7XG5cdFx0Zm4ucGFyYW0gPSB0cnVlO1xuXHRcdHJldHVybiBmbjtcblx0fSxpMThuPV9fZmVzdF9zZWxmICYmIHR5cGVvZiBfX2Zlc3Rfc2VsZi5pMThuID09PSBcImZ1bmN0aW9uXCIgPyBfX2Zlc3Rfc2VsZi5pMThuIDogZnVuY3Rpb24gKHN0cikge3JldHVybiBzdHI7fSxfX19mZXN0X2xvZ19lcnJvcjtpZih0eXBlb2YgX19mZXN0X2Vycm9yID09PSBcInVuZGVmaW5lZFwiKXtfX19mZXN0X2xvZ19lcnJvciA9ICh0eXBlb2YgY29uc29sZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBjb25zb2xlLmVycm9yKSA/IGZ1bmN0aW9uKCl7cmV0dXJuIEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseS5jYWxsKGNvbnNvbGUuZXJyb3IsIGNvbnNvbGUsIGFyZ3VtZW50cyl9IDogZnVuY3Rpb24oKXt9O31lbHNle19fX2Zlc3RfbG9nX2Vycm9yPV9fZmVzdF9lcnJvcn07ZnVuY3Rpb24gX19mZXN0X2xvZ19lcnJvcihtc2cpe19fX2Zlc3RfbG9nX2Vycm9yKG1zZytcIlxcbmluIGJsb2NrIFxcXCJcIitfX2Zlc3RfZGVidWdfYmxvY2srXCJcXFwiIGF0IGxpbmU6IFwiK19fZmVzdF9kZWJ1Z19saW5lK1wiXFxuZmlsZTogXCIrX19mZXN0X2RlYnVnX2ZpbGUpfWZ1bmN0aW9uIF9fZmVzdF9jYWxsKGZuLCBwYXJhbXMsY3Ape2lmKGNwKWZvcih2YXIgaSBpbiBwYXJhbXMpaWYodHlwZW9mIHBhcmFtc1tpXT09XCJmdW5jdGlvblwiJiZwYXJhbXNbaV0ucGFyYW0pcGFyYW1zW2ldPXBhcmFtc1tpXSgpO3JldHVybiBmbi5jYWxsKF9fZmVzdF9zZWxmLHBhcmFtcyl9dmFyIGpzb249X19mZXN0X2NvbnRleHQ7X19mZXN0X2J1Zis9KFwiPGZvcm0gY2xhc3M9XFxcImpzLWxvZ2luLWZvcm0gbG9naW5fX2Zvcm1cXFwiIG5hbWU9XFxcImxvZ2luRm9ybVxcXCI+PGgxIGNsYXNzPVxcXCJsb2dpbl9faGVhZGVyXFxcIj7QktGF0L7QtDwvaDE+PHNwYW4gY2xhc3M9XFxcImpzLWVtYWlsLWVycm9yIGxvZ2luX19mb3JtX19lcnJvclxcXCIgbmFtZT1cXFwiZW1haWxFcnJvclxcXCIgaGlkZGVuPVxcXCJoaWRkZW5cXFwiPjwvc3Bhbj48aW5wdXQgcGxhY2Vob2xkZXI9XFxcIkUtbWFpbFxcXCIgY2xhc3M9XFxcImpzLWVtYWlsIGxvZ2luX19mb3JtX19pbnB1dFxcXCIgbmFtZT1cXFwiZW1haWxcXFwiIHR5cGU9XFxcInRleHRcXFwiLz48c3BhbiBjbGFzcz1cXFwianMtcGFzc3dvcmQtZXJyb3IgbG9naW5fX2Zvcm1fX2Vycm9yXFxcIiBuYW1lPVxcXCJwYXNzd29yZEVycm9yXFxcIiBoaWRkZW49XFxcImhpZGRlblxcXCI+PC9zcGFuPjxpbnB1dCBwbGFjZWhvbGRlcj1cXFwiUGFzc3dvcmRcXFwiIGNsYXNzPVxcXCJqcy1wYXNzd29yZCBsb2dpbl9fZm9ybV9faW5wdXRcXFwiIG5hbWU9XFxcInBhc3N3b3JkXFxcIiB0eXBlPVxcXCJwYXNzd29yZFxcXCIvPjxidXR0b24gY2xhc3M9XFxcImpzX3N1Ym1pdCBsb2dpbl9fZm9ybV9fYnV0dG9uXFxcIiBuYW1lPVxcXCJidXR0b25cXFwiPtCS0L7QudGC0LghPC9idXR0b24+PGEgY2xhc3M9XFxcImxvZ2luX19mb3JtX19saW5rXFxcIiBuYW1lPVxcXCJyZWdpc3RyYXRpb25cXFwiPtCg0LXQs9C40YHRgtGA0LDRhtC40Y88L2E+PC9mb3JtPlwiKTtfX2Zlc3RfdG89X19mZXN0X2NodW5rcy5sZW5ndGg7aWYgKF9fZmVzdF90bykge19fZmVzdF9pdGVyYXRvciA9IDA7Zm9yICg7X19mZXN0X2l0ZXJhdG9yPF9fZmVzdF90bztfX2Zlc3RfaXRlcmF0b3IrKykge19fZmVzdF9jaHVuaz1fX2Zlc3RfY2h1bmtzW19fZmVzdF9pdGVyYXRvcl07aWYgKHR5cGVvZiBfX2Zlc3RfY2h1bms9PT1cInN0cmluZ1wiKSB7X19mZXN0X2h0bWwrPV9fZmVzdF9jaHVuazt9IGVsc2Uge19fZmVzdF9mbj1fX2Zlc3RfYmxvY2tzW19fZmVzdF9jaHVuay5uYW1lXTtpZiAoX19mZXN0X2ZuKSBfX2Zlc3RfaHRtbCs9X19mZXN0X2NhbGwoX19mZXN0X2ZuLF9fZmVzdF9jaHVuay5wYXJhbXMsX19mZXN0X2NodW5rLmNwKTt9fXJldHVybiBfX2Zlc3RfaHRtbCtfX2Zlc3RfYnVmO30gZWxzZSB7cmV0dXJuIF9fZmVzdF9idWY7fX1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3B1YmxpYy90ZW1wbGF0ZXMvbG9naW4udG1wbC54bWxcbi8vIG1vZHVsZSBpZCA9IDEyNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcbi8qKiBcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIC9ob21lL2l2YW4vRG9jdW1lbnRzLzIwMTZfMl9BaXJEcm9uZS9wdWJsaWMvdGVtcGxhdGVzL3JlZ2lzdHJhdGlvbi50bXBsIHRlbXBsYXRlXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoX19mZXN0X2NvbnRleHQpe1widXNlIHN0cmljdFwiO3ZhciBfX2Zlc3Rfc2VsZj10aGlzLF9fZmVzdF9idWY9XCJcIixfX2Zlc3RfY2h1bmtzPVtdLF9fZmVzdF9jaHVuayxfX2Zlc3RfYXR0cnM9W10sX19mZXN0X3NlbGVjdCxfX2Zlc3RfaWYsX19mZXN0X2l0ZXJhdG9yLF9fZmVzdF90byxfX2Zlc3RfZm4sX19mZXN0X2h0bWw9XCJcIixfX2Zlc3RfYmxvY2tzPXt9LF9fZmVzdF9wYXJhbXMsX19mZXN0X2VsZW1lbnQsX19mZXN0X2RlYnVnX2ZpbGU9XCJcIixfX2Zlc3RfZGVidWdfbGluZT1cIlwiLF9fZmVzdF9kZWJ1Z19ibG9jaz1cIlwiLF9fZmVzdF9lbGVtZW50X3N0YWNrID0gW10sX19mZXN0X3Nob3J0X3RhZ3MgPSB7XCJhcmVhXCI6IHRydWUsIFwiYmFzZVwiOiB0cnVlLCBcImJyXCI6IHRydWUsIFwiY29sXCI6IHRydWUsIFwiY29tbWFuZFwiOiB0cnVlLCBcImVtYmVkXCI6IHRydWUsIFwiaHJcIjogdHJ1ZSwgXCJpbWdcIjogdHJ1ZSwgXCJpbnB1dFwiOiB0cnVlLCBcImtleWdlblwiOiB0cnVlLCBcImxpbmtcIjogdHJ1ZSwgXCJtZXRhXCI6IHRydWUsIFwicGFyYW1cIjogdHJ1ZSwgXCJzb3VyY2VcIjogdHJ1ZSwgXCJ3YnJcIjogdHJ1ZX0sX19mZXN0X2pzY2hhcnMgPSAvW1xcXFwnXCJcXC9cXG5cXHJcXHRcXGJcXGY8Pl0vZyxfX2Zlc3RfanNjaGFyc190ZXN0ID0gL1tcXFxcJ1wiXFwvXFxuXFxyXFx0XFxiXFxmPD5dLyxfX2Zlc3RfaHRtbGNoYXJzID0gL1smPD5cIl0vZyxfX2Zlc3RfaHRtbGNoYXJzX3Rlc3QgPSAvWyY8PlwiXS8sX19mZXN0X2pzaGFzaCA9IHtcIlxcXCJcIjogXCJcXFxcXFxcIlwiLCBcIlxcXFxcIjogXCJcXFxcXFxcXFwiLCBcIi9cIjogXCJcXFxcL1wiLCBcIlxcblwiOiBcIlxcXFxuXCIsIFwiXFxyXCI6IFwiXFxcXHJcIiwgXCJcXHRcIjogXCJcXFxcdFwiLCBcIlxcYlwiOiBcIlxcXFxiXCIsIFwiXFxmXCI6IFwiXFxcXGZcIiwgXCInXCI6IFwiXFxcXCdcIiwgXCI8XCI6IFwiXFxcXHUwMDNDXCIsIFwiPlwiOiBcIlxcXFx1MDAzRVwifSxfX2Zlc3RfaHRtbGhhc2ggPSB7XCImXCI6IFwiJmFtcDtcIiwgXCI8XCI6IFwiJmx0O1wiLCBcIj5cIjogXCImZ3Q7XCIsIFwiXFxcIlwiOiBcIiZxdW90O1wifSxfX2Zlc3RfZXNjYXBlSlMgPSBmdW5jdGlvbiBfX2Zlc3RfZXNjYXBlSlModmFsdWUpIHtcblx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuXHRcdFx0aWYgKF9fZmVzdF9qc2NoYXJzX3Rlc3QudGVzdCh2YWx1ZSkpIHtcblx0XHRcdFx0cmV0dXJuIHZhbHVlLnJlcGxhY2UoX19mZXN0X2pzY2hhcnMsIF9fZmVzdF9yZXBsYWNlSlMpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiB2YWx1ZTtcblx0fSxfX2Zlc3RfcmVwbGFjZUpTID0gZnVuY3Rpb24gX19mZXN0X3JlcGxhY2VKUyhjaHIpIHtcblx0XHRyZXR1cm4gX19mZXN0X2pzaGFzaFtjaHJdO1xuXHR9LF9fZmVzdF9lc2NhcGVIVE1MID0gZnVuY3Rpb24gX19mZXN0X2VzY2FwZUhUTUwodmFsdWUpIHtcblx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuXHRcdFx0aWYgKF9fZmVzdF9odG1sY2hhcnNfdGVzdC50ZXN0KHZhbHVlKSkge1xuXHRcdFx0XHRyZXR1cm4gdmFsdWUucmVwbGFjZShfX2Zlc3RfaHRtbGNoYXJzLCBfX2Zlc3RfcmVwbGFjZUhUTUwpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiB2YWx1ZTtcblx0fSxfX2Zlc3RfcmVwbGFjZUhUTUwgPSBmdW5jdGlvbiBfX2Zlc3RfcmVwbGFjZUhUTUwoY2hyKSB7XG5cdFx0cmV0dXJuIF9fZmVzdF9odG1saGFzaFtjaHJdO1xuXHR9LF9fZmVzdF9leHRlbmQgPSBmdW5jdGlvbiBfX2Zlc3RfZXh0ZW5kKGRlc3QsIHNyYykge1xuXHRcdGZvciAodmFyIGtleSBpbiBzcmMpIHtcblx0XHRcdGlmIChzcmMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRkZXN0W2tleV0gPSBzcmNba2V5XTtcblx0XHRcdH1cblx0XHR9XG5cdH0sX19mZXN0X3BhcmFtID0gZnVuY3Rpb24gX19mZXN0X3BhcmFtKGZuKSB7XG5cdFx0Zm4ucGFyYW0gPSB0cnVlO1xuXHRcdHJldHVybiBmbjtcblx0fSxpMThuPV9fZmVzdF9zZWxmICYmIHR5cGVvZiBfX2Zlc3Rfc2VsZi5pMThuID09PSBcImZ1bmN0aW9uXCIgPyBfX2Zlc3Rfc2VsZi5pMThuIDogZnVuY3Rpb24gKHN0cikge3JldHVybiBzdHI7fSxfX19mZXN0X2xvZ19lcnJvcjtpZih0eXBlb2YgX19mZXN0X2Vycm9yID09PSBcInVuZGVmaW5lZFwiKXtfX19mZXN0X2xvZ19lcnJvciA9ICh0eXBlb2YgY29uc29sZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBjb25zb2xlLmVycm9yKSA/IGZ1bmN0aW9uKCl7cmV0dXJuIEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseS5jYWxsKGNvbnNvbGUuZXJyb3IsIGNvbnNvbGUsIGFyZ3VtZW50cyl9IDogZnVuY3Rpb24oKXt9O31lbHNle19fX2Zlc3RfbG9nX2Vycm9yPV9fZmVzdF9lcnJvcn07ZnVuY3Rpb24gX19mZXN0X2xvZ19lcnJvcihtc2cpe19fX2Zlc3RfbG9nX2Vycm9yKG1zZytcIlxcbmluIGJsb2NrIFxcXCJcIitfX2Zlc3RfZGVidWdfYmxvY2srXCJcXFwiIGF0IGxpbmU6IFwiK19fZmVzdF9kZWJ1Z19saW5lK1wiXFxuZmlsZTogXCIrX19mZXN0X2RlYnVnX2ZpbGUpfWZ1bmN0aW9uIF9fZmVzdF9jYWxsKGZuLCBwYXJhbXMsY3Ape2lmKGNwKWZvcih2YXIgaSBpbiBwYXJhbXMpaWYodHlwZW9mIHBhcmFtc1tpXT09XCJmdW5jdGlvblwiJiZwYXJhbXNbaV0ucGFyYW0pcGFyYW1zW2ldPXBhcmFtc1tpXSgpO3JldHVybiBmbi5jYWxsKF9fZmVzdF9zZWxmLHBhcmFtcyl9dmFyIGpzb249X19mZXN0X2NvbnRleHQ7X19mZXN0X2J1Zis9KFwiPGZvcm0gY2xhc3M9XFxcImpzLXJlZ2lzdHJhdGlvbi1mb3JtIHJlZ2lzdHJhdGlvbl9fZm9ybVxcXCI+PGgxIGNsYXNzPVxcXCJyZWdpc3RyYXRpb25fX2hlYWRlclxcXCI+0J/QvtC30L3QsNC60L7QvNC40LzRgdGPPzwvaDE+PHNwYW4gY2xhc3M9XFxcImpzLWVtYWlsLWVycm9yIHJlZ2lzdHJhdGlvbl9fZm9ybV9fZXJyb3JcXFwiIG5hbWU9XFxcImVtYWlsRXJyb3JcXFwiIGhpZGRlbj1cXFwiaGlkZGVuXFxcIj48L3NwYW4+PGlucHV0IHBsYWNlaG9sZGVyPVxcXCJFLW1haWxcXFwiIGNsYXNzPVxcXCJqcy1lbWFpbCByZWdpc3RyYXRpb25fX2Zvcm1fX2lucHV0XFxcIiBuYW1lPVxcXCJlbWFpbFxcXCIgdHlwZT1cXFwidGV4dFxcXCIvPjxzcGFuIGNsYXNzPVxcXCJqcy1wYXNzd29yZC1lcnJvciByZWdpc3RyYXRpb25fX2Zvcm1fX2Vycm9yXFxcIiBuYW1lPVxcXCJwYXNzd29yZEVycm9yXFxcIiBoaWRkZW49XFxcImhpZGRlblxcXCI+PC9zcGFuPjxpbnB1dCBwbGFjZWhvbGRlcj1cXFwiUGFzc3dvcmRcXFwiIGNsYXNzPVxcXCJqcy1wYXNzd29yZCByZWdpc3RyYXRpb25fX2Zvcm1fX2lucHV0XFxcIiBuYW1lPVxcXCJwYXNzd29yZFxcXCIgdHlwZT1cXFwicGFzc3dvcmRcXFwiLz48aW5wdXQgcGxhY2Vob2xkZXI9XFxcIkNvbmZpcm0gcGFzc3dvcmRcXFwiIGNsYXNzPVxcXCJqcy1wYXNzd29yZDIgcmVnaXN0cmF0aW9uX19mb3JtX19pbnB1dFxcXCIgbmFtZT1cXFwicGFzc3dvcmQyXFxcIiB0eXBlPVxcXCJwYXNzd29yZFxcXCIvPjxzcGFuIGNsYXNzPVxcXCJqcy1sb2dpbi1lcnJvciByZWdpc3RyYXRpb25fX2Zvcm1fX2Vycm9yXFxcIiBuYW1lPVxcXCJsb2dpbkVycm9yXFxcIiBoaWRkZW49XFxcImhpZGRlblxcXCI+PC9zcGFuPjxpbnB1dCBwbGFjZWhvbGRlcj1cXFwi0JrQu9C40LrRg9GF0LBcXFwiIGNsYXNzPVxcXCJqcy1sb2dpbiByZWdpc3RyYXRpb25fX2Zvcm1fX2lucHV0XFxcIiBuYW1lPVxcXCJsb2dpblxcXCIgdHlwZT1cXFwidGV4dFxcXCIvPjxidXR0b24gY2xhc3M9XFxcImpzLXN1Ym1pdCByZWdpc3RyYXRpb25fX2Zvcm1fX2J1dHRvblxcXCIgbmFtZT1cXFwiYnV0dG9uXFxcIj7Ql9Cw0YDQtdCz0LjRgdGC0YDQuNGA0L7QstCw0YLRjNGB0Y8hPC9idXR0b24+PC9mb3JtPlwiKTtfX2Zlc3RfdG89X19mZXN0X2NodW5rcy5sZW5ndGg7aWYgKF9fZmVzdF90bykge19fZmVzdF9pdGVyYXRvciA9IDA7Zm9yICg7X19mZXN0X2l0ZXJhdG9yPF9fZmVzdF90bztfX2Zlc3RfaXRlcmF0b3IrKykge19fZmVzdF9jaHVuaz1fX2Zlc3RfY2h1bmtzW19fZmVzdF9pdGVyYXRvcl07aWYgKHR5cGVvZiBfX2Zlc3RfY2h1bms9PT1cInN0cmluZ1wiKSB7X19mZXN0X2h0bWwrPV9fZmVzdF9jaHVuazt9IGVsc2Uge19fZmVzdF9mbj1fX2Zlc3RfYmxvY2tzW19fZmVzdF9jaHVuay5uYW1lXTtpZiAoX19mZXN0X2ZuKSBfX2Zlc3RfaHRtbCs9X19mZXN0X2NhbGwoX19mZXN0X2ZuLF9fZmVzdF9jaHVuay5wYXJhbXMsX19mZXN0X2NodW5rLmNwKTt9fXJldHVybiBfX2Zlc3RfaHRtbCtfX2Zlc3RfYnVmO30gZWxzZSB7cmV0dXJuIF9fZmVzdF9idWY7fX1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3B1YmxpYy90ZW1wbGF0ZXMvcmVnaXN0cmF0aW9uLnRtcGwueG1sXG4vLyBtb2R1bGUgaWQgPSAxMjdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXG4vKiogXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiAvaG9tZS9pdmFuL0RvY3VtZW50cy8yMDE2XzJfQWlyRHJvbmUvcHVibGljL3RlbXBsYXRlcy9yb29tcy50bXBsIHRlbXBsYXRlXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoX19mZXN0X2NvbnRleHQpe1widXNlIHN0cmljdFwiO3ZhciBfX2Zlc3Rfc2VsZj10aGlzLF9fZmVzdF9idWY9XCJcIixfX2Zlc3RfY2h1bmtzPVtdLF9fZmVzdF9jaHVuayxfX2Zlc3RfYXR0cnM9W10sX19mZXN0X3NlbGVjdCxfX2Zlc3RfaWYsX19mZXN0X2l0ZXJhdG9yLF9fZmVzdF90byxfX2Zlc3RfZm4sX19mZXN0X2h0bWw9XCJcIixfX2Zlc3RfYmxvY2tzPXt9LF9fZmVzdF9wYXJhbXMsX19mZXN0X2VsZW1lbnQsX19mZXN0X2RlYnVnX2ZpbGU9XCJcIixfX2Zlc3RfZGVidWdfbGluZT1cIlwiLF9fZmVzdF9kZWJ1Z19ibG9jaz1cIlwiLF9fZmVzdF9lbGVtZW50X3N0YWNrID0gW10sX19mZXN0X3Nob3J0X3RhZ3MgPSB7XCJhcmVhXCI6IHRydWUsIFwiYmFzZVwiOiB0cnVlLCBcImJyXCI6IHRydWUsIFwiY29sXCI6IHRydWUsIFwiY29tbWFuZFwiOiB0cnVlLCBcImVtYmVkXCI6IHRydWUsIFwiaHJcIjogdHJ1ZSwgXCJpbWdcIjogdHJ1ZSwgXCJpbnB1dFwiOiB0cnVlLCBcImtleWdlblwiOiB0cnVlLCBcImxpbmtcIjogdHJ1ZSwgXCJtZXRhXCI6IHRydWUsIFwicGFyYW1cIjogdHJ1ZSwgXCJzb3VyY2VcIjogdHJ1ZSwgXCJ3YnJcIjogdHJ1ZX0sX19mZXN0X2pzY2hhcnMgPSAvW1xcXFwnXCJcXC9cXG5cXHJcXHRcXGJcXGY8Pl0vZyxfX2Zlc3RfanNjaGFyc190ZXN0ID0gL1tcXFxcJ1wiXFwvXFxuXFxyXFx0XFxiXFxmPD5dLyxfX2Zlc3RfaHRtbGNoYXJzID0gL1smPD5cIl0vZyxfX2Zlc3RfaHRtbGNoYXJzX3Rlc3QgPSAvWyY8PlwiXS8sX19mZXN0X2pzaGFzaCA9IHtcIlxcXCJcIjogXCJcXFxcXFxcIlwiLCBcIlxcXFxcIjogXCJcXFxcXFxcXFwiLCBcIi9cIjogXCJcXFxcL1wiLCBcIlxcblwiOiBcIlxcXFxuXCIsIFwiXFxyXCI6IFwiXFxcXHJcIiwgXCJcXHRcIjogXCJcXFxcdFwiLCBcIlxcYlwiOiBcIlxcXFxiXCIsIFwiXFxmXCI6IFwiXFxcXGZcIiwgXCInXCI6IFwiXFxcXCdcIiwgXCI8XCI6IFwiXFxcXHUwMDNDXCIsIFwiPlwiOiBcIlxcXFx1MDAzRVwifSxfX2Zlc3RfaHRtbGhhc2ggPSB7XCImXCI6IFwiJmFtcDtcIiwgXCI8XCI6IFwiJmx0O1wiLCBcIj5cIjogXCImZ3Q7XCIsIFwiXFxcIlwiOiBcIiZxdW90O1wifSxfX2Zlc3RfZXNjYXBlSlMgPSBmdW5jdGlvbiBfX2Zlc3RfZXNjYXBlSlModmFsdWUpIHtcblx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuXHRcdFx0aWYgKF9fZmVzdF9qc2NoYXJzX3Rlc3QudGVzdCh2YWx1ZSkpIHtcblx0XHRcdFx0cmV0dXJuIHZhbHVlLnJlcGxhY2UoX19mZXN0X2pzY2hhcnMsIF9fZmVzdF9yZXBsYWNlSlMpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiB2YWx1ZTtcblx0fSxfX2Zlc3RfcmVwbGFjZUpTID0gZnVuY3Rpb24gX19mZXN0X3JlcGxhY2VKUyhjaHIpIHtcblx0XHRyZXR1cm4gX19mZXN0X2pzaGFzaFtjaHJdO1xuXHR9LF9fZmVzdF9lc2NhcGVIVE1MID0gZnVuY3Rpb24gX19mZXN0X2VzY2FwZUhUTUwodmFsdWUpIHtcblx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuXHRcdFx0aWYgKF9fZmVzdF9odG1sY2hhcnNfdGVzdC50ZXN0KHZhbHVlKSkge1xuXHRcdFx0XHRyZXR1cm4gdmFsdWUucmVwbGFjZShfX2Zlc3RfaHRtbGNoYXJzLCBfX2Zlc3RfcmVwbGFjZUhUTUwpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiB2YWx1ZTtcblx0fSxfX2Zlc3RfcmVwbGFjZUhUTUwgPSBmdW5jdGlvbiBfX2Zlc3RfcmVwbGFjZUhUTUwoY2hyKSB7XG5cdFx0cmV0dXJuIF9fZmVzdF9odG1saGFzaFtjaHJdO1xuXHR9LF9fZmVzdF9leHRlbmQgPSBmdW5jdGlvbiBfX2Zlc3RfZXh0ZW5kKGRlc3QsIHNyYykge1xuXHRcdGZvciAodmFyIGtleSBpbiBzcmMpIHtcblx0XHRcdGlmIChzcmMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRkZXN0W2tleV0gPSBzcmNba2V5XTtcblx0XHRcdH1cblx0XHR9XG5cdH0sX19mZXN0X3BhcmFtID0gZnVuY3Rpb24gX19mZXN0X3BhcmFtKGZuKSB7XG5cdFx0Zm4ucGFyYW0gPSB0cnVlO1xuXHRcdHJldHVybiBmbjtcblx0fSxpMThuPV9fZmVzdF9zZWxmICYmIHR5cGVvZiBfX2Zlc3Rfc2VsZi5pMThuID09PSBcImZ1bmN0aW9uXCIgPyBfX2Zlc3Rfc2VsZi5pMThuIDogZnVuY3Rpb24gKHN0cikge3JldHVybiBzdHI7fSxfX19mZXN0X2xvZ19lcnJvcjtpZih0eXBlb2YgX19mZXN0X2Vycm9yID09PSBcInVuZGVmaW5lZFwiKXtfX19mZXN0X2xvZ19lcnJvciA9ICh0eXBlb2YgY29uc29sZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBjb25zb2xlLmVycm9yKSA/IGZ1bmN0aW9uKCl7cmV0dXJuIEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseS5jYWxsKGNvbnNvbGUuZXJyb3IsIGNvbnNvbGUsIGFyZ3VtZW50cyl9IDogZnVuY3Rpb24oKXt9O31lbHNle19fX2Zlc3RfbG9nX2Vycm9yPV9fZmVzdF9lcnJvcn07ZnVuY3Rpb24gX19mZXN0X2xvZ19lcnJvcihtc2cpe19fX2Zlc3RfbG9nX2Vycm9yKG1zZytcIlxcbmluIGJsb2NrIFxcXCJcIitfX2Zlc3RfZGVidWdfYmxvY2srXCJcXFwiIGF0IGxpbmU6IFwiK19fZmVzdF9kZWJ1Z19saW5lK1wiXFxuZmlsZTogXCIrX19mZXN0X2RlYnVnX2ZpbGUpfWZ1bmN0aW9uIF9fZmVzdF9jYWxsKGZuLCBwYXJhbXMsY3Ape2lmKGNwKWZvcih2YXIgaSBpbiBwYXJhbXMpaWYodHlwZW9mIHBhcmFtc1tpXT09XCJmdW5jdGlvblwiJiZwYXJhbXNbaV0ucGFyYW0pcGFyYW1zW2ldPXBhcmFtc1tpXSgpO3JldHVybiBmbi5jYWxsKF9fZmVzdF9zZWxmLHBhcmFtcyl9dmFyIGpzb249X19mZXN0X2NvbnRleHQ7X19mZXN0X2J1Zis9KFwiPGgxIGNsYXNzPVxcXCJyb29tc19faGVhZGVyXFxcIj7QktGL0LHQtdGA0LjRgtC1INC40LPRgNGDPC9oMT5cIik7dmFyIGkscm9vbSxfX2Zlc3RfaXRlcmF0b3IwO3RyeXtfX2Zlc3RfaXRlcmF0b3IwPWpzb24gfHwge307fWNhdGNoKGUpe19fZmVzdF9pdGVyYXRvcj17fTtfX2Zlc3RfbG9nX2Vycm9yKGUubWVzc2FnZSk7fWZvcihpIGluIF9fZmVzdF9pdGVyYXRvcjApe3Jvb209X19mZXN0X2l0ZXJhdG9yMFtpXTtfX2Zlc3RfYnVmKz0oXCI8ZGl2IGNsYXNzPVxcXCJyb29tc19fcm9vbVxcXCI+PGgyIGNsYXNzPVxcXCJyb29tc19fcm9vbV9faGVhZGVyXFxcIj5cIik7dHJ5e19fZmVzdF9idWYrPShfX2Zlc3RfZXNjYXBlSFRNTChyb29tLm5hbWUpKX1jYXRjaChlKXtfX2Zlc3RfbG9nX2Vycm9yKGUubWVzc2FnZSArIFwiNFwiKTt9X19mZXN0X2J1Zis9KFwiIChcIik7dHJ5e19fZmVzdF9idWYrPShfX2Zlc3RfZXNjYXBlSFRNTChyb29tLmlwKSl9Y2F0Y2goZSl7X19mZXN0X2xvZ19lcnJvcihlLm1lc3NhZ2UgKyBcIjRcIik7fV9fZmVzdF9idWYrPShcIik8L2gyPjwvZGl2PjxkaXYgY2xhc3M9XFxcInJvb21zX19kZXRhaWxzXFxcIiBoaWRkZW49XFxcImhpZGRlblxcXCI+PGgxIGNsYXNzPVxcXCJyb29tc19fZGV0YWlsc19faGVhZGVyXFxcIj7QktGL0LHQtdGA0LjRgtC1INC60LLQsNC00YDQvtC60L7Qv9GC0LXRgDo8L2gxPjxkaXYgY2xhc3M9XFxcInJvb21zX19kZXRhaWxzX19jb2xvcnNcXFwiPlwiKTt2YXIgaSxjb2xvcixfX2Zlc3RfaXRlcmF0b3IxO3RyeXtfX2Zlc3RfaXRlcmF0b3IxPXJvb20uYXZhaWxhYmxlQ29sb3JzIHx8IHt9O31jYXRjaChlKXtfX2Zlc3RfaXRlcmF0b3I9e307X19mZXN0X2xvZ19lcnJvcihlLm1lc3NhZ2UpO31mb3IoaSBpbiBfX2Zlc3RfaXRlcmF0b3IxKXtjb2xvcj1fX2Zlc3RfaXRlcmF0b3IxW2ldO19fZmVzdF9idWYrPShcIjxpbnB1dCBjbGFzcz1cXFwicm9vbXNfX2RldGFpbHNfX2NvbG9yc19fY29sb3IganMtY29sb3JcXFwiIHN0eWxlPVxcXCJiYWNrZ3JvdW5kLWNvbG9yOlwiKTt0cnl7X19mZXN0X2J1Zis9KF9fZmVzdF9lc2NhcGVIVE1MKGNvbG9yKSl9Y2F0Y2goZSl7X19mZXN0X2xvZ19lcnJvcihlLm1lc3NhZ2UgKyBcIjEyXCIpO31fX2Zlc3RfYnVmKz0oXCI7IGNvbG9yOlwiKTt0cnl7X19mZXN0X2J1Zis9KF9fZmVzdF9lc2NhcGVIVE1MKGNvbG9yKSl9Y2F0Y2goZSl7X19mZXN0X2xvZ19lcnJvcihlLm1lc3NhZ2UgKyBcIjEyXCIpO31fX2Zlc3RfYnVmKz0oXCI7XFxcIi8+XCIpO31fX2Zlc3RfYnVmKz0oXCI8L2Rpdj48cCBjbGFzcz1cXFwianMtZXJyb3Igcm9vbXNfX2RldGFpbHNfX2Vycm9yXFxcIiBoaWRkZW49XFxcImhpZGRlblxcXCI+PC9wPjxidXR0b24gY2xhc3M9XFxcInJvb21zX19kZXRhaWxzX19qb2luIGpzLWpvaW5cXFwiPtCf0YDQuNGB0L7QtdC00LjQvdC40YLRjNGB0Y8hPC9idXR0b24+PGhyLz48aDEgY2xhc3M9XFxcInJvb21zX19kZXRhaWxzX19oZWFkZXJcXFwiPtCj0LbQtSDQsiDQuNCz0YDQtTo8L2gxPjx0YWJsZSBjbGFzcz1cXFwicm9vbXNfX2RldGFpbHNfX3VsXFxcIj48dWw+XCIpO3ZhciBpLGRyb25lLF9fZmVzdF9pdGVyYXRvcjI7dHJ5e19fZmVzdF9pdGVyYXRvcjI9cm9vbS5kcm9uZXMgfHwge307fWNhdGNoKGUpe19fZmVzdF9pdGVyYXRvcj17fTtfX2Zlc3RfbG9nX2Vycm9yKGUubWVzc2FnZSk7fWZvcihpIGluIF9fZmVzdF9pdGVyYXRvcjIpe2Ryb25lPV9fZmVzdF9pdGVyYXRvcjJbaV07X19mZXN0X2J1Zis9KFwiPHRyIGNsYXNzPVxcXCJyb29tX19kZXRhaWxzX191bF9fbGlcXFwiPjx0ZD48bGk+XCIpO3RyeXtfX2Zlc3RfYnVmKz0oX19mZXN0X2VzY2FwZUhUTUwoZHJvbmUucGxheWVyTG9naW4pKX1jYXRjaChlKXtfX2Zlc3RfbG9nX2Vycm9yKGUubWVzc2FnZSArIFwiMjdcIik7fV9fZmVzdF9idWYrPShcIjwvbGk+PC90ZD48dGQ+PGlucHV0IHR5cGU9XFxcInRleHRcXFwiIGNsYXNzPVxcXCJyb29tc19fZGV0YWlsc19fdWxfX2xpX19jb2xvclxcXCIgZGlzYWJsZWQ9XFxcImRpc2FibGVkXFxcIiBzdHlsZT1cXFwiYmFja2dyb3VuZC1jb2xvcjpcIik7dHJ5e19fZmVzdF9idWYrPShfX2Zlc3RfZXNjYXBlSFRNTChkcm9uZS5jb2xvcikpfWNhdGNoKGUpe19fZmVzdF9sb2dfZXJyb3IoZS5tZXNzYWdlICsgXCIzM1wiKTt9X19mZXN0X2J1Zis9KFwiO1xcXCIvPjwvdGQ+PC90cj5cIik7fV9fZmVzdF9idWYrPShcIjwvdWw+PC90YWJsZT48L2Rpdj5cIik7fV9fZmVzdF9idWYrPShcIjxoci8+PGJ1dHRvbiBjbGFzcz1cXFwianMtY3JlYXRlIHJvb21zX19jcmVhdGVcXFwiPtCb0LjQtNC10YDRizwvYnV0dG9uPlwiKTtfX2Zlc3RfdG89X19mZXN0X2NodW5rcy5sZW5ndGg7aWYgKF9fZmVzdF90bykge19fZmVzdF9pdGVyYXRvciA9IDA7Zm9yICg7X19mZXN0X2l0ZXJhdG9yPF9fZmVzdF90bztfX2Zlc3RfaXRlcmF0b3IrKykge19fZmVzdF9jaHVuaz1fX2Zlc3RfY2h1bmtzW19fZmVzdF9pdGVyYXRvcl07aWYgKHR5cGVvZiBfX2Zlc3RfY2h1bms9PT1cInN0cmluZ1wiKSB7X19mZXN0X2h0bWwrPV9fZmVzdF9jaHVuazt9IGVsc2Uge19fZmVzdF9mbj1fX2Zlc3RfYmxvY2tzW19fZmVzdF9jaHVuay5uYW1lXTtpZiAoX19mZXN0X2ZuKSBfX2Zlc3RfaHRtbCs9X19mZXN0X2NhbGwoX19mZXN0X2ZuLF9fZmVzdF9jaHVuay5wYXJhbXMsX19mZXN0X2NodW5rLmNwKTt9fXJldHVybiBfX2Zlc3RfaHRtbCtfX2Zlc3RfYnVmO30gZWxzZSB7cmV0dXJuIF9fZmVzdF9idWY7fX1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3B1YmxpYy90ZW1wbGF0ZXMvcm9vbXMudG1wbC54bWxcbi8vIG1vZHVsZSBpZCA9IDEyOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcbi8qKiBcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIC9ob21lL2l2YW4vRG9jdW1lbnRzLzIwMTZfMl9BaXJEcm9uZS9wdWJsaWMvdGVtcGxhdGVzL3Njb3JlYm9hcmQudG1wbCB0ZW1wbGF0ZVxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKF9fZmVzdF9jb250ZXh0KXtcInVzZSBzdHJpY3RcIjt2YXIgX19mZXN0X3NlbGY9dGhpcyxfX2Zlc3RfYnVmPVwiXCIsX19mZXN0X2NodW5rcz1bXSxfX2Zlc3RfY2h1bmssX19mZXN0X2F0dHJzPVtdLF9fZmVzdF9zZWxlY3QsX19mZXN0X2lmLF9fZmVzdF9pdGVyYXRvcixfX2Zlc3RfdG8sX19mZXN0X2ZuLF9fZmVzdF9odG1sPVwiXCIsX19mZXN0X2Jsb2Nrcz17fSxfX2Zlc3RfcGFyYW1zLF9fZmVzdF9lbGVtZW50LF9fZmVzdF9kZWJ1Z19maWxlPVwiXCIsX19mZXN0X2RlYnVnX2xpbmU9XCJcIixfX2Zlc3RfZGVidWdfYmxvY2s9XCJcIixfX2Zlc3RfZWxlbWVudF9zdGFjayA9IFtdLF9fZmVzdF9zaG9ydF90YWdzID0ge1wiYXJlYVwiOiB0cnVlLCBcImJhc2VcIjogdHJ1ZSwgXCJiclwiOiB0cnVlLCBcImNvbFwiOiB0cnVlLCBcImNvbW1hbmRcIjogdHJ1ZSwgXCJlbWJlZFwiOiB0cnVlLCBcImhyXCI6IHRydWUsIFwiaW1nXCI6IHRydWUsIFwiaW5wdXRcIjogdHJ1ZSwgXCJrZXlnZW5cIjogdHJ1ZSwgXCJsaW5rXCI6IHRydWUsIFwibWV0YVwiOiB0cnVlLCBcInBhcmFtXCI6IHRydWUsIFwic291cmNlXCI6IHRydWUsIFwid2JyXCI6IHRydWV9LF9fZmVzdF9qc2NoYXJzID0gL1tcXFxcJ1wiXFwvXFxuXFxyXFx0XFxiXFxmPD5dL2csX19mZXN0X2pzY2hhcnNfdGVzdCA9IC9bXFxcXCdcIlxcL1xcblxcclxcdFxcYlxcZjw+XS8sX19mZXN0X2h0bWxjaGFycyA9IC9bJjw+XCJdL2csX19mZXN0X2h0bWxjaGFyc190ZXN0ID0gL1smPD5cIl0vLF9fZmVzdF9qc2hhc2ggPSB7XCJcXFwiXCI6IFwiXFxcXFxcXCJcIiwgXCJcXFxcXCI6IFwiXFxcXFxcXFxcIiwgXCIvXCI6IFwiXFxcXC9cIiwgXCJcXG5cIjogXCJcXFxcblwiLCBcIlxcclwiOiBcIlxcXFxyXCIsIFwiXFx0XCI6IFwiXFxcXHRcIiwgXCJcXGJcIjogXCJcXFxcYlwiLCBcIlxcZlwiOiBcIlxcXFxmXCIsIFwiJ1wiOiBcIlxcXFwnXCIsIFwiPFwiOiBcIlxcXFx1MDAzQ1wiLCBcIj5cIjogXCJcXFxcdTAwM0VcIn0sX19mZXN0X2h0bWxoYXNoID0ge1wiJlwiOiBcIiZhbXA7XCIsIFwiPFwiOiBcIiZsdDtcIiwgXCI+XCI6IFwiJmd0O1wiLCBcIlxcXCJcIjogXCImcXVvdDtcIn0sX19mZXN0X2VzY2FwZUpTID0gZnVuY3Rpb24gX19mZXN0X2VzY2FwZUpTKHZhbHVlKSB7XG5cdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdGlmIChfX2Zlc3RfanNjaGFyc190ZXN0LnRlc3QodmFsdWUpKSB7XG5cdFx0XHRcdHJldHVybiB2YWx1ZS5yZXBsYWNlKF9fZmVzdF9qc2NoYXJzLCBfX2Zlc3RfcmVwbGFjZUpTKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gdmFsdWUgPT0gbnVsbCA/ICcnIDogdmFsdWU7XG5cdH0sX19mZXN0X3JlcGxhY2VKUyA9IGZ1bmN0aW9uIF9fZmVzdF9yZXBsYWNlSlMoY2hyKSB7XG5cdFx0cmV0dXJuIF9fZmVzdF9qc2hhc2hbY2hyXTtcblx0fSxfX2Zlc3RfZXNjYXBlSFRNTCA9IGZ1bmN0aW9uIF9fZmVzdF9lc2NhcGVIVE1MKHZhbHVlKSB7XG5cdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdGlmIChfX2Zlc3RfaHRtbGNoYXJzX3Rlc3QudGVzdCh2YWx1ZSkpIHtcblx0XHRcdFx0cmV0dXJuIHZhbHVlLnJlcGxhY2UoX19mZXN0X2h0bWxjaGFycywgX19mZXN0X3JlcGxhY2VIVE1MKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gdmFsdWUgPT0gbnVsbCA/ICcnIDogdmFsdWU7XG5cdH0sX19mZXN0X3JlcGxhY2VIVE1MID0gZnVuY3Rpb24gX19mZXN0X3JlcGxhY2VIVE1MKGNocikge1xuXHRcdHJldHVybiBfX2Zlc3RfaHRtbGhhc2hbY2hyXTtcblx0fSxfX2Zlc3RfZXh0ZW5kID0gZnVuY3Rpb24gX19mZXN0X2V4dGVuZChkZXN0LCBzcmMpIHtcblx0XHRmb3IgKHZhciBrZXkgaW4gc3JjKSB7XG5cdFx0XHRpZiAoc3JjLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdFx0ZGVzdFtrZXldID0gc3JjW2tleV07XG5cdFx0XHR9XG5cdFx0fVxuXHR9LF9fZmVzdF9wYXJhbSA9IGZ1bmN0aW9uIF9fZmVzdF9wYXJhbShmbikge1xuXHRcdGZuLnBhcmFtID0gdHJ1ZTtcblx0XHRyZXR1cm4gZm47XG5cdH0saTE4bj1fX2Zlc3Rfc2VsZiAmJiB0eXBlb2YgX19mZXN0X3NlbGYuaTE4biA9PT0gXCJmdW5jdGlvblwiID8gX19mZXN0X3NlbGYuaTE4biA6IGZ1bmN0aW9uIChzdHIpIHtyZXR1cm4gc3RyO30sX19fZmVzdF9sb2dfZXJyb3I7aWYodHlwZW9mIF9fZmVzdF9lcnJvciA9PT0gXCJ1bmRlZmluZWRcIil7X19fZmVzdF9sb2dfZXJyb3IgPSAodHlwZW9mIGNvbnNvbGUgIT09IFwidW5kZWZpbmVkXCIgJiYgY29uc29sZS5lcnJvcikgPyBmdW5jdGlvbigpe3JldHVybiBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHkuY2FsbChjb25zb2xlLmVycm9yLCBjb25zb2xlLCBhcmd1bWVudHMpfSA6IGZ1bmN0aW9uKCl7fTt9ZWxzZXtfX19mZXN0X2xvZ19lcnJvcj1fX2Zlc3RfZXJyb3J9O2Z1bmN0aW9uIF9fZmVzdF9sb2dfZXJyb3IobXNnKXtfX19mZXN0X2xvZ19lcnJvcihtc2crXCJcXG5pbiBibG9jayBcXFwiXCIrX19mZXN0X2RlYnVnX2Jsb2NrK1wiXFxcIiBhdCBsaW5lOiBcIitfX2Zlc3RfZGVidWdfbGluZStcIlxcbmZpbGU6IFwiK19fZmVzdF9kZWJ1Z19maWxlKX1mdW5jdGlvbiBfX2Zlc3RfY2FsbChmbiwgcGFyYW1zLGNwKXtpZihjcClmb3IodmFyIGkgaW4gcGFyYW1zKWlmKHR5cGVvZiBwYXJhbXNbaV09PVwiZnVuY3Rpb25cIiYmcGFyYW1zW2ldLnBhcmFtKXBhcmFtc1tpXT1wYXJhbXNbaV0oKTtyZXR1cm4gZm4uY2FsbChfX2Zlc3Rfc2VsZixwYXJhbXMpfXZhciBqc29uPV9fZmVzdF9jb250ZXh0O19fZmVzdF9idWYrPShcIjxoMSBjbGFzcz1cXFwic2NvcmVib2FyZF9faGVhZGVyXFxcIj7Qm9C40LTQtdGA0Ys8L2gxPjx0YWJsZSBjbGFzcz1cXFwic2NvcmVib2FyZF9fdGFibGVcXFwiPjx0ciBjbGFzcz1cXFwic2NvcmVib2FyZF9fdGFibGVfX3RyXFxcIj48dGQgY2xhc3M9XFxcInNjb3JlYm9hcmRfX3RhYmxlX190cl9fdGRcXFwiPiM8L3RkPjx0ZCBjbGFzcz1cXFwic2NvcmVib2FyZF9fdGFibGVfX3RyX190ZFxcXCI+0JjQvNGPPC90ZD48dGQgY2xhc3M9XFxcInNjb3JlYm9hcmRfX3RhYmxlX190cl9fdGRcXFwiPtCa0L7Qu9C40YfQtdGB0YLQstC+INCx0L7QtdCyPC90ZD48dGQgY2xhc3M9XFxcInNjb3JlYm9hcmRfX3RhYmxlX190cl9fdGRcXFwiPtCf0YDQvtGG0LXQvdGCINC/0L7QsdC10LQ8L3RkPjwvdHI+XCIpO3ZhciBpLGRhdGEsX19mZXN0X2l0ZXJhdG9yMDt0cnl7X19mZXN0X2l0ZXJhdG9yMD1qc29uIHx8IHt9O31jYXRjaChlKXtfX2Zlc3RfaXRlcmF0b3I9e307X19mZXN0X2xvZ19lcnJvcihlLm1lc3NhZ2UpO31mb3IoaSBpbiBfX2Zlc3RfaXRlcmF0b3IwKXtkYXRhPV9fZmVzdF9pdGVyYXRvcjBbaV07X19mZXN0X2J1Zis9KFwiPHRyIGNsYXNzPVxcXCJzY29yZWJvYXJkX190YWJsZV9fdHJcXFwiPjx0ZCBjbGFzcz1cXFwic2NvcmVib2FyZF9fdGFibGVfX3RyX190ZFxcXCI+XCIpO3RyeXtfX2Zlc3RfYnVmKz0oX19mZXN0X2VzY2FwZUhUTUwoaSkpfWNhdGNoKGUpe19fZmVzdF9sb2dfZXJyb3IoZS5tZXNzYWdlICsgXCIxMlwiKTt9X19mZXN0X2J1Zis9KFwiPC90ZD48dGQgY2xhc3M9XFxcInNjb3JlYm9hcmRfX3RhYmxlX190cl9fdGRcXFwiPlwiKTt0cnl7X19mZXN0X2J1Zis9KF9fZmVzdF9lc2NhcGVIVE1MKGRhdGEudXNlcm5hbWUpKX1jYXRjaChlKXtfX2Zlc3RfbG9nX2Vycm9yKGUubWVzc2FnZSArIFwiMTNcIik7fV9fZmVzdF9idWYrPShcIjwvdGQ+PHRkIGNsYXNzPVxcXCJzY29yZWJvYXJkX190YWJsZV9fdHJfX3RkXFxcIj5cIik7dHJ5e19fZmVzdF9idWYrPShfX2Zlc3RfZXNjYXBlSFRNTChkYXRhLmdhbWVzKSl9Y2F0Y2goZSl7X19mZXN0X2xvZ19lcnJvcihlLm1lc3NhZ2UgKyBcIjE0XCIpO31fX2Zlc3RfYnVmKz0oXCI8L3RkPjx0ZCBjbGFzcz1cXFwic2NvcmVib2FyZF9fdGFibGVfX3RyX190ZFxcXCI+XCIpO3RyeXtfX2Zlc3RfYnVmKz0oX19mZXN0X2VzY2FwZUhUTUwoZGF0YS5zY29yZSkpfWNhdGNoKGUpe19fZmVzdF9sb2dfZXJyb3IoZS5tZXNzYWdlICsgXCIxNVwiKTt9X19mZXN0X2J1Zis9KFwiICU8L3RkPjwvdHI+XCIpO31fX2Zlc3RfYnVmKz0oXCI8L3RhYmxlPlwiKTtfX2Zlc3RfdG89X19mZXN0X2NodW5rcy5sZW5ndGg7aWYgKF9fZmVzdF90bykge19fZmVzdF9pdGVyYXRvciA9IDA7Zm9yICg7X19mZXN0X2l0ZXJhdG9yPF9fZmVzdF90bztfX2Zlc3RfaXRlcmF0b3IrKykge19fZmVzdF9jaHVuaz1fX2Zlc3RfY2h1bmtzW19fZmVzdF9pdGVyYXRvcl07aWYgKHR5cGVvZiBfX2Zlc3RfY2h1bms9PT1cInN0cmluZ1wiKSB7X19mZXN0X2h0bWwrPV9fZmVzdF9jaHVuazt9IGVsc2Uge19fZmVzdF9mbj1fX2Zlc3RfYmxvY2tzW19fZmVzdF9jaHVuay5uYW1lXTtpZiAoX19mZXN0X2ZuKSBfX2Zlc3RfaHRtbCs9X19mZXN0X2NhbGwoX19mZXN0X2ZuLF9fZmVzdF9jaHVuay5wYXJhbXMsX19mZXN0X2NodW5rLmNwKTt9fXJldHVybiBfX2Zlc3RfaHRtbCtfX2Zlc3RfYnVmO30gZWxzZSB7cmV0dXJuIF9fZmVzdF9idWY7fX1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3B1YmxpYy90ZW1wbGF0ZXMvc2NvcmVib2FyZC50bXBsLnhtbFxuLy8gbW9kdWxlIGlkID0gMTI5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdhbWVDYW52YXMobW9kZSA9IDApIHtcclxuICAgIGxldCBwYXJ0aWNsZXMgPSBbXTtcclxuICAgIFxyXG4gICAgLy8gY2FudmFzIGFuZCAyRCBjb250ZXh0IGluaXRpYWxpemF0aW9uXHJcbiAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmdhbWVfX2NhbnZhc1wiKTtcclxuICAgIGNvbnN0IGNvbnRleHQyRCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICBcclxuICAgIGNhbnZhcy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcbiAgICBjYW52YXMud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcclxuICAgIFxyXG4gICAgLy8gc3RhcnRpbmcgdGhlIGdhbWUgbG9vcCBhdCA2MCBmcmFtZXMgcGVyIHNlY29uZFxyXG4gICAgY29uc3QgZnJhbWVSYXRlID0gNjAuMDtcclxuICAgIGNvbnN0IGZyYW1lRGVsYXkgPSAxMDAwLjAvZnJhbWVSYXRlO1xyXG4gICAgXHJcbiAgICBsZXQgc3RhdHVzID0gcGFyc2VGbG9hdCgxLjApO1xyXG4gICAgXHJcbiAgICBsZXQgc3RhcnRUaW1lID0gMDtcclxuICAgIFxyXG4gICAgc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZShmcmFtZURlbGF5KTtcclxuICAgICAgICAgICAgICAgIH0sIGZyYW1lRGVsYXkpO1xyXG4gICAgXHJcbiAgICBmdW5jdGlvbiByYW5kb21GbG9hdCAobWluLCBtYXgpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIG1pbiArIE1hdGgucmFuZG9tKCkqKG1heC1taW4pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKlxyXG4gICAgICogQSBzaW5nbGUgZXhwbG9zaW9uIHBhcnRpY2xlXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIFBhcnRpY2xlICgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5zY2FsZSA9IDEuMjtcclxuICAgICAgICB0aGlzLnggPSAwO1xyXG4gICAgICAgIHRoaXMueSA9IDA7XHJcbiAgICAgICAgdGhpcy5yYWRpdXMgPSAyMDtcclxuICAgICAgICB0aGlzLmNvbG9yID0gXCIjMDAwXCI7XHJcbiAgICAgICAgdGhpcy52ZWxvY2l0eVggPSAwO1xyXG4gICAgICAgIHRoaXMudmVsb2NpdHlZID0gMDtcclxuICAgICAgICB0aGlzLnNjYWxlU3BlZWQgPSAwLjU7XHJcbiAgICAgICAgdGhpcy51cGRhdGUgPSBmdW5jdGlvbihtcylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIHNocmlua2luZ1xyXG4gICAgICAgICAgICB0aGlzLnNjYWxlIC09IHRoaXMuc2NhbGVTcGVlZCAqIG1zIC8gMTAwMC4wO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2NhbGUgPD0gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2FsZSA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIG1vdmluZyBhd2F5IGZyb20gZXhwbG9zaW9uIGNlbnRlclxyXG4gICAgICAgICAgICB0aGlzLnggKz0gdGhpcy52ZWxvY2l0eVggKiBtcy8xMDAwLjA7XHJcbiAgICAgICAgICAgIHRoaXMueSArPSB0aGlzLnZlbG9jaXR5WSAqIG1zLzEwMDAuMDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuZHJhdyA9IGZ1bmN0aW9uKGNvbnRleHQyRClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIHRyYW5zbGF0aW5nIHRoZSAyRCBjb250ZXh0IHRvIHRoZSBwYXJ0aWNsZSBjb29yZGluYXRlc1xyXG4gICAgICAgICAgICBjb250ZXh0MkQuc2F2ZSgpO1xyXG4gICAgICAgICAgICBjb250ZXh0MkQudHJhbnNsYXRlKHRoaXMueCwgdGhpcy55KTtcclxuICAgICAgICAgICAgY29udGV4dDJELnNjYWxlKHRoaXMuc2NhbGUsIHRoaXMuc2NhbGUpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gZHJhd2luZyBhIGZpbGxlZCBjaXJjbGUgaW4gdGhlIHBhcnRpY2xlJ3MgbG9jYWwgc3BhY2VcclxuICAgICAgICAgICAgY29udGV4dDJELmJlZ2luUGF0aCgpO1xyXG4gICAgICAgICAgICBjb250ZXh0MkQuYXJjKDAsIDAsIHRoaXMucmFkaXVzLCAwLCBNYXRoLlBJKjIsIHRydWUpO1xyXG4gICAgICAgICAgICBjb250ZXh0MkQuY2xvc2VQYXRoKCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjb250ZXh0MkQuZmlsbFN0eWxlID0gdGhpcy5jb2xvcjtcclxuICAgICAgICAgICAgY29udGV4dDJELmZpbGwoKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnRleHQyRC5yZXN0b3JlKCk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLypcclxuICAgICAqIEFkdmFuY2VkIEV4cGxvc2lvbiBlZmZlY3RcclxuICAgICAqIEVhY2ggcGFydGljbGUgaGFzIGEgZGlmZmVyZW50IHNpemUsIG1vdmUgc3BlZWQgYW5kIHNjYWxlIHNwZWVkLlxyXG4gICAgICpcclxuICAgICAqIFBhcmFtZXRlcnM6XHJcbiAgICAgKiBcdHgsIHkgLSBleHBsb3Npb24gY2VudGVyXHJcbiAgICAgKiBcdGNvbG9yIC0gcGFydGljbGVzJyBjb2xvclxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVFeHBsb3Npb24oeCwgeSwgY29sb3IpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IG1pblNpemUgPSA4O1xyXG4gICAgICAgIGxldCBtYXhTaXplID0gMzA7XHJcbiAgICAgICAgbGV0IGNvdW50ID0gMTU7XHJcbiAgICAgICAgbGV0IG1pblNwZWVkID0gODAuMDtcclxuICAgICAgICBsZXQgbWF4U3BlZWQgPSAyMjAuMDtcclxuICAgICAgICBsZXQgbWluU2NhbGVTcGVlZCA9IDEuMDtcclxuICAgICAgICBsZXQgbWF4U2NhbGVTcGVlZCA9IDIuMDtcclxuICAgICAgICBcclxuICAgICAgICBcclxuICAgICAgICBmb3IgKGxldCBhbmdsZT0wOyBhbmdsZTwzNjA7IGFuZ2xlICs9IE1hdGgucm91bmQoMzYwL2NvdW50KSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCBwYXJ0aWNsZSA9IG5ldyBQYXJ0aWNsZSgpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcGFydGljbGUueCA9IHg7XHJcbiAgICAgICAgICAgIHBhcnRpY2xlLnkgPSB5O1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcGFydGljbGUucmFkaXVzID0gcmFuZG9tRmxvYXQobWluU2l6ZSwgbWF4U2l6ZSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBwYXJ0aWNsZS5jb2xvciA9IGNvbG9yO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcGFydGljbGUuc2NhbGVTcGVlZCA9IHJhbmRvbUZsb2F0KG1pblNjYWxlU3BlZWQsIG1heFNjYWxlU3BlZWQpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IHNwZWVkID0gcmFuZG9tRmxvYXQobWluU3BlZWQsIG1heFNwZWVkKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHBhcnRpY2xlLnZlbG9jaXR5WCA9IHNwZWVkICogTWF0aC5jb3MoYW5nbGUgKiBNYXRoLlBJIC8gMTgwLjApO1xyXG4gICAgICAgICAgICBwYXJ0aWNsZS52ZWxvY2l0eVkgPSBzcGVlZCAqIE1hdGguc2luKGFuZ2xlICogTWF0aC5QSSAvIDE4MC4wKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHBhcnRpY2xlcy5wdXNoKHBhcnRpY2xlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vQ29uc3Qgc2l6ZSB2YXJpYWJsZXNcclxuICAgIGNvbnN0IHJlY3RTaXplID0gd2luZG93LmlubmVyV2lkdGggLyAzO1xyXG4gICAgY29uc3QgbWFyZ2luWSA9ICh3aW5kb3cuaW5uZXJIZWlnaHQgLSByZWN0U2l6ZSkgKiAwLjU7XHJcbiAgICBjb25zdCBzdGF0dXNNYXJnaW4gPSAoKHdpbmRvdy5pbm5lckhlaWdodCAtIHJlY3RTaXplKSAqIDAuNSkgKyByZWN0U2l6ZSArIDU7XHJcbiAgICBjb25zdCBhbGVydFNpemUgPSAwLjcgKiByZWN0U2l6ZTtcclxuICAgIGNvbnN0IGFsZXJ0TWFyZ2luID0gMC4xNSAqIHJlY3RTaXplO1xyXG4gICAgXHJcbiAgICBmdW5jdGlvbiB1cGRhdGUgKGZyYW1lRGVsYXkpXHJcbiAgICB7XHJcbiAgICAgICAgY29udGV4dDJELmNsZWFyUmVjdCgwLCAwLCB3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KTtcclxuICAgICAgICAvLyB1cGRhdGUgYW5kIGRyYXcgcGFydGljbGVzXHJcbiAgICAgICAgZm9yIChsZXQgaT0wOyBpPHBhcnRpY2xlcy5sZW5ndGg7IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCBwYXJ0aWNsZSA9IHBhcnRpY2xlc1tpXTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHBhcnRpY2xlLnVwZGF0ZShmcmFtZURlbGF5KTtcclxuICAgICAgICAgICAgcGFydGljbGUuZHJhdyhjb250ZXh0MkQpO1xyXG4gICAgICAgICAgICBpZiAocGFydGljbGUuc2NhbGUgPT0gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcGFydGljbGVzLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBkcmF3IGFpbWluZyB3aW5kb3dcclxuICAgICAgICBkcmF3U3RhdHVzKDAuNSAqIHJlY3RTaXplLCAwLjEgKiByZWN0U2l6ZSwgbWFyZ2luWSAtIHJlY3RTaXplICogMC4xIC0gNSwgXCIjNGQ0ZDRkXCIsIFwi0JfQvtC90LAg0LfQsNGF0LLQsNGC0LBcIiwgMSwgMTApO1xyXG4gICAgICAgIHJvdW5kUmVjdChjb250ZXh0MkQsIHJlY3RTaXplLCBtYXJnaW5ZLCByZWN0U2l6ZSwgcmVjdFNpemUsIDIwLCBcInJlZFwiLCBmYWxzZSk7XHJcbiAgICAgICAgc3dpdGNoIChtb2RlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgZHJhd1N0YXR1cyhyZWN0U2l6ZSwgMC4yICogMC43ICogcmVjdFNpemUsIHN0YXR1c01hcmdpbiwgXCJncmVlblwiLCBcItCX0LDRhdCy0LDRgiDRhtC10LvQuC4uLlwiLCBzdGF0dXMsIDIwKTtcclxuICAgICAgICAgICAgICAgIHN0YXR1cyA9IHBhcnNlRmxvYXQoc3RhdHVzKSArIHBhcnNlRmxvYXQoMC4wMDcpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHN0YXR1cyA+IDEpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHggPSBjYW52YXMud2lkdGggICogMC41O1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB5ID0gY2FudmFzLmhlaWdodCAqIDAuNTtcclxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVFeHBsb3Npb24oeCwgeSwgXCIjNTI1MjUyXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZUV4cGxvc2lvbih4LCB5LCBcIiNGRkEzMThcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlRXhwbG9zaW9uKHgsIHksIFwiIzUyNTI1MlwiKTtcclxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVFeHBsb3Npb24oeCwgeSwgXCIjRkZBMzE4XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIG1vZGUgPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgIGlmIChzdGF0dXMgPCAxKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGRyYXdTdGF0dXMocmVjdFNpemUsIDAuMiAqIDAuNyAqIHJlY3RTaXplLCBzdGF0dXNNYXJnaW4sIFwiI2NjMDAwMFwiLCBcItCS0Ysg0L/QvtC0INGD0LTQsNGA0L7QvCFcIiwgc3RhdHVzLCAyMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzID0gcGFyc2VGbG9hdChzdGF0dXMpICsgcGFyc2VGbG9hdCgwLjAwNyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoc3RhcnRUaW1lICE9IDApXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0MkQuZ2xvYmFsQWxwaGEgPSAwLjc1O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByb3VuZFJlY3QoY29udGV4dDJELCByZWN0U2l6ZSArIGFsZXJ0TWFyZ2luLCBtYXJnaW5ZICsgYWxlcnRNYXJnaW4sIGFsZXJ0U2l6ZSwgYWxlcnRTaXplLCAyMCwgXCIjNGQ0ZDRkXCIsIHRydWUsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dDJELmdsb2JhbEFscGhhID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dDJELmZvbnQ9JzI1cHggSGVsdmV0aWNhJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dDJELmZpbGxTdHlsZSA9ICd3aGl0ZSc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQyRC50ZXh0QWxpZ249XCJjZW50ZXJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dDJELmZpbGxUZXh0KFwi0JLRiyDQv9C+0LTQsdC40YLRiyFcIiwgcmVjdFNpemUgKyByZWN0U2l6ZSAqIDAuNSwgbWFyZ2luWSArIGFsZXJ0TWFyZ2luICsgMC4zICogYWxlcnRTaXplLCBhbGVydFNpemUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0MkQuZm9udD0nMjBweCBIZWx2ZXRpY2EnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0MkQuZmlsbFRleHQoXCLQntCz0YDQsNC90LjRh9C10L3QuNC1INC00LXQudGB0YLQstGD0LXRgjpcIiwgcmVjdFNpemUgKyByZWN0U2l6ZSAqIDAuNSwgbWFyZ2luWSArIGFsZXJ0TWFyZ2luICsgMC41ICogYWxlcnRTaXplLCBhbGVydFNpemUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWNvbmRzID0gMTAgLSAoKG5ldyBEYXRlKCkpLmdldFRpbWUoKSAtIHN0YXJ0VGltZSkgLyAxMDAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWNvbmRzID0gcGFyc2VJbnQoc2Vjb25kcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQyRC5maWxsVGV4dChzZWNvbmRzICsgXCIg0YHQtdC60YPQvdC0XCIsIHJlY3RTaXplICsgcmVjdFNpemUgKiAwLjUsIG1hcmdpblkgKyBhbGVydE1hcmdpbiArIDAuNiAqIGFsZXJ0U2l6ZSwgYWxlcnRTaXplKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2Vjb25kcyA8PSAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0VGltZSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRUaW1lID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgICAgICAgICBhbGVydCgpO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgbW9kZSA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGZ1bmN0aW9uIGRyYXdTdGF0dXMoc2l6ZSwgaGVpZ2h0LCBvZmZzZXRZLCBjb2xvciwgbGFiZWwsIHJlYWxTaXplLCByYWRpdXMpXHJcbiAgICB7XHJcbiAgICAgICAgY29udGV4dDJELmdsb2JhbEFscGhhID0gMC41O1xyXG4gICAgICAgIGNvbnN0IHhNYXJnaW4gPSAod2luZG93LmlubmVyV2lkdGggLSBzaXplKSAqIDAuNTtcclxuICAgICAgICByb3VuZFJlY3QoY29udGV4dDJELCB4TWFyZ2luLCBvZmZzZXRZLCBzaXplICogcmVhbFNpemUsIGhlaWdodCwgcmFkaXVzLCBjb2xvciwgdHJ1ZSwgZmFsc2UpO1xyXG4gICAgICAgIHJvdW5kUmVjdChjb250ZXh0MkQsIHhNYXJnaW4sIG9mZnNldFksIHNpemUsIGhlaWdodCwgcmFkaXVzLCBjb2xvciwgdHJ1ZSwgZmFsc2UpO1xyXG4gICAgICAgIGNvbnRleHQyRC5nbG9iYWxBbHBoYSA9IDE7XHJcbiAgICAgICAgY29udGV4dDJELmZvbnQ9JzIwcHggSGVsdmV0aWNhJztcclxuICAgICAgICBjb250ZXh0MkQuZmlsbFN0eWxlID0gJ3doaXRlJztcclxuICAgICAgICBjb250ZXh0MkQudGV4dEFsaWduPVwiY2VudGVyXCI7XHJcbiAgICAgICAgY29udGV4dDJELmZpbGxUZXh0KGxhYmVsLHhNYXJnaW4gKyBzaXplICogMC41LG9mZnNldFkgKyBoZWlnaHQgKiAwLjYsIHNpemUpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBmdW5jdGlvbiByb3VuZFJlY3QoY29udGV4dDJELCB4LCB5LCB3aWR0aCwgaGVpZ2h0LCByYWRpdXMsIGNvbG9yLCBmaWxsLCBzdHJva2UpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBjb2xvciA9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICBjb2xvciA9IFwiYmxhY2tcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiBzdHJva2UgPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgc3Ryb2tlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiByYWRpdXMgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIHJhZGl1cyA9IDU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2YgcmFkaXVzID09PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgICByYWRpdXMgPSB7dGw6IHJhZGl1cywgdHI6IHJhZGl1cywgYnI6IHJhZGl1cywgYmw6IHJhZGl1c307XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IGRlZmF1bHRSYWRpdXMgPSB7dGw6IDAsIHRyOiAwLCBicjogMCwgYmw6IDB9O1xyXG4gICAgICAgICAgICBmb3IgKGxldCBzaWRlIGluIGRlZmF1bHRSYWRpdXMpIHtcclxuICAgICAgICAgICAgICAgIHJhZGl1c1tzaWRlXSA9IHJhZGl1c1tzaWRlXSB8fCBkZWZhdWx0UmFkaXVzW3NpZGVdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnRleHQyRC5saW5lV2lkdGg9MTA7XHJcbiAgICAgICAgY29udGV4dDJELnN0cm9rZVN0eWxlID0gY29sb3I7XHJcbiAgICAgICAgY29udGV4dDJELmZpbGxTdHlsZSA9IGNvbG9yO1xyXG4gICAgICAgIGNvbnRleHQyRC5iZWdpblBhdGgoKTtcclxuICAgICAgICBjb250ZXh0MkQubW92ZVRvKHggKyByYWRpdXMudGwsIHkpO1xyXG4gICAgICAgIGNvbnRleHQyRC5saW5lVG8oeCArIHdpZHRoIC0gcmFkaXVzLnRyLCB5KTtcclxuICAgICAgICBjb250ZXh0MkQucXVhZHJhdGljQ3VydmVUbyh4ICsgd2lkdGgsIHksIHggKyB3aWR0aCwgeSArIHJhZGl1cy50cik7XHJcbiAgICAgICAgY29udGV4dDJELmxpbmVUbyh4ICsgd2lkdGgsIHkgKyBoZWlnaHQgLSByYWRpdXMuYnIpO1xyXG4gICAgICAgIGNvbnRleHQyRC5xdWFkcmF0aWNDdXJ2ZVRvKHggKyB3aWR0aCwgeSArIGhlaWdodCwgeCArIHdpZHRoIC0gcmFkaXVzLmJyLCB5ICsgaGVpZ2h0KTtcclxuICAgICAgICBjb250ZXh0MkQubGluZVRvKHggKyByYWRpdXMuYmwsIHkgKyBoZWlnaHQpO1xyXG4gICAgICAgIGNvbnRleHQyRC5xdWFkcmF0aWNDdXJ2ZVRvKHgsIHkgKyBoZWlnaHQsIHgsIHkgKyBoZWlnaHQgLSByYWRpdXMuYmwpO1xyXG4gICAgICAgIGNvbnRleHQyRC5saW5lVG8oeCwgeSArIHJhZGl1cy50bCk7XHJcbiAgICAgICAgY29udGV4dDJELnF1YWRyYXRpY0N1cnZlVG8oeCwgeSwgeCArIHJhZGl1cy50bCwgeSk7XHJcbiAgICAgICAgY29udGV4dDJELmNsb3NlUGF0aCgpO1xyXG4gICAgICAgIGlmIChmaWxsKSB7XHJcbiAgICAgICAgICAgIGNvbnRleHQyRC5maWxsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzdHJva2UpIHtcclxuICAgICAgICAgICAgY29udGV4dDJELnN0cm9rZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgLy/Qp9GC0L7QsdGLINGB0LHRgNC+0YHQuNGC0Ywg0LLRi9C/0L7Qu9C90LXQvdC40Y8g0LDQvdC40LzQsNGG0LjQuCAo0LHRi9Cy0LDQtdGCINCyINGN0YLQvtC8INC90LDQtNC+0LHQvdC+0YHRgtGMKVxyXG4gICAgLy/QtNC+0YHRgtCw0YLQvtGH0L3QviDQv9GA0LjRgNCw0LLQvdGP0YLRjCBtb2RlINC90YPQu9GOIVxyXG4gICAgXHJcbiAgICAvL9Cn0YLQvtCx0Ysg0LfQsNC/0YPRgdGC0LjRgtGMINCw0L3QuNC80LDRhtC40Lgg0L3Rg9C20L3QviDQv9GA0L7RgdGC0L4g0LLRi9GB0YLQsNCy0LjRgtGMINC90YPQttC90YvQuSBtb2RlXHJcbiAgICAvL9C4INC+0LHQvdGD0LvQuNGC0Ywg0L/QtdGA0LXQvNC10L3QvdGD0Y4g0L/RgNC+0LPRgNC10YHRgSDQsdCw0YDQsFxyXG4gICAgd2luZG93Lm9ua2V5ZG93biA9IGZ1bmN0aW9uKGV2dClcclxuICAgIHtcclxuICAgICAgICBldnQgPSBldnQgfHwgd2luZG93LmV2ZW50O1xyXG4gICAgICAgIC8v0JrQstCw0LTRgNCw0LrQvtC/0YLQtdGAINC/0L7QtCDRg9C00LDRgNC+0LxcclxuICAgICAgICBpZiAoZXZ0LmtleUNvZGUgPT0gOTApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBtb2RlID0gMTtcclxuICAgICAgICAgICAgc3RhdHVzID0gcGFyc2VGbG9hdCgwLjApO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL9CX0LDRhdCy0LDRgiDQv9GA0L7RgtC40LLQvdC40LrQsFxyXG4gICAgICAgIGVsc2UgaWYgKGV2dC5rZXlDb2RlID09IDg4KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbW9kZSA9IDI7XHJcbiAgICAgICAgICAgIHN0YXR1cyA9IHBhcnNlRmxvYXQoMC4wKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3B1YmxpYy9qcy9jYW52YXMuanMiLCJpbXBvcnQgUm9vbU1vZGVsIGZyb20gJy4uL21vZGVscy9Sb29tTW9kZWwnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb29tQ29sbGVjdGlvbiB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuX2RhdGEgPSBbXTtcbiAgICB9XG5cbiAgICBmZXRjaCgpIHtcbiAgICAgICAgcmV0dXJuIGZldGNoKCcvZ2FtZXMnKS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgICAgICAgICAgIHJlamVjdChyZXNwb25zZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgICAgICB9KS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgdGhpcy5fZGF0YSA9IGRhdGE7XG4gICAgICAgIH0pLmNhdGNoKCk7XG4gICAgfVxuXG4gICAgZ2V0Q29sbGVjdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGE7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcHVibGljL2pzL2NvbGxlY3Rpb25zL1Jvb21Db2xsZWN0aW9uLmpzIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlckNvbGxlY3Rpb24ge1xuICAgIGNvbnN0cnV0b3IoKSB7XG4gICAgICAgIHRoaXMuX2RhdGEgPSBbXTtcbiAgICB9XG5cbiAgICBmZXRjaCgpIHtcbiAgICAgICAgcmV0dXJuIGZldGNoKCcvcmF0aW5nJykudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgICAgICAgICAgICAgIH0pLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2RhdGEgPSBkYXRhO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNvcnQoKTtcbiAgICAgICAgICAgICAgICB9KS5jYXRjaCgpO1xuICAgIH1cblxuICAgIHNvcnQoKSB7XG4gICAgICAgIHRoaXMuX2RhdGEuc29ydCgoYSwgYikgPT4gYi5zY29yZSAtIGEuc2NvcmUpO1xuICAgIH1cblxuICAgIGdldENvbGxlY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3B1YmxpYy9qcy9jb2xsZWN0aW9ucy9Vc2VyQ29sbGVjdGlvbi5qcyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlcXVlc3QodXJsLCBtZXRob2QsIGRhdGEpIHtcbiAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gIHhoci5vcGVuKG1ldGhvZCwgdXJsLCBmYWxzZSk7XG4gIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xuICB4aHIuc2VuZChKU09OLnN0cmluZ2lmeShkYXRhKSk7XG5cbiAgcmV0dXJuIHhocjtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3B1YmxpYy9qcy9saWJzLmpzIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm9vbU1vZGVsIHtcbiAgICBjb25zdHJ1Y3RvcihkYXRhID0ge30pIHtcbiAgICAgICAgdGhpcy5pZCA9IGRhdGEuaWQgfHwgMDtcbiAgICAgICAgdGhpcy5jb2xvciA9IGRhdGEuY29sb3IgfHwgdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLnBsYXllckxvZ2luID0gZGF0YS5wbGF5ZXJMb2dpbiB8fCAnTmV3IFBsYXllcic7XG4gICAgICAgIHRoaXMucGxheWVySWQgPSBkYXRhLnBsYXllcklkIHx8IDA7XG4gICAgICAgIHRoaXMuZXJyb3IgPSAnJztcbiAgICB9XG5cbiAgICBzYXZlKHJvb20pIHtcbiAgICAgICAgaWYgKCFyb29tKSB7XG4gICAgICAgICAgICB0aGlzLmVycm9yID0gJ05vIHJvb20hJztcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmV0Y2goJy9nYW1lcycsIHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1BVVCcsXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgcm9vbTogcm9vbSxcbiAgICAgICAgICAgICAgICBkcm9uZToge1xuICAgICAgICAgICAgICAgICAgICBpZDogdGhpcy5pZCxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6IHRoaXMuY29sb3IsXG4gICAgICAgICAgICAgICAgICAgIHBsYXllckxvZ2luOiB0aGlzLnBsYXllckxvZ2luLFxuICAgICAgICAgICAgICAgICAgICBwbGF5ZXJJZDogdGhpcy5wbGF5ZXJJZCxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgICAgICAgICAgICByZWplY3QocmVzcG9uc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgfSkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIHRoaXMuZXJyb3IgPSAnJztcbiAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5lcnJvciA9ICdGYWlsZWQgdG8gc2F2ZSBkcm9uZSEnO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wdWJsaWMvanMvbW9kZWxzL0Ryb25lTW9kZWwuanMiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lTW9kZWwge1xuICAgIGNvbnN0cnVjdG9yIChvcHRpb25zID0ge30pIHtcbiAgICAgICAgdGhpcy5ob3N0ID0gb3B0aW9ucy5ob3N0IHx8ICcvaW1hZ2UvZmlsbC5qcGcnO1xuICAgICAgICB0aGlzLndzID0gW107IC8vIHRoaXMgaXMgZm9yIHdlYnNvY2tldFxuICAgICAgICB0aGlzLmVycm9yID0gJyc7XG4gICAgfVxuXG4gICAgZ2V0SG9zdCAoKSB7XG4gICAgICAgIHJldHVybiBmZXRjaCgnL2hvc3QnKS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlKHJlamVjdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgICAgICB9KS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgdGhpcy5ob3N0ID0gZGF0YS5ob3N0O1xuICAgICAgICAgICAgdGhpcy5lcnJvciA9ICcnO1xuICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmVycm9yID0gYENhbid0IHJlYWNoIHRoZSBob3N0ICR7dGhpcy5ob3N0fSFgO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXRWaWRlbygpIHtcbiAgICAgICAgdGhpcy5nZXRIb3N0KCk7XG4gICAgICAgIHJldHVybiB0aGlzLmhvc3Q7XG4gICAgfVxuXG4gICAgbWVjaGFuaWNzICgpIHtcblxuICAgIH1cblxuICAgIGNvbm5lY3QgKCkge1xuXG4gICAgfVxuXG4gICAgZGlzY29ubmVjdCAoKSB7XG5cbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wdWJsaWMvanMvbW9kZWxzL0dhbWVNb2RlbC5qcyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvb21Nb2RlbCB7XG4gICAgY29uc3RydWN0b3IoZGF0YSA9IHt9KSB7XG4gICAgICAgIHRoaXMuaWQgPSBkYXRhLmlkIHx8IDA7XG4gICAgICAgIHRoaXMubmFtZSA9IGRhdGEubmFtZSB8fCAnTmV3IFJvb20nO1xuICAgICAgICB0aGlzLmlwID0gZGF0YS5pcCB8fCAnMTI3LjAuMC4xJztcbiAgICAgICAgdGhpcy5kcm9uZXMgPSBkYXRhLmRyb25lcyB8fCBbXTtcbiAgICAgICAgdGhpcy5lbmRDb25kaXRpb24gPSBkYXRhLmVuZENvbmRpdGlvbiB8fCAwO1xuICAgICAgICB0aGlzLmVuZFZhbHVlID0gZGF0YS5lbmRWYWx1ZSB8fCAwO1xuICAgICAgICB0aGlzLmF2YWlsYWJsZUNvbG9ycyA9IGRhdGEuYXZhaWxhYmxlQ29sb3JzIHx8IFtdO1xuICAgICAgICB0aGlzLmVycm9yID0gJyc7XG4gICAgfVxuXG4gICAgZmV0Y2goKSB7XG4gICAgICAgIHJldHVybiBmZXRjaCgnL3Jvb20nLCB7XG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgcm9vbTogdGhpcy5pZCxcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gICAgICAgIH0pLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICB0aGlzLmlkID0gZGF0YS5pZDtcbiAgICAgICAgICAgIHRoaXMubmFtZSA9IGRhdGEubmFtZTtcbiAgICAgICAgICAgIHRoaXMuaXAgPSBkYXRhLmlwO1xuICAgICAgICAgICAgdGhpcy5kcm9uZXMgPSBkYXRhLmRyb25lcztcbiAgICAgICAgICAgIHRoaXMuZW5kQ29uZGl0aW9uID0gZGF0YS5lbmRDb25kaXRpb247XG4gICAgICAgICAgICB0aGlzLmVuZFZhbHVlID0gZGF0YS5lbmRWYWx1ZTtcbiAgICAgICAgICAgIHRoaXMuYXZhaWxhYmxlQ29sb3JzID0gZGF0YS5hdmFpbGFibGVDb2xvcnM7XG4gICAgICAgICAgICB0aGlzLmVycm9yID0gMDtcbiAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5lcnJvciA9ICdXcm9uZyByb29tIG5hbWUnO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzYXZlKCkge1xuICAgICAgICByZXR1cm4gZmV0Y2goJy9yb29tJywge1xuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgICAgICAgICAgIGlwOiB0aGlzLmlwLFxuICAgICAgICAgICAgICAgIGRyb25lczogW10sXG4gICAgICAgICAgICAgICAgZW5kQ29uZGl0aW9uOiB0aGlzLmVuZENvbmRpdGlvbixcbiAgICAgICAgICAgICAgICBlbmRWYWx1ZTogdGhpcy5lbmRWYWx1ZSxcbiAgICAgICAgICAgIH0pLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgICAgICAgICAgfSkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9yID0gJyc7XG4gICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvciA9ICdEdXBsaWNhdGVkIHJvb21zISc7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBsaXN0RHJvbmVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kcm9uZXM7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcHVibGljL2pzL21vZGVscy9Sb29tTW9kZWwuanMiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwYXRoVG9SZWdleCAocGF0aG5hbWUpIHtcblx0bGV0IGtleU5hbWVzID0gW107XG5cdGxldCBwYXJ0cyA9IHBhdGhuYW1lXG5cdFx0LnNwbGl0KCcvJylcblx0XHQuZmlsdGVyKHBhcnQgPT4gcGFydClcblx0XHQubWFwKHBhcnQgPT4ge1xuXHRcdFx0aWYgKC9eOi8uZXhlYyhwYXJ0KSkge1xuXHRcdFx0XHRrZXlOYW1lcy5wdXNoKHBhcnQuc2xpY2UoMSkpO1xuXHRcdFx0XHRyZXR1cm4gbmV3IFJlZ0V4cChgXlxcLyhbXi9dKylgLCBgaWApO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG5ldyBSZWdFeHAoYF5cXC8ke3BhcnR9YCwgYGlgKTtcblx0XHR9KTtcblxuXG5cdHJldHVybiBmdW5jdGlvbiAocGF0aCkge1xuXG5cdFx0bGV0IGtleXMgPSBbXTtcblx0XHRsZXQgY2hlY2sgPSBwYXJ0cy5ldmVyeSgocmVnZXhwLCBzdGVwKSA9PiB7XG5cdFx0XHRsZXQgdG1wID0gcmVnZXhwLmV4ZWMocGF0aCk7XG5cdFx0XHRpZiAoIXRtcCkge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0XHRpZiAodG1wLmxlbmd0aCA9PT0gMikge1xuXHRcdFx0XHRrZXlzLnB1c2godG1wWzFdKTtcblx0XHRcdH1cblx0XHRcdHBhdGggPSBwYXRoLnJlcGxhY2UocmVnZXhwLCAnJyk7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9KTtcblxuXHRcdGlmIChjaGVjaykge1xuXHRcdFx0cmV0dXJuIGtleXMucmVkdWNlKChwcmV2LCBjdXJyLCBwb3MpID0+IHtcblx0XHRcdFx0cHJldltrZXlOYW1lc1twb3NdXSA9IGN1cnI7XG5cdFx0XHRcdHJldHVybiBwcmV2O1xuXHRcdFx0fSwge30pO1xuXHRcdH1cblx0XHRyZXR1cm4gbnVsbDtcblx0fTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wdWJsaWMvanMvbW9kdWxlcy9wYXRoVG9SZWdleC5qcyIsImxldCBpZCA9IDA7XG5pbXBvcnQgcGF0aFRvUmVnZXggZnJvbSAnLi9wYXRoVG9SZWdleCc7XG5cbi8qKiDQmtC70LDRgdGBINC/0YDQtdC00YHRgtCw0LLQu9GP0LXRgiDRgdC+0LHQvtC5INCf0YPRgtGMINCyINCy0LDRiNC10Lwg0L/RgNC40LvQvtC20LXQvdC40LggKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvdXRlIHtcblx0LyoqXG5cdCAqINCh0L7Qt9C00LDRkdGCINC90L7QstGL0LkgUm91dGUgLSDQsNGB0YHQvtGG0LjQuNGA0YPQtdGCINC90LXQutC+0YLQvtGA0YPRjiB2aWV3INGBINGI0LDQsdC70L7QvdC+0Lwg0L/Rg9GC0Lhcblx0ICogQHBhcmFtIHtzdHJpbmd9IHBhdGhuYW1lIC0g0KjQsNCx0LvQvtC9INC/0YPRgtC4XG5cdCAqIEBwYXJhbSB7Vmlld30gdmlldyAtINCa0LvQsNGB0YEg0LrQvtC90LrRgNC10YLQvdC+0LkgVmlld1xuXHQgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIC0g0JTQvtC/0L7Qu9C90LjRgtC10LvRjNC90YvQtSDQv9Cw0YDQsNC80LXRgtGA0YssINC60L7RgtC+0YDRi9C1INCx0YPQtNGD0YIg0L/QtdGA0LXQtNCw0L3RiyDQstC+IHZpZXcg0L/RgNC4INC10ZEg0YHQvtC30LTQsNC90LjQuCDQuCDQuNC90LjRhtC40LDQu9C40LfQsNGG0LjQuFxuXHQgKi9cblx0Y29uc3RydWN0b3IocGF0aG5hbWUsIHZpZXcsIG9wdGlvbnMgPSB7fSkge1xuXHRcdC8vVE9ETzog0KHRg9GJ0LjQuSDQsNC00LjRidC1LCDQvdCw0Lwg0L3Rg9C20L3QviDQvNC10L3QtdC00LbQtdGA0LjRgtGMINC00LXQv9GB0Ytcblx0XHR0aGlzLnBhdGhUb1JlZ2V4ID0gcGF0aFRvUmVnZXg7XG5cblx0XHR0aGlzLmlkID0gJ3AnICsgaWQ7XG5cdFx0aWQrKztcblx0XHR0aGlzLnBhdGhuYW1lID0gcGF0aG5hbWU7XG5cdFx0dGhpcy5yZWdleCA9IHRoaXMucGF0aFRvUmVnZXgocGF0aG5hbWUpO1xuXHRcdHRoaXMuVmlldyA9IHZpZXc7XG5cdFx0dGhpcy5vcHRpb25zID0gb3B0aW9ucztcblx0fVxuXG5cdC8qKlxuXHQgKiDQn9GA0L7QstC10YDRj9C10YIsINGB0L7QvtGC0LLQtdGC0YHRgtCy0YPQtdGCINC70Lgg0L/QtdGA0LXQtNCw0L3QvdGL0LkgcGF0aG5hbWUg0YLQtdC60YPRidC10LzRgyBSb3V0ZVxuXHQgKiBAcGFyYW0ge3N0cmluZ30gcGF0aG5hbWUgLSDQn9GD0YLRjCDQsiDQv9GA0LjQu9C+0LbQtdC90LjQuFxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn0g0KDQtdC30YPQu9GM0YLQsNGCINC/0YDQvtCy0LXRgNC60Lhcblx0ICovXG5cdG1hdGNoKHBhdGhuYW1lKSB7XG5cdFx0cmV0dXJuICEhdGhpcy5yZWdleChwYXRobmFtZSk7XG5cdH1cblxuXHQvKipcblx0ICog0JDQutGC0LjQstC40YDRg9C10YIg0YLQtdC60YPRidC40LkgUm91dGUgKNC/0LXRgNC10YXQvtC00LjRgiDQv9C+INC90LXQvNGDKVxuXHQgKiBAcGFyYW0ge3N0cmluZ30gcGF0aG5hbWUgLSDQn9GD0YLRjCDQsiDQv9GA0LjQu9C+0LbQtdC90LjQuFxuXHQgKiBAcGFyYW0ge09iamVjdH0gW3N0YXRlPXt9XSAtINCe0LHRitC10LrRgiBzdGF0ZSwg0LrQvtGC0L7RgNGL0Lkg0LHRi9C7INC/0LXRgNC10LTQsNC9INCyINGB0L7QsdGL0YLQuNC1IHBvcHN0YXRlINC00LvRjyDQvtCx0YrQtdC60YLQsCB3aW5kb3dcblx0ICovXG5cdG5hdmlnYXRlKHBhdGhuYW1lLCBzdGF0ZSA9IHt9KSB7XG5cdFx0c3RhdGUgPSBzdGF0ZSB8fCB7fTtcblx0XHRsZXQga2V5cyA9IHRoaXMucmVnZXgocGF0aG5hbWUpO1xuXHRcdGlmICghdGhpcy5fdmlldykge1xuXHRcdFx0bGV0IHZpZXcgPSBuZXcgdGhpcy5WaWV3KHRoaXMub3B0aW9ucyk7XG5cdFx0XHR2aWV3LmluaXQodGhpcy5vcHRpb25zKTtcblx0XHRcdHZpZXcuc2V0Um91dGVyKHRoaXMuX19yb3V0ZXIpO1xuXHRcdFx0dGhpcy5fdmlldyA9IHZpZXc7XG5cdFx0fVxuXG5cdFx0dGhpcy5fdmlldy5yZXN1bWUoT2JqZWN0LmFzc2lnbihzdGF0ZSwga2V5cykpO1xuXHR9XG5cblx0LyoqXG5cdCAqINCU0LXQsNC60YLQuNCy0LjRgNGD0LXRgiDRgtC10LrRg9GJ0LjQuSBSb3V0ZVxuXHQgKi9cblx0bGVhdmUoKSB7XG5cdFx0dGhpcy5fdmlldyAmJiB0aGlzLl92aWV3LnBhdXNlKCk7XG5cdH1cblxuXHQvKipcblx0ICog0KPRgdGC0LDQvdCw0LLQu9C40LLQsNC10YIg0YLQtdC60YPRidC10LzRgyBSb3V0ZSDQuNC90YHRgtCw0L3RgSDRgNC+0YPRgtC10YDQsFxuXHQgKiBAcGFyYW0ge1JvdXRlcn0gcm91dGVyIC0g0JjQvdGB0YLQsNC90YEg0YDQvtGD0YLQtdGA0LBcblx0ICovXG5cdHNldFJvdXRlcihyb3V0ZXIpIHtcblx0XHR0aGlzLl9fcm91dGVyID0gcm91dGVyO1xuXHR9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wdWJsaWMvanMvbW9kdWxlcy9yb3V0ZS5qcyIsImltcG9ydCBSb3V0ZXIgZnJvbSAnLi9tb2R1bGVzL3JvdXRlcic7XG5pbXBvcnQgTG9naW5WaWV3IGZyb20gJy4vdmlld3MvbG9naW5WaWV3JztcbmltcG9ydCBSZWdpc3RyYXRpb25WaWV3IGZyb20gJy4vdmlld3MvcmVnaXN0cmF0aW9uVmlldyc7XG5pbXBvcnQgU2NvcmVib2FyZFZpZXcgZnJvbSAnLi92aWV3cy9zY29yZWJvYXJkVmlldyc7XG5pbXBvcnQgUm9vbXNWaWV3IGZyb20gJy4vdmlld3Mvcm9vbXNWaWV3JztcbmltcG9ydCBHYW1lVmlldyBmcm9tICcuL3ZpZXdzL2dhbWVWaWV3JztcblxubGV0IHJvdXRlciA9IG5ldyBSb3V0ZXIoKTtcbnJvdXRlci5hZGRSb3V0ZSgnL2xvZ2luJywgTG9naW5WaWV3KTtcbnJvdXRlci5hZGRSb3V0ZSgnL3JlZ2lzdHJhdGlvbicsIFJlZ2lzdHJhdGlvblZpZXcpO1xucm91dGVyLmFkZFJvdXRlKCcvc2NvcmVib2FyZCcsIFNjb3JlYm9hcmRWaWV3KTtcbnJvdXRlci5hZGRSb3V0ZSgnL3Jvb21zJywgUm9vbXNWaWV3KTtcbnJvdXRlci5hZGRSb3V0ZSgnL2dhbWUnLCBHYW1lVmlldyk7XG5yb3V0ZXIuYWRkUm91dGUoJy8nLCBMb2dpblZpZXcpO1xucm91dGVyLnN0YXJ0KCk7XG53aW5kb3cucm91dGVyID0gcm91dGVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcHVibGljL2pzL2FpcmRyb25lLmpzIiwiLyoqXG4gKiDQmtC70LDRgdGBINC/0YDQtdC00YHRgtCw0LLQu9GP0LXRgiDRgdC+0LHQvtC5IHZpZXdcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmlldyB7XG5cdC8qKlxuXHQgKiDQodC+0LfQtNCw0ZHRgiDQvdC+0LLRg9GOIHZpZXdcblx0ICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSAtINCe0LHRitC10LrRgiDRgSDQv9Cw0YDQsNC80LXRgtGA0LDQvNC4XG5cdCAqL1xuXHRjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICAgICAgdGhpcy5zZXRSb3V0ZXIod2luZG93LnJvdXRlcik7XG5cdFx0dGhpcy50YWdOYW1lID0gb3B0aW9ucy50YWdOYW1lIHx8ICdkaXYnO1xuICAgICAgICB0aGlzLl9lbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iob3B0aW9ucy5lbGVtZW50KSB8fCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRoaXMudGFnTmFtZSk7XG4gICAgICAgIHRoaXMuYm9keUNsYXNzID0gb3B0aW9ucy5ib2R5Q2xhc3M7XG4gICAgICAgIHRoaXMuaGlkZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqINCY0L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPINC/0LDRgNCw0LzQtdGC0YDQvtCyIHZpZXcgKNCy0YvQv9C+0LvQvdGP0LXRgtGB0Y8g0YHRgNCw0LfRgyDQv9C+0YHQu9C1INGB0L7Qt9C00LDQvdC40Y8pXG5cdCAqINCd0LXQvtCx0YXQvtC00LjQvNC+INC/0LXRgNC10L/RgNC10LTQtdC70Y/RgtGMXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gLSDQntCx0YrQtdC60YIg0YEg0L/QsNGA0LDQvNC10YLRgNCw0LzQuFxuXHQgKi9cblx0aW5pdChvcHRpb25zID0ge30pIHtcblx0XHR0aGlzLnNldEF0dHJzKG9wdGlvbnMuYXR0cnMpO1xuXHR9XG5cblx0LyoqXG5cdCAqINCS0YvQt9GL0LLQsNC10YLRgdGPINC/0YDQuCDQv9GA0LjQvtGB0YLQsNC90L7QstC60LUg0YDQsNCx0L7RgtGLIHZpZXcgKNC/0YDQuCDRgdC60YDRi9GC0LjQuCB2aWV3INC40LvQuCDQv9C10YDQtdGF0L7QtNC1INC90LAg0LTRgNGD0LPRg9GOIHZpZXcpXG5cdCAqINCd0LXQvtCx0YXQvtC00LjQvNC+INC/0LXRgNC10L7Qv9GA0LXQtNC10LvRj9GC0Ywg0YHQstC+0LXQuSDQu9C+0LPQuNC60L7QuVxuXHQgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIC0g0J7QsdGK0LXQutGCINGBINC/0LDRgNCw0LzQtdGC0YDQsNC80Lhcblx0ICovXG5cdHBhdXNlKG9wdGlvbnMgPSB7fSkge1xuXHRcdHRoaXMuaGlkZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqINCS0YvQt9GL0LLQsNC10YLRgdGPINC/0YDQuCDQvdCw0YfQsNC70LUg0LjQu9C4INC/0YDQvtC00L7Qu9C20LXQvdC40Lgg0YDQsNCx0L7RgtGLIHZpZXcgKNC/0L7RgdC70LUg0YLQvtCz0L4sINC60LDQuiB2aWV3INCx0YvQu9CwINGB0LrRgNGL0YLQsClcblx0ICog0J3QtdC+0LHRhdC+0LTQuNC80L4g0L/QtdGA0LXQvtC/0YDQtdC00LXQu9GP0YLRjCDRgdCy0L7QtdC5INC70L7Qs9C40LrQvtC5XG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gLSDQntCx0YrQtdC60YIg0YEg0L/QsNGA0LDQvNC10YLRgNCw0LzQuFxuXHQgKi9cblx0cmVzdW1lKG9wdGlvbnMgPSB7fSkge1xuICAgICAgICB0aGlzLnJlbmRlcigpO1xuXHRcdHRoaXMuc2hvdygpO1xuXHR9XG5cblx0LyoqXG5cdCAqINCf0L7QutCw0LfRi9Cy0LDQtdGCIHZpZXdcblx0ICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSAtINCe0LHRitC10LrRgiDRgSDQv9Cw0YDQsNC80LXRgtGA0LDQvNC4XG5cdCAqL1xuXHRzaG93KG9wdGlvbnMgPSB7fSkge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcblx0XHRzZWxmLl9lbC5oaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgaWYgKHNlbGYuYm9keUNsYXNzKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoc2VsZi5ib2R5Q2xhc3MpO1xuICAgICAgICB9XG5cdH1cblxuXHQvKipcblx0ICog0KHQutGA0YvQstCw0LXRgiB2aWV3XG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gLSDQntCx0YrQtdC60YIg0YEg0L/QsNGA0LDQvNC10YLRgNCw0LzQuFxuXHQgKi9cblx0aGlkZShvcHRpb25zID0ge30pIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG5cdFx0c2VsZi5fZWwuaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgaWYgKHNlbGYuYm9keUNsYXNzKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoc2VsZi5ib2R5Q2xhc3MpO1xuICAgICAgICB9XG5cdH1cblxuXHQvKipcblx0ICog0KDQtdC90LTQtdGA0LjRgiB2aWV3XG5cdCAqINCd0LXQvtCx0YXQvtC00LjQvNC+INC/0LXRgNC10L7Qv9GA0LXQtNC10LvRj9GC0Yxcblx0ICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSAtINCe0LHRitC10LrRgiDRgSDQv9Cw0YDQsNC80LXRgtGA0LDQvNC4XG5cdCAqL1xuXHRyZW5kZXIob3B0aW9ucyA9IHt9KSB7XG5cblx0fVxuXG5cdC8qKlxuXHQgKiDQktGB0YLQsNCy0LvRj9C10YIg0YLQtdC60YPRidGD0Y4gdmlldyDQsiDQv9C10YDQtdC00LDQvdC90YvQuSDRjdC70LXQvNC10L3RglxuXHQgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbCAtIEhUTUwt0Y3Qu9C10LzQtdC90YIsINC6INC60L7RgtC+0YDQvtC80YMg0LTQvtCx0LDQstC70Y/QtdGC0YHRjyDRjdC70LXQvNC10L3RgiDRgtC10LrRg9GJ0LXQuSB2aWV3XG5cdCAqL1xuXHRhcHBlbmRUbyhlbCkge1xuXHRcdGVsLmFwcGVuZENoaWxkKHRoaXMuX2VsKTtcblx0fVxuXG5cdC8qKlxuXHQgKiDQo9C00LDQu9GP0LXRgiDRjdC70LXQvNC10L3RgiDRgtC10LrRg9GJ0LXQuSB2aWV3XG5cdCAqL1xuXHRyZW1vdmUoKSB7XG5cdFx0dGhpcy5fZWwgJiYgdGhpcy5fZWwucmVtb3ZlKCk7XG5cdH1cblxuXHQvKipcblx0ICog0JfQsNC80LXQvdGP0LXRgiDRjdC70LXQvNC10L3RgiDRgtC10LrRg9GJ0LXQuSB2aWV3XG5cdCAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsIC0gSFRNTC3RjdC70LXQvNC10L3Rgiwg0LrQvtGC0L7RgNGL0Lkg0YHRgtCw0L3QvtCy0LjRgtGB0Y8g0Y3Qu9C10LzQtdC90YLQvtC8INGC0LXQutGD0YnQtdC5IHZpZXdcblx0ICovXG5cdHNldEVsZW1lbnQoZWwpIHtcblx0XHR0aGlzLl9lbCAmJiB0aGlzLl9lbC5yZW1vdmUoKTtcblx0XHR0aGlzLl9lbCA9IGVsO1xuXHR9XG5cblx0LyoqXG5cdCAqINCj0YHRgtCw0L3QsNCy0LvQuNCy0LDQtdGCINGC0LXQutGD0YnQtdC5IHZpZXcg0L3QsNCx0L7RgCDQsNGC0YDQuNCx0YPRgtC+0LJcblx0ICogQHBhcmFtIHtPYmplY3R9IFthdHRycz17fV0gLSDQntCx0YrQtdC60YIg0YEg0LDRgtGA0LjQsdGD0YLQsNC80LgsINC60L7RgtC+0YDRi9C1INCx0YPQtNGD0YIg0YPRgdGC0LDQvdC+0LLQu9C10L3RiyDRgyDRgtC10LrRg9GJ0LXQs9C+INGN0LvQtdC80LXQvdGC0LAgdmlld1xuXHQgKi9cblx0c2V0QXR0cnMoYXR0cnMgPSB7fSkge1xuXHRcdE9iamVjdC5rZXlzKGF0dHJzKS5mb3JFYWNoKG5hbWUgPT4ge1xuXHRcdFx0dGhpcy5fZWwuc2V0QXR0cmlidXRlKG5hbWUsIGF0dHJzW25hbWVdKTtcblx0XHR9KVxuXHR9XG5cblx0LyoqXG5cdCAqINCS0L7Qt9Cy0YDQsNGJ0LDQtdGCINGB0YLRgNC+0LrRgywg0YHQvtC00LXRgNC20LDRiNGD0Y4g0YLQtdC60YHRgtC+0LLQvtC1INC/0YDQtdC00YHRgtCw0LLQu9C10L3QuNC1INGC0LXQutGD0YnQtdC5IHZpZXdcblx0ICogQHJldHVybnMge3N0cmluZ31cblx0ICovXG5cdHRvU3RyaW5nKCkge1xuXHRcdHJldHVybiB0aGlzLl9lbC5vdXRlckhUTUw7XG5cdH1cblxuXHQvKipcblx0ICog0KPRgdGC0LDQvdCw0LLQu9C40LLQsNC10YIg0YLQtdC60YPRidC10LkgdmlldyDRgNC+0YPRgtC10YBcblx0ICogQHBhcmFtIHtSb3V0ZXJ9IHJvdXRlciAtINC40L3RgdGC0LDQvdGBINGA0L7Rg9GC0LXRgNCwXG5cdCAqL1xuXHRzZXRSb3V0ZXIocm91dGVyKSB7XG5cdFx0dGhpcy5yb3V0ZXIgPSByb3V0ZXI7XG5cdH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3B1YmxpYy9qcy9tb2R1bGVzL3ZpZXcuanMiLCJpbXBvcnQgcmVxdWVzdCBmcm9tICcuLi9saWJzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlck1vZGVsIHtcbiAgICBjb25zdHJ1Y3RvcihkYXRhID0ge30pIHtcbiAgICAgICAgdGhpcy51c2VybmFtZSA9IGRhdGEudXNlcm5hbWUgfHwgJyc7XG4gICAgICAgIHRoaXMuZW1haWwgPSBkYXRhLmVtYWlsO1xuICAgICAgICB0aGlzLnBhc3N3b3JkID0gZGF0YS5wYXNzd29yZDtcbiAgICAgICAgdGhpcy5zY29yZSA9IDA7XG4gICAgICAgIHRoaXMuZ2FtZXMgPSAwO1xuXG4gICAgICAgIHRoaXMuZW1haWxFcnJvciA9ICcnO1xuICAgICAgICB0aGlzLnBhc3N3b3JkRXJyb3IgPSAnJztcbiAgICAgICAgdGhpcy5sb2dpbkVycm9yID0gJyc7XG4gICAgfVxuXG4gICAgdmFsaWRhdGVMb2dpbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLnVzZXJuYW1lLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICAgIHRoaXMubG9naW5FcnJvciA9ICfQn9C+0LbQsNC70YPQudGB0YLQsCwg0LLQstC10LTQuNGC0LUg0LrQu9C40LrRg9GF0YMhJztcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxvZ2luRXJyb3IgPSAnJztcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgdmFsaWRhdGVQYXNzd29yZCgpIHtcbiAgICAgICAgaWYgKHRoaXMucGFzc3dvcmQubGVuZ3RoIDwgMSkge1xuICAgICAgICAgICAgdGhpcy5wYXNzd29yZEVycm9yID0gJ9Cf0L7QttCw0LvRg9C50YHRgtCwLCDQstCy0LXQtNC40YLQtSDQv9Cw0YDQvtC70YwhJztcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5wYXNzd29yZC5sZW5ndGggPCA4KSB7XG4gICAgICAgICAgICB0aGlzLnBhc3N3b3JkRXJyb3IgPSAn0J/QsNGA0L7Qu9GMINC90YPQttC10L0g0LTQu9C40L3QvdC10LUgOCDRgdC40LzQstC+0LvQvtCyID0oJztcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBhc3N3b3JkRXJyb3IgPSAnJztcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgdmFsaWRhdGVFbWFpbCgpIHtcbiAgICAgICAgaWYgKHRoaXMuZW1haWwuc2VhcmNoKC8uK0AuK1xcLi4rLykgPT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLmVtYWlsRXJyb3IgPSAn0J/QvtC20LDQu9GD0LnRgdGC0LAsINC/0YDQvtCy0LXRgNGM0YLQtSDQv9GA0LDQstC40LvRjNC90L7RgdGC0YwgZS1tYWlsJztcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmVtYWlsRXJyb3IgPSAnJztcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgdmFsaWRhdGUoKSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgICByZXR1cm4gc2VsZi52YWxpZGF0ZUVtYWlsKCkgJiYgc2VsZi52YWxpZGF0ZUxvZ2luKCkgJiYgc2VsZi52YWxpZGF0ZVBhc3N3b3JkKCk7XG4gICAgfVxuXG4gICAgZ2V0RW1haWxFcnJvciAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVtYWlsRXJyb3I7XG4gICAgfVxuXG4gICAgZ2V0TG9naW5FcnJvciAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxvZ2luRXJyb3I7XG4gICAgfVxuXG4gICAgZ2V0UGFzc3dvcmRFcnJvciAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhc3N3b3JkRXJyb3I7XG4gICAgfVxuXG4gICAgc2F2ZSAoKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgICAgICB1c2VybmFtZTogdGhpcy51c2VybmFtZSxcbiAgICAgICAgICAgIGVtYWlsOiB0aGlzLmVtYWlsLFxuICAgICAgICAgICAgcGFzc3dvcmQ6IHRoaXMucGFzc3dvcmQsXG4gICAgICAgICAgICBnYW1lczogdGhpcy5nYW1lcyxcbiAgICAgICAgICAgIHNjb3JlOiB0aGlzLnNjb3JlLFxuICAgICAgICB9O1xuICAgICAgICBpZiAoIXRoaXMudmFsaWRhdGUoKSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSByZXF1ZXN0KCdodHRwczovL2Fpci1kcm9uZS5oZXJva3VhcHAuY29tL3VzZXInLCAnUE9TVCcsIGRhdGEpO1xuICAgICAgICBzd2l0Y2ggKHJlc3BvbnNlLnN0YXR1cykge1xuICAgICAgICAgICAgY2FzZSA0MDA6XG4gICAgICAgICAgICBjYXNlIDQwMzogdGhpcy5lbWFpbEVycm9yID0gJ9Cf0L7Qu9GM0LfQvtCy0LDRgtC10LvRjCDRgSDRgtCw0LrQuNC8INCw0LTRgNC10YHQvtC8INGD0LbQtSDQu9C10YLQsNC10YIhJztcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBhc3N3b3JkRXJyb3IgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjAwOiB0aGlzLmVtYWlsRXJyb3IgPSB0aGlzLnBhc3N3b3JkRXJyb3IgPSB0aGlzLmxvZ2luRXJyb3IgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6IGNvbnNvbGUubG9nKCfQp9GC0L4t0YLQviDQvdC1INGC0LDQuiwg0L3QviDQvdC1IDQwMCcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9XG5cbiAgICBkZWxldGUgKCkge1xuICAgICAgICAvLyBUT0RPXG4gICAgfVxuXG4gICAgbG9naW4gKCkge1xuICAgICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICAgICAgZW1haWw6IHRoaXMuZW1haWwsXG4gICAgICAgICAgICBwYXNzd29yZDogdGhpcy5wYXNzd29yZCxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSByZXF1ZXN0KCdodHRwczovL2Fpci1kcm9uZS5oZXJva3VhcHAuY29tL3Nlc3Npb24nLCAnUE9TVCcsIGRhdGEpO1xuICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZS5zdGF0dXMpXG4gICAgICAgIHN3aXRjaCAocmVzcG9uc2Uuc3RhdHVzKSB7XG4gICAgICAgICAgICBjYXNlIDQwMDpcbiAgICAgICAgICAgIGNhc2UgNDAzOiB0aGlzLmVtYWlsRXJyb3IgPSAn0J3QtdCy0LXRgNC90YvQuSDQu9C+0LPQuNC9INC40LvQuCDQv9Cw0YDQvtC70YwhJztcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBhc3N3b3JkRXJyb3IgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjAwOiB0aGlzLmVtYWlsRXJyb3IgPSB0aGlzLnBhc3N3b3JkRXJyb3IgPSB0aGlzLmxvZ2luRXJyb3IgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVzZXJuYW1lID0gcmVzcG9uc2UucmVzcG9uc2UudXNlcm5hbWU7IC8vINCa0L7Qs9C00LAg0L3QtSDQsdGD0LTQtdGCINGA0LDQsdC+0YLQsNGC0YwsINC+0YjQuNCx0LrRgyDQuNGB0LrQsNGC0Ywg0LfQtNC10YHRjC5cbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjb3JlID0gcmVzcG9uc2UucmVzcG9uc2Uuc2NvcmU7XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lcyA9IHJlc3BvbnNlLnJlc3BvbnNlLmdhbWVzO1xuICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDogY29uc29sZS5sb2coJ9Cn0YLQvi3RgtC+INC90LUg0YLQsNC6LCDQvdC+INC90LUgNDAwJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH1cblxuICAgIGdldFNjb3JlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zY29yZTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wdWJsaWMvanMvbW9kZWxzL1VzZXJNb2RlbC5qcyJdLCJzb3VyY2VSb290IjoiIn0=