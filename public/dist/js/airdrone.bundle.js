webpackJsonp([0],{

/***/ 115:
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _route = __webpack_require__(131);

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

/***/ 116:
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _view = __webpack_require__(48);

var _view2 = _interopRequireDefault(_view);

var _loginTmpl = __webpack_require__(123);

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
            var user = new UserModel({
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

/***/ 117:
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _view = __webpack_require__(48);

var _view2 = _interopRequireDefault(_view);

var _registrationTmpl = __webpack_require__(124);

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
            self.emailError.style.display = 'none';
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
            self.loginError.style.display = 'none';
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
            var user = new UserModel({
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
            if (response.status == 200) {
                self.router.go('/rooms');
            }
        }
    }]);

    return RegistrationView;
}(_view2.default);

exports.default = RegistrationView;

/***/ },

/***/ 118:
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _view = __webpack_require__(48);

var _view2 = _interopRequireDefault(_view);

var _RoomCollection = __webpack_require__(127);

var _RoomCollection2 = _interopRequireDefault(_RoomCollection);

var _DroneModel = __webpack_require__(129);

var _DroneModel2 = _interopRequireDefault(_DroneModel);

var _roomsTmpl = __webpack_require__(125);

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

/***/ 119:
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _view = __webpack_require__(48);

var _view2 = _interopRequireDefault(_view);

var _UserCollection = __webpack_require__(128);

var _UserCollection2 = _interopRequireDefault(_UserCollection);

var _scoreboardTmpl = __webpack_require__(126);

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

/***/ 123:
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

/***/ 124:
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

/***/ 125:
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
	},i18n=__fest_self && typeof __fest_self.i18n === "function" ? __fest_self.i18n : function (str) {return str;},___fest_log_error;if(typeof __fest_error === "undefined"){___fest_log_error = (typeof console !== "undefined" && console.error) ? function(){return Function.prototype.apply.call(console.error, console, arguments)} : function(){};}else{___fest_log_error=__fest_error};function __fest_log_error(msg){___fest_log_error(msg+"\nin block \""+__fest_debug_block+"\" at line: "+__fest_debug_line+"\nfile: "+__fest_debug_file)}function __fest_call(fn, params,cp){if(cp)for(var i in params)if(typeof params[i]=="function"&&params[i].param)params[i]=params[i]();return fn.call(__fest_self,params)}var json=__fest_context;__fest_buf+=("<h1 class=\"rooms__header\">Выберите игру</h1>");var i,room,__fest_iterator0;try{__fest_iterator0=json || {};}catch(e){__fest_iterator={};__fest_log_error(e.message);}for(i in __fest_iterator0){room=__fest_iterator0[i];__fest_buf+=("<div class=\"rooms__room\"><h2 class=\"rooms__room__header\">");try{__fest_buf+=(__fest_escapeHTML(room.name))}catch(e){__fest_log_error(e.message + "4");}__fest_buf+=(" (");try{__fest_buf+=(__fest_escapeHTML(room.ip))}catch(e){__fest_log_error(e.message + "4");}__fest_buf+=(")</h2></div><div class=\"rooms__details\" hidden=\"hidden\"><h1 class=\"rooms__details__header\">Выберите квадрокоптер:</h1><div class=\"rooms__details__colors\">");var i,color,__fest_iterator1;try{__fest_iterator1=room.availableColors || {};}catch(e){__fest_iterator={};__fest_log_error(e.message);}for(i in __fest_iterator1){color=__fest_iterator1[i];__fest_buf+=("<input class=\"rooms__details__colors__color js-color\" style=\"background-color:");try{__fest_buf+=(__fest_escapeHTML(color))}catch(e){__fest_log_error(e.message + "12");}__fest_buf+=("; color:");try{__fest_buf+=(__fest_escapeHTML(color))}catch(e){__fest_log_error(e.message + "12");}__fest_buf+=(";\"/>");}__fest_buf+=("</div><p class=\"js-error rooms__details__error\" hidden=\"hidden\"></p><button class=\"rooms__details__join js-join\">Присоединиться!</button><hr/><h1 class=\"rooms__details__header\">Уже в игре:</h1><table class=\"rooms__details__ul\"><ul>");var i,drone,__fest_iterator2;try{__fest_iterator2=room.drones || {};}catch(e){__fest_iterator={};__fest_log_error(e.message);}for(i in __fest_iterator2){drone=__fest_iterator2[i];__fest_buf+=("<tr class=\"room__details__ul__li\"><td><li>");try{__fest_buf+=(__fest_escapeHTML(drone.playerLogin))}catch(e){__fest_log_error(e.message + "27");}__fest_buf+=("</li></td><td><input type=\"text\" class=\"rooms__details__ul__li__color\" disabled=\"disabled\" style=\"background-color:");try{__fest_buf+=(__fest_escapeHTML(drone.color))}catch(e){__fest_log_error(e.message + "33");}__fest_buf+=(";\"/></td></tr>");}__fest_buf+=("</ul></table></div>");}__fest_buf+=("<hr/><button class=\"rooms__create\">Создать свою!</button>");__fest_to=__fest_chunks.length;if (__fest_to) {__fest_iterator = 0;for (;__fest_iterator<__fest_to;__fest_iterator++) {__fest_chunk=__fest_chunks[__fest_iterator];if (typeof __fest_chunk==="string") {__fest_html+=__fest_chunk;} else {__fest_fn=__fest_blocks[__fest_chunk.name];if (__fest_fn) __fest_html+=__fest_call(__fest_fn,__fest_chunk.params,__fest_chunk.cp);}}return __fest_html+__fest_buf;} else {return __fest_buf;}}

/***/ },

/***/ 126:
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

/***/ 127:
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

/***/ 128:
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

/***/ 129:
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

/***/ 130:
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

/***/ 131:
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pathToRegex = __webpack_require__(130);

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

/***/ 316:
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var _router = __webpack_require__(115);

var _router2 = _interopRequireDefault(_router);

var _loginView = __webpack_require__(116);

var _loginView2 = _interopRequireDefault(_loginView);

var _registrationView = __webpack_require__(117);

var _registrationView2 = _interopRequireDefault(_registrationView);

var _scoreboardView = __webpack_require__(119);

var _scoreboardView2 = _interopRequireDefault(_scoreboardView);

var _roomsView = __webpack_require__(118);

var _roomsView2 = _interopRequireDefault(_roomsView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = new _router2.default();
router.addRoute('/login', _loginView2.default);
router.addRoute('/registration', _registrationView2.default);
router.addRoute('/scoreboard', _scoreboardView2.default);
router.addRoute('/rooms', _roomsView2.default);
router.addRoute('/', _loginView2.default);
router.start();
window.router = router;

/***/ },

/***/ 48:
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

/***/ }

},[316]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvbW9kdWxlcy9yb3V0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL3ZpZXdzL2xvZ2luVmlldy5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvdmlld3MvcmVnaXN0cmF0aW9uVmlldy5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvdmlld3Mvcm9vbXNWaWV3LmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy92aWV3cy9zY29yZWJvYXJkVmlldy5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvdGVtcGxhdGVzL2xvZ2luLnRtcGwueG1sIiwid2VicGFjazovLy8uL3B1YmxpYy90ZW1wbGF0ZXMvcmVnaXN0cmF0aW9uLnRtcGwueG1sIiwid2VicGFjazovLy8uL3B1YmxpYy90ZW1wbGF0ZXMvcm9vbXMudG1wbC54bWwiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL3RlbXBsYXRlcy9zY29yZWJvYXJkLnRtcGwueG1sIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy9jb2xsZWN0aW9ucy9Sb29tQ29sbGVjdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvY29sbGVjdGlvbnMvVXNlckNvbGxlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL21vZGVscy9Ecm9uZU1vZGVsLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy9tb2R1bGVzL3BhdGhUb1JlZ2V4LmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy9tb2R1bGVzL3JvdXRlLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy9haXJkcm9uZS5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvbW9kdWxlcy92aWV3LmpzIl0sIm5hbWVzIjpbIlJvdXRlciIsIl9faW5zdGFuY2UiLCJyb3V0ZXMiLCJhY3RpdmVSb3V0ZSIsImhpc3RvcnkiLCJ3aW5kb3ciLCJwYXRobmFtZSIsInZpZXciLCJvcHRpb25zIiwicm91dGUiLCJzZXRSb3V0ZXIiLCJwdXNoIiwic3RhdGUiLCJvbnBvcHN0YXRlIiwiZXZlbnQiLCJsb2NhdGlvbiIsIm9ucm91dGUiLCJiaW5kIiwiZmluZCIsIm1hdGNoIiwibGVhdmUiLCJuYXZpZ2F0ZSIsInB1c2hTdGF0ZSIsImJhY2siLCJmb3J3YXJkIiwiTG9naW5WaWV3IiwiZWxlbWVudCIsImJvZHlDbGFzcyIsInNlbGYiLCJfZWwiLCJpbm5lckhUTUwiLCJkYXRhIiwiX2Zvcm0iLCJxdWVyeVNlbGVjdG9yIiwib25zdWJtaXQiLCJsb2dpbiIsImNoaWxkcmVuIiwiZW1haWwiLCJvbmJsdXIiLCJ2YWxpZGF0ZUVtYWlsIiwicGFzc3dvcmQiLCJ2YWxpZGF0ZVBhc3N3b3JkIiwib25rZXl1cCIsImUiLCJrZXlDb2RlIiwicmVnaXN0cmF0aW9uIiwib25jbGljayIsInJvdXRlciIsImdvIiwiZW1haWxFcnJvciIsInBhc3N3b3JkRXJyb3IiLCJlbGVtZW50cyIsInZhbHVlIiwic2VhcmNoIiwiaGlkZGVuIiwibGVuZ3RoIiwidmFsaWRhdGUiLCJ1c2VyIiwiVXNlck1vZGVsIiwicmVzcG9uc2UiLCJnZXRFbWFpbEVycm9yIiwiZ2V0UGFzc3dvcmRFcnJvciIsInN0YXR1cyIsIlJlZ2lzdHJhdGlvblZpZXciLCJyZWdpc3RlciIsInBhc3N3b3JkMiIsInZhbGlkYXRlTG9naW4iLCJsb2dpbkVycm9yIiwic3R5bGUiLCJkaXNwbGF5IiwidXNlcm5hbWUiLCJzYXZlIiwidGV4dENvbnRlbnQiLCJnZXRMb2dpbkVycm9yIiwiUm9vbXNWaWV3Iiwicm9vbUNvbGxlY3Rpb24iLCJkcm9uZSIsInNlbGVjdGVkUm9vbSIsInVuZGVmaW5lZCIsImZldGNoIiwidGhlbiIsImdldENvbGxlY3Rpb24iLCJlcnJvciIsInJvb21zIiwicXVlcnlTZWxlY3RvckFsbCIsInJvb20iLCJzZWxlY3RSb29tIiwibmV4dFNpYmxpbmciLCJjb2xvcnMiLCJjb25zb2xlIiwibG9nIiwiY29sb3IiLCJzZWxlY3RDb2xvciIsIl9qb2luIiwiam9pbiIsImRldGFpbHMiLCJpIiwiaWQiLCJjIiwiY2xhc3NMaXN0IiwiYWRkIiwicmVtb3ZlIiwiciIsIlNjb3JlYm9hcmRWaWV3IiwidXNlckNvbGxlY3Rpb24iLCJSb29tQ29sbGVjdGlvbiIsIl9kYXRhIiwicmVqZWN0IiwianNvbiIsInNvcnQiLCJjYXRjaCIsImEiLCJiIiwiZHJvbmVzIiwiVXNlckNvbGxlY3Rpb24iLCJzY29yZSIsIlJvb21Nb2RlbCIsInBsYXllckxvZ2luIiwicGxheWVySWQiLCJtZXRob2QiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsInBhdGhUb1JlZ2V4Iiwia2V5TmFtZXMiLCJwYXJ0cyIsInNwbGl0IiwiZmlsdGVyIiwicGFydCIsIm1hcCIsImV4ZWMiLCJzbGljZSIsIlJlZ0V4cCIsInBhdGgiLCJrZXlzIiwiY2hlY2siLCJldmVyeSIsInJlZ2V4cCIsInN0ZXAiLCJ0bXAiLCJyZXBsYWNlIiwicmVkdWNlIiwicHJldiIsImN1cnIiLCJwb3MiLCJSb3V0ZSIsInJlZ2V4IiwiVmlldyIsIl92aWV3IiwiaW5pdCIsIl9fcm91dGVyIiwicmVzdW1lIiwiT2JqZWN0IiwiYXNzaWduIiwicGF1c2UiLCJhZGRSb3V0ZSIsInN0YXJ0IiwidGFnTmFtZSIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImhpZGUiLCJzZXRBdHRycyIsImF0dHJzIiwicmVuZGVyIiwic2hvdyIsImVsIiwiYXBwZW5kQ2hpbGQiLCJmb3JFYWNoIiwic2V0QXR0cmlidXRlIiwibmFtZSIsIm91dGVySFRNTCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7QUFFQTtJQUNxQkEsTTtBQUNwQjs7O0FBR0EsbUJBQWM7QUFBQTs7QUFDYixNQUFJQSxPQUFPQyxVQUFYLEVBQXVCO0FBQ3RCLFVBQU9ELE9BQU9DLFVBQWQ7QUFDQTs7QUFFRCxPQUFLQyxNQUFMLEdBQWMsRUFBZDtBQUNBLE9BQUtDLFdBQUwsR0FBbUIsSUFBbkI7O0FBRUEsT0FBS0MsT0FBTCxHQUFlQyxPQUFPRCxPQUF0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bmUuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJvdXRlIGZyb20gJy4vcm91dGUnO1xuXG4vKiog0JrQu9Cw0YHRgSDRgNC+0YPRgtC10YDQsCAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm91dGVyIHtcblx0LyoqXG5cdCAqINCh0L7Qt9C00LDRkdGCINC90L7QstGL0Lkg0YDQvtGD0YLQtdGAINC40LvQuCDQstC+0LfQstGA0LDRidCw0LXRgiDRg9C20LUg0YHQvtC30LTQsNC90L3Ri9C5INC40L3RgdGC0LDQvdGBXG5cdCAqL1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRpZiAoUm91dGVyLl9faW5zdGFuY2UpIHtcblx0XHRcdHJldHVybiBSb3V0ZXIuX19pbnN0YW5jZTtcblx0XHR9XG5cblx0XHR0aGlzLnJvdXRlcyA9IFtdO1xuXHRcdHRoaXMuYWN0aXZlUm91dGUgPSBudWxsO1xuXG5cdFx0dGhpcy5oaXN0b3J5ID0gd2luZG93Lmhpc3Rvcnk7XG5cblx0XHRSb3V0ZXIuX19pbnN0YW5jZSA9IHRoaXM7XG5cdH1cblxuXHQvKipcblx0ICog0JTQvtCx0LDQstC70Y/QtdGCINC90L7QstGL0LkgUm91dGUg0LIg0YDQvtGD0YLQtdGAXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBwYXRobmFtZSAtINCo0LDQsdC70L7QvSDQv9GD0YLQuFxuXHQgKiBAcGFyYW0ge1ZpZXd9IHZpZXcgLSDQmtC70LDRgdGBINC60L7QvdC60YDQtdGC0L3QvtC5IFZpZXdcblx0ICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSAtINCU0L7Qv9C+0LvQvdC40YLQtdC70YzQvdGL0LUg0L/QsNGA0LDQvNC10YLRgNGLLCDQutC+0YLQvtGA0YvQtSDQsdGD0LTRg9GCINC/0LXRgNC10LTQsNC90Ysg0LLQviB2aWV3INC/0YDQuCDQtdGRINGB0L7Qt9C00LDQvdC40Lgg0Lgg0LjQvdC40YbQuNCw0LvQuNC30LDRhtC40Lhcblx0ICogQHJldHVybnMge1JvdXRlcn1cblx0ICovXG5cdGFkZFJvdXRlKHBhdGhuYW1lLCB2aWV3LCBvcHRpb25zID0ge30pIHtcblx0XHRsZXQgcm91dGUgPSBuZXcgUm91dGUocGF0aG5hbWUsIHZpZXcsIG9wdGlvbnMpO1xuXHRcdHJvdXRlLnNldFJvdXRlcih0aGlzKTtcblx0XHR0aGlzLnJvdXRlcy5wdXNoKHJvdXRlKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdC8qKlxuXHQgKiDQl9Cw0L/Rg9GB0LrQsNC10YIg0YDQvtGD0YLQtdGAINC4INC/0LXRgNC10YXQvtC00LjRgiDQv9C+INGC0LXQutGD0YnQtdC80YMg0L/Rg9GC0Lgg0LIg0L/RgNC40LvQvtC20LXQvdC40Lhcblx0ICogQHBhcmFtIHtPYmplY3R9IFtzdGF0ZT17fV0gLSDQntCx0YrQtdC60YIgc3RhdGUsINC60L7RgtC+0YDRi9C5INC/0LXRgNC10LTQsNGR0YLRgdGPINCyINC/0LXRgNCy0YvQuSDQstGL0LfQvtCyIG9ucm91dGVcblx0ICovXG5cdHN0YXJ0KHN0YXRlID0ge30pIHtcblx0XHR3aW5kb3cub25wb3BzdGF0ZSA9IGZ1bmN0aW9uIChldmVudCkge1xuXHRcdFx0bGV0IHN0YXRlID0gZXZlbnQuc3RhdGU7XG5cdFx0XHRsZXQgcGF0aG5hbWUgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG5cdFx0XHR0aGlzLm9ucm91dGUocGF0aG5hbWUsIHN0YXRlKTtcblx0XHR9LmJpbmQodGhpcyk7XG5cblx0XHRjb25zdCBwYXRobmFtZSA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcblx0XHR0aGlzLm9ucm91dGUocGF0aG5hbWUsIHN0YXRlKTtcblx0fVxuXG5cdC8qKlxuXHQgKiDQpNGD0L3QutGG0LjRjywg0LLRi9C30YvQstCw0LXQvNCw0Y8g0L/RgNC4INC/0LXRgNC10YXQvtC00LUg0L3QsCDQvdC+0LLRi9C5INGA0L7Rg9GCINCyINC/0YDQuNC70L7QttC10L3QuNC4XG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBwYXRobmFtZSAtINCf0YPRgtGMLCDQv9C+INC60L7RgtC+0YDQvtC80YMg0L/RgNC+0LjRgdGF0L7QtNC40YIg0L/QtdGA0LXRhdC+0LRcblx0ICogQHBhcmFtIHtPYmplY3R9IFtzdGF0ZT17fV0gLSDQntCx0YrQtdC60YIgc3RhdGUsINC60L7RgtC+0YDRi9C5INC/0LXRgNC10LTQsNGR0YLRgdGPINCyINCy0YvQt9C+0LIg0LzQtdGC0L7QtNCwIG5hdmlnYXRlXG5cdCAqL1xuXHRvbnJvdXRlKHBhdGhuYW1lLCBzdGF0ZSA9IHt9KSB7XG5cdFx0bGV0IHJvdXRlID0gdGhpcy5yb3V0ZXMuZmluZChyb3V0ZSA9PiByb3V0ZS5tYXRjaChwYXRobmFtZSkpO1xuXHRcdGlmICghcm91dGUpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5hY3RpdmVSb3V0ZSkge1xuXHRcdFx0dGhpcy5hY3RpdmVSb3V0ZS5sZWF2ZSgpO1xuXHRcdH1cblxuXHRcdHRoaXMuYWN0aXZlUm91dGUgPSByb3V0ZTtcblx0XHR0aGlzLmFjdGl2ZVJvdXRlLm5hdmlnYXRlKHBhdGhuYW1lLCBzdGF0ZSk7XG5cdH1cblxuXHQvKipcblx0ICog0J/RgNC+0LPRgNCw0LzQvNC90YvQuSDQv9C10YDQtdGF0L7QtCDQvdCwINC90L7QstGL0Lkg0L/Rg9GC0Yxcblx0ICogQHBhcmFtIHtzdHJpbmd9IHBhdGhuYW1lIC0g0J/Rg9GC0Yxcblx0ICogQHBhcmFtIHtPYmplY3R9IFtzdGF0ZT17fV0gLSDQntCx0YrQtdC60YIgc3RhdGUsINC60L7RgtC+0YDRi9C5INC/0LXRgNC10LTQsNGR0YLRgdGPINCyINCy0YvQt9C+0LIgaGlzdG9yeS5wdXNoU3RhdGVcblx0ICovXG5cdGdvKHBhdGhuYW1lLCBzdGF0ZSA9IHt9KSB7XG5cdFx0aWYgKHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9PT0gcGF0aG5hbWUpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0dGhpcy5oaXN0b3J5LnB1c2hTdGF0ZShzdGF0ZSwgJycsIHBhdGhuYW1lKTtcblx0XHR0aGlzLm9ucm91dGUocGF0aG5hbWUsIHN0YXRlKTtcblx0fVxuXG5cdC8qKlxuXHQgKiDQn9C+0LfQstC+0LvRj9C10YIg0YPRgdGC0LDQvdC+0LLQuNGC0Ywg0YHQstC+0Y4g0YHQvtCx0YHRgtCy0LXQvdC90YPRjiDRgNC10LDQu9C40LfQsNGG0LjRjiBIaXN0b3J5IEFQSVxuXHQgKiBAcGFyYW0ge09iamVjdH0gaGlzdG9yeSAtINC00L7Qu9C20LXQvSDQv9GA0LXQtNC+0YHRgtCw0LLQu9GP0YLRjCDRgNC10LDQu9C40LfQsNGG0LjRjiDQvNC10YLQvtC00L7QsiBiYWNrKCksIGZvcndhcmQoKSwgcHVzaFN0YXRlKClcblx0ICovXG5cdHNldEhpc3RvcnkoaGlzdG9yeSkge1xuXHRcdHRoaXMuaGlzdG9yeSA9IGhpc3Rvcnk7XG5cdH1cblxuXHQvKipcblx0ICog0JLQvtC30LLRgNCw0YIg0L3QsCDQvtC00LjQvSDRiNCw0LMg0L3QsNC30LDQtCDQsiDQuNGB0YLQvtGA0LjQuCDQsdGA0LDRg9C30LXRgNCwXG5cdCAqL1xuXHRiYWNrKCkge1xuXHRcdHRoaXMuaGlzdG9yeS5iYWNrKCk7XG5cdH1cblxuXHQvKipcblx0ICog0J/QtdGA0LXRhdC+0LQg0L3QsCDQvtC00LjQvSDRiNCw0LMg0LLQv9C10YDRkdC0INCyINC40YHRgtC+0YDQuNC4INCx0YDQsNGD0LfQtdGA0LBcblx0ICovXG5cdGZvcndhcmQoKSB7XG5cdFx0dGhpcy5oaXN0b3J5LmZvcndhcmQoKTtcblx0fVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcHVibGljL2pzL21vZHVsZXMvcm91dGVyLmpzIiwiaW1wb3J0IFZpZXcgZnJvbSAnLi4vbW9kdWxlcy92aWV3JztcbmltcG9ydCB0ZW1wbGF0ZSBmcm9tICcuLi8uLi90ZW1wbGF0ZXMvbG9naW4udG1wbC54bWwnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2dpblZpZXcgZXh0ZW5kcyBWaWV3IHtcbiAgICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgICAgIHN1cGVyKHsgZWxlbWVudDogJy5qcy1sb2dpbicsIGJvZHlDbGFzczogJ2JvZHktbG9naW4nIH0pO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgICAgIHNlbGYuX2VsLmlubmVySFRNTCA9IHRlbXBsYXRlKHNlbGYuZGF0YSk7XG4gICAgICAgIHNlbGYuX2Zvcm0gPSBzZWxmLl9lbC5xdWVyeVNlbGVjdG9yKCcuanMtbG9naW4tZm9ybScpO1xuICAgICAgICBzZWxmLl9mb3JtLm9uc3VibWl0ID0gZnVuY3Rpb24gKCkgeyBzZWxmLmxvZ2luKCk7IHJldHVybiBmYWxzZTsgfVxuICAgICAgICBzZWxmLl9mb3JtLmNoaWxkcmVuLmVtYWlsLm9uYmx1ciA9IGZ1bmN0aW9uICgpIHsgc2VsZi52YWxpZGF0ZUVtYWlsKCk7IH1cbiAgICAgICAgc2VsZi5fZm9ybS5jaGlsZHJlbi5wYXNzd29yZC5vbmJsdXIgPSBmdW5jdGlvbiAoKSB7IHNlbGYudmFsaWRhdGVQYXNzd29yZCgpOyB9XG4gICAgICAgIHNlbGYuX2Zvcm0uY2hpbGRyZW4ucGFzc3dvcmQub25rZXl1cCA9IGZ1bmN0aW9uIChlKSB7IFxuICAgICAgICAgICAgaWYgKGUua2V5Q29kZSAhPT0gOCAmJiBlLmtleUNvZGUgIT09IDkpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnZhbGlkYXRlUGFzc3dvcmQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzZWxmLl9mb3JtLmNoaWxkcmVuLnJlZ2lzdHJhdGlvbi5vbmNsaWNrID0gZnVuY3Rpb24gKCkgeyBzZWxmLnJvdXRlci5nbygnL3JlZ2lzdHJhdGlvbicpOyB9XG4gICAgICAgIHNlbGYuZW1haWxFcnJvciA9IHNlbGYuX2Zvcm0uY2hpbGRyZW4uZW1haWxFcnJvcjtcbiAgICAgICAgc2VsZi5wYXNzd29yZEVycm9yID0gc2VsZi5fZm9ybS5jaGlsZHJlbi5wYXNzd29yZEVycm9yO1xuICAgIH1cblxuICAgIHZhbGlkYXRlRW1haWwoKSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgICBpZiAoc2VsZi5fZm9ybS5lbGVtZW50cy5lbWFpbC52YWx1ZS5zZWFyY2goLy5ALi8pID09PSAtMSkge1xuICAgICAgICAgICAgc2VsZi5lbWFpbEVycm9yLmhpZGRlbiA9IGZhbHNlO1xuICAgICAgICAgICAgc2VsZi5lbWFpbEVycm9yLmlubmVySFRNTCA9ICfQn9C+0LbQsNC70YPQudGB0YLQsCwg0L/RgNC+0LLQtdGA0YzRgtC1INC/0YDQsNCy0LjQu9GM0L3QvtGB0YLRjCBlLW1haWwhJztcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBzZWxmLmVtYWlsRXJyb3IuaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgc2VsZi5lbWFpbEVycm9yLmlubmVySFRNTCA9ICcnO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICB2YWxpZGF0ZVBhc3N3b3JkKCkge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgaWYgKHNlbGYuX2Zvcm0uZWxlbWVudHMucGFzc3dvcmQudmFsdWUubGVuZ3RoIDwgMSkge1xuICAgICAgICAgICAgc2VsZi5wYXNzd29yZEVycm9yLmhpZGRlbiA9IGZhbHNlO1xuICAgICAgICAgICAgc2VsZi5wYXNzd29yZEVycm9yLmlubmVySFRNTCA9ICfQn9C+0LbQsNC70YPQudGB0YLQsCwg0LLQstC10LTQuNGC0LUg0L/QsNGA0L7Qu9GMISc7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgc2VsZi5wYXNzd29yZEVycm9yLmhpZGRlbiA9IHRydWU7XG4gICAgICAgIHNlbGYucGFzc3dvcmRFcnJvci5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgdmFsaWRhdGUoKSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgICByZXR1cm4gc2VsZi52YWxpZGF0ZUVtYWlsKCkgJiYgc2VsZi52YWxpZGF0ZVBhc3N3b3JkKCk7XG4gICAgfVxuXG4gICAgbG9naW4oKSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgICBpZiAoIXNlbGYudmFsaWRhdGUoKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHVzZXIgPSBuZXcgVXNlck1vZGVsKHtcbiAgICAgICAgICAgIGVtYWlsOiBzZWxmLl9mb3JtLmVsZW1lbnRzLmVtYWlsLnZhbHVlLFxuICAgICAgICAgICAgcGFzc3dvcmQ6IHNlbGYuX2Zvcm0uZWxlbWVudHMucGFzc3dvcmQudmFsdWUsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gdXNlci5sb2dpbigpO1xuICAgICAgICBzZWxmLl9mb3JtLmNoaWxkcmVuLmVtYWlsRXJyb3IuaW5uZXJIVE1MID0gdXNlci5nZXRFbWFpbEVycm9yKCk7XG4gICAgICAgIHNlbGYuX2Zvcm0uY2hpbGRyZW4ucGFzc3dvcmRFcnJvci5pbm5lckhUTUwgPSB1c2VyLmdldFBhc3N3b3JkRXJyb3IoKTtcbiAgICAgICAgc2VsZi5fZm9ybS5jaGlsZHJlbi5lbWFpbEVycm9yLmhpZGRlbiA9IHNlbGYuX2Zvcm0uY2hpbGRyZW4uZW1haWxFcnJvci5pbm5lckhUTUwgPyBmYWxzZSA6IHRydWU7XG4gICAgICAgIHNlbGYuX2Zvcm0uY2hpbGRyZW4ucGFzc3dvcmRFcnJvci5oaWRkZW4gPSBzZWxmLl9mb3JtLmNoaWxkcmVuLnBhc3N3b3JkRXJyb3IuaW5uZXJIVE1MID8gZmFsc2UgOiB0cnVlO1xuICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09IDIwMCkge1xuICAgICAgICAgICAgc2VsZi5yb3V0ZXIuZ28oJy9yb29tcycpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcHVibGljL2pzL3ZpZXdzL2xvZ2luVmlldy5qcyIsImltcG9ydCBWaWV3IGZyb20gJy4uL21vZHVsZXMvdmlldyc7XG5pbXBvcnQgdGVtcGxhdGUgZnJvbSAnLi4vLi4vdGVtcGxhdGVzL3JlZ2lzdHJhdGlvbi50bXBsLnhtbCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlZ2lzdHJhdGlvblZpZXcgZXh0ZW5kcyBWaWV3IHtcbiAgICBjb25zdHJ1Y3RvciAob3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIHN1cGVyKHsgZWxlbWVudDogJy5qcy1yZWdpc3RyYXRpb24nLCBib2R5Q2xhc3M6ICdib2R5LXJlZ2lzdHJhdGlvbicgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgc2VsZi5fZWwuaW5uZXJIVE1MID0gdGVtcGxhdGUoc2VsZi5kYXRhKTtcbiAgICAgICAgc2VsZi5fZm9ybSA9IHNlbGYuX2VsLnF1ZXJ5U2VsZWN0b3IoJy5qcy1yZWdpc3RyYXRpb24tZm9ybScpO1xuICAgICAgICBzZWxmLl9mb3JtLm9uc3VibWl0ID0gZnVuY3Rpb24gKCkgeyBzZWxmLnJlZ2lzdGVyKCk7IHJldHVybiBmYWxzZTsgfVxuICAgICAgICBzZWxmLl9mb3JtLmNoaWxkcmVuLmVtYWlsLm9uYmx1ciA9IGZ1bmN0aW9uICgpIHsgc2VsZi52YWxpZGF0ZUVtYWlsKCk7IH1cbiAgICAgICAgc2VsZi5fZm9ybS5jaGlsZHJlbi5wYXNzd29yZC5vbmJsdXIgPSBmdW5jdGlvbiAoKSB7IHNlbGYudmFsaWRhdGVQYXNzd29yZCgpOyB9XG4gICAgICAgIHNlbGYuX2Zvcm0uY2hpbGRyZW4ucGFzc3dvcmQub25rZXl1cCA9IGZ1bmN0aW9uIChlKSB7IFxuICAgICAgICAgICAgaWYgKGUua2V5Q29kZSAhPT0gOCAmJiBlLmtleUNvZGUgIT09IDkpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnZhbGlkYXRlUGFzc3dvcmQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzZWxmLl9mb3JtLmNoaWxkcmVuLnBhc3N3b3JkMi5vbmJsdXIgPSBmdW5jdGlvbiAoKSB7IHNlbGYudmFsaWRhdGVQYXNzd29yZCgpOyB9XG4gICAgICAgIHNlbGYuX2Zvcm0uY2hpbGRyZW4ucGFzc3dvcmQyLm9ua2V5dXAgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgaWYgKGUua2V5Q29kZSAhPT0gOCAmJiBlLmtleUNvZGUgIT09IDkpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnZhbGlkYXRlUGFzc3dvcmQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzZWxmLl9mb3JtLmNoaWxkcmVuLmxvZ2luLm9uYmx1ciA9IGZ1bmN0aW9uICgpIHsgc2VsZi52YWxpZGF0ZUxvZ2luKCk7IH1cbiAgICAgICAgc2VsZi5lbWFpbEVycm9yID0gc2VsZi5fZm9ybS5jaGlsZHJlbi5lbWFpbEVycm9yO1xuICAgICAgICBzZWxmLnBhc3N3b3JkRXJyb3IgPSBzZWxmLl9mb3JtLmNoaWxkcmVuLnBhc3N3b3JkRXJyb3I7XG4gICAgICAgIHNlbGYubG9naW5FcnJvciA9IHNlbGYuX2Zvcm0uY2hpbGRyZW4ubG9naW5FcnJvcjtcbiAgICB9XG5cbiAgICB2YWxpZGF0ZUVtYWlsKCkge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgaWYgKHNlbGYuX2Zvcm0uZWxlbWVudHMuZW1haWwudmFsdWUuc2VhcmNoKC8uK0AuK1xcLi4rLykgPT09IC0xKSB7XG4gICAgICAgICAgICBzZWxmLmVtYWlsRXJyb3IuaW5uZXJIVE1MID0gJ9Cf0L7QttCw0LvRg9C50YHRgtCwLCDQv9GA0L7QstC10YDRjNGC0LUg0L/RgNCw0LLQuNC70YzQvdC+0YHRgtGMIGUtbWFpbCc7XG4gICAgICAgICAgICBzZWxmLmVtYWlsRXJyb3Iuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgc2VsZi5lbWFpbEVycm9yLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIHNlbGYuZW1haWxFcnJvci5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgdmFsaWRhdGVQYXNzd29yZCgpIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgICAgIGlmIChzZWxmLl9mb3JtLmVsZW1lbnRzLnBhc3N3b3JkLnZhbHVlLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICAgIHNlbGYucGFzc3dvcmRFcnJvci5pbm5lckhUTUwgPSAn0J/QvtC20LDQu9GD0LnRgdGC0LAsINCy0LLQtdC00LjRgtC1INC/0LDRgNC+0LvRjCEnO1xuICAgICAgICAgICAgc2VsZi5wYXNzd29yZEVycm9yLmhpZGRlbiA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzZWxmLl9mb3JtLmVsZW1lbnRzLnBhc3N3b3JkLnZhbHVlLmxlbmd0aCA8IDgpIHtcbiAgICAgICAgICAgIHNlbGYucGFzc3dvcmRFcnJvci5pbm5lckhUTUwgPSAn0J/QsNGA0L7Qu9GMINC90YPQttC10L0g0LTQu9C40L3QvdC10LUgOCDRgdC40LzQstC+0LvQvtCyID0oJztcbiAgICAgICAgICAgIHNlbGYucGFzc3dvcmRFcnJvci5oaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2VsZi5fZm9ybS5lbGVtZW50cy5wYXNzd29yZDIudmFsdWUubGVuZ3RoID4gMFxuICAgICAgICAgICAgJiYgc2VsZi5fZm9ybS5lbGVtZW50cy5wYXNzd29yZC52YWx1ZSAhPSBzZWxmLl9mb3JtLmVsZW1lbnRzLnBhc3N3b3JkMi52YWx1ZSkge1xuICAgICAgICAgICAgc2VsZi5fZm9ybS5jaGlsZHJlbi5wYXNzd29yZEVycm9yLmlubmVySFRNTCA9ICfQn9Cw0YDQvtC70Lgg0L3QtSDRgdC+0LLQv9Cw0LTQsNGO0YIhJztcbiAgICAgICAgICAgIHNlbGYucGFzc3dvcmRFcnJvci5oaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBzZWxmLnBhc3N3b3JkRXJyb3IuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIHNlbGYucGFzc3dvcmRFcnJvci5oaWRkZW4gPSB0cnVlO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICB2YWxpZGF0ZUxvZ2luKCkge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgaWYgKHNlbGYuX2Zvcm0uZWxlbWVudHMubG9naW4udmFsdWUubGVuZ3RoIDwgMSkge1xuICAgICAgICAgICAgc2VsZi5sb2dpbkVycm9yLmlubmVySFRNTCA9ICfQn9C+0LbQsNC70YPQudGB0YLQsCwg0LLQstC10LTQuNGC0LUg0LrQu9C40LrRg9GF0YMhJztcbiAgICAgICAgICAgIHNlbGYubG9naW5FcnJvci5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBzZWxmLmxvZ2luRXJyb3Iuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgc2VsZi5sb2dpbkVycm9yLmlubmVySFRNTCA9ICcnO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICB2YWxpZGF0ZSgpIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgICAgIHJldHVybiBzZWxmLnZhbGlkYXRlRW1haWwoc2VsZikgJiYgc2VsZi52YWxpZGF0ZVBhc3N3b3JkKHNlbGYpICYmIHNlbGYudmFsaWRhdGVMb2dpbihzZWxmKTtcbiAgICB9XG5cbiAgICByZWdpc3RlcigpIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgICAgIGlmICghc2VsZi52YWxpZGF0ZSgpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdXNlciA9IG5ldyBVc2VyTW9kZWwoe1xuICAgICAgICAgICAgdXNlcm5hbWU6IHNlbGYuX2Zvcm0uZWxlbWVudHMubG9naW4udmFsdWUsXG4gICAgICAgICAgICBlbWFpbDogc2VsZi5fZm9ybS5lbGVtZW50cy5lbWFpbC52YWx1ZSxcbiAgICAgICAgICAgIHBhc3N3b3JkOiBzZWxmLl9mb3JtLmVsZW1lbnRzLnBhc3N3b3JkLnZhbHVlLFxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCByZXNwb25zZSA9IHVzZXIuc2F2ZSgpO1xuICAgICAgICBzZWxmLl9mb3JtLmNoaWxkcmVuLmVtYWlsRXJyb3IudGV4dENvbnRlbnQgPSB1c2VyLmdldEVtYWlsRXJyb3IoKTtcbiAgICAgICAgc2VsZi5fZm9ybS5jaGlsZHJlbi5wYXNzd29yZEVycm9yLnRleHRDb250ZW50ID0gdXNlci5nZXRQYXNzd29yZEVycm9yKCk7XG4gICAgICAgIHNlbGYuX2Zvcm0uY2hpbGRyZW4ubG9naW5FcnJvci50ZXh0Q29udGVudCA9IHVzZXIuZ2V0TG9naW5FcnJvcigpO1xuICAgICAgICBzZWxmLl9mb3JtLmNoaWxkcmVuLmVtYWlsRXJyb3IuaGlkZGVuID0gc2VsZi5fZm9ybS5jaGlsZHJlbi5lbWFpbEVycm9yLnRleHRDb250ZW50ID8gZmFsc2UgOiB0cnVlO1xuICAgICAgICBzZWxmLl9mb3JtLmNoaWxkcmVuLmxvZ2luRXJyb3IuaGlkZGVuID0gc2VsZi5fZm9ybS5jaGlsZHJlbi5sb2dpbkVycm9yLnRleHRDb250ZW50ID8gZmFsc2UgOiB0cnVlO1xuICAgICAgICBzZWxmLl9mb3JtLmNoaWxkcmVuLnBhc3N3b3JkRXJyb3IuaGlkZGVuID0gc2VsZi5fZm9ybS5jaGlsZHJlbi5wYXNzd29yZEVycm9yLnRleHRDb250ZW50ID8gZmFsc2UgOiB0cnVlO1xuICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09IDIwMCkge1xuICAgICAgICAgICAgc2VsZi5yb3V0ZXIuZ28oJy9yb29tcycpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcHVibGljL2pzL3ZpZXdzL3JlZ2lzdHJhdGlvblZpZXcuanMiLCIvLyBUT0RPOiB1c2VyIGlkIGZyb20gY29va2llIHRvIGRyb25lIG1vZGVsXG5pbXBvcnQgVmlldyBmcm9tICcuLi9tb2R1bGVzL3ZpZXcnO1xuaW1wb3J0IFJvb21Db2xsZWN0aW9uIGZyb20gJy4uL2NvbGxlY3Rpb25zL1Jvb21Db2xsZWN0aW9uJztcbmltcG9ydCBEcm9uZU1vZGVsIGZyb20gJy4uL21vZGVscy9Ecm9uZU1vZGVsJztcbmltcG9ydCB0ZW1wbGF0ZSBmcm9tICcuLi8uLi90ZW1wbGF0ZXMvcm9vbXMudG1wbC54bWwnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb29tc1ZpZXcgZXh0ZW5kcyBWaWV3IHtcbiAgICBjb25zdHJ1Y3RvciAoZGF0YSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKHsgZWxlbWVudDogJy5qcy1yb29tcycsIGJvZHlDbGFzczogJ2JvZHktcm9vbXMnIH0pO1xuICAgICAgICB0aGlzLnJvb21Db2xsZWN0aW9uID0gbmV3IFJvb21Db2xsZWN0aW9uKCk7XG4gICAgICAgIHRoaXMuZHJvbmUgPSBuZXcgRHJvbmVNb2RlbCgpO1xuICAgICAgICB0aGlzLnNlbGVjdGVkUm9vbSA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICByZW5kZXIgKCkge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgc2VsZi5yb29tQ29sbGVjdGlvbi5mZXRjaCgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgc2VsZi5fZWwuaW5uZXJIVE1MID0gdGVtcGxhdGUoc2VsZi5yb29tQ29sbGVjdGlvbi5nZXRDb2xsZWN0aW9uKCkpO1xuXG4gICAgICAgICAgICBzZWxmLmVycm9yID0gc2VsZi5fZWwucXVlcnlTZWxlY3RvcignLmpzLWVycm9yJyk7XG4gICAgXG4gICAgICAgICAgICBzZWxmLnJvb21zID0gc2VsZi5fZWwucXVlcnlTZWxlY3RvckFsbCgnLnJvb21zX19yb29tJyk7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHJvb20gb2Ygc2VsZi5yb29tcykge1xuICAgICAgICAgICAgICAgIHJvb20ub25jbGljayA9IGZ1bmN0aW9uICgpIHsgc2VsZi5zZWxlY3RSb29tKHJvb20sIHJvb20ubmV4dFNpYmxpbmcpIH07XG4gICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICBzZWxmLmNvbG9ycyA9IHNlbGYuX2VsLnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy1jb2xvcicpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coc2VsZi5jb2xvcnMpO1xuICAgICAgICAgICAgZm9yIChjb25zdCBjb2xvciBvZiBzZWxmLmNvbG9ycykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGNvbG9yKTtcbiAgICAgICAgICAgICAgICBjb2xvci5vbmNsaWNrID0gZnVuY3Rpb24gKCkgeyBjb25zb2xlLmxvZygnZW50ZXJlZCBjb2xvciBjbGljaycpOyBzZWxmLnNlbGVjdENvbG9yKGNvbG9yKSB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2JlZm9yZSBqb2luJyk7XG4gICAgXG4gICAgICAgICAgICBzZWxmLl9qb2luID0gc2VsZi5fZWwucXVlcnlTZWxlY3RvcignLmpzLWpvaW4nKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHNlbGYuam9pbik7XG4gICAgICAgICAgICBzZWxmLl9qb2luLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7IHNlbGYuam9pbigpOyB9O1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2ZpbmFsJyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNlbGVjdFJvb20gKHJvb20sIGRldGFpbHMpIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VsZi5yb29tcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgaWYgKHNlbGYucm9vbXNbaV0gIT09IHJvb20pIHtcbiAgICAgICAgICAgICAgICBzZWxmLnJvb21zW2ldLmhpZGRlbiA9IHRydWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlbGYuc2VsZWN0ZWRSb29tID0gc2VsZi5yb29tQ29sbGVjdGlvbi5nZXRDb2xsZWN0aW9uKClbaV0uaWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZGV0YWlscy5oaWRkZW4gPSBmYWxzZTtcbiAgICB9XG5cbiAgICBzZWxlY3RDb2xvcihjb2xvcikge1xuICAgICAgICBjb25zb2xlLmxvZyhjb2xvcik7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgICBmb3IgKGNvbnN0IGMgb2Ygc2VsZi5jb2xvcnMpIHtcbiAgICAgICAgICAgIGlmIChjID09PSBjb2xvcikge1xuICAgICAgICAgICAgICAgIGMuY2xhc3NMaXN0LmFkZCgncm9vbXNfX2RldGFpbHNfX2NvbG9yc19fY29sb3ItY2xpY2tlZCcpO1xuICAgICAgICAgICAgICAgIGMuY2xhc3NMaXN0LnJlbW92ZSgncm9vbXNfX2RldGFpbHNfX2NvbG9yc19fY29sb3InKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYy5jbGFzc0xpc3QuYWRkKCdyb29tc19fZGV0YWlsc19fY29sb3JzX19jb2xvcicpO1xuICAgICAgICAgICAgICAgIGMuY2xhc3NMaXN0LnJlbW92ZSgncm9vbXNfX2RldGFpbHNfX2NvbG9yc19fY29sb3ItY2xpY2tlZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHNlbGYuZHJvbmUuY29sb3IgPSBjb2xvci5zdHlsZVsnYmFja2dyb3VuZC1jb2xvciddO1xuICAgICAgICBzZWxmLmVycm9yLnRleHRDb250ZW50ID0gJyc7XG4gICAgICAgIHNlbGYuZXJyb3IuaGlkZGVuID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBqb2luKCkge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgY29uc29sZS5sb2coc2VsZi5kcm9uZSk7XG4gICAgICAgIGlmIChzZWxmLmRyb25lLmNvbG9yICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdpZicpO1xuICAgICAgICAgICAgc2VsZi5lcnJvci50ZXh0Q29udGVudCA9ICcnO1xuICAgICAgICAgICAgc2VsZi5lcnJvci5oaWRkZW4gPSB0cnVlO1xuICAgICAgICAgICAgc2VsZi5kcm9uZS5zYXZlKHNlbGYuc2VsZWN0ZWRSb29tKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5kcm9uZS5lcnJvciAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5lcnJvci50ZXh0Q29udGVudCA9ICfQp9GC0L4t0YLQviDQv9C+0YjQu9C+INC90LUg0YLQsNC6LiDQn9C+0L/RgNC+0LHRg9C50YLQtSDQtdGJ0LUg0YDQsNC3ISc7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZXJyb3IuaGlkZGVuID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNlbGYucm91dGVyLmdvKCcvZ2FtZScpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZWxzZScpO1xuICAgICAgICAgICAgc2VsZi5lcnJvci50ZXh0Q29udGVudCA9ICfQktGL0LHQtdGA0LjRgtC1INGG0LLQtdGCINC00YDQvtC90LAhJztcbiAgICAgICAgICAgIHNlbGYuZXJyb3IuaGlkZGVuID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBiYWNrIChkZXRhaWxzKSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgICBkZXRhaWxzLmhpZGRlbiA9IHRydWU7XG4gICAgICAgIGZvciAoY29uc3QgciBvZiBzZWxmLnJvb21zKSB7XG4gICAgICAgICAgICByLmhpZGRlbiA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHNlbGYuc2VsZWN0ZWRSb29tID0gdW5kZWZpbmVkO1xuICAgIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcHVibGljL2pzL3ZpZXdzL3Jvb21zVmlldy5qcyIsImltcG9ydCBWaWV3IGZyb20gJy4uL21vZHVsZXMvdmlldyc7XG5pbXBvcnQgVXNlckNvbGxlY3Rpb24gZnJvbSAnLi4vY29sbGVjdGlvbnMvVXNlckNvbGxlY3Rpb24nO1xuaW1wb3J0IHRlbXBsYXRlIGZyb20gJy4uLy4uL3RlbXBsYXRlcy9zY29yZWJvYXJkLnRtcGwueG1sJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NvcmVib2FyZFZpZXcgZXh0ZW5kcyBWaWV3IHtcbiAgICBjb25zdHJ1Y3RvciAob3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIHN1cGVyKHsgZWxlbWVudDogJy5qcy1zY29yZWJvYXJkJywgYm9keUNsYXNzOiAnYm9keS1zY29yZWJvYXJkJyB9KTtcbiAgICAgICAgdGhpcy51c2VyQ29sbGVjdGlvbiA9IG5ldyBVc2VyQ29sbGVjdGlvbigpO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgICAgIHNlbGYudXNlckNvbGxlY3Rpb24uZmV0Y2goKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHNlbGYuX2VsLmlubmVySFRNTCA9IHRlbXBsYXRlKHNlbGYudXNlckNvbGxlY3Rpb24uZ2V0Q29sbGVjdGlvbigpKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcHVibGljL2pzL3ZpZXdzL3Njb3JlYm9hcmRWaWV3LmpzIiwiXG4vKiogXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiAvaG9tZS9pdmFuL0RvY3VtZW50cy8yMDE2XzJfQWlyRHJvbmUvcHVibGljL3RlbXBsYXRlcy9sb2dpbi50bXBsIHRlbXBsYXRlXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoX19mZXN0X2NvbnRleHQpe1widXNlIHN0cmljdFwiO3ZhciBfX2Zlc3Rfc2VsZj10aGlzLF9fZmVzdF9idWY9XCJcIixfX2Zlc3RfY2h1bmtzPVtdLF9fZmVzdF9jaHVuayxfX2Zlc3RfYXR0cnM9W10sX19mZXN0X3NlbGVjdCxfX2Zlc3RfaWYsX19mZXN0X2l0ZXJhdG9yLF9fZmVzdF90byxfX2Zlc3RfZm4sX19mZXN0X2h0bWw9XCJcIixfX2Zlc3RfYmxvY2tzPXt9LF9fZmVzdF9wYXJhbXMsX19mZXN0X2VsZW1lbnQsX19mZXN0X2RlYnVnX2ZpbGU9XCJcIixfX2Zlc3RfZGVidWdfbGluZT1cIlwiLF9fZmVzdF9kZWJ1Z19ibG9jaz1cIlwiLF9fZmVzdF9lbGVtZW50X3N0YWNrID0gW10sX19mZXN0X3Nob3J0X3RhZ3MgPSB7XCJhcmVhXCI6IHRydWUsIFwiYmFzZVwiOiB0cnVlLCBcImJyXCI6IHRydWUsIFwiY29sXCI6IHRydWUsIFwiY29tbWFuZFwiOiB0cnVlLCBcImVtYmVkXCI6IHRydWUsIFwiaHJcIjogdHJ1ZSwgXCJpbWdcIjogdHJ1ZSwgXCJpbnB1dFwiOiB0cnVlLCBcImtleWdlblwiOiB0cnVlLCBcImxpbmtcIjogdHJ1ZSwgXCJtZXRhXCI6IHRydWUsIFwicGFyYW1cIjogdHJ1ZSwgXCJzb3VyY2VcIjogdHJ1ZSwgXCJ3YnJcIjogdHJ1ZX0sX19mZXN0X2pzY2hhcnMgPSAvW1xcXFwnXCJcXC9cXG5cXHJcXHRcXGJcXGY8Pl0vZyxfX2Zlc3RfanNjaGFyc190ZXN0ID0gL1tcXFxcJ1wiXFwvXFxuXFxyXFx0XFxiXFxmPD5dLyxfX2Zlc3RfaHRtbGNoYXJzID0gL1smPD5cIl0vZyxfX2Zlc3RfaHRtbGNoYXJzX3Rlc3QgPSAvWyY8PlwiXS8sX19mZXN0X2pzaGFzaCA9IHtcIlxcXCJcIjogXCJcXFxcXFxcIlwiLCBcIlxcXFxcIjogXCJcXFxcXFxcXFwiLCBcIi9cIjogXCJcXFxcL1wiLCBcIlxcblwiOiBcIlxcXFxuXCIsIFwiXFxyXCI6IFwiXFxcXHJcIiwgXCJcXHRcIjogXCJcXFxcdFwiLCBcIlxcYlwiOiBcIlxcXFxiXCIsIFwiXFxmXCI6IFwiXFxcXGZcIiwgXCInXCI6IFwiXFxcXCdcIiwgXCI8XCI6IFwiXFxcXHUwMDNDXCIsIFwiPlwiOiBcIlxcXFx1MDAzRVwifSxfX2Zlc3RfaHRtbGhhc2ggPSB7XCImXCI6IFwiJmFtcDtcIiwgXCI8XCI6IFwiJmx0O1wiLCBcIj5cIjogXCImZ3Q7XCIsIFwiXFxcIlwiOiBcIiZxdW90O1wifSxfX2Zlc3RfZXNjYXBlSlMgPSBmdW5jdGlvbiBfX2Zlc3RfZXNjYXBlSlModmFsdWUpIHtcblx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuXHRcdFx0aWYgKF9fZmVzdF9qc2NoYXJzX3Rlc3QudGVzdCh2YWx1ZSkpIHtcblx0XHRcdFx0cmV0dXJuIHZhbHVlLnJlcGxhY2UoX19mZXN0X2pzY2hhcnMsIF9fZmVzdF9yZXBsYWNlSlMpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiB2YWx1ZTtcblx0fSxfX2Zlc3RfcmVwbGFjZUpTID0gZnVuY3Rpb24gX19mZXN0X3JlcGxhY2VKUyhjaHIpIHtcblx0XHRyZXR1cm4gX19mZXN0X2pzaGFzaFtjaHJdO1xuXHR9LF9fZmVzdF9lc2NhcGVIVE1MID0gZnVuY3Rpb24gX19mZXN0X2VzY2FwZUhUTUwodmFsdWUpIHtcblx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuXHRcdFx0aWYgKF9fZmVzdF9odG1sY2hhcnNfdGVzdC50ZXN0KHZhbHVlKSkge1xuXHRcdFx0XHRyZXR1cm4gdmFsdWUucmVwbGFjZShfX2Zlc3RfaHRtbGNoYXJzLCBfX2Zlc3RfcmVwbGFjZUhUTUwpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiB2YWx1ZTtcblx0fSxfX2Zlc3RfcmVwbGFjZUhUTUwgPSBmdW5jdGlvbiBfX2Zlc3RfcmVwbGFjZUhUTUwoY2hyKSB7XG5cdFx0cmV0dXJuIF9fZmVzdF9odG1saGFzaFtjaHJdO1xuXHR9LF9fZmVzdF9leHRlbmQgPSBmdW5jdGlvbiBfX2Zlc3RfZXh0ZW5kKGRlc3QsIHNyYykge1xuXHRcdGZvciAodmFyIGtleSBpbiBzcmMpIHtcblx0XHRcdGlmIChzcmMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRkZXN0W2tleV0gPSBzcmNba2V5XTtcblx0XHRcdH1cblx0XHR9XG5cdH0sX19mZXN0X3BhcmFtID0gZnVuY3Rpb24gX19mZXN0X3BhcmFtKGZuKSB7XG5cdFx0Zm4ucGFyYW0gPSB0cnVlO1xuXHRcdHJldHVybiBmbjtcblx0fSxpMThuPV9fZmVzdF9zZWxmICYmIHR5cGVvZiBfX2Zlc3Rfc2VsZi5pMThuID09PSBcImZ1bmN0aW9uXCIgPyBfX2Zlc3Rfc2VsZi5pMThuIDogZnVuY3Rpb24gKHN0cikge3JldHVybiBzdHI7fSxfX19mZXN0X2xvZ19lcnJvcjtpZih0eXBlb2YgX19mZXN0X2Vycm9yID09PSBcInVuZGVmaW5lZFwiKXtfX19mZXN0X2xvZ19lcnJvciA9ICh0eXBlb2YgY29uc29sZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBjb25zb2xlLmVycm9yKSA/IGZ1bmN0aW9uKCl7cmV0dXJuIEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseS5jYWxsKGNvbnNvbGUuZXJyb3IsIGNvbnNvbGUsIGFyZ3VtZW50cyl9IDogZnVuY3Rpb24oKXt9O31lbHNle19fX2Zlc3RfbG9nX2Vycm9yPV9fZmVzdF9lcnJvcn07ZnVuY3Rpb24gX19mZXN0X2xvZ19lcnJvcihtc2cpe19fX2Zlc3RfbG9nX2Vycm9yKG1zZytcIlxcbmluIGJsb2NrIFxcXCJcIitfX2Zlc3RfZGVidWdfYmxvY2srXCJcXFwiIGF0IGxpbmU6IFwiK19fZmVzdF9kZWJ1Z19saW5lK1wiXFxuZmlsZTogXCIrX19mZXN0X2RlYnVnX2ZpbGUpfWZ1bmN0aW9uIF9fZmVzdF9jYWxsKGZuLCBwYXJhbXMsY3Ape2lmKGNwKWZvcih2YXIgaSBpbiBwYXJhbXMpaWYodHlwZW9mIHBhcmFtc1tpXT09XCJmdW5jdGlvblwiJiZwYXJhbXNbaV0ucGFyYW0pcGFyYW1zW2ldPXBhcmFtc1tpXSgpO3JldHVybiBmbi5jYWxsKF9fZmVzdF9zZWxmLHBhcmFtcyl9dmFyIGpzb249X19mZXN0X2NvbnRleHQ7X19mZXN0X2J1Zis9KFwiPGZvcm0gY2xhc3M9XFxcImpzLWxvZ2luLWZvcm0gbG9naW5fX2Zvcm1cXFwiIG5hbWU9XFxcImxvZ2luRm9ybVxcXCI+PGgxIGNsYXNzPVxcXCJsb2dpbl9faGVhZGVyXFxcIj7QktGF0L7QtDwvaDE+PHNwYW4gY2xhc3M9XFxcImpzLWVtYWlsLWVycm9yIGxvZ2luX19mb3JtX19lcnJvclxcXCIgbmFtZT1cXFwiZW1haWxFcnJvclxcXCIgaGlkZGVuPVxcXCJoaWRkZW5cXFwiPjwvc3Bhbj48aW5wdXQgcGxhY2Vob2xkZXI9XFxcIkUtbWFpbFxcXCIgY2xhc3M9XFxcImpzLWVtYWlsIGxvZ2luX19mb3JtX19pbnB1dFxcXCIgbmFtZT1cXFwiZW1haWxcXFwiIHR5cGU9XFxcInRleHRcXFwiLz48c3BhbiBjbGFzcz1cXFwianMtcGFzc3dvcmQtZXJyb3IgbG9naW5fX2Zvcm1fX2Vycm9yXFxcIiBuYW1lPVxcXCJwYXNzd29yZEVycm9yXFxcIiBoaWRkZW49XFxcImhpZGRlblxcXCI+PC9zcGFuPjxpbnB1dCBwbGFjZWhvbGRlcj1cXFwiUGFzc3dvcmRcXFwiIGNsYXNzPVxcXCJqcy1wYXNzd29yZCBsb2dpbl9fZm9ybV9faW5wdXRcXFwiIG5hbWU9XFxcInBhc3N3b3JkXFxcIiB0eXBlPVxcXCJwYXNzd29yZFxcXCIvPjxidXR0b24gY2xhc3M9XFxcImpzX3N1Ym1pdCBsb2dpbl9fZm9ybV9fYnV0dG9uXFxcIiBuYW1lPVxcXCJidXR0b25cXFwiPtCS0L7QudGC0LghPC9idXR0b24+PGEgY2xhc3M9XFxcImxvZ2luX19mb3JtX19saW5rXFxcIiBuYW1lPVxcXCJyZWdpc3RyYXRpb25cXFwiPtCg0LXQs9C40YHRgtGA0LDRhtC40Y88L2E+PC9mb3JtPlwiKTtfX2Zlc3RfdG89X19mZXN0X2NodW5rcy5sZW5ndGg7aWYgKF9fZmVzdF90bykge19fZmVzdF9pdGVyYXRvciA9IDA7Zm9yICg7X19mZXN0X2l0ZXJhdG9yPF9fZmVzdF90bztfX2Zlc3RfaXRlcmF0b3IrKykge19fZmVzdF9jaHVuaz1fX2Zlc3RfY2h1bmtzW19fZmVzdF9pdGVyYXRvcl07aWYgKHR5cGVvZiBfX2Zlc3RfY2h1bms9PT1cInN0cmluZ1wiKSB7X19mZXN0X2h0bWwrPV9fZmVzdF9jaHVuazt9IGVsc2Uge19fZmVzdF9mbj1fX2Zlc3RfYmxvY2tzW19fZmVzdF9jaHVuay5uYW1lXTtpZiAoX19mZXN0X2ZuKSBfX2Zlc3RfaHRtbCs9X19mZXN0X2NhbGwoX19mZXN0X2ZuLF9fZmVzdF9jaHVuay5wYXJhbXMsX19mZXN0X2NodW5rLmNwKTt9fXJldHVybiBfX2Zlc3RfaHRtbCtfX2Zlc3RfYnVmO30gZWxzZSB7cmV0dXJuIF9fZmVzdF9idWY7fX1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3B1YmxpYy90ZW1wbGF0ZXMvbG9naW4udG1wbC54bWxcbi8vIG1vZHVsZSBpZCA9IDEyM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcbi8qKiBcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIC9ob21lL2l2YW4vRG9jdW1lbnRzLzIwMTZfMl9BaXJEcm9uZS9wdWJsaWMvdGVtcGxhdGVzL3JlZ2lzdHJhdGlvbi50bXBsIHRlbXBsYXRlXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoX19mZXN0X2NvbnRleHQpe1widXNlIHN0cmljdFwiO3ZhciBfX2Zlc3Rfc2VsZj10aGlzLF9fZmVzdF9idWY9XCJcIixfX2Zlc3RfY2h1bmtzPVtdLF9fZmVzdF9jaHVuayxfX2Zlc3RfYXR0cnM9W10sX19mZXN0X3NlbGVjdCxfX2Zlc3RfaWYsX19mZXN0X2l0ZXJhdG9yLF9fZmVzdF90byxfX2Zlc3RfZm4sX19mZXN0X2h0bWw9XCJcIixfX2Zlc3RfYmxvY2tzPXt9LF9fZmVzdF9wYXJhbXMsX19mZXN0X2VsZW1lbnQsX19mZXN0X2RlYnVnX2ZpbGU9XCJcIixfX2Zlc3RfZGVidWdfbGluZT1cIlwiLF9fZmVzdF9kZWJ1Z19ibG9jaz1cIlwiLF9fZmVzdF9lbGVtZW50X3N0YWNrID0gW10sX19mZXN0X3Nob3J0X3RhZ3MgPSB7XCJhcmVhXCI6IHRydWUsIFwiYmFzZVwiOiB0cnVlLCBcImJyXCI6IHRydWUsIFwiY29sXCI6IHRydWUsIFwiY29tbWFuZFwiOiB0cnVlLCBcImVtYmVkXCI6IHRydWUsIFwiaHJcIjogdHJ1ZSwgXCJpbWdcIjogdHJ1ZSwgXCJpbnB1dFwiOiB0cnVlLCBcImtleWdlblwiOiB0cnVlLCBcImxpbmtcIjogdHJ1ZSwgXCJtZXRhXCI6IHRydWUsIFwicGFyYW1cIjogdHJ1ZSwgXCJzb3VyY2VcIjogdHJ1ZSwgXCJ3YnJcIjogdHJ1ZX0sX19mZXN0X2pzY2hhcnMgPSAvW1xcXFwnXCJcXC9cXG5cXHJcXHRcXGJcXGY8Pl0vZyxfX2Zlc3RfanNjaGFyc190ZXN0ID0gL1tcXFxcJ1wiXFwvXFxuXFxyXFx0XFxiXFxmPD5dLyxfX2Zlc3RfaHRtbGNoYXJzID0gL1smPD5cIl0vZyxfX2Zlc3RfaHRtbGNoYXJzX3Rlc3QgPSAvWyY8PlwiXS8sX19mZXN0X2pzaGFzaCA9IHtcIlxcXCJcIjogXCJcXFxcXFxcIlwiLCBcIlxcXFxcIjogXCJcXFxcXFxcXFwiLCBcIi9cIjogXCJcXFxcL1wiLCBcIlxcblwiOiBcIlxcXFxuXCIsIFwiXFxyXCI6IFwiXFxcXHJcIiwgXCJcXHRcIjogXCJcXFxcdFwiLCBcIlxcYlwiOiBcIlxcXFxiXCIsIFwiXFxmXCI6IFwiXFxcXGZcIiwgXCInXCI6IFwiXFxcXCdcIiwgXCI8XCI6IFwiXFxcXHUwMDNDXCIsIFwiPlwiOiBcIlxcXFx1MDAzRVwifSxfX2Zlc3RfaHRtbGhhc2ggPSB7XCImXCI6IFwiJmFtcDtcIiwgXCI8XCI6IFwiJmx0O1wiLCBcIj5cIjogXCImZ3Q7XCIsIFwiXFxcIlwiOiBcIiZxdW90O1wifSxfX2Zlc3RfZXNjYXBlSlMgPSBmdW5jdGlvbiBfX2Zlc3RfZXNjYXBlSlModmFsdWUpIHtcblx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuXHRcdFx0aWYgKF9fZmVzdF9qc2NoYXJzX3Rlc3QudGVzdCh2YWx1ZSkpIHtcblx0XHRcdFx0cmV0dXJuIHZhbHVlLnJlcGxhY2UoX19mZXN0X2pzY2hhcnMsIF9fZmVzdF9yZXBsYWNlSlMpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiB2YWx1ZTtcblx0fSxfX2Zlc3RfcmVwbGFjZUpTID0gZnVuY3Rpb24gX19mZXN0X3JlcGxhY2VKUyhjaHIpIHtcblx0XHRyZXR1cm4gX19mZXN0X2pzaGFzaFtjaHJdO1xuXHR9LF9fZmVzdF9lc2NhcGVIVE1MID0gZnVuY3Rpb24gX19mZXN0X2VzY2FwZUhUTUwodmFsdWUpIHtcblx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuXHRcdFx0aWYgKF9fZmVzdF9odG1sY2hhcnNfdGVzdC50ZXN0KHZhbHVlKSkge1xuXHRcdFx0XHRyZXR1cm4gdmFsdWUucmVwbGFjZShfX2Zlc3RfaHRtbGNoYXJzLCBfX2Zlc3RfcmVwbGFjZUhUTUwpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiB2YWx1ZTtcblx0fSxfX2Zlc3RfcmVwbGFjZUhUTUwgPSBmdW5jdGlvbiBfX2Zlc3RfcmVwbGFjZUhUTUwoY2hyKSB7XG5cdFx0cmV0dXJuIF9fZmVzdF9odG1saGFzaFtjaHJdO1xuXHR9LF9fZmVzdF9leHRlbmQgPSBmdW5jdGlvbiBfX2Zlc3RfZXh0ZW5kKGRlc3QsIHNyYykge1xuXHRcdGZvciAodmFyIGtleSBpbiBzcmMpIHtcblx0XHRcdGlmIChzcmMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRkZXN0W2tleV0gPSBzcmNba2V5XTtcblx0XHRcdH1cblx0XHR9XG5cdH0sX19mZXN0X3BhcmFtID0gZnVuY3Rpb24gX19mZXN0X3BhcmFtKGZuKSB7XG5cdFx0Zm4ucGFyYW0gPSB0cnVlO1xuXHRcdHJldHVybiBmbjtcblx0fSxpMThuPV9fZmVzdF9zZWxmICYmIHR5cGVvZiBfX2Zlc3Rfc2VsZi5pMThuID09PSBcImZ1bmN0aW9uXCIgPyBfX2Zlc3Rfc2VsZi5pMThuIDogZnVuY3Rpb24gKHN0cikge3JldHVybiBzdHI7fSxfX19mZXN0X2xvZ19lcnJvcjtpZih0eXBlb2YgX19mZXN0X2Vycm9yID09PSBcInVuZGVmaW5lZFwiKXtfX19mZXN0X2xvZ19lcnJvciA9ICh0eXBlb2YgY29uc29sZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBjb25zb2xlLmVycm9yKSA/IGZ1bmN0aW9uKCl7cmV0dXJuIEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseS5jYWxsKGNvbnNvbGUuZXJyb3IsIGNvbnNvbGUsIGFyZ3VtZW50cyl9IDogZnVuY3Rpb24oKXt9O31lbHNle19fX2Zlc3RfbG9nX2Vycm9yPV9fZmVzdF9lcnJvcn07ZnVuY3Rpb24gX19mZXN0X2xvZ19lcnJvcihtc2cpe19fX2Zlc3RfbG9nX2Vycm9yKG1zZytcIlxcbmluIGJsb2NrIFxcXCJcIitfX2Zlc3RfZGVidWdfYmxvY2srXCJcXFwiIGF0IGxpbmU6IFwiK19fZmVzdF9kZWJ1Z19saW5lK1wiXFxuZmlsZTogXCIrX19mZXN0X2RlYnVnX2ZpbGUpfWZ1bmN0aW9uIF9fZmVzdF9jYWxsKGZuLCBwYXJhbXMsY3Ape2lmKGNwKWZvcih2YXIgaSBpbiBwYXJhbXMpaWYodHlwZW9mIHBhcmFtc1tpXT09XCJmdW5jdGlvblwiJiZwYXJhbXNbaV0ucGFyYW0pcGFyYW1zW2ldPXBhcmFtc1tpXSgpO3JldHVybiBmbi5jYWxsKF9fZmVzdF9zZWxmLHBhcmFtcyl9dmFyIGpzb249X19mZXN0X2NvbnRleHQ7X19mZXN0X2J1Zis9KFwiPGZvcm0gY2xhc3M9XFxcImpzLXJlZ2lzdHJhdGlvbi1mb3JtIHJlZ2lzdHJhdGlvbl9fZm9ybVxcXCI+PGgxIGNsYXNzPVxcXCJyZWdpc3RyYXRpb25fX2hlYWRlclxcXCI+0J/QvtC30L3QsNC60L7QvNC40LzRgdGPPzwvaDE+PHNwYW4gY2xhc3M9XFxcImpzLWVtYWlsLWVycm9yIHJlZ2lzdHJhdGlvbl9fZm9ybV9fZXJyb3JcXFwiIG5hbWU9XFxcImVtYWlsRXJyb3JcXFwiIGhpZGRlbj1cXFwiaGlkZGVuXFxcIj48L3NwYW4+PGlucHV0IHBsYWNlaG9sZGVyPVxcXCJFLW1haWxcXFwiIGNsYXNzPVxcXCJqcy1lbWFpbCByZWdpc3RyYXRpb25fX2Zvcm1fX2lucHV0XFxcIiBuYW1lPVxcXCJlbWFpbFxcXCIgdHlwZT1cXFwidGV4dFxcXCIvPjxzcGFuIGNsYXNzPVxcXCJqcy1wYXNzd29yZC1lcnJvciByZWdpc3RyYXRpb25fX2Zvcm1fX2Vycm9yXFxcIiBuYW1lPVxcXCJwYXNzd29yZEVycm9yXFxcIiBoaWRkZW49XFxcImhpZGRlblxcXCI+PC9zcGFuPjxpbnB1dCBwbGFjZWhvbGRlcj1cXFwiUGFzc3dvcmRcXFwiIGNsYXNzPVxcXCJqcy1wYXNzd29yZCByZWdpc3RyYXRpb25fX2Zvcm1fX2lucHV0XFxcIiBuYW1lPVxcXCJwYXNzd29yZFxcXCIgdHlwZT1cXFwicGFzc3dvcmRcXFwiLz48aW5wdXQgcGxhY2Vob2xkZXI9XFxcIkNvbmZpcm0gcGFzc3dvcmRcXFwiIGNsYXNzPVxcXCJqcy1wYXNzd29yZDIgcmVnaXN0cmF0aW9uX19mb3JtX19pbnB1dFxcXCIgbmFtZT1cXFwicGFzc3dvcmQyXFxcIiB0eXBlPVxcXCJwYXNzd29yZFxcXCIvPjxzcGFuIGNsYXNzPVxcXCJqcy1sb2dpbi1lcnJvciByZWdpc3RyYXRpb25fX2Zvcm1fX2Vycm9yXFxcIiBuYW1lPVxcXCJsb2dpbkVycm9yXFxcIiBoaWRkZW49XFxcImhpZGRlblxcXCI+PC9zcGFuPjxpbnB1dCBwbGFjZWhvbGRlcj1cXFwi0JrQu9C40LrRg9GF0LBcXFwiIGNsYXNzPVxcXCJqcy1sb2dpbiByZWdpc3RyYXRpb25fX2Zvcm1fX2lucHV0XFxcIiBuYW1lPVxcXCJsb2dpblxcXCIgdHlwZT1cXFwidGV4dFxcXCIvPjxidXR0b24gY2xhc3M9XFxcImpzLXN1Ym1pdCByZWdpc3RyYXRpb25fX2Zvcm1fX2J1dHRvblxcXCIgbmFtZT1cXFwiYnV0dG9uXFxcIj7Ql9Cw0YDQtdCz0LjRgdGC0YDQuNGA0L7QstCw0YLRjNGB0Y8hPC9idXR0b24+PC9mb3JtPlwiKTtfX2Zlc3RfdG89X19mZXN0X2NodW5rcy5sZW5ndGg7aWYgKF9fZmVzdF90bykge19fZmVzdF9pdGVyYXRvciA9IDA7Zm9yICg7X19mZXN0X2l0ZXJhdG9yPF9fZmVzdF90bztfX2Zlc3RfaXRlcmF0b3IrKykge19fZmVzdF9jaHVuaz1fX2Zlc3RfY2h1bmtzW19fZmVzdF9pdGVyYXRvcl07aWYgKHR5cGVvZiBfX2Zlc3RfY2h1bms9PT1cInN0cmluZ1wiKSB7X19mZXN0X2h0bWwrPV9fZmVzdF9jaHVuazt9IGVsc2Uge19fZmVzdF9mbj1fX2Zlc3RfYmxvY2tzW19fZmVzdF9jaHVuay5uYW1lXTtpZiAoX19mZXN0X2ZuKSBfX2Zlc3RfaHRtbCs9X19mZXN0X2NhbGwoX19mZXN0X2ZuLF9fZmVzdF9jaHVuay5wYXJhbXMsX19mZXN0X2NodW5rLmNwKTt9fXJldHVybiBfX2Zlc3RfaHRtbCtfX2Zlc3RfYnVmO30gZWxzZSB7cmV0dXJuIF9fZmVzdF9idWY7fX1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3B1YmxpYy90ZW1wbGF0ZXMvcmVnaXN0cmF0aW9uLnRtcGwueG1sXG4vLyBtb2R1bGUgaWQgPSAxMjRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXG4vKiogXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiAvaG9tZS9pdmFuL0RvY3VtZW50cy8yMDE2XzJfQWlyRHJvbmUvcHVibGljL3RlbXBsYXRlcy9yb29tcy50bXBsIHRlbXBsYXRlXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoX19mZXN0X2NvbnRleHQpe1widXNlIHN0cmljdFwiO3ZhciBfX2Zlc3Rfc2VsZj10aGlzLF9fZmVzdF9idWY9XCJcIixfX2Zlc3RfY2h1bmtzPVtdLF9fZmVzdF9jaHVuayxfX2Zlc3RfYXR0cnM9W10sX19mZXN0X3NlbGVjdCxfX2Zlc3RfaWYsX19mZXN0X2l0ZXJhdG9yLF9fZmVzdF90byxfX2Zlc3RfZm4sX19mZXN0X2h0bWw9XCJcIixfX2Zlc3RfYmxvY2tzPXt9LF9fZmVzdF9wYXJhbXMsX19mZXN0X2VsZW1lbnQsX19mZXN0X2RlYnVnX2ZpbGU9XCJcIixfX2Zlc3RfZGVidWdfbGluZT1cIlwiLF9fZmVzdF9kZWJ1Z19ibG9jaz1cIlwiLF9fZmVzdF9lbGVtZW50X3N0YWNrID0gW10sX19mZXN0X3Nob3J0X3RhZ3MgPSB7XCJhcmVhXCI6IHRydWUsIFwiYmFzZVwiOiB0cnVlLCBcImJyXCI6IHRydWUsIFwiY29sXCI6IHRydWUsIFwiY29tbWFuZFwiOiB0cnVlLCBcImVtYmVkXCI6IHRydWUsIFwiaHJcIjogdHJ1ZSwgXCJpbWdcIjogdHJ1ZSwgXCJpbnB1dFwiOiB0cnVlLCBcImtleWdlblwiOiB0cnVlLCBcImxpbmtcIjogdHJ1ZSwgXCJtZXRhXCI6IHRydWUsIFwicGFyYW1cIjogdHJ1ZSwgXCJzb3VyY2VcIjogdHJ1ZSwgXCJ3YnJcIjogdHJ1ZX0sX19mZXN0X2pzY2hhcnMgPSAvW1xcXFwnXCJcXC9cXG5cXHJcXHRcXGJcXGY8Pl0vZyxfX2Zlc3RfanNjaGFyc190ZXN0ID0gL1tcXFxcJ1wiXFwvXFxuXFxyXFx0XFxiXFxmPD5dLyxfX2Zlc3RfaHRtbGNoYXJzID0gL1smPD5cIl0vZyxfX2Zlc3RfaHRtbGNoYXJzX3Rlc3QgPSAvWyY8PlwiXS8sX19mZXN0X2pzaGFzaCA9IHtcIlxcXCJcIjogXCJcXFxcXFxcIlwiLCBcIlxcXFxcIjogXCJcXFxcXFxcXFwiLCBcIi9cIjogXCJcXFxcL1wiLCBcIlxcblwiOiBcIlxcXFxuXCIsIFwiXFxyXCI6IFwiXFxcXHJcIiwgXCJcXHRcIjogXCJcXFxcdFwiLCBcIlxcYlwiOiBcIlxcXFxiXCIsIFwiXFxmXCI6IFwiXFxcXGZcIiwgXCInXCI6IFwiXFxcXCdcIiwgXCI8XCI6IFwiXFxcXHUwMDNDXCIsIFwiPlwiOiBcIlxcXFx1MDAzRVwifSxfX2Zlc3RfaHRtbGhhc2ggPSB7XCImXCI6IFwiJmFtcDtcIiwgXCI8XCI6IFwiJmx0O1wiLCBcIj5cIjogXCImZ3Q7XCIsIFwiXFxcIlwiOiBcIiZxdW90O1wifSxfX2Zlc3RfZXNjYXBlSlMgPSBmdW5jdGlvbiBfX2Zlc3RfZXNjYXBlSlModmFsdWUpIHtcblx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuXHRcdFx0aWYgKF9fZmVzdF9qc2NoYXJzX3Rlc3QudGVzdCh2YWx1ZSkpIHtcblx0XHRcdFx0cmV0dXJuIHZhbHVlLnJlcGxhY2UoX19mZXN0X2pzY2hhcnMsIF9fZmVzdF9yZXBsYWNlSlMpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiB2YWx1ZTtcblx0fSxfX2Zlc3RfcmVwbGFjZUpTID0gZnVuY3Rpb24gX19mZXN0X3JlcGxhY2VKUyhjaHIpIHtcblx0XHRyZXR1cm4gX19mZXN0X2pzaGFzaFtjaHJdO1xuXHR9LF9fZmVzdF9lc2NhcGVIVE1MID0gZnVuY3Rpb24gX19mZXN0X2VzY2FwZUhUTUwodmFsdWUpIHtcblx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuXHRcdFx0aWYgKF9fZmVzdF9odG1sY2hhcnNfdGVzdC50ZXN0KHZhbHVlKSkge1xuXHRcdFx0XHRyZXR1cm4gdmFsdWUucmVwbGFjZShfX2Zlc3RfaHRtbGNoYXJzLCBfX2Zlc3RfcmVwbGFjZUhUTUwpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiB2YWx1ZTtcblx0fSxfX2Zlc3RfcmVwbGFjZUhUTUwgPSBmdW5jdGlvbiBfX2Zlc3RfcmVwbGFjZUhUTUwoY2hyKSB7XG5cdFx0cmV0dXJuIF9fZmVzdF9odG1saGFzaFtjaHJdO1xuXHR9LF9fZmVzdF9leHRlbmQgPSBmdW5jdGlvbiBfX2Zlc3RfZXh0ZW5kKGRlc3QsIHNyYykge1xuXHRcdGZvciAodmFyIGtleSBpbiBzcmMpIHtcblx0XHRcdGlmIChzcmMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRkZXN0W2tleV0gPSBzcmNba2V5XTtcblx0XHRcdH1cblx0XHR9XG5cdH0sX19mZXN0X3BhcmFtID0gZnVuY3Rpb24gX19mZXN0X3BhcmFtKGZuKSB7XG5cdFx0Zm4ucGFyYW0gPSB0cnVlO1xuXHRcdHJldHVybiBmbjtcblx0fSxpMThuPV9fZmVzdF9zZWxmICYmIHR5cGVvZiBfX2Zlc3Rfc2VsZi5pMThuID09PSBcImZ1bmN0aW9uXCIgPyBfX2Zlc3Rfc2VsZi5pMThuIDogZnVuY3Rpb24gKHN0cikge3JldHVybiBzdHI7fSxfX19mZXN0X2xvZ19lcnJvcjtpZih0eXBlb2YgX19mZXN0X2Vycm9yID09PSBcInVuZGVmaW5lZFwiKXtfX19mZXN0X2xvZ19lcnJvciA9ICh0eXBlb2YgY29uc29sZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBjb25zb2xlLmVycm9yKSA/IGZ1bmN0aW9uKCl7cmV0dXJuIEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseS5jYWxsKGNvbnNvbGUuZXJyb3IsIGNvbnNvbGUsIGFyZ3VtZW50cyl9IDogZnVuY3Rpb24oKXt9O31lbHNle19fX2Zlc3RfbG9nX2Vycm9yPV9fZmVzdF9lcnJvcn07ZnVuY3Rpb24gX19mZXN0X2xvZ19lcnJvcihtc2cpe19fX2Zlc3RfbG9nX2Vycm9yKG1zZytcIlxcbmluIGJsb2NrIFxcXCJcIitfX2Zlc3RfZGVidWdfYmxvY2srXCJcXFwiIGF0IGxpbmU6IFwiK19fZmVzdF9kZWJ1Z19saW5lK1wiXFxuZmlsZTogXCIrX19mZXN0X2RlYnVnX2ZpbGUpfWZ1bmN0aW9uIF9fZmVzdF9jYWxsKGZuLCBwYXJhbXMsY3Ape2lmKGNwKWZvcih2YXIgaSBpbiBwYXJhbXMpaWYodHlwZW9mIHBhcmFtc1tpXT09XCJmdW5jdGlvblwiJiZwYXJhbXNbaV0ucGFyYW0pcGFyYW1zW2ldPXBhcmFtc1tpXSgpO3JldHVybiBmbi5jYWxsKF9fZmVzdF9zZWxmLHBhcmFtcyl9dmFyIGpzb249X19mZXN0X2NvbnRleHQ7X19mZXN0X2J1Zis9KFwiPGgxIGNsYXNzPVxcXCJyb29tc19faGVhZGVyXFxcIj7QktGL0LHQtdGA0LjRgtC1INC40LPRgNGDPC9oMT5cIik7dmFyIGkscm9vbSxfX2Zlc3RfaXRlcmF0b3IwO3RyeXtfX2Zlc3RfaXRlcmF0b3IwPWpzb24gfHwge307fWNhdGNoKGUpe19fZmVzdF9pdGVyYXRvcj17fTtfX2Zlc3RfbG9nX2Vycm9yKGUubWVzc2FnZSk7fWZvcihpIGluIF9fZmVzdF9pdGVyYXRvcjApe3Jvb209X19mZXN0X2l0ZXJhdG9yMFtpXTtfX2Zlc3RfYnVmKz0oXCI8ZGl2IGNsYXNzPVxcXCJyb29tc19fcm9vbVxcXCI+PGgyIGNsYXNzPVxcXCJyb29tc19fcm9vbV9faGVhZGVyXFxcIj5cIik7dHJ5e19fZmVzdF9idWYrPShfX2Zlc3RfZXNjYXBlSFRNTChyb29tLm5hbWUpKX1jYXRjaChlKXtfX2Zlc3RfbG9nX2Vycm9yKGUubWVzc2FnZSArIFwiNFwiKTt9X19mZXN0X2J1Zis9KFwiIChcIik7dHJ5e19fZmVzdF9idWYrPShfX2Zlc3RfZXNjYXBlSFRNTChyb29tLmlwKSl9Y2F0Y2goZSl7X19mZXN0X2xvZ19lcnJvcihlLm1lc3NhZ2UgKyBcIjRcIik7fV9fZmVzdF9idWYrPShcIik8L2gyPjwvZGl2PjxkaXYgY2xhc3M9XFxcInJvb21zX19kZXRhaWxzXFxcIiBoaWRkZW49XFxcImhpZGRlblxcXCI+PGgxIGNsYXNzPVxcXCJyb29tc19fZGV0YWlsc19faGVhZGVyXFxcIj7QktGL0LHQtdGA0LjRgtC1INC60LLQsNC00YDQvtC60L7Qv9GC0LXRgDo8L2gxPjxkaXYgY2xhc3M9XFxcInJvb21zX19kZXRhaWxzX19jb2xvcnNcXFwiPlwiKTt2YXIgaSxjb2xvcixfX2Zlc3RfaXRlcmF0b3IxO3RyeXtfX2Zlc3RfaXRlcmF0b3IxPXJvb20uYXZhaWxhYmxlQ29sb3JzIHx8IHt9O31jYXRjaChlKXtfX2Zlc3RfaXRlcmF0b3I9e307X19mZXN0X2xvZ19lcnJvcihlLm1lc3NhZ2UpO31mb3IoaSBpbiBfX2Zlc3RfaXRlcmF0b3IxKXtjb2xvcj1fX2Zlc3RfaXRlcmF0b3IxW2ldO19fZmVzdF9idWYrPShcIjxpbnB1dCBjbGFzcz1cXFwicm9vbXNfX2RldGFpbHNfX2NvbG9yc19fY29sb3IganMtY29sb3JcXFwiIHN0eWxlPVxcXCJiYWNrZ3JvdW5kLWNvbG9yOlwiKTt0cnl7X19mZXN0X2J1Zis9KF9fZmVzdF9lc2NhcGVIVE1MKGNvbG9yKSl9Y2F0Y2goZSl7X19mZXN0X2xvZ19lcnJvcihlLm1lc3NhZ2UgKyBcIjEyXCIpO31fX2Zlc3RfYnVmKz0oXCI7IGNvbG9yOlwiKTt0cnl7X19mZXN0X2J1Zis9KF9fZmVzdF9lc2NhcGVIVE1MKGNvbG9yKSl9Y2F0Y2goZSl7X19mZXN0X2xvZ19lcnJvcihlLm1lc3NhZ2UgKyBcIjEyXCIpO31fX2Zlc3RfYnVmKz0oXCI7XFxcIi8+XCIpO31fX2Zlc3RfYnVmKz0oXCI8L2Rpdj48cCBjbGFzcz1cXFwianMtZXJyb3Igcm9vbXNfX2RldGFpbHNfX2Vycm9yXFxcIiBoaWRkZW49XFxcImhpZGRlblxcXCI+PC9wPjxidXR0b24gY2xhc3M9XFxcInJvb21zX19kZXRhaWxzX19qb2luIGpzLWpvaW5cXFwiPtCf0YDQuNGB0L7QtdC00LjQvdC40YLRjNGB0Y8hPC9idXR0b24+PGhyLz48aDEgY2xhc3M9XFxcInJvb21zX19kZXRhaWxzX19oZWFkZXJcXFwiPtCj0LbQtSDQsiDQuNCz0YDQtTo8L2gxPjx0YWJsZSBjbGFzcz1cXFwicm9vbXNfX2RldGFpbHNfX3VsXFxcIj48dWw+XCIpO3ZhciBpLGRyb25lLF9fZmVzdF9pdGVyYXRvcjI7dHJ5e19fZmVzdF9pdGVyYXRvcjI9cm9vbS5kcm9uZXMgfHwge307fWNhdGNoKGUpe19fZmVzdF9pdGVyYXRvcj17fTtfX2Zlc3RfbG9nX2Vycm9yKGUubWVzc2FnZSk7fWZvcihpIGluIF9fZmVzdF9pdGVyYXRvcjIpe2Ryb25lPV9fZmVzdF9pdGVyYXRvcjJbaV07X19mZXN0X2J1Zis9KFwiPHRyIGNsYXNzPVxcXCJyb29tX19kZXRhaWxzX191bF9fbGlcXFwiPjx0ZD48bGk+XCIpO3RyeXtfX2Zlc3RfYnVmKz0oX19mZXN0X2VzY2FwZUhUTUwoZHJvbmUucGxheWVyTG9naW4pKX1jYXRjaChlKXtfX2Zlc3RfbG9nX2Vycm9yKGUubWVzc2FnZSArIFwiMjdcIik7fV9fZmVzdF9idWYrPShcIjwvbGk+PC90ZD48dGQ+PGlucHV0IHR5cGU9XFxcInRleHRcXFwiIGNsYXNzPVxcXCJyb29tc19fZGV0YWlsc19fdWxfX2xpX19jb2xvclxcXCIgZGlzYWJsZWQ9XFxcImRpc2FibGVkXFxcIiBzdHlsZT1cXFwiYmFja2dyb3VuZC1jb2xvcjpcIik7dHJ5e19fZmVzdF9idWYrPShfX2Zlc3RfZXNjYXBlSFRNTChkcm9uZS5jb2xvcikpfWNhdGNoKGUpe19fZmVzdF9sb2dfZXJyb3IoZS5tZXNzYWdlICsgXCIzM1wiKTt9X19mZXN0X2J1Zis9KFwiO1xcXCIvPjwvdGQ+PC90cj5cIik7fV9fZmVzdF9idWYrPShcIjwvdWw+PC90YWJsZT48L2Rpdj5cIik7fV9fZmVzdF9idWYrPShcIjxoci8+PGJ1dHRvbiBjbGFzcz1cXFwicm9vbXNfX2NyZWF0ZVxcXCI+0KHQvtC30LTQsNGC0Ywg0YHQstC+0Y4hPC9idXR0b24+XCIpO19fZmVzdF90bz1fX2Zlc3RfY2h1bmtzLmxlbmd0aDtpZiAoX19mZXN0X3RvKSB7X19mZXN0X2l0ZXJhdG9yID0gMDtmb3IgKDtfX2Zlc3RfaXRlcmF0b3I8X19mZXN0X3RvO19fZmVzdF9pdGVyYXRvcisrKSB7X19mZXN0X2NodW5rPV9fZmVzdF9jaHVua3NbX19mZXN0X2l0ZXJhdG9yXTtpZiAodHlwZW9mIF9fZmVzdF9jaHVuaz09PVwic3RyaW5nXCIpIHtfX2Zlc3RfaHRtbCs9X19mZXN0X2NodW5rO30gZWxzZSB7X19mZXN0X2ZuPV9fZmVzdF9ibG9ja3NbX19mZXN0X2NodW5rLm5hbWVdO2lmIChfX2Zlc3RfZm4pIF9fZmVzdF9odG1sKz1fX2Zlc3RfY2FsbChfX2Zlc3RfZm4sX19mZXN0X2NodW5rLnBhcmFtcyxfX2Zlc3RfY2h1bmsuY3ApO319cmV0dXJuIF9fZmVzdF9odG1sK19fZmVzdF9idWY7fSBlbHNlIHtyZXR1cm4gX19mZXN0X2J1Zjt9fVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcHVibGljL3RlbXBsYXRlcy9yb29tcy50bXBsLnhtbFxuLy8gbW9kdWxlIGlkID0gMTI1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxuLyoqIFxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogL2hvbWUvaXZhbi9Eb2N1bWVudHMvMjAxNl8yX0FpckRyb25lL3B1YmxpYy90ZW1wbGF0ZXMvc2NvcmVib2FyZC50bXBsIHRlbXBsYXRlXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoX19mZXN0X2NvbnRleHQpe1widXNlIHN0cmljdFwiO3ZhciBfX2Zlc3Rfc2VsZj10aGlzLF9fZmVzdF9idWY9XCJcIixfX2Zlc3RfY2h1bmtzPVtdLF9fZmVzdF9jaHVuayxfX2Zlc3RfYXR0cnM9W10sX19mZXN0X3NlbGVjdCxfX2Zlc3RfaWYsX19mZXN0X2l0ZXJhdG9yLF9fZmVzdF90byxfX2Zlc3RfZm4sX19mZXN0X2h0bWw9XCJcIixfX2Zlc3RfYmxvY2tzPXt9LF9fZmVzdF9wYXJhbXMsX19mZXN0X2VsZW1lbnQsX19mZXN0X2RlYnVnX2ZpbGU9XCJcIixfX2Zlc3RfZGVidWdfbGluZT1cIlwiLF9fZmVzdF9kZWJ1Z19ibG9jaz1cIlwiLF9fZmVzdF9lbGVtZW50X3N0YWNrID0gW10sX19mZXN0X3Nob3J0X3RhZ3MgPSB7XCJhcmVhXCI6IHRydWUsIFwiYmFzZVwiOiB0cnVlLCBcImJyXCI6IHRydWUsIFwiY29sXCI6IHRydWUsIFwiY29tbWFuZFwiOiB0cnVlLCBcImVtYmVkXCI6IHRydWUsIFwiaHJcIjogdHJ1ZSwgXCJpbWdcIjogdHJ1ZSwgXCJpbnB1dFwiOiB0cnVlLCBcImtleWdlblwiOiB0cnVlLCBcImxpbmtcIjogdHJ1ZSwgXCJtZXRhXCI6IHRydWUsIFwicGFyYW1cIjogdHJ1ZSwgXCJzb3VyY2VcIjogdHJ1ZSwgXCJ3YnJcIjogdHJ1ZX0sX19mZXN0X2pzY2hhcnMgPSAvW1xcXFwnXCJcXC9cXG5cXHJcXHRcXGJcXGY8Pl0vZyxfX2Zlc3RfanNjaGFyc190ZXN0ID0gL1tcXFxcJ1wiXFwvXFxuXFxyXFx0XFxiXFxmPD5dLyxfX2Zlc3RfaHRtbGNoYXJzID0gL1smPD5cIl0vZyxfX2Zlc3RfaHRtbGNoYXJzX3Rlc3QgPSAvWyY8PlwiXS8sX19mZXN0X2pzaGFzaCA9IHtcIlxcXCJcIjogXCJcXFxcXFxcIlwiLCBcIlxcXFxcIjogXCJcXFxcXFxcXFwiLCBcIi9cIjogXCJcXFxcL1wiLCBcIlxcblwiOiBcIlxcXFxuXCIsIFwiXFxyXCI6IFwiXFxcXHJcIiwgXCJcXHRcIjogXCJcXFxcdFwiLCBcIlxcYlwiOiBcIlxcXFxiXCIsIFwiXFxmXCI6IFwiXFxcXGZcIiwgXCInXCI6IFwiXFxcXCdcIiwgXCI8XCI6IFwiXFxcXHUwMDNDXCIsIFwiPlwiOiBcIlxcXFx1MDAzRVwifSxfX2Zlc3RfaHRtbGhhc2ggPSB7XCImXCI6IFwiJmFtcDtcIiwgXCI8XCI6IFwiJmx0O1wiLCBcIj5cIjogXCImZ3Q7XCIsIFwiXFxcIlwiOiBcIiZxdW90O1wifSxfX2Zlc3RfZXNjYXBlSlMgPSBmdW5jdGlvbiBfX2Zlc3RfZXNjYXBlSlModmFsdWUpIHtcblx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuXHRcdFx0aWYgKF9fZmVzdF9qc2NoYXJzX3Rlc3QudGVzdCh2YWx1ZSkpIHtcblx0XHRcdFx0cmV0dXJuIHZhbHVlLnJlcGxhY2UoX19mZXN0X2pzY2hhcnMsIF9fZmVzdF9yZXBsYWNlSlMpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiB2YWx1ZTtcblx0fSxfX2Zlc3RfcmVwbGFjZUpTID0gZnVuY3Rpb24gX19mZXN0X3JlcGxhY2VKUyhjaHIpIHtcblx0XHRyZXR1cm4gX19mZXN0X2pzaGFzaFtjaHJdO1xuXHR9LF9fZmVzdF9lc2NhcGVIVE1MID0gZnVuY3Rpb24gX19mZXN0X2VzY2FwZUhUTUwodmFsdWUpIHtcblx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuXHRcdFx0aWYgKF9fZmVzdF9odG1sY2hhcnNfdGVzdC50ZXN0KHZhbHVlKSkge1xuXHRcdFx0XHRyZXR1cm4gdmFsdWUucmVwbGFjZShfX2Zlc3RfaHRtbGNoYXJzLCBfX2Zlc3RfcmVwbGFjZUhUTUwpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiB2YWx1ZTtcblx0fSxfX2Zlc3RfcmVwbGFjZUhUTUwgPSBmdW5jdGlvbiBfX2Zlc3RfcmVwbGFjZUhUTUwoY2hyKSB7XG5cdFx0cmV0dXJuIF9fZmVzdF9odG1saGFzaFtjaHJdO1xuXHR9LF9fZmVzdF9leHRlbmQgPSBmdW5jdGlvbiBfX2Zlc3RfZXh0ZW5kKGRlc3QsIHNyYykge1xuXHRcdGZvciAodmFyIGtleSBpbiBzcmMpIHtcblx0XHRcdGlmIChzcmMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRkZXN0W2tleV0gPSBzcmNba2V5XTtcblx0XHRcdH1cblx0XHR9XG5cdH0sX19mZXN0X3BhcmFtID0gZnVuY3Rpb24gX19mZXN0X3BhcmFtKGZuKSB7XG5cdFx0Zm4ucGFyYW0gPSB0cnVlO1xuXHRcdHJldHVybiBmbjtcblx0fSxpMThuPV9fZmVzdF9zZWxmICYmIHR5cGVvZiBfX2Zlc3Rfc2VsZi5pMThuID09PSBcImZ1bmN0aW9uXCIgPyBfX2Zlc3Rfc2VsZi5pMThuIDogZnVuY3Rpb24gKHN0cikge3JldHVybiBzdHI7fSxfX19mZXN0X2xvZ19lcnJvcjtpZih0eXBlb2YgX19mZXN0X2Vycm9yID09PSBcInVuZGVmaW5lZFwiKXtfX19mZXN0X2xvZ19lcnJvciA9ICh0eXBlb2YgY29uc29sZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBjb25zb2xlLmVycm9yKSA/IGZ1bmN0aW9uKCl7cmV0dXJuIEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseS5jYWxsKGNvbnNvbGUuZXJyb3IsIGNvbnNvbGUsIGFyZ3VtZW50cyl9IDogZnVuY3Rpb24oKXt9O31lbHNle19fX2Zlc3RfbG9nX2Vycm9yPV9fZmVzdF9lcnJvcn07ZnVuY3Rpb24gX19mZXN0X2xvZ19lcnJvcihtc2cpe19fX2Zlc3RfbG9nX2Vycm9yKG1zZytcIlxcbmluIGJsb2NrIFxcXCJcIitfX2Zlc3RfZGVidWdfYmxvY2srXCJcXFwiIGF0IGxpbmU6IFwiK19fZmVzdF9kZWJ1Z19saW5lK1wiXFxuZmlsZTogXCIrX19mZXN0X2RlYnVnX2ZpbGUpfWZ1bmN0aW9uIF9fZmVzdF9jYWxsKGZuLCBwYXJhbXMsY3Ape2lmKGNwKWZvcih2YXIgaSBpbiBwYXJhbXMpaWYodHlwZW9mIHBhcmFtc1tpXT09XCJmdW5jdGlvblwiJiZwYXJhbXNbaV0ucGFyYW0pcGFyYW1zW2ldPXBhcmFtc1tpXSgpO3JldHVybiBmbi5jYWxsKF9fZmVzdF9zZWxmLHBhcmFtcyl9dmFyIGpzb249X19mZXN0X2NvbnRleHQ7X19mZXN0X2J1Zis9KFwiPGgxIGNsYXNzPVxcXCJzY29yZWJvYXJkX19oZWFkZXJcXFwiPtCb0LjQtNC10YDRizwvaDE+PHRhYmxlIGNsYXNzPVxcXCJzY29yZWJvYXJkX190YWJsZVxcXCI+PHRyIGNsYXNzPVxcXCJzY29yZWJvYXJkX190YWJsZV9fdHJcXFwiPjx0ZCBjbGFzcz1cXFwic2NvcmVib2FyZF9fdGFibGVfX3RyX190ZFxcXCI+IzwvdGQ+PHRkIGNsYXNzPVxcXCJzY29yZWJvYXJkX190YWJsZV9fdHJfX3RkXFxcIj7QmNC80Y88L3RkPjx0ZCBjbGFzcz1cXFwic2NvcmVib2FyZF9fdGFibGVfX3RyX190ZFxcXCI+0JrQvtC70LjRh9C10YHRgtCy0L4g0LHQvtC10LI8L3RkPjx0ZCBjbGFzcz1cXFwic2NvcmVib2FyZF9fdGFibGVfX3RyX190ZFxcXCI+0J/RgNC+0YbQtdC90YIg0L/QvtCx0LXQtDwvdGQ+PC90cj5cIik7dmFyIGksZGF0YSxfX2Zlc3RfaXRlcmF0b3IwO3RyeXtfX2Zlc3RfaXRlcmF0b3IwPWpzb24gfHwge307fWNhdGNoKGUpe19fZmVzdF9pdGVyYXRvcj17fTtfX2Zlc3RfbG9nX2Vycm9yKGUubWVzc2FnZSk7fWZvcihpIGluIF9fZmVzdF9pdGVyYXRvcjApe2RhdGE9X19mZXN0X2l0ZXJhdG9yMFtpXTtfX2Zlc3RfYnVmKz0oXCI8dHIgY2xhc3M9XFxcInNjb3JlYm9hcmRfX3RhYmxlX190clxcXCI+PHRkIGNsYXNzPVxcXCJzY29yZWJvYXJkX190YWJsZV9fdHJfX3RkXFxcIj5cIik7dHJ5e19fZmVzdF9idWYrPShfX2Zlc3RfZXNjYXBlSFRNTChpKSl9Y2F0Y2goZSl7X19mZXN0X2xvZ19lcnJvcihlLm1lc3NhZ2UgKyBcIjEyXCIpO31fX2Zlc3RfYnVmKz0oXCI8L3RkPjx0ZCBjbGFzcz1cXFwic2NvcmVib2FyZF9fdGFibGVfX3RyX190ZFxcXCI+XCIpO3RyeXtfX2Zlc3RfYnVmKz0oX19mZXN0X2VzY2FwZUhUTUwoZGF0YS51c2VybmFtZSkpfWNhdGNoKGUpe19fZmVzdF9sb2dfZXJyb3IoZS5tZXNzYWdlICsgXCIxM1wiKTt9X19mZXN0X2J1Zis9KFwiPC90ZD48dGQgY2xhc3M9XFxcInNjb3JlYm9hcmRfX3RhYmxlX190cl9fdGRcXFwiPlwiKTt0cnl7X19mZXN0X2J1Zis9KF9fZmVzdF9lc2NhcGVIVE1MKGRhdGEuZ2FtZXMpKX1jYXRjaChlKXtfX2Zlc3RfbG9nX2Vycm9yKGUubWVzc2FnZSArIFwiMTRcIik7fV9fZmVzdF9idWYrPShcIjwvdGQ+PHRkIGNsYXNzPVxcXCJzY29yZWJvYXJkX190YWJsZV9fdHJfX3RkXFxcIj5cIik7dHJ5e19fZmVzdF9idWYrPShfX2Zlc3RfZXNjYXBlSFRNTChkYXRhLnNjb3JlKSl9Y2F0Y2goZSl7X19mZXN0X2xvZ19lcnJvcihlLm1lc3NhZ2UgKyBcIjE1XCIpO31fX2Zlc3RfYnVmKz0oXCIgJTwvdGQ+PC90cj5cIik7fV9fZmVzdF9idWYrPShcIjwvdGFibGU+XCIpO19fZmVzdF90bz1fX2Zlc3RfY2h1bmtzLmxlbmd0aDtpZiAoX19mZXN0X3RvKSB7X19mZXN0X2l0ZXJhdG9yID0gMDtmb3IgKDtfX2Zlc3RfaXRlcmF0b3I8X19mZXN0X3RvO19fZmVzdF9pdGVyYXRvcisrKSB7X19mZXN0X2NodW5rPV9fZmVzdF9jaHVua3NbX19mZXN0X2l0ZXJhdG9yXTtpZiAodHlwZW9mIF9fZmVzdF9jaHVuaz09PVwic3RyaW5nXCIpIHtfX2Zlc3RfaHRtbCs9X19mZXN0X2NodW5rO30gZWxzZSB7X19mZXN0X2ZuPV9fZmVzdF9ibG9ja3NbX19mZXN0X2NodW5rLm5hbWVdO2lmIChfX2Zlc3RfZm4pIF9fZmVzdF9odG1sKz1fX2Zlc3RfY2FsbChfX2Zlc3RfZm4sX19mZXN0X2NodW5rLnBhcmFtcyxfX2Zlc3RfY2h1bmsuY3ApO319cmV0dXJuIF9fZmVzdF9odG1sK19fZmVzdF9idWY7fSBlbHNlIHtyZXR1cm4gX19mZXN0X2J1Zjt9fVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcHVibGljL3RlbXBsYXRlcy9zY29yZWJvYXJkLnRtcGwueG1sXG4vLyBtb2R1bGUgaWQgPSAxMjZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm9vbUNvbGxlY3Rpb24ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLl9kYXRhID0gW107XG4gICAgfVxuXG4gICAgZmV0Y2goKSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgICByZXR1cm4gZmV0Y2goJy9nYW1lcycpLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gICAgICAgIH0pLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICBzZWxmLl9kYXRhID0gZGF0YTtcbiAgICAgICAgICAgIHNlbGYuc29ydCgpO1xuICAgICAgICB9KS5jYXRjaCgpO1xuICAgIH1cblxuICAgIHNvcnQoKSB7XG4gICAgICAgIHRoaXMuX2RhdGEuc29ydCgoYSwgYikgPT4gYS5kcm9uZXMubGVuZ3RoIC0gYi5kcm9uZXMubGVuZ3RoKTtcbiAgICB9XG5cbiAgICBnZXRDb2xsZWN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wdWJsaWMvanMvY29sbGVjdGlvbnMvUm9vbUNvbGxlY3Rpb24uanMiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBVc2VyQ29sbGVjdGlvbiB7XG4gICAgY29uc3RydXRvcigpIHtcbiAgICAgICAgdGhpcy5fZGF0YSA9IFtdO1xuICAgIH1cblxuICAgIGZldGNoKCkge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgcmV0dXJuIGZldGNoKCcvcmF0aW5nJykudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3Byb21pc2UnKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gICAgICAgICAgICAgICAgfSkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5fZGF0YSA9IGRhdGE7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc29ydCgpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygndGhlbicsIHNlbGYuX2RhdGEpO1xuICAgICAgICAgICAgICAgIH0pLmNhdGNoKCk7XG4gICAgfVxuXG4gICAgc29ydCgpIHtcbiAgICAgICAgdGhpcy5fZGF0YS5zb3J0KChhLCBiKSA9PiBiLnNjb3JlIC0gYS5zY29yZSk7XG4gICAgfVxuXG4gICAgZ2V0Q29sbGVjdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGE7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcHVibGljL2pzL2NvbGxlY3Rpb25zL1VzZXJDb2xsZWN0aW9uLmpzIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm9vbU1vZGVsIHtcbiAgICBjb25zdHJ1Y3RvcihkYXRhID0ge30pIHtcbiAgICAgICAgdGhpcy5pZCA9IGRhdGEuaWQgfHwgMDtcbiAgICAgICAgdGhpcy5jb2xvciA9IGRhdGEuY29sb3IgfHwgdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLnBsYXllckxvZ2luID0gZGF0YS5wbGF5ZXJMb2dpbiB8fCAnTmV3IFBsYXllcic7XG4gICAgICAgIHRoaXMucGxheWVySWQgPSBkYXRhLnBsYXllcklkIHx8IDA7XG4gICAgICAgIHRoaXMuZXJyb3IgPSAnJztcbiAgICB9XG5cbiAgICBzYXZlKHJvb20pIHtcbiAgICAgICAgc2VsZiA9IHRoaXM7XG4gICAgICAgIGlmICghcm9vbSkge1xuICAgICAgICAgICAgc2VsZi5lcnJvciA9ICdObyByb29tISc7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZldGNoKCcvZ2FtZXMnLCB7XG4gICAgICAgICAgICBtZXRob2Q6ICdQVVQnLFxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgIHJvb206IHJvb20sXG4gICAgICAgICAgICAgICAgZHJvbmU6IHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IHNlbGYuaWQsXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiBzZWxmLmNvbG9yLFxuICAgICAgICAgICAgICAgICAgICBwbGF5ZXJMb2dpbjogc2VsZi5wbGF5ZXJMb2dpbixcbiAgICAgICAgICAgICAgICAgICAgcGxheWVySWQ6IHNlbGYucGxheWVySWQsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gICAgICAgIH0pLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICBzZWxmLmVycm9yID0gJyc7XG4gICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgIHNlbGYuZXJyb3IgPSAnRmFpbGVkIHRvIHNhdmUgZHJvbmUhJztcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcHVibGljL2pzL21vZGVscy9Ecm9uZU1vZGVsLmpzIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGF0aFRvUmVnZXggKHBhdGhuYW1lKSB7XG5cdGxldCBrZXlOYW1lcyA9IFtdO1xuXHRsZXQgcGFydHMgPSBwYXRobmFtZVxuXHRcdC5zcGxpdCgnLycpXG5cdFx0LmZpbHRlcihwYXJ0ID0+IHBhcnQpXG5cdFx0Lm1hcChwYXJ0ID0+IHtcblx0XHRcdGlmICgvXjovLmV4ZWMocGFydCkpIHtcblx0XHRcdFx0a2V5TmFtZXMucHVzaChwYXJ0LnNsaWNlKDEpKTtcblx0XHRcdFx0cmV0dXJuIG5ldyBSZWdFeHAoYF5cXC8oW14vXSspYCwgYGlgKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBuZXcgUmVnRXhwKGBeXFwvJHtwYXJ0fWAsIGBpYCk7XG5cdFx0fSk7XG5cblxuXHRyZXR1cm4gZnVuY3Rpb24gKHBhdGgpIHtcblxuXHRcdGxldCBrZXlzID0gW107XG5cdFx0bGV0IGNoZWNrID0gcGFydHMuZXZlcnkoKHJlZ2V4cCwgc3RlcCkgPT4ge1xuXHRcdFx0bGV0IHRtcCA9IHJlZ2V4cC5leGVjKHBhdGgpO1xuXHRcdFx0aWYgKCF0bXApIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHRtcC5sZW5ndGggPT09IDIpIHtcblx0XHRcdFx0a2V5cy5wdXNoKHRtcFsxXSk7XG5cdFx0XHR9XG5cdFx0XHRwYXRoID0gcGF0aC5yZXBsYWNlKHJlZ2V4cCwgJycpO1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fSk7XG5cblx0XHRpZiAoY2hlY2spIHtcblx0XHRcdHJldHVybiBrZXlzLnJlZHVjZSgocHJldiwgY3VyciwgcG9zKSA9PiB7XG5cdFx0XHRcdHByZXZba2V5TmFtZXNbcG9zXV0gPSBjdXJyO1xuXHRcdFx0XHRyZXR1cm4gcHJldjtcblx0XHRcdH0sIHt9KTtcblx0XHR9XG5cdFx0cmV0dXJuIG51bGw7XG5cdH07XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcHVibGljL2pzL21vZHVsZXMvcGF0aFRvUmVnZXguanMiLCJsZXQgaWQgPSAwO1xuaW1wb3J0IHBhdGhUb1JlZ2V4IGZyb20gJy4vcGF0aFRvUmVnZXgnO1xuXG4vKiog0JrQu9Cw0YHRgSDQv9GA0LXQtNGB0YLQsNCy0LvRj9C10YIg0YHQvtCx0L7QuSDQn9GD0YLRjCDQsiDQstCw0YjQtdC8INC/0YDQuNC70L7QttC10L3QuNC4ICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb3V0ZSB7XG5cdC8qKlxuXHQgKiDQodC+0LfQtNCw0ZHRgiDQvdC+0LLRi9C5IFJvdXRlIC0g0LDRgdGB0L7RhtC40LjRgNGD0LXRgiDQvdC10LrQvtGC0L7RgNGD0Y4gdmlldyDRgSDRiNCw0LHQu9C+0L3QvtC8INC/0YPRgtC4XG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBwYXRobmFtZSAtINCo0LDQsdC70L7QvSDQv9GD0YLQuFxuXHQgKiBAcGFyYW0ge1ZpZXd9IHZpZXcgLSDQmtC70LDRgdGBINC60L7QvdC60YDQtdGC0L3QvtC5IFZpZXdcblx0ICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSAtINCU0L7Qv9C+0LvQvdC40YLQtdC70YzQvdGL0LUg0L/QsNGA0LDQvNC10YLRgNGLLCDQutC+0YLQvtGA0YvQtSDQsdGD0LTRg9GCINC/0LXRgNC10LTQsNC90Ysg0LLQviB2aWV3INC/0YDQuCDQtdGRINGB0L7Qt9C00LDQvdC40Lgg0Lgg0LjQvdC40YbQuNCw0LvQuNC30LDRhtC40Lhcblx0ICovXG5cdGNvbnN0cnVjdG9yKHBhdGhuYW1lLCB2aWV3LCBvcHRpb25zID0ge30pIHtcblx0XHQvL1RPRE86INCh0YPRidC40Lkg0LDQtNC40YnQtSwg0L3QsNC8INC90YPQttC90L4g0LzQtdC90LXQtNC20LXRgNC40YLRjCDQtNC10L/RgdGLXG5cdFx0dGhpcy5wYXRoVG9SZWdleCA9IHBhdGhUb1JlZ2V4O1xuXG5cdFx0dGhpcy5pZCA9ICdwJyArIGlkO1xuXHRcdGlkKys7XG5cdFx0dGhpcy5wYXRobmFtZSA9IHBhdGhuYW1lO1xuXHRcdHRoaXMucmVnZXggPSB0aGlzLnBhdGhUb1JlZ2V4KHBhdGhuYW1lKTtcblx0XHR0aGlzLlZpZXcgPSB2aWV3O1xuXHRcdHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG5cdH1cblxuXHQvKipcblx0ICog0J/RgNC+0LLQtdGA0Y/QtdGCLCDRgdC+0L7RgtCy0LXRgtGB0YLQstGD0LXRgiDQu9C4INC/0LXRgNC10LTQsNC90L3Ri9C5IHBhdGhuYW1lINGC0LXQutGD0YnQtdC80YMgUm91dGVcblx0ICogQHBhcmFtIHtzdHJpbmd9IHBhdGhuYW1lIC0g0J/Rg9GC0Ywg0LIg0L/RgNC40LvQvtC20LXQvdC40Lhcblx0ICogQHJldHVybnMge2Jvb2xlYW59INCg0LXQt9GD0LvRjNGC0LDRgiDQv9GA0L7QstC10YDQutC4XG5cdCAqL1xuXHRtYXRjaChwYXRobmFtZSkge1xuXHRcdHJldHVybiAhIXRoaXMucmVnZXgocGF0aG5hbWUpO1xuXHR9XG5cblx0LyoqXG5cdCAqINCQ0LrRgtC40LLQuNGA0YPQtdGCINGC0LXQutGD0YnQuNC5IFJvdXRlICjQv9C10YDQtdGF0L7QtNC40YIg0L/QviDQvdC10LzRgylcblx0ICogQHBhcmFtIHtzdHJpbmd9IHBhdGhuYW1lIC0g0J/Rg9GC0Ywg0LIg0L/RgNC40LvQvtC20LXQvdC40Lhcblx0ICogQHBhcmFtIHtPYmplY3R9IFtzdGF0ZT17fV0gLSDQntCx0YrQtdC60YIgc3RhdGUsINC60L7RgtC+0YDRi9C5INCx0YvQuyDQv9C10YDQtdC00LDQvSDQsiDRgdC+0LHRi9GC0LjQtSBwb3BzdGF0ZSDQtNC70Y8g0L7QsdGK0LXQutGC0LAgd2luZG93XG5cdCAqL1xuXHRuYXZpZ2F0ZShwYXRobmFtZSwgc3RhdGUgPSB7fSkge1xuXHRcdHN0YXRlID0gc3RhdGUgfHwge307XG5cdFx0bGV0IGtleXMgPSB0aGlzLnJlZ2V4KHBhdGhuYW1lKTtcblx0XHRpZiAoIXRoaXMuX3ZpZXcpIHtcblx0XHRcdGxldCB2aWV3ID0gbmV3IHRoaXMuVmlldyh0aGlzLm9wdGlvbnMpO1xuXHRcdFx0dmlldy5pbml0KHRoaXMub3B0aW9ucyk7XG5cdFx0XHR2aWV3LnNldFJvdXRlcih0aGlzLl9fcm91dGVyKTtcblx0XHRcdHRoaXMuX3ZpZXcgPSB2aWV3O1xuXHRcdH1cblxuXHRcdHRoaXMuX3ZpZXcucmVzdW1lKE9iamVjdC5hc3NpZ24oc3RhdGUsIGtleXMpKTtcblx0fVxuXG5cdC8qKlxuXHQgKiDQlNC10LDQutGC0LjQstC40YDRg9C10YIg0YLQtdC60YPRidC40LkgUm91dGVcblx0ICovXG5cdGxlYXZlKCkge1xuXHRcdHRoaXMuX3ZpZXcgJiYgdGhpcy5fdmlldy5wYXVzZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqINCj0YHRgtCw0L3QsNCy0LvQuNCy0LDQtdGCINGC0LXQutGD0YnQtdC80YMgUm91dGUg0LjQvdGB0YLQsNC90YEg0YDQvtGD0YLQtdGA0LBcblx0ICogQHBhcmFtIHtSb3V0ZXJ9IHJvdXRlciAtINCY0L3RgdGC0LDQvdGBINGA0L7Rg9GC0LXRgNCwXG5cdCAqL1xuXHRzZXRSb3V0ZXIocm91dGVyKSB7XG5cdFx0dGhpcy5fX3JvdXRlciA9IHJvdXRlcjtcblx0fVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcHVibGljL2pzL21vZHVsZXMvcm91dGUuanMiLCJpbXBvcnQgUm91dGVyIGZyb20gJy4vbW9kdWxlcy9yb3V0ZXInO1xuaW1wb3J0IExvZ2luVmlldyBmcm9tICcuL3ZpZXdzL2xvZ2luVmlldyc7XG5pbXBvcnQgUmVnaXN0cmF0aW9uVmlldyBmcm9tICcuL3ZpZXdzL3JlZ2lzdHJhdGlvblZpZXcnO1xuaW1wb3J0IFNjb3JlYm9hcmRWaWV3IGZyb20gJy4vdmlld3Mvc2NvcmVib2FyZFZpZXcnO1xuaW1wb3J0IFJvb21zVmlldyBmcm9tICcuL3ZpZXdzL3Jvb21zVmlldyc7XG5cbmxldCByb3V0ZXIgPSBuZXcgUm91dGVyKCk7XG5yb3V0ZXIuYWRkUm91dGUoJy9sb2dpbicsIExvZ2luVmlldyk7XG5yb3V0ZXIuYWRkUm91dGUoJy9yZWdpc3RyYXRpb24nLCBSZWdpc3RyYXRpb25WaWV3KTtcbnJvdXRlci5hZGRSb3V0ZSgnL3Njb3JlYm9hcmQnLCBTY29yZWJvYXJkVmlldyk7XG5yb3V0ZXIuYWRkUm91dGUoJy9yb29tcycsIFJvb21zVmlldyk7XG5yb3V0ZXIuYWRkUm91dGUoJy8nLCBMb2dpblZpZXcpO1xucm91dGVyLnN0YXJ0KCk7XG53aW5kb3cucm91dGVyID0gcm91dGVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcHVibGljL2pzL2FpcmRyb25lLmpzIiwiLyoqXG4gKiDQmtC70LDRgdGBINC/0YDQtdC00YHRgtCw0LLQu9GP0LXRgiDRgdC+0LHQvtC5IHZpZXdcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmlldyB7XG5cdC8qKlxuXHQgKiDQodC+0LfQtNCw0ZHRgiDQvdC+0LLRg9GOIHZpZXdcblx0ICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSAtINCe0LHRitC10LrRgiDRgSDQv9Cw0YDQsNC80LXRgtGA0LDQvNC4XG5cdCAqL1xuXHRjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICAgICAgdGhpcy5zZXRSb3V0ZXIod2luZG93LnJvdXRlcik7XG5cdFx0dGhpcy50YWdOYW1lID0gb3B0aW9ucy50YWdOYW1lIHx8ICdkaXYnO1xuICAgICAgICB0aGlzLl9lbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iob3B0aW9ucy5lbGVtZW50KSB8fCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRoaXMudGFnTmFtZSk7XG4gICAgICAgIHRoaXMuYm9keUNsYXNzID0gb3B0aW9ucy5ib2R5Q2xhc3M7XG4gICAgICAgIHRoaXMuaGlkZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqINCY0L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPINC/0LDRgNCw0LzQtdGC0YDQvtCyIHZpZXcgKNCy0YvQv9C+0LvQvdGP0LXRgtGB0Y8g0YHRgNCw0LfRgyDQv9C+0YHQu9C1INGB0L7Qt9C00LDQvdC40Y8pXG5cdCAqINCd0LXQvtCx0YXQvtC00LjQvNC+INC/0LXRgNC10L/RgNC10LTQtdC70Y/RgtGMXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gLSDQntCx0YrQtdC60YIg0YEg0L/QsNGA0LDQvNC10YLRgNCw0LzQuFxuXHQgKi9cblx0aW5pdChvcHRpb25zID0ge30pIHtcblx0XHR0aGlzLnNldEF0dHJzKG9wdGlvbnMuYXR0cnMpO1xuXHR9XG5cblx0LyoqXG5cdCAqINCS0YvQt9GL0LLQsNC10YLRgdGPINC/0YDQuCDQv9GA0LjQvtGB0YLQsNC90L7QstC60LUg0YDQsNCx0L7RgtGLIHZpZXcgKNC/0YDQuCDRgdC60YDRi9GC0LjQuCB2aWV3INC40LvQuCDQv9C10YDQtdGF0L7QtNC1INC90LAg0LTRgNGD0LPRg9GOIHZpZXcpXG5cdCAqINCd0LXQvtCx0YXQvtC00LjQvNC+INC/0LXRgNC10L7Qv9GA0LXQtNC10LvRj9GC0Ywg0YHQstC+0LXQuSDQu9C+0LPQuNC60L7QuVxuXHQgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIC0g0J7QsdGK0LXQutGCINGBINC/0LDRgNCw0LzQtdGC0YDQsNC80Lhcblx0ICovXG5cdHBhdXNlKG9wdGlvbnMgPSB7fSkge1xuXHRcdHRoaXMuaGlkZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqINCS0YvQt9GL0LLQsNC10YLRgdGPINC/0YDQuCDQvdCw0YfQsNC70LUg0LjQu9C4INC/0YDQvtC00L7Qu9C20LXQvdC40Lgg0YDQsNCx0L7RgtGLIHZpZXcgKNC/0L7RgdC70LUg0YLQvtCz0L4sINC60LDQuiB2aWV3INCx0YvQu9CwINGB0LrRgNGL0YLQsClcblx0ICog0J3QtdC+0LHRhdC+0LTQuNC80L4g0L/QtdGA0LXQvtC/0YDQtdC00LXQu9GP0YLRjCDRgdCy0L7QtdC5INC70L7Qs9C40LrQvtC5XG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gLSDQntCx0YrQtdC60YIg0YEg0L/QsNGA0LDQvNC10YLRgNCw0LzQuFxuXHQgKi9cblx0cmVzdW1lKG9wdGlvbnMgPSB7fSkge1xuICAgICAgICB0aGlzLnJlbmRlcigpO1xuXHRcdHRoaXMuc2hvdygpO1xuXHR9XG5cblx0LyoqXG5cdCAqINCf0L7QutCw0LfRi9Cy0LDQtdGCIHZpZXdcblx0ICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSAtINCe0LHRitC10LrRgiDRgSDQv9Cw0YDQsNC80LXRgtGA0LDQvNC4XG5cdCAqL1xuXHRzaG93KG9wdGlvbnMgPSB7fSkge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcblx0XHRzZWxmLl9lbC5oaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgaWYgKHNlbGYuYm9keUNsYXNzKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoc2VsZi5ib2R5Q2xhc3MpO1xuICAgICAgICB9XG5cdH1cblxuXHQvKipcblx0ICog0KHQutGA0YvQstCw0LXRgiB2aWV3XG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gLSDQntCx0YrQtdC60YIg0YEg0L/QsNGA0LDQvNC10YLRgNCw0LzQuFxuXHQgKi9cblx0aGlkZShvcHRpb25zID0ge30pIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG5cdFx0c2VsZi5fZWwuaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgaWYgKHNlbGYuYm9keUNsYXNzKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoc2VsZi5ib2R5Q2xhc3MpO1xuICAgICAgICB9XG5cdH1cblxuXHQvKipcblx0ICog0KDQtdC90LTQtdGA0LjRgiB2aWV3XG5cdCAqINCd0LXQvtCx0YXQvtC00LjQvNC+INC/0LXRgNC10L7Qv9GA0LXQtNC10LvRj9GC0Yxcblx0ICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSAtINCe0LHRitC10LrRgiDRgSDQv9Cw0YDQsNC80LXRgtGA0LDQvNC4XG5cdCAqL1xuXHRyZW5kZXIob3B0aW9ucyA9IHt9KSB7XG5cblx0fVxuXG5cdC8qKlxuXHQgKiDQktGB0YLQsNCy0LvRj9C10YIg0YLQtdC60YPRidGD0Y4gdmlldyDQsiDQv9C10YDQtdC00LDQvdC90YvQuSDRjdC70LXQvNC10L3RglxuXHQgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbCAtIEhUTUwt0Y3Qu9C10LzQtdC90YIsINC6INC60L7RgtC+0YDQvtC80YMg0LTQvtCx0LDQstC70Y/QtdGC0YHRjyDRjdC70LXQvNC10L3RgiDRgtC10LrRg9GJ0LXQuSB2aWV3XG5cdCAqL1xuXHRhcHBlbmRUbyhlbCkge1xuXHRcdGVsLmFwcGVuZENoaWxkKHRoaXMuX2VsKTtcblx0fVxuXG5cdC8qKlxuXHQgKiDQo9C00LDQu9GP0LXRgiDRjdC70LXQvNC10L3RgiDRgtC10LrRg9GJ0LXQuSB2aWV3XG5cdCAqL1xuXHRyZW1vdmUoKSB7XG5cdFx0dGhpcy5fZWwgJiYgdGhpcy5fZWwucmVtb3ZlKCk7XG5cdH1cblxuXHQvKipcblx0ICog0JfQsNC80LXQvdGP0LXRgiDRjdC70LXQvNC10L3RgiDRgtC10LrRg9GJ0LXQuSB2aWV3XG5cdCAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsIC0gSFRNTC3RjdC70LXQvNC10L3Rgiwg0LrQvtGC0L7RgNGL0Lkg0YHRgtCw0L3QvtCy0LjRgtGB0Y8g0Y3Qu9C10LzQtdC90YLQvtC8INGC0LXQutGD0YnQtdC5IHZpZXdcblx0ICovXG5cdHNldEVsZW1lbnQoZWwpIHtcblx0XHR0aGlzLl9lbCAmJiB0aGlzLl9lbC5yZW1vdmUoKTtcblx0XHR0aGlzLl9lbCA9IGVsO1xuXHR9XG5cblx0LyoqXG5cdCAqINCj0YHRgtCw0L3QsNCy0LvQuNCy0LDQtdGCINGC0LXQutGD0YnQtdC5IHZpZXcg0L3QsNCx0L7RgCDQsNGC0YDQuNCx0YPRgtC+0LJcblx0ICogQHBhcmFtIHtPYmplY3R9IFthdHRycz17fV0gLSDQntCx0YrQtdC60YIg0YEg0LDRgtGA0LjQsdGD0YLQsNC80LgsINC60L7RgtC+0YDRi9C1INCx0YPQtNGD0YIg0YPRgdGC0LDQvdC+0LLQu9C10L3RiyDRgyDRgtC10LrRg9GJ0LXQs9C+INGN0LvQtdC80LXQvdGC0LAgdmlld1xuXHQgKi9cblx0c2V0QXR0cnMoYXR0cnMgPSB7fSkge1xuXHRcdE9iamVjdC5rZXlzKGF0dHJzKS5mb3JFYWNoKG5hbWUgPT4ge1xuXHRcdFx0dGhpcy5fZWwuc2V0QXR0cmlidXRlKG5hbWUsIGF0dHJzW25hbWVdKTtcblx0XHR9KVxuXHR9XG5cblx0LyoqXG5cdCAqINCS0L7Qt9Cy0YDQsNGJ0LDQtdGCINGB0YLRgNC+0LrRgywg0YHQvtC00LXRgNC20LDRiNGD0Y4g0YLQtdC60YHRgtC+0LLQvtC1INC/0YDQtdC00YHRgtCw0LLQu9C10L3QuNC1INGC0LXQutGD0YnQtdC5IHZpZXdcblx0ICogQHJldHVybnMge3N0cmluZ31cblx0ICovXG5cdHRvU3RyaW5nKCkge1xuXHRcdHJldHVybiB0aGlzLl9lbC5vdXRlckhUTUw7XG5cdH1cblxuXHQvKipcblx0ICog0KPRgdGC0LDQvdCw0LLQu9C40LLQsNC10YIg0YLQtdC60YPRidC10LkgdmlldyDRgNC+0YPRgtC10YBcblx0ICogQHBhcmFtIHtSb3V0ZXJ9IHJvdXRlciAtINC40L3RgdGC0LDQvdGBINGA0L7Rg9GC0LXRgNCwXG5cdCAqL1xuXHRzZXRSb3V0ZXIocm91dGVyKSB7XG5cdFx0dGhpcy5yb3V0ZXIgPSByb3V0ZXI7XG5cdH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3B1YmxpYy9qcy9tb2R1bGVzL3ZpZXcuanMiXSwic291cmNlUm9vdCI6IiJ9