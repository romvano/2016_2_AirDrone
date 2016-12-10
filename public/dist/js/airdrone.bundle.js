webpackJsonp([0],{

/***/ 115:
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _route = __webpack_require__(129);

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

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _view = __webpack_require__(59);

var _view2 = _interopRequireDefault(_view);

var _loginTmpl = __webpack_require__(122);

var _loginTmpl2 = _interopRequireDefault(_loginTmpl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LoginView = function (_View) {
    _inherits(LoginView, _View);

    function LoginView() {
        _classCallCheck(this, LoginView);

        return _possibleConstructorReturn(this, (LoginView.__proto__ || Object.getPrototypeOf(LoginView)).call(this, { element: '.js-login' }));
    }

    _createClass(LoginView, [{
        key: 'resume',
        value: function resume() {
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            var self = this;
            self.render();
            self.show();
        }
    }, {
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
        key: 'show',
        value: function show() {
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            _get(LoginView.prototype.__proto__ || Object.getPrototypeOf(LoginView.prototype), 'show', this).call(this);
            document.body.classList.add('body-login');
        }
    }, {
        key: 'hide',
        value: function hide() {
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            _get(LoginView.prototype.__proto__ || Object.getPrototypeOf(LoginView.prototype), 'hide', this).call(this);
            document.body.classList.remove('body-login');
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

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _view = __webpack_require__(59);

var _view2 = _interopRequireDefault(_view);

var _registrationTmpl = __webpack_require__(123);

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

        return _possibleConstructorReturn(this, (RegistrationView.__proto__ || Object.getPrototypeOf(RegistrationView)).call(this, { element: '.js-registration' }));
    }

    _createClass(RegistrationView, [{
        key: 'resume',
        value: function resume() {
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            var self = this;
            self.render();
            self.show();
        }
    }, {
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
        key: 'show',
        value: function show() {
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            _get(RegistrationView.prototype.__proto__ || Object.getPrototypeOf(RegistrationView.prototype), 'show', this).call(this);
            this._el.hidden = false;
            document.body.classList.add('body-registration');
        }
    }, {
        key: 'hide',
        value: function hide() {
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            _get(RegistrationView.prototype.__proto__ || Object.getPrototypeOf(RegistrationView.prototype), 'hide', this).call(this);
            document.body.classList.remove('body-registration');
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

var _view = __webpack_require__(59);

var _view2 = _interopRequireDefault(_view);

var _UserCollection = __webpack_require__(125);

var _UserCollection2 = _interopRequireDefault(_UserCollection);

var _scoreboardTmpl = __webpack_require__(124);

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

            var self = this;
            self.render();
            self.show();
        }
    }, {
        key: 'render',
        value: function render() {
            var self = this;
            self.userCollection.fetch().then(function () {
                console.log('got here');
                //            console.log('heeeeeeeeeeere', this.getCollection(), self.userCollection.getCollection());
                self._el.innerHTML = (0, _scoreboardTmpl2.default)(self.userCollection.getCollection());
            }).catch(function () {
                console.log('sth wro');
            });
        }
    }]);

    return ScoreboardView;
}(_view2.default);

exports.default = ScoreboardView;

/***/ },

/***/ 122:
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

/***/ 123:
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

/***/ 124:
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

/***/ 125:
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _UserModel = __webpack_require__(127);

var _UserModel2 = _interopRequireDefault(_UserModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

/***/ 126:
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

/***/ 127:
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _libs = __webpack_require__(126);

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
                username: self.username,
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

/***/ },

/***/ 128:
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

/***/ 129:
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pathToRegex = __webpack_require__(128);

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

/***/ 314:
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var _router = __webpack_require__(115);

var _router2 = _interopRequireDefault(_router);

var _loginView = __webpack_require__(116);

var _loginView2 = _interopRequireDefault(_loginView);

var _registrationView = __webpack_require__(117);

var _registrationView2 = _interopRequireDefault(_registrationView);

var _scoreboardView = __webpack_require__(118);

var _scoreboardView2 = _interopRequireDefault(_scoreboardView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = new _router2.default();
router.addRoute('/login', _loginView2.default);
router.addRoute('/registration', _registrationView2.default);
router.addRoute('/scoreboard', _scoreboardView2.default);
router.addRoute('/', _loginView2.default);
router.start();
window.router = router;

/***/ },

/***/ 59:
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
		console.log('here: ', this._el);
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

			this._el.hidden = false;
		}

		/**
   * Скрывает view
   * @param {Object} [options={}] - Объект с параметрами
   */

	}, {
		key: 'hide',
		value: function hide() {
			var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			this._el.hidden = true;
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

},[314]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvbW9kdWxlcy9yb3V0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL3ZpZXdzL2xvZ2luVmlldy5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvdmlld3MvcmVnaXN0cmF0aW9uVmlldy5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvdmlld3Mvc2NvcmVib2FyZFZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL3RlbXBsYXRlcy9sb2dpbi50bXBsLnhtbCIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvdGVtcGxhdGVzL3JlZ2lzdHJhdGlvbi50bXBsLnhtbCIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvdGVtcGxhdGVzL3Njb3JlYm9hcmQudG1wbC54bWwiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL2NvbGxlY3Rpb25zL1VzZXJDb2xsZWN0aW9uLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy9saWJzLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy9tb2RlbHMvVXNlck1vZGVsLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy9tb2R1bGVzL3BhdGhUb1JlZ2V4LmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy9tb2R1bGVzL3JvdXRlLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy9haXJkcm9uZS5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvbW9kdWxlcy92aWV3LmpzIl0sIm5hbWVzIjpbIlJvdXRlciIsIl9faW5zdGFuY2UiLCJyb3V0ZXMiLCJhY3RpdmVSb3V0ZSIsImhpc3RvcnkiLCJ3aW5kb3ciLCJwYXRobmFtZSIsInZpZXciLCJvcHRpb25zIiwicm91dGUiLCJzZXRSb3V0ZXIiLCJwdXNoIiwic3RhdGUiLCJvbnBvcHN0YXRlIiwiZXZlbnQiLCJsb2NhdGlvbiIsIm9ucm91dGUiLCJiaW5kIiwiZmluZCIsIm1hdGNoIiwibGVhdmUiLCJuYXZpZ2F0ZSIsInB1c2hTdGF0ZSIsImJhY2siLCJmb3J3YXJkIiwiTG9naW5WaWV3IiwiZWxlbWVudCIsInNlbGYiLCJyZW5kZXIiLCJzaG93IiwiX2VsIiwiaW5uZXJIVE1MIiwiZGF0YSIsIl9mb3JtIiwicXVlcnlTZWxlY3RvciIsIm9uc3VibWl0IiwibG9naW4iLCJjaGlsZHJlbiIsImVtYWlsIiwib25ibHVyIiwidmFsaWRhdGVFbWFpbCIsInBhc3N3b3JkIiwidmFsaWRhdGVQYXNzd29yZCIsIm9ua2V5dXAiLCJlIiwia2V5Q29kZSIsInJlZ2lzdHJhdGlvbiIsIm9uY2xpY2siLCJyb3V0ZXIiLCJnbyIsImVtYWlsRXJyb3IiLCJwYXNzd29yZEVycm9yIiwiZG9jdW1lbnQiLCJib2R5IiwiY2xhc3NMaXN0IiwiYWRkIiwicmVtb3ZlIiwiZWxlbWVudHMiLCJ2YWx1ZSIsInNlYXJjaCIsImhpZGRlbiIsImxlbmd0aCIsInZhbGlkYXRlIiwidXNlciIsIlVzZXJNb2RlbCIsInJlc3BvbnNlIiwiZ2V0RW1haWxFcnJvciIsImdldFBhc3N3b3JkRXJyb3IiLCJzdGF0dXMiLCJSZWdpc3RyYXRpb25WaWV3IiwicmVnaXN0ZXIiLCJwYXNzd29yZDIiLCJ2YWxpZGF0ZUxvZ2luIiwibG9naW5FcnJvciIsInN0eWxlIiwiZGlzcGxheSIsInVzZXJuYW1lIiwic2F2ZSIsInRleHRDb250ZW50IiwiZ2V0TG9naW5FcnJvciIsIlNjb3JlYm9hcmRWaWV3IiwidXNlckNvbGxlY3Rpb24iLCJmZXRjaCIsInRoZW4iLCJjb25zb2xlIiwibG9nIiwiZ2V0Q29sbGVjdGlvbiIsImNhdGNoIiwiVXNlckNvbGxlY3Rpb24iLCJfZGF0YSIsInJlamVjdCIsImpzb24iLCJzb3J0IiwiYSIsImIiLCJzY29yZSIsInJlcXVlc3QiLCJ1cmwiLCJtZXRob2QiLCJ4aHIiLCJYTUxIdHRwUmVxdWVzdCIsIm9wZW4iLCJzZXRSZXF1ZXN0SGVhZGVyIiwic2VuZCIsIkpTT04iLCJzdHJpbmdpZnkiLCJnYW1lcyIsInBhdGhUb1JlZ2V4Iiwia2V5TmFtZXMiLCJwYXJ0cyIsInNwbGl0IiwiZmlsdGVyIiwicGFydCIsIm1hcCIsImV4ZWMiLCJzbGljZSIsIlJlZ0V4cCIsInBhdGgiLCJrZXlzIiwiY2hlY2siLCJldmVyeSIsInJlZ2V4cCIsInN0ZXAiLCJ0bXAiLCJyZXBsYWNlIiwicmVkdWNlIiwicHJldiIsImN1cnIiLCJwb3MiLCJpZCIsIlJvdXRlIiwicmVnZXgiLCJWaWV3IiwiX3ZpZXciLCJpbml0IiwiX19yb3V0ZXIiLCJyZXN1bWUiLCJPYmplY3QiLCJhc3NpZ24iLCJwYXVzZSIsImFkZFJvdXRlIiwic3RhcnQiLCJ0YWdOYW1lIiwiY3JlYXRlRWxlbWVudCIsImhpZGUiLCJzZXRBdHRycyIsImF0dHJzIiwiZWwiLCJhcHBlbmRDaGlsZCIsImZvckVhY2giLCJzZXRBdHRyaWJ1dGUiLCJuYW1lIiwib3V0ZXJIVE1MIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7OztBQUVBO0lBQ3FCQSxNO0FBQ3BCOzs7QUFHQSxtQkFBYztBQUFBOztBQUNiLE1BQUlBLE9BQU9DLFVBQVgsRUFBdUI7QUFDdEIsVUFBT0QsT0FBT0MsVUFBZDtBQUNBOztBQUVELE9BQUtDLE1BQUwsR0FBYyxFQUFkO0FBQ0EsT0FBS0MsV0FBTCxHQUFtQixJQUFuQjs7QUFFQSxPQUFLQyxPQUFMLEdBQWVDLE9BQU9ELE9BQXRCOztBQUVBSixTQUFPQyxVQUFQLEdBQW9CLElBQXBCO0FBQ0E7O0FBRUQ7Ozs7Ozs7Ozs7OzJCQU9TSyxRLEVBQVVDLEksRUFBb0I7QUFBQSxPQUFkQyxPQUFjLHVFQUFKLEVBQUk7O0FBQ3RDLE9BQUlDLFFBQVEsb0JBQVVILFFBQVYsRUFBb0JDLElBQXBCLEVBQTBCQyxPQUExQixDQUFaO0FBQ0FDLFNBQU1DLFNBQU4sQ0FBZ0IsSUFBaEI7QUFDQSxRQUFLUixNQUFMLENBQVlTLElBQVosQ0FBaUJGLEtBQWpCO0FBQ0EsVUFBTyxJQUFQO0FBQ0E7O0FBRUQ7Ozs7Ozs7MEJBSWtCO0FBQUEsT0FBWkcsS0FBWSx1RUFBSixFQUFJOztBQUNqQlAsVUFB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ZSBmcm9tICcuL3JvdXRlJztcblxuLyoqINCa0LvQsNGB0YEg0YDQvtGD0YLQtdGA0LAgKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvdXRlciB7XG5cdC8qKlxuXHQgKiDQodC+0LfQtNCw0ZHRgiDQvdC+0LLRi9C5INGA0L7Rg9GC0LXRgCDQuNC70Lgg0LLQvtC30LLRgNCw0YnQsNC10YIg0YPQttC1INGB0L7Qt9C00LDQvdC90YvQuSDQuNC90YHRgtCw0L3RgVxuXHQgKi9cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0aWYgKFJvdXRlci5fX2luc3RhbmNlKSB7XG5cdFx0XHRyZXR1cm4gUm91dGVyLl9faW5zdGFuY2U7XG5cdFx0fVxuXG5cdFx0dGhpcy5yb3V0ZXMgPSBbXTtcblx0XHR0aGlzLmFjdGl2ZVJvdXRlID0gbnVsbDtcblxuXHRcdHRoaXMuaGlzdG9yeSA9IHdpbmRvdy5oaXN0b3J5O1xuXG5cdFx0Um91dGVyLl9faW5zdGFuY2UgPSB0aGlzO1xuXHR9XG5cblx0LyoqXG5cdCAqINCU0L7QsdCw0LLQu9GP0LXRgiDQvdC+0LLRi9C5IFJvdXRlINCyINGA0L7Rg9GC0LXRgFxuXHQgKiBAcGFyYW0ge3N0cmluZ30gcGF0aG5hbWUgLSDQqNCw0LHQu9C+0L0g0L/Rg9GC0Lhcblx0ICogQHBhcmFtIHtWaWV3fSB2aWV3IC0g0JrQu9Cw0YHRgSDQutC+0L3QutGA0LXRgtC90L7QuSBWaWV3XG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gLSDQlNC+0L/QvtC70L3QuNGC0LXQu9GM0L3Ri9C1INC/0LDRgNCw0LzQtdGC0YDRiywg0LrQvtGC0L7RgNGL0LUg0LHRg9C00YPRgiDQv9C10YDQtdC00LDQvdGLINCy0L4gdmlldyDQv9GA0Lgg0LXRkSDRgdC+0LfQtNCw0L3QuNC4INC4INC40L3QuNGG0LjQsNC70LjQt9Cw0YbQuNC4XG5cdCAqIEByZXR1cm5zIHtSb3V0ZXJ9XG5cdCAqL1xuXHRhZGRSb3V0ZShwYXRobmFtZSwgdmlldywgb3B0aW9ucyA9IHt9KSB7XG5cdFx0bGV0IHJvdXRlID0gbmV3IFJvdXRlKHBhdGhuYW1lLCB2aWV3LCBvcHRpb25zKTtcblx0XHRyb3V0ZS5zZXRSb3V0ZXIodGhpcyk7XG5cdFx0dGhpcy5yb3V0ZXMucHVzaChyb3V0ZSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHQvKipcblx0ICog0JfQsNC/0YPRgdC60LDQtdGCINGA0L7Rg9GC0LXRgCDQuCDQv9C10YDQtdGF0L7QtNC40YIg0L/QviDRgtC10LrRg9GJ0LXQvNGDINC/0YPRgtC4INCyINC/0YDQuNC70L7QttC10L3QuNC4XG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbc3RhdGU9e31dIC0g0J7QsdGK0LXQutGCIHN0YXRlLCDQutC+0YLQvtGA0YvQuSDQv9C10YDQtdC00LDRkdGC0YHRjyDQsiDQv9C10YDQstGL0Lkg0LLRi9C30L7QsiBvbnJvdXRlXG5cdCAqL1xuXHRzdGFydChzdGF0ZSA9IHt9KSB7XG5cdFx0d2luZG93Lm9ucG9wc3RhdGUgPSBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRcdGxldCBzdGF0ZSA9IGV2ZW50LnN0YXRlO1xuXHRcdFx0bGV0IHBhdGhuYW1lID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lO1xuXHRcdFx0dGhpcy5vbnJvdXRlKHBhdGhuYW1lLCBzdGF0ZSk7XG5cdFx0fS5iaW5kKHRoaXMpO1xuXG5cdFx0Y29uc3QgcGF0aG5hbWUgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG5cdFx0dGhpcy5vbnJvdXRlKHBhdGhuYW1lLCBzdGF0ZSk7XG5cdH1cblxuXHQvKipcblx0ICog0KTRg9C90LrRhtC40Y8sINCy0YvQt9GL0LLQsNC10LzQsNGPINC/0YDQuCDQv9C10YDQtdGF0L7QtNC1INC90LAg0L3QvtCy0YvQuSDRgNC+0YPRgiDQsiDQv9GA0LjQu9C+0LbQtdC90LjQuFxuXHQgKiBAcGFyYW0ge3N0cmluZ30gcGF0aG5hbWUgLSDQn9GD0YLRjCwg0L/QviDQutC+0YLQvtGA0L7QvNGDINC/0YDQvtC40YHRhdC+0LTQuNGCINC/0LXRgNC10YXQvtC0XG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbc3RhdGU9e31dIC0g0J7QsdGK0LXQutGCIHN0YXRlLCDQutC+0YLQvtGA0YvQuSDQv9C10YDQtdC00LDRkdGC0YHRjyDQsiDQstGL0LfQvtCyINC80LXRgtC+0LTQsCBuYXZpZ2F0ZVxuXHQgKi9cblx0b25yb3V0ZShwYXRobmFtZSwgc3RhdGUgPSB7fSkge1xuXHRcdGxldCByb3V0ZSA9IHRoaXMucm91dGVzLmZpbmQocm91dGUgPT4gcm91dGUubWF0Y2gocGF0aG5hbWUpKTtcblx0XHRpZiAoIXJvdXRlKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuYWN0aXZlUm91dGUpIHtcblx0XHRcdHRoaXMuYWN0aXZlUm91dGUubGVhdmUoKTtcblx0XHR9XG5cblx0XHR0aGlzLmFjdGl2ZVJvdXRlID0gcm91dGU7XG5cdFx0dGhpcy5hY3RpdmVSb3V0ZS5uYXZpZ2F0ZShwYXRobmFtZSwgc3RhdGUpO1xuXHR9XG5cblx0LyoqXG5cdCAqINCf0YDQvtCz0YDQsNC80LzQvdGL0Lkg0L/QtdGA0LXRhdC+0LQg0L3QsCDQvdC+0LLRi9C5INC/0YPRgtGMXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBwYXRobmFtZSAtINCf0YPRgtGMXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbc3RhdGU9e31dIC0g0J7QsdGK0LXQutGCIHN0YXRlLCDQutC+0YLQvtGA0YvQuSDQv9C10YDQtdC00LDRkdGC0YHRjyDQsiDQstGL0LfQvtCyIGhpc3RvcnkucHVzaFN0YXRlXG5cdCAqL1xuXHRnbyhwYXRobmFtZSwgc3RhdGUgPSB7fSkge1xuXHRcdGlmICh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPT09IHBhdGhuYW1lKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdHRoaXMuaGlzdG9yeS5wdXNoU3RhdGUoc3RhdGUsICcnLCBwYXRobmFtZSk7XG5cdFx0dGhpcy5vbnJvdXRlKHBhdGhuYW1lLCBzdGF0ZSk7XG5cdH1cblxuXHQvKipcblx0ICog0J/QvtC30LLQvtC70Y/QtdGCINGD0YHRgtCw0L3QvtCy0LjRgtGMINGB0LLQvtGOINGB0L7QsdGB0YLQstC10L3QvdGD0Y4g0YDQtdCw0LvQuNC30LDRhtC40Y4gSGlzdG9yeSBBUElcblx0ICogQHBhcmFtIHtPYmplY3R9IGhpc3RvcnkgLSDQtNC+0LvQttC10L0g0L/RgNC10LTQvtGB0YLQsNCy0LvRj9GC0Ywg0YDQtdCw0LvQuNC30LDRhtC40Y4g0LzQtdGC0L7QtNC+0LIgYmFjaygpLCBmb3J3YXJkKCksIHB1c2hTdGF0ZSgpXG5cdCAqL1xuXHRzZXRIaXN0b3J5KGhpc3RvcnkpIHtcblx0XHR0aGlzLmhpc3RvcnkgPSBoaXN0b3J5O1xuXHR9XG5cblx0LyoqXG5cdCAqINCS0L7Qt9Cy0YDQsNGCINC90LAg0L7QtNC40L0g0YjQsNCzINC90LDQt9Cw0LQg0LIg0LjRgdGC0L7RgNC40Lgg0LHRgNCw0YPQt9C10YDQsFxuXHQgKi9cblx0YmFjaygpIHtcblx0XHR0aGlzLmhpc3RvcnkuYmFjaygpO1xuXHR9XG5cblx0LyoqXG5cdCAqINCf0LXRgNC10YXQvtC0INC90LAg0L7QtNC40L0g0YjQsNCzINCy0L/QtdGA0ZHQtCDQsiDQuNGB0YLQvtGA0LjQuCDQsdGA0LDRg9C30LXRgNCwXG5cdCAqL1xuXHRmb3J3YXJkKCkge1xuXHRcdHRoaXMuaGlzdG9yeS5mb3J3YXJkKCk7XG5cdH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3B1YmxpYy9qcy9tb2R1bGVzL3JvdXRlci5qcyIsImltcG9ydCBWaWV3IGZyb20gJy4uL21vZHVsZXMvdmlldyc7XG5pbXBvcnQgdGVtcGxhdGUgZnJvbSAnLi4vLi4vdGVtcGxhdGVzL2xvZ2luLnRtcGwueG1sJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9naW5WaWV3IGV4dGVuZHMgVmlldyB7XG4gICAgY29uc3RydWN0b3IgKCkge1xuICAgICAgICBzdXBlcih7IGVsZW1lbnQ6ICcuanMtbG9naW4nIH0pO1xuICAgIH1cblxuICAgIHJlc3VtZShvcHRpb25zID0ge30pIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgICAgIHNlbGYucmVuZGVyKCk7XG4gICAgICAgIHNlbGYuc2hvdygpO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgICAgIHNlbGYuX2VsLmlubmVySFRNTCA9IHRlbXBsYXRlKHNlbGYuZGF0YSk7XG4gICAgICAgIHNlbGYuX2Zvcm0gPSBzZWxmLl9lbC5xdWVyeVNlbGVjdG9yKCcuanMtbG9naW4tZm9ybScpO1xuICAgICAgICBzZWxmLl9mb3JtLm9uc3VibWl0ID0gZnVuY3Rpb24gKCkgeyBzZWxmLmxvZ2luKCk7IHJldHVybiBmYWxzZTsgfVxuICAgICAgICBzZWxmLl9mb3JtLmNoaWxkcmVuLmVtYWlsLm9uYmx1ciA9IGZ1bmN0aW9uICgpIHsgc2VsZi52YWxpZGF0ZUVtYWlsKCk7IH1cbiAgICAgICAgc2VsZi5fZm9ybS5jaGlsZHJlbi5wYXNzd29yZC5vbmJsdXIgPSBmdW5jdGlvbiAoKSB7IHNlbGYudmFsaWRhdGVQYXNzd29yZCgpOyB9XG4gICAgICAgIHNlbGYuX2Zvcm0uY2hpbGRyZW4ucGFzc3dvcmQub25rZXl1cCA9IGZ1bmN0aW9uIChlKSB7IFxuICAgICAgICAgICAgaWYgKGUua2V5Q29kZSAhPT0gOCAmJiBlLmtleUNvZGUgIT09IDkpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnZhbGlkYXRlUGFzc3dvcmQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzZWxmLl9mb3JtLmNoaWxkcmVuLnJlZ2lzdHJhdGlvbi5vbmNsaWNrID0gZnVuY3Rpb24gKCkgeyBzZWxmLnJvdXRlci5nbygnL3JlZ2lzdHJhdGlvbicpOyB9XG4gICAgICAgIHNlbGYuZW1haWxFcnJvciA9IHNlbGYuX2Zvcm0uY2hpbGRyZW4uZW1haWxFcnJvcjtcbiAgICAgICAgc2VsZi5wYXNzd29yZEVycm9yID0gc2VsZi5fZm9ybS5jaGlsZHJlbi5wYXNzd29yZEVycm9yO1xuICAgIH1cblxuICAgIHNob3cob3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIHN1cGVyLnNob3coKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdib2R5LWxvZ2luJyk7XG4gICAgfVxuXG4gICAgaGlkZShvcHRpb25zID0ge30pIHtcbiAgICAgICAgc3VwZXIuaGlkZSgpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ2JvZHktbG9naW4nKTtcbiAgICB9XG5cbiAgICB2YWxpZGF0ZUVtYWlsKCkge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgaWYgKHNlbGYuX2Zvcm0uZWxlbWVudHMuZW1haWwudmFsdWUuc2VhcmNoKC8uQC4vKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIHNlbGYuZW1haWxFcnJvci5oaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgICAgIHNlbGYuZW1haWxFcnJvci5pbm5lckhUTUwgPSAn0J/QvtC20LDQu9GD0LnRgdGC0LAsINC/0YDQvtCy0LXRgNGM0YLQtSDQv9GA0LDQstC40LvRjNC90L7RgdGC0YwgZS1tYWlsISc7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgc2VsZi5lbWFpbEVycm9yLmhpZGRlbiA9IHRydWU7XG4gICAgICAgIHNlbGYuZW1haWxFcnJvci5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgdmFsaWRhdGVQYXNzd29yZCgpIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgICAgIGlmIChzZWxmLl9mb3JtLmVsZW1lbnRzLnBhc3N3b3JkLnZhbHVlLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICAgIHNlbGYucGFzc3dvcmRFcnJvci5oaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgICAgIHNlbGYucGFzc3dvcmRFcnJvci5pbm5lckhUTUwgPSAn0J/QvtC20LDQu9GD0LnRgdGC0LAsINCy0LLQtdC00LjRgtC1INC/0LDRgNC+0LvRjCEnO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHNlbGYucGFzc3dvcmRFcnJvci5oaWRkZW4gPSB0cnVlO1xuICAgICAgICBzZWxmLnBhc3N3b3JkRXJyb3IuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHZhbGlkYXRlKCkge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgcmV0dXJuIHNlbGYudmFsaWRhdGVFbWFpbCgpICYmIHNlbGYudmFsaWRhdGVQYXNzd29yZCgpO1xuICAgIH1cblxuICAgIGxvZ2luKCkge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgaWYgKCFzZWxmLnZhbGlkYXRlKCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB1c2VyID0gbmV3IFVzZXJNb2RlbCh7XG4gICAgICAgICAgICBlbWFpbDogc2VsZi5fZm9ybS5lbGVtZW50cy5lbWFpbC52YWx1ZSxcbiAgICAgICAgICAgIHBhc3N3b3JkOiBzZWxmLl9mb3JtLmVsZW1lbnRzLnBhc3N3b3JkLnZhbHVlLFxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCByZXNwb25zZSA9IHVzZXIubG9naW4oKTtcbiAgICAgICAgc2VsZi5fZm9ybS5jaGlsZHJlbi5lbWFpbEVycm9yLmlubmVySFRNTCA9IHVzZXIuZ2V0RW1haWxFcnJvcigpO1xuICAgICAgICBzZWxmLl9mb3JtLmNoaWxkcmVuLnBhc3N3b3JkRXJyb3IuaW5uZXJIVE1MID0gdXNlci5nZXRQYXNzd29yZEVycm9yKCk7XG4gICAgICAgIHNlbGYuX2Zvcm0uY2hpbGRyZW4uZW1haWxFcnJvci5oaWRkZW4gPSBzZWxmLl9mb3JtLmNoaWxkcmVuLmVtYWlsRXJyb3IuaW5uZXJIVE1MID8gZmFsc2UgOiB0cnVlO1xuICAgICAgICBzZWxmLl9mb3JtLmNoaWxkcmVuLnBhc3N3b3JkRXJyb3IuaGlkZGVuID0gc2VsZi5fZm9ybS5jaGlsZHJlbi5wYXNzd29yZEVycm9yLmlubmVySFRNTCA/IGZhbHNlIDogdHJ1ZTtcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PSAyMDApIHtcbiAgICAgICAgICAgIHNlbGYucm91dGVyLmdvKCcvcm9vbXMnKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3B1YmxpYy9qcy92aWV3cy9sb2dpblZpZXcuanMiLCJpbXBvcnQgVmlldyBmcm9tICcuLi9tb2R1bGVzL3ZpZXcnO1xuaW1wb3J0IHRlbXBsYXRlIGZyb20gJy4uLy4uL3RlbXBsYXRlcy9yZWdpc3RyYXRpb24udG1wbC54bWwnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWdpc3RyYXRpb25WaWV3IGV4dGVuZHMgVmlldyB7XG4gICAgY29uc3RydWN0b3IgKG9wdGlvbnMgPSB7fSkge1xuICAgICAgICBzdXBlcih7IGVsZW1lbnQ6ICcuanMtcmVnaXN0cmF0aW9uJyB9KTtcbiAgICB9XG5cbiAgICByZXN1bWUob3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgICBzZWxmLnJlbmRlcigpO1xuICAgICAgICBzZWxmLnNob3coKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgICBzZWxmLl9lbC5pbm5lckhUTUwgPSB0ZW1wbGF0ZShzZWxmLmRhdGEpO1xuICAgICAgICBzZWxmLl9mb3JtID0gc2VsZi5fZWwucXVlcnlTZWxlY3RvcignLmpzLXJlZ2lzdHJhdGlvbi1mb3JtJyk7XG4gICAgICAgIHNlbGYuX2Zvcm0ub25zdWJtaXQgPSBmdW5jdGlvbiAoKSB7IHNlbGYucmVnaXN0ZXIoKTsgcmV0dXJuIGZhbHNlOyB9XG4gICAgICAgIHNlbGYuX2Zvcm0uY2hpbGRyZW4uZW1haWwub25ibHVyID0gZnVuY3Rpb24gKCkgeyBzZWxmLnZhbGlkYXRlRW1haWwoKTsgfVxuICAgICAgICBzZWxmLl9mb3JtLmNoaWxkcmVuLnBhc3N3b3JkLm9uYmx1ciA9IGZ1bmN0aW9uICgpIHsgc2VsZi52YWxpZGF0ZVBhc3N3b3JkKCk7IH1cbiAgICAgICAgc2VsZi5fZm9ybS5jaGlsZHJlbi5wYXNzd29yZC5vbmtleXVwID0gZnVuY3Rpb24gKGUpIHsgXG4gICAgICAgICAgICBpZiAoZS5rZXlDb2RlICE9PSA4ICYmIGUua2V5Q29kZSAhPT0gOSkge1xuICAgICAgICAgICAgICAgIHNlbGYudmFsaWRhdGVQYXNzd29yZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHNlbGYuX2Zvcm0uY2hpbGRyZW4ucGFzc3dvcmQyLm9uYmx1ciA9IGZ1bmN0aW9uICgpIHsgc2VsZi52YWxpZGF0ZVBhc3N3b3JkKCk7IH1cbiAgICAgICAgc2VsZi5fZm9ybS5jaGlsZHJlbi5wYXNzd29yZDIub25rZXl1cCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBpZiAoZS5rZXlDb2RlICE9PSA4ICYmIGUua2V5Q29kZSAhPT0gOSkge1xuICAgICAgICAgICAgICAgIHNlbGYudmFsaWRhdGVQYXNzd29yZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHNlbGYuX2Zvcm0uY2hpbGRyZW4ubG9naW4ub25ibHVyID0gZnVuY3Rpb24gKCkgeyBzZWxmLnZhbGlkYXRlTG9naW4oKTsgfVxuICAgICAgICBzZWxmLmVtYWlsRXJyb3IgPSBzZWxmLl9mb3JtLmNoaWxkcmVuLmVtYWlsRXJyb3I7XG4gICAgICAgIHNlbGYucGFzc3dvcmRFcnJvciA9IHNlbGYuX2Zvcm0uY2hpbGRyZW4ucGFzc3dvcmRFcnJvcjtcbiAgICAgICAgc2VsZi5sb2dpbkVycm9yID0gc2VsZi5fZm9ybS5jaGlsZHJlbi5sb2dpbkVycm9yO1xuICAgIH1cblxuICAgIHNob3cob3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIHN1cGVyLnNob3coKTtcbiAgICAgICAgdGhpcy5fZWwuaGlkZGVuID0gZmFsc2U7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnYm9keS1yZWdpc3RyYXRpb24nKTtcbiAgICB9XG5cbiAgICBoaWRlKG9wdGlvbnMgPSB7fSkge1xuICAgICAgICBzdXBlci5oaWRlKCk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnYm9keS1yZWdpc3RyYXRpb24nKTtcbiAgICB9XG5cbiAgICB2YWxpZGF0ZUVtYWlsKCkge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgaWYgKHNlbGYuX2Zvcm0uZWxlbWVudHMuZW1haWwudmFsdWUuc2VhcmNoKC8uK0AuK1xcLi4rLykgPT09IC0xKSB7XG4gICAgICAgICAgICBzZWxmLmVtYWlsRXJyb3IuaW5uZXJIVE1MID0gJ9Cf0L7QttCw0LvRg9C50YHRgtCwLCDQv9GA0L7QstC10YDRjNGC0LUg0L/RgNCw0LLQuNC70YzQvdC+0YHRgtGMIGUtbWFpbCc7XG4gICAgICAgICAgICBzZWxmLmVtYWlsRXJyb3Iuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgc2VsZi5lbWFpbEVycm9yLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIHNlbGYuZW1haWxFcnJvci5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgdmFsaWRhdGVQYXNzd29yZCgpIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgICAgIGlmIChzZWxmLl9mb3JtLmVsZW1lbnRzLnBhc3N3b3JkLnZhbHVlLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICAgIHNlbGYucGFzc3dvcmRFcnJvci5pbm5lckhUTUwgPSAn0J/QvtC20LDQu9GD0LnRgdGC0LAsINCy0LLQtdC00LjRgtC1INC/0LDRgNC+0LvRjCEnO1xuICAgICAgICAgICAgc2VsZi5wYXNzd29yZEVycm9yLmhpZGRlbiA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzZWxmLl9mb3JtLmVsZW1lbnRzLnBhc3N3b3JkLnZhbHVlLmxlbmd0aCA8IDgpIHtcbiAgICAgICAgICAgIHNlbGYucGFzc3dvcmRFcnJvci5pbm5lckhUTUwgPSAn0J/QsNGA0L7Qu9GMINC90YPQttC10L0g0LTQu9C40L3QvdC10LUgOCDRgdC40LzQstC+0LvQvtCyID0oJztcbiAgICAgICAgICAgIHNlbGYucGFzc3dvcmRFcnJvci5oaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2VsZi5fZm9ybS5lbGVtZW50cy5wYXNzd29yZDIudmFsdWUubGVuZ3RoID4gMFxuICAgICAgICAgICAgJiYgc2VsZi5fZm9ybS5lbGVtZW50cy5wYXNzd29yZC52YWx1ZSAhPSBzZWxmLl9mb3JtLmVsZW1lbnRzLnBhc3N3b3JkMi52YWx1ZSkge1xuICAgICAgICAgICAgc2VsZi5fZm9ybS5jaGlsZHJlbi5wYXNzd29yZEVycm9yLmlubmVySFRNTCA9ICfQn9Cw0YDQvtC70Lgg0L3QtSDRgdC+0LLQv9Cw0LTQsNGO0YIhJztcbiAgICAgICAgICAgIHNlbGYucGFzc3dvcmRFcnJvci5oaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBzZWxmLnBhc3N3b3JkRXJyb3IuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIHNlbGYucGFzc3dvcmRFcnJvci5oaWRkZW4gPSB0cnVlO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICB2YWxpZGF0ZUxvZ2luKCkge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgaWYgKHNlbGYuX2Zvcm0uZWxlbWVudHMubG9naW4udmFsdWUubGVuZ3RoIDwgMSkge1xuICAgICAgICAgICAgc2VsZi5sb2dpbkVycm9yLmlubmVySFRNTCA9ICfQn9C+0LbQsNC70YPQudGB0YLQsCwg0LLQstC10LTQuNGC0LUg0LrQu9C40LrRg9GF0YMhJztcbiAgICAgICAgICAgIHNlbGYubG9naW5FcnJvci5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBzZWxmLmxvZ2luRXJyb3Iuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgc2VsZi5sb2dpbkVycm9yLmlubmVySFRNTCA9ICcnO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICB2YWxpZGF0ZSgpIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgICAgIHJldHVybiBzZWxmLnZhbGlkYXRlRW1haWwoc2VsZikgJiYgc2VsZi52YWxpZGF0ZVBhc3N3b3JkKHNlbGYpICYmIHNlbGYudmFsaWRhdGVMb2dpbihzZWxmKTtcbiAgICB9XG5cbiAgICByZWdpc3RlcigpIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgICAgIGlmICghc2VsZi52YWxpZGF0ZSgpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdXNlciA9IG5ldyBVc2VyTW9kZWwoe1xuICAgICAgICAgICAgdXNlcm5hbWU6IHNlbGYuX2Zvcm0uZWxlbWVudHMubG9naW4udmFsdWUsXG4gICAgICAgICAgICBlbWFpbDogc2VsZi5fZm9ybS5lbGVtZW50cy5lbWFpbC52YWx1ZSxcbiAgICAgICAgICAgIHBhc3N3b3JkOiBzZWxmLl9mb3JtLmVsZW1lbnRzLnBhc3N3b3JkLnZhbHVlLFxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCByZXNwb25zZSA9IHVzZXIuc2F2ZSgpO1xuICAgICAgICBzZWxmLl9mb3JtLmNoaWxkcmVuLmVtYWlsRXJyb3IudGV4dENvbnRlbnQgPSB1c2VyLmdldEVtYWlsRXJyb3IoKTtcbiAgICAgICAgc2VsZi5fZm9ybS5jaGlsZHJlbi5wYXNzd29yZEVycm9yLnRleHRDb250ZW50ID0gdXNlci5nZXRQYXNzd29yZEVycm9yKCk7XG4gICAgICAgIHNlbGYuX2Zvcm0uY2hpbGRyZW4ubG9naW5FcnJvci50ZXh0Q29udGVudCA9IHVzZXIuZ2V0TG9naW5FcnJvcigpO1xuICAgICAgICBzZWxmLl9mb3JtLmNoaWxkcmVuLmVtYWlsRXJyb3IuaGlkZGVuID0gc2VsZi5fZm9ybS5jaGlsZHJlbi5lbWFpbEVycm9yLnRleHRDb250ZW50ID8gZmFsc2UgOiB0cnVlO1xuICAgICAgICBzZWxmLl9mb3JtLmNoaWxkcmVuLmxvZ2luRXJyb3IuaGlkZGVuID0gc2VsZi5fZm9ybS5jaGlsZHJlbi5sb2dpbkVycm9yLnRleHRDb250ZW50ID8gZmFsc2UgOiB0cnVlO1xuICAgICAgICBzZWxmLl9mb3JtLmNoaWxkcmVuLnBhc3N3b3JkRXJyb3IuaGlkZGVuID0gc2VsZi5fZm9ybS5jaGlsZHJlbi5wYXNzd29yZEVycm9yLnRleHRDb250ZW50ID8gZmFsc2UgOiB0cnVlO1xuICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09IDIwMCkge1xuICAgICAgICAgICAgc2VsZi5yb3V0ZXIuZ28oJy9yb29tcycpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcHVibGljL2pzL3ZpZXdzL3JlZ2lzdHJhdGlvblZpZXcuanMiLCJpbXBvcnQgVmlldyBmcm9tICcuLi9tb2R1bGVzL3ZpZXcnO1xuaW1wb3J0IFVzZXJDb2xsZWN0aW9uIGZyb20gJy4uL2NvbGxlY3Rpb25zL1VzZXJDb2xsZWN0aW9uJztcbmltcG9ydCB0ZW1wbGF0ZSBmcm9tICcuLi8uLi90ZW1wbGF0ZXMvc2NvcmVib2FyZC50bXBsLnhtbCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjb3JlYm9hcmRWaWV3IGV4dGVuZHMgVmlldyB7XG4gICAgY29uc3RydWN0b3IgKG9wdGlvbnMgPSB7fSkge1xuICAgICAgICBzdXBlcih7IGVsZW1lbnQ6ICcuanMtc2NvcmVib2FyZCcgfSk7XG4gICAgICAgIHRoaXMudXNlckNvbGxlY3Rpb24gPSBuZXcgVXNlckNvbGxlY3Rpb24oKTtcbiAgICB9XG5cbiAgICByZXN1bWUob3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgICBzZWxmLnJlbmRlcigpO1xuICAgICAgICBzZWxmLnNob3coKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgICBzZWxmLnVzZXJDb2xsZWN0aW9uLmZldGNoKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZ290IGhlcmUnKTtcbi8vICAgICAgICAgICAgY29uc29sZS5sb2coJ2hlZWVlZWVlZWVlZXJlJywgdGhpcy5nZXRDb2xsZWN0aW9uKCksIHNlbGYudXNlckNvbGxlY3Rpb24uZ2V0Q29sbGVjdGlvbigpKTtcbiAgICAgICAgICAgIHNlbGYuX2VsLmlubmVySFRNTCA9IHRlbXBsYXRlKHNlbGYudXNlckNvbGxlY3Rpb24uZ2V0Q29sbGVjdGlvbigpKTtcbiAgICAgICAgfSkuY2F0Y2goKCk9Pntjb25zb2xlLmxvZygnc3RoIHdybycpfSk7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcHVibGljL2pzL3ZpZXdzL3Njb3JlYm9hcmRWaWV3LmpzIiwiXG4vKiogXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiAvaG9tZS9pdmFuL0RvY3VtZW50cy8yMDE2XzJfQWlyRHJvbmUvcHVibGljL3RlbXBsYXRlcy9sb2dpbi50bXBsIHRlbXBsYXRlXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoX19mZXN0X2NvbnRleHQpe1widXNlIHN0cmljdFwiO3ZhciBfX2Zlc3Rfc2VsZj10aGlzLF9fZmVzdF9idWY9XCJcIixfX2Zlc3RfY2h1bmtzPVtdLF9fZmVzdF9jaHVuayxfX2Zlc3RfYXR0cnM9W10sX19mZXN0X3NlbGVjdCxfX2Zlc3RfaWYsX19mZXN0X2l0ZXJhdG9yLF9fZmVzdF90byxfX2Zlc3RfZm4sX19mZXN0X2h0bWw9XCJcIixfX2Zlc3RfYmxvY2tzPXt9LF9fZmVzdF9wYXJhbXMsX19mZXN0X2VsZW1lbnQsX19mZXN0X2RlYnVnX2ZpbGU9XCJcIixfX2Zlc3RfZGVidWdfbGluZT1cIlwiLF9fZmVzdF9kZWJ1Z19ibG9jaz1cIlwiLF9fZmVzdF9lbGVtZW50X3N0YWNrID0gW10sX19mZXN0X3Nob3J0X3RhZ3MgPSB7XCJhcmVhXCI6IHRydWUsIFwiYmFzZVwiOiB0cnVlLCBcImJyXCI6IHRydWUsIFwiY29sXCI6IHRydWUsIFwiY29tbWFuZFwiOiB0cnVlLCBcImVtYmVkXCI6IHRydWUsIFwiaHJcIjogdHJ1ZSwgXCJpbWdcIjogdHJ1ZSwgXCJpbnB1dFwiOiB0cnVlLCBcImtleWdlblwiOiB0cnVlLCBcImxpbmtcIjogdHJ1ZSwgXCJtZXRhXCI6IHRydWUsIFwicGFyYW1cIjogdHJ1ZSwgXCJzb3VyY2VcIjogdHJ1ZSwgXCJ3YnJcIjogdHJ1ZX0sX19mZXN0X2pzY2hhcnMgPSAvW1xcXFwnXCJcXC9cXG5cXHJcXHRcXGJcXGY8Pl0vZyxfX2Zlc3RfanNjaGFyc190ZXN0ID0gL1tcXFxcJ1wiXFwvXFxuXFxyXFx0XFxiXFxmPD5dLyxfX2Zlc3RfaHRtbGNoYXJzID0gL1smPD5cIl0vZyxfX2Zlc3RfaHRtbGNoYXJzX3Rlc3QgPSAvWyY8PlwiXS8sX19mZXN0X2pzaGFzaCA9IHtcIlxcXCJcIjogXCJcXFxcXFxcIlwiLCBcIlxcXFxcIjogXCJcXFxcXFxcXFwiLCBcIi9cIjogXCJcXFxcL1wiLCBcIlxcblwiOiBcIlxcXFxuXCIsIFwiXFxyXCI6IFwiXFxcXHJcIiwgXCJcXHRcIjogXCJcXFxcdFwiLCBcIlxcYlwiOiBcIlxcXFxiXCIsIFwiXFxmXCI6IFwiXFxcXGZcIiwgXCInXCI6IFwiXFxcXCdcIiwgXCI8XCI6IFwiXFxcXHUwMDNDXCIsIFwiPlwiOiBcIlxcXFx1MDAzRVwifSxfX2Zlc3RfaHRtbGhhc2ggPSB7XCImXCI6IFwiJmFtcDtcIiwgXCI8XCI6IFwiJmx0O1wiLCBcIj5cIjogXCImZ3Q7XCIsIFwiXFxcIlwiOiBcIiZxdW90O1wifSxfX2Zlc3RfZXNjYXBlSlMgPSBmdW5jdGlvbiBfX2Zlc3RfZXNjYXBlSlModmFsdWUpIHtcblx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuXHRcdFx0aWYgKF9fZmVzdF9qc2NoYXJzX3Rlc3QudGVzdCh2YWx1ZSkpIHtcblx0XHRcdFx0cmV0dXJuIHZhbHVlLnJlcGxhY2UoX19mZXN0X2pzY2hhcnMsIF9fZmVzdF9yZXBsYWNlSlMpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiB2YWx1ZTtcblx0fSxfX2Zlc3RfcmVwbGFjZUpTID0gZnVuY3Rpb24gX19mZXN0X3JlcGxhY2VKUyhjaHIpIHtcblx0XHRyZXR1cm4gX19mZXN0X2pzaGFzaFtjaHJdO1xuXHR9LF9fZmVzdF9lc2NhcGVIVE1MID0gZnVuY3Rpb24gX19mZXN0X2VzY2FwZUhUTUwodmFsdWUpIHtcblx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuXHRcdFx0aWYgKF9fZmVzdF9odG1sY2hhcnNfdGVzdC50ZXN0KHZhbHVlKSkge1xuXHRcdFx0XHRyZXR1cm4gdmFsdWUucmVwbGFjZShfX2Zlc3RfaHRtbGNoYXJzLCBfX2Zlc3RfcmVwbGFjZUhUTUwpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiB2YWx1ZTtcblx0fSxfX2Zlc3RfcmVwbGFjZUhUTUwgPSBmdW5jdGlvbiBfX2Zlc3RfcmVwbGFjZUhUTUwoY2hyKSB7XG5cdFx0cmV0dXJuIF9fZmVzdF9odG1saGFzaFtjaHJdO1xuXHR9LF9fZmVzdF9leHRlbmQgPSBmdW5jdGlvbiBfX2Zlc3RfZXh0ZW5kKGRlc3QsIHNyYykge1xuXHRcdGZvciAodmFyIGtleSBpbiBzcmMpIHtcblx0XHRcdGlmIChzcmMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRkZXN0W2tleV0gPSBzcmNba2V5XTtcblx0XHRcdH1cblx0XHR9XG5cdH0sX19mZXN0X3BhcmFtID0gZnVuY3Rpb24gX19mZXN0X3BhcmFtKGZuKSB7XG5cdFx0Zm4ucGFyYW0gPSB0cnVlO1xuXHRcdHJldHVybiBmbjtcblx0fSxpMThuPV9fZmVzdF9zZWxmICYmIHR5cGVvZiBfX2Zlc3Rfc2VsZi5pMThuID09PSBcImZ1bmN0aW9uXCIgPyBfX2Zlc3Rfc2VsZi5pMThuIDogZnVuY3Rpb24gKHN0cikge3JldHVybiBzdHI7fSxfX19mZXN0X2xvZ19lcnJvcjtpZih0eXBlb2YgX19mZXN0X2Vycm9yID09PSBcInVuZGVmaW5lZFwiKXtfX19mZXN0X2xvZ19lcnJvciA9ICh0eXBlb2YgY29uc29sZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBjb25zb2xlLmVycm9yKSA/IGZ1bmN0aW9uKCl7cmV0dXJuIEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseS5jYWxsKGNvbnNvbGUuZXJyb3IsIGNvbnNvbGUsIGFyZ3VtZW50cyl9IDogZnVuY3Rpb24oKXt9O31lbHNle19fX2Zlc3RfbG9nX2Vycm9yPV9fZmVzdF9lcnJvcn07ZnVuY3Rpb24gX19mZXN0X2xvZ19lcnJvcihtc2cpe19fX2Zlc3RfbG9nX2Vycm9yKG1zZytcIlxcbmluIGJsb2NrIFxcXCJcIitfX2Zlc3RfZGVidWdfYmxvY2srXCJcXFwiIGF0IGxpbmU6IFwiK19fZmVzdF9kZWJ1Z19saW5lK1wiXFxuZmlsZTogXCIrX19mZXN0X2RlYnVnX2ZpbGUpfWZ1bmN0aW9uIF9fZmVzdF9jYWxsKGZuLCBwYXJhbXMsY3Ape2lmKGNwKWZvcih2YXIgaSBpbiBwYXJhbXMpaWYodHlwZW9mIHBhcmFtc1tpXT09XCJmdW5jdGlvblwiJiZwYXJhbXNbaV0ucGFyYW0pcGFyYW1zW2ldPXBhcmFtc1tpXSgpO3JldHVybiBmbi5jYWxsKF9fZmVzdF9zZWxmLHBhcmFtcyl9dmFyIGpzb249X19mZXN0X2NvbnRleHQ7X19mZXN0X2J1Zis9KFwiPGZvcm0gY2xhc3M9XFxcImpzLWxvZ2luLWZvcm0gbG9naW5fX2Zvcm1cXFwiIG5hbWU9XFxcImxvZ2luRm9ybVxcXCI+PGgxIGNsYXNzPVxcXCJsb2dpbl9faGVhZGVyXFxcIj7QktGF0L7QtDwvaDE+PHNwYW4gY2xhc3M9XFxcImpzLWVtYWlsLWVycm9yIGxvZ2luX19mb3JtX19lcnJvclxcXCIgbmFtZT1cXFwiZW1haWxFcnJvclxcXCIgaGlkZGVuPVxcXCJoaWRkZW5cXFwiPjwvc3Bhbj48aW5wdXQgcGxhY2Vob2xkZXI9XFxcIkUtbWFpbFxcXCIgY2xhc3M9XFxcImpzLWVtYWlsIGxvZ2luX19mb3JtX19pbnB1dFxcXCIgbmFtZT1cXFwiZW1haWxcXFwiIHR5cGU9XFxcInRleHRcXFwiLz48c3BhbiBjbGFzcz1cXFwianMtcGFzc3dvcmQtZXJyb3IgbG9naW5fX2Zvcm1fX2Vycm9yXFxcIiBuYW1lPVxcXCJwYXNzd29yZEVycm9yXFxcIiBoaWRkZW49XFxcImhpZGRlblxcXCI+PC9zcGFuPjxpbnB1dCBwbGFjZWhvbGRlcj1cXFwiUGFzc3dvcmRcXFwiIGNsYXNzPVxcXCJqcy1wYXNzd29yZCBsb2dpbl9fZm9ybV9faW5wdXRcXFwiIG5hbWU9XFxcInBhc3N3b3JkXFxcIiB0eXBlPVxcXCJwYXNzd29yZFxcXCIvPjxidXR0b24gY2xhc3M9XFxcImpzX3N1Ym1pdCBsb2dpbl9fZm9ybV9fYnV0dG9uXFxcIiBuYW1lPVxcXCJidXR0b25cXFwiPtCS0L7QudGC0LghPC9idXR0b24+PGEgY2xhc3M9XFxcImxvZ2luX19mb3JtX19saW5rXFxcIiBuYW1lPVxcXCJyZWdpc3RyYXRpb25cXFwiPtCg0LXQs9C40YHRgtGA0LDRhtC40Y88L2E+PC9mb3JtPlwiKTtfX2Zlc3RfdG89X19mZXN0X2NodW5rcy5sZW5ndGg7aWYgKF9fZmVzdF90bykge19fZmVzdF9pdGVyYXRvciA9IDA7Zm9yICg7X19mZXN0X2l0ZXJhdG9yPF9fZmVzdF90bztfX2Zlc3RfaXRlcmF0b3IrKykge19fZmVzdF9jaHVuaz1fX2Zlc3RfY2h1bmtzW19fZmVzdF9pdGVyYXRvcl07aWYgKHR5cGVvZiBfX2Zlc3RfY2h1bms9PT1cInN0cmluZ1wiKSB7X19mZXN0X2h0bWwrPV9fZmVzdF9jaHVuazt9IGVsc2Uge19fZmVzdF9mbj1fX2Zlc3RfYmxvY2tzW19fZmVzdF9jaHVuay5uYW1lXTtpZiAoX19mZXN0X2ZuKSBfX2Zlc3RfaHRtbCs9X19mZXN0X2NhbGwoX19mZXN0X2ZuLF9fZmVzdF9jaHVuay5wYXJhbXMsX19mZXN0X2NodW5rLmNwKTt9fXJldHVybiBfX2Zlc3RfaHRtbCtfX2Zlc3RfYnVmO30gZWxzZSB7cmV0dXJuIF9fZmVzdF9idWY7fX1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3B1YmxpYy90ZW1wbGF0ZXMvbG9naW4udG1wbC54bWxcbi8vIG1vZHVsZSBpZCA9IDEyMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcbi8qKiBcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIC9ob21lL2l2YW4vRG9jdW1lbnRzLzIwMTZfMl9BaXJEcm9uZS9wdWJsaWMvdGVtcGxhdGVzL3JlZ2lzdHJhdGlvbi50bXBsIHRlbXBsYXRlXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoX19mZXN0X2NvbnRleHQpe1widXNlIHN0cmljdFwiO3ZhciBfX2Zlc3Rfc2VsZj10aGlzLF9fZmVzdF9idWY9XCJcIixfX2Zlc3RfY2h1bmtzPVtdLF9fZmVzdF9jaHVuayxfX2Zlc3RfYXR0cnM9W10sX19mZXN0X3NlbGVjdCxfX2Zlc3RfaWYsX19mZXN0X2l0ZXJhdG9yLF9fZmVzdF90byxfX2Zlc3RfZm4sX19mZXN0X2h0bWw9XCJcIixfX2Zlc3RfYmxvY2tzPXt9LF9fZmVzdF9wYXJhbXMsX19mZXN0X2VsZW1lbnQsX19mZXN0X2RlYnVnX2ZpbGU9XCJcIixfX2Zlc3RfZGVidWdfbGluZT1cIlwiLF9fZmVzdF9kZWJ1Z19ibG9jaz1cIlwiLF9fZmVzdF9lbGVtZW50X3N0YWNrID0gW10sX19mZXN0X3Nob3J0X3RhZ3MgPSB7XCJhcmVhXCI6IHRydWUsIFwiYmFzZVwiOiB0cnVlLCBcImJyXCI6IHRydWUsIFwiY29sXCI6IHRydWUsIFwiY29tbWFuZFwiOiB0cnVlLCBcImVtYmVkXCI6IHRydWUsIFwiaHJcIjogdHJ1ZSwgXCJpbWdcIjogdHJ1ZSwgXCJpbnB1dFwiOiB0cnVlLCBcImtleWdlblwiOiB0cnVlLCBcImxpbmtcIjogdHJ1ZSwgXCJtZXRhXCI6IHRydWUsIFwicGFyYW1cIjogdHJ1ZSwgXCJzb3VyY2VcIjogdHJ1ZSwgXCJ3YnJcIjogdHJ1ZX0sX19mZXN0X2pzY2hhcnMgPSAvW1xcXFwnXCJcXC9cXG5cXHJcXHRcXGJcXGY8Pl0vZyxfX2Zlc3RfanNjaGFyc190ZXN0ID0gL1tcXFxcJ1wiXFwvXFxuXFxyXFx0XFxiXFxmPD5dLyxfX2Zlc3RfaHRtbGNoYXJzID0gL1smPD5cIl0vZyxfX2Zlc3RfaHRtbGNoYXJzX3Rlc3QgPSAvWyY8PlwiXS8sX19mZXN0X2pzaGFzaCA9IHtcIlxcXCJcIjogXCJcXFxcXFxcIlwiLCBcIlxcXFxcIjogXCJcXFxcXFxcXFwiLCBcIi9cIjogXCJcXFxcL1wiLCBcIlxcblwiOiBcIlxcXFxuXCIsIFwiXFxyXCI6IFwiXFxcXHJcIiwgXCJcXHRcIjogXCJcXFxcdFwiLCBcIlxcYlwiOiBcIlxcXFxiXCIsIFwiXFxmXCI6IFwiXFxcXGZcIiwgXCInXCI6IFwiXFxcXCdcIiwgXCI8XCI6IFwiXFxcXHUwMDNDXCIsIFwiPlwiOiBcIlxcXFx1MDAzRVwifSxfX2Zlc3RfaHRtbGhhc2ggPSB7XCImXCI6IFwiJmFtcDtcIiwgXCI8XCI6IFwiJmx0O1wiLCBcIj5cIjogXCImZ3Q7XCIsIFwiXFxcIlwiOiBcIiZxdW90O1wifSxfX2Zlc3RfZXNjYXBlSlMgPSBmdW5jdGlvbiBfX2Zlc3RfZXNjYXBlSlModmFsdWUpIHtcblx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuXHRcdFx0aWYgKF9fZmVzdF9qc2NoYXJzX3Rlc3QudGVzdCh2YWx1ZSkpIHtcblx0XHRcdFx0cmV0dXJuIHZhbHVlLnJlcGxhY2UoX19mZXN0X2pzY2hhcnMsIF9fZmVzdF9yZXBsYWNlSlMpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiB2YWx1ZTtcblx0fSxfX2Zlc3RfcmVwbGFjZUpTID0gZnVuY3Rpb24gX19mZXN0X3JlcGxhY2VKUyhjaHIpIHtcblx0XHRyZXR1cm4gX19mZXN0X2pzaGFzaFtjaHJdO1xuXHR9LF9fZmVzdF9lc2NhcGVIVE1MID0gZnVuY3Rpb24gX19mZXN0X2VzY2FwZUhUTUwodmFsdWUpIHtcblx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuXHRcdFx0aWYgKF9fZmVzdF9odG1sY2hhcnNfdGVzdC50ZXN0KHZhbHVlKSkge1xuXHRcdFx0XHRyZXR1cm4gdmFsdWUucmVwbGFjZShfX2Zlc3RfaHRtbGNoYXJzLCBfX2Zlc3RfcmVwbGFjZUhUTUwpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiB2YWx1ZTtcblx0fSxfX2Zlc3RfcmVwbGFjZUhUTUwgPSBmdW5jdGlvbiBfX2Zlc3RfcmVwbGFjZUhUTUwoY2hyKSB7XG5cdFx0cmV0dXJuIF9fZmVzdF9odG1saGFzaFtjaHJdO1xuXHR9LF9fZmVzdF9leHRlbmQgPSBmdW5jdGlvbiBfX2Zlc3RfZXh0ZW5kKGRlc3QsIHNyYykge1xuXHRcdGZvciAodmFyIGtleSBpbiBzcmMpIHtcblx0XHRcdGlmIChzcmMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRkZXN0W2tleV0gPSBzcmNba2V5XTtcblx0XHRcdH1cblx0XHR9XG5cdH0sX19mZXN0X3BhcmFtID0gZnVuY3Rpb24gX19mZXN0X3BhcmFtKGZuKSB7XG5cdFx0Zm4ucGFyYW0gPSB0cnVlO1xuXHRcdHJldHVybiBmbjtcblx0fSxpMThuPV9fZmVzdF9zZWxmICYmIHR5cGVvZiBfX2Zlc3Rfc2VsZi5pMThuID09PSBcImZ1bmN0aW9uXCIgPyBfX2Zlc3Rfc2VsZi5pMThuIDogZnVuY3Rpb24gKHN0cikge3JldHVybiBzdHI7fSxfX19mZXN0X2xvZ19lcnJvcjtpZih0eXBlb2YgX19mZXN0X2Vycm9yID09PSBcInVuZGVmaW5lZFwiKXtfX19mZXN0X2xvZ19lcnJvciA9ICh0eXBlb2YgY29uc29sZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBjb25zb2xlLmVycm9yKSA/IGZ1bmN0aW9uKCl7cmV0dXJuIEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseS5jYWxsKGNvbnNvbGUuZXJyb3IsIGNvbnNvbGUsIGFyZ3VtZW50cyl9IDogZnVuY3Rpb24oKXt9O31lbHNle19fX2Zlc3RfbG9nX2Vycm9yPV9fZmVzdF9lcnJvcn07ZnVuY3Rpb24gX19mZXN0X2xvZ19lcnJvcihtc2cpe19fX2Zlc3RfbG9nX2Vycm9yKG1zZytcIlxcbmluIGJsb2NrIFxcXCJcIitfX2Zlc3RfZGVidWdfYmxvY2srXCJcXFwiIGF0IGxpbmU6IFwiK19fZmVzdF9kZWJ1Z19saW5lK1wiXFxuZmlsZTogXCIrX19mZXN0X2RlYnVnX2ZpbGUpfWZ1bmN0aW9uIF9fZmVzdF9jYWxsKGZuLCBwYXJhbXMsY3Ape2lmKGNwKWZvcih2YXIgaSBpbiBwYXJhbXMpaWYodHlwZW9mIHBhcmFtc1tpXT09XCJmdW5jdGlvblwiJiZwYXJhbXNbaV0ucGFyYW0pcGFyYW1zW2ldPXBhcmFtc1tpXSgpO3JldHVybiBmbi5jYWxsKF9fZmVzdF9zZWxmLHBhcmFtcyl9dmFyIGpzb249X19mZXN0X2NvbnRleHQ7X19mZXN0X2J1Zis9KFwiPGZvcm0gY2xhc3M9XFxcImpzLXJlZ2lzdHJhdGlvbi1mb3JtIHJlZ2lzdHJhdGlvbl9fZm9ybVxcXCI+PGgxIGNsYXNzPVxcXCJyZWdpc3RyYXRpb25fX2hlYWRlclxcXCI+0J/QvtC30L3QsNC60L7QvNC40LzRgdGPPzwvaDE+PHNwYW4gY2xhc3M9XFxcImpzLWVtYWlsLWVycm9yIHJlZ2lzdHJhdGlvbl9fZm9ybV9fZXJyb3JcXFwiIG5hbWU9XFxcImVtYWlsRXJyb3JcXFwiIGhpZGRlbj1cXFwiaGlkZGVuXFxcIj48L3NwYW4+PGlucHV0IHBsYWNlaG9sZGVyPVxcXCJFLW1haWxcXFwiIGNsYXNzPVxcXCJqcy1lbWFpbCByZWdpc3RyYXRpb25fX2Zvcm1fX2lucHV0XFxcIiBuYW1lPVxcXCJlbWFpbFxcXCIgdHlwZT1cXFwidGV4dFxcXCIvPjxzcGFuIGNsYXNzPVxcXCJqcy1wYXNzd29yZC1lcnJvciByZWdpc3RyYXRpb25fX2Zvcm1fX2Vycm9yXFxcIiBuYW1lPVxcXCJwYXNzd29yZEVycm9yXFxcIiBoaWRkZW49XFxcImhpZGRlblxcXCI+PC9zcGFuPjxpbnB1dCBwbGFjZWhvbGRlcj1cXFwiUGFzc3dvcmRcXFwiIGNsYXNzPVxcXCJqcy1wYXNzd29yZCByZWdpc3RyYXRpb25fX2Zvcm1fX2lucHV0XFxcIiBuYW1lPVxcXCJwYXNzd29yZFxcXCIgdHlwZT1cXFwicGFzc3dvcmRcXFwiLz48aW5wdXQgcGxhY2Vob2xkZXI9XFxcIkNvbmZpcm0gcGFzc3dvcmRcXFwiIGNsYXNzPVxcXCJqcy1wYXNzd29yZDIgcmVnaXN0cmF0aW9uX19mb3JtX19pbnB1dFxcXCIgbmFtZT1cXFwicGFzc3dvcmQyXFxcIiB0eXBlPVxcXCJwYXNzd29yZFxcXCIvPjxzcGFuIGNsYXNzPVxcXCJqcy1sb2dpbi1lcnJvciByZWdpc3RyYXRpb25fX2Zvcm1fX2Vycm9yXFxcIiBuYW1lPVxcXCJsb2dpbkVycm9yXFxcIiBoaWRkZW49XFxcImhpZGRlblxcXCI+PC9zcGFuPjxpbnB1dCBwbGFjZWhvbGRlcj1cXFwi0JrQu9C40LrRg9GF0LBcXFwiIGNsYXNzPVxcXCJqcy1sb2dpbiByZWdpc3RyYXRpb25fX2Zvcm1fX2lucHV0XFxcIiBuYW1lPVxcXCJsb2dpblxcXCIgdHlwZT1cXFwidGV4dFxcXCIvPjxidXR0b24gY2xhc3M9XFxcImpzLXN1Ym1pdCByZWdpc3RyYXRpb25fX2Zvcm1fX2J1dHRvblxcXCIgbmFtZT1cXFwiYnV0dG9uXFxcIj7Ql9Cw0YDQtdCz0LjRgdGC0YDQuNGA0L7QstCw0YLRjNGB0Y8hPC9idXR0b24+PC9mb3JtPlwiKTtfX2Zlc3RfdG89X19mZXN0X2NodW5rcy5sZW5ndGg7aWYgKF9fZmVzdF90bykge19fZmVzdF9pdGVyYXRvciA9IDA7Zm9yICg7X19mZXN0X2l0ZXJhdG9yPF9fZmVzdF90bztfX2Zlc3RfaXRlcmF0b3IrKykge19fZmVzdF9jaHVuaz1fX2Zlc3RfY2h1bmtzW19fZmVzdF9pdGVyYXRvcl07aWYgKHR5cGVvZiBfX2Zlc3RfY2h1bms9PT1cInN0cmluZ1wiKSB7X19mZXN0X2h0bWwrPV9fZmVzdF9jaHVuazt9IGVsc2Uge19fZmVzdF9mbj1fX2Zlc3RfYmxvY2tzW19fZmVzdF9jaHVuay5uYW1lXTtpZiAoX19mZXN0X2ZuKSBfX2Zlc3RfaHRtbCs9X19mZXN0X2NhbGwoX19mZXN0X2ZuLF9fZmVzdF9jaHVuay5wYXJhbXMsX19mZXN0X2NodW5rLmNwKTt9fXJldHVybiBfX2Zlc3RfaHRtbCtfX2Zlc3RfYnVmO30gZWxzZSB7cmV0dXJuIF9fZmVzdF9idWY7fX1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3B1YmxpYy90ZW1wbGF0ZXMvcmVnaXN0cmF0aW9uLnRtcGwueG1sXG4vLyBtb2R1bGUgaWQgPSAxMjNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXG4vKiogXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiAvaG9tZS9pdmFuL0RvY3VtZW50cy8yMDE2XzJfQWlyRHJvbmUvcHVibGljL3RlbXBsYXRlcy9zY29yZWJvYXJkLnRtcGwgdGVtcGxhdGVcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChfX2Zlc3RfY29udGV4dCl7XCJ1c2Ugc3RyaWN0XCI7dmFyIF9fZmVzdF9zZWxmPXRoaXMsX19mZXN0X2J1Zj1cIlwiLF9fZmVzdF9jaHVua3M9W10sX19mZXN0X2NodW5rLF9fZmVzdF9hdHRycz1bXSxfX2Zlc3Rfc2VsZWN0LF9fZmVzdF9pZixfX2Zlc3RfaXRlcmF0b3IsX19mZXN0X3RvLF9fZmVzdF9mbixfX2Zlc3RfaHRtbD1cIlwiLF9fZmVzdF9ibG9ja3M9e30sX19mZXN0X3BhcmFtcyxfX2Zlc3RfZWxlbWVudCxfX2Zlc3RfZGVidWdfZmlsZT1cIlwiLF9fZmVzdF9kZWJ1Z19saW5lPVwiXCIsX19mZXN0X2RlYnVnX2Jsb2NrPVwiXCIsX19mZXN0X2VsZW1lbnRfc3RhY2sgPSBbXSxfX2Zlc3Rfc2hvcnRfdGFncyA9IHtcImFyZWFcIjogdHJ1ZSwgXCJiYXNlXCI6IHRydWUsIFwiYnJcIjogdHJ1ZSwgXCJjb2xcIjogdHJ1ZSwgXCJjb21tYW5kXCI6IHRydWUsIFwiZW1iZWRcIjogdHJ1ZSwgXCJoclwiOiB0cnVlLCBcImltZ1wiOiB0cnVlLCBcImlucHV0XCI6IHRydWUsIFwia2V5Z2VuXCI6IHRydWUsIFwibGlua1wiOiB0cnVlLCBcIm1ldGFcIjogdHJ1ZSwgXCJwYXJhbVwiOiB0cnVlLCBcInNvdXJjZVwiOiB0cnVlLCBcIndiclwiOiB0cnVlfSxfX2Zlc3RfanNjaGFycyA9IC9bXFxcXCdcIlxcL1xcblxcclxcdFxcYlxcZjw+XS9nLF9fZmVzdF9qc2NoYXJzX3Rlc3QgPSAvW1xcXFwnXCJcXC9cXG5cXHJcXHRcXGJcXGY8Pl0vLF9fZmVzdF9odG1sY2hhcnMgPSAvWyY8PlwiXS9nLF9fZmVzdF9odG1sY2hhcnNfdGVzdCA9IC9bJjw+XCJdLyxfX2Zlc3RfanNoYXNoID0ge1wiXFxcIlwiOiBcIlxcXFxcXFwiXCIsIFwiXFxcXFwiOiBcIlxcXFxcXFxcXCIsIFwiL1wiOiBcIlxcXFwvXCIsIFwiXFxuXCI6IFwiXFxcXG5cIiwgXCJcXHJcIjogXCJcXFxcclwiLCBcIlxcdFwiOiBcIlxcXFx0XCIsIFwiXFxiXCI6IFwiXFxcXGJcIiwgXCJcXGZcIjogXCJcXFxcZlwiLCBcIidcIjogXCJcXFxcJ1wiLCBcIjxcIjogXCJcXFxcdTAwM0NcIiwgXCI+XCI6IFwiXFxcXHUwMDNFXCJ9LF9fZmVzdF9odG1saGFzaCA9IHtcIiZcIjogXCImYW1wO1wiLCBcIjxcIjogXCImbHQ7XCIsIFwiPlwiOiBcIiZndDtcIiwgXCJcXFwiXCI6IFwiJnF1b3Q7XCJ9LF9fZmVzdF9lc2NhcGVKUyA9IGZ1bmN0aW9uIF9fZmVzdF9lc2NhcGVKUyh2YWx1ZSkge1xuXHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRpZiAoX19mZXN0X2pzY2hhcnNfdGVzdC50ZXN0KHZhbHVlKSkge1xuXHRcdFx0XHRyZXR1cm4gdmFsdWUucmVwbGFjZShfX2Zlc3RfanNjaGFycywgX19mZXN0X3JlcGxhY2VKUyk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHZhbHVlID09IG51bGwgPyAnJyA6IHZhbHVlO1xuXHR9LF9fZmVzdF9yZXBsYWNlSlMgPSBmdW5jdGlvbiBfX2Zlc3RfcmVwbGFjZUpTKGNocikge1xuXHRcdHJldHVybiBfX2Zlc3RfanNoYXNoW2Nocl07XG5cdH0sX19mZXN0X2VzY2FwZUhUTUwgPSBmdW5jdGlvbiBfX2Zlc3RfZXNjYXBlSFRNTCh2YWx1ZSkge1xuXHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRpZiAoX19mZXN0X2h0bWxjaGFyc190ZXN0LnRlc3QodmFsdWUpKSB7XG5cdFx0XHRcdHJldHVybiB2YWx1ZS5yZXBsYWNlKF9fZmVzdF9odG1sY2hhcnMsIF9fZmVzdF9yZXBsYWNlSFRNTCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHZhbHVlID09IG51bGwgPyAnJyA6IHZhbHVlO1xuXHR9LF9fZmVzdF9yZXBsYWNlSFRNTCA9IGZ1bmN0aW9uIF9fZmVzdF9yZXBsYWNlSFRNTChjaHIpIHtcblx0XHRyZXR1cm4gX19mZXN0X2h0bWxoYXNoW2Nocl07XG5cdH0sX19mZXN0X2V4dGVuZCA9IGZ1bmN0aW9uIF9fZmVzdF9leHRlbmQoZGVzdCwgc3JjKSB7XG5cdFx0Zm9yICh2YXIga2V5IGluIHNyYykge1xuXHRcdFx0aWYgKHNyYy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRcdGRlc3Rba2V5XSA9IHNyY1trZXldO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxfX2Zlc3RfcGFyYW0gPSBmdW5jdGlvbiBfX2Zlc3RfcGFyYW0oZm4pIHtcblx0XHRmbi5wYXJhbSA9IHRydWU7XG5cdFx0cmV0dXJuIGZuO1xuXHR9LGkxOG49X19mZXN0X3NlbGYgJiYgdHlwZW9mIF9fZmVzdF9zZWxmLmkxOG4gPT09IFwiZnVuY3Rpb25cIiA/IF9fZmVzdF9zZWxmLmkxOG4gOiBmdW5jdGlvbiAoc3RyKSB7cmV0dXJuIHN0cjt9LF9fX2Zlc3RfbG9nX2Vycm9yO2lmKHR5cGVvZiBfX2Zlc3RfZXJyb3IgPT09IFwidW5kZWZpbmVkXCIpe19fX2Zlc3RfbG9nX2Vycm9yID0gKHR5cGVvZiBjb25zb2xlICE9PSBcInVuZGVmaW5lZFwiICYmIGNvbnNvbGUuZXJyb3IpID8gZnVuY3Rpb24oKXtyZXR1cm4gRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5LmNhbGwoY29uc29sZS5lcnJvciwgY29uc29sZSwgYXJndW1lbnRzKX0gOiBmdW5jdGlvbigpe307fWVsc2V7X19fZmVzdF9sb2dfZXJyb3I9X19mZXN0X2Vycm9yfTtmdW5jdGlvbiBfX2Zlc3RfbG9nX2Vycm9yKG1zZyl7X19fZmVzdF9sb2dfZXJyb3IobXNnK1wiXFxuaW4gYmxvY2sgXFxcIlwiK19fZmVzdF9kZWJ1Z19ibG9jaytcIlxcXCIgYXQgbGluZTogXCIrX19mZXN0X2RlYnVnX2xpbmUrXCJcXG5maWxlOiBcIitfX2Zlc3RfZGVidWdfZmlsZSl9ZnVuY3Rpb24gX19mZXN0X2NhbGwoZm4sIHBhcmFtcyxjcCl7aWYoY3ApZm9yKHZhciBpIGluIHBhcmFtcylpZih0eXBlb2YgcGFyYW1zW2ldPT1cImZ1bmN0aW9uXCImJnBhcmFtc1tpXS5wYXJhbSlwYXJhbXNbaV09cGFyYW1zW2ldKCk7cmV0dXJuIGZuLmNhbGwoX19mZXN0X3NlbGYscGFyYW1zKX12YXIganNvbj1fX2Zlc3RfY29udGV4dDtfX2Zlc3RfYnVmKz0oXCI8aDEgY2xhc3M9XFxcInNjb3JlYm9hcmRfX2hlYWRlclxcXCI+0JvQuNC00LXRgNGLPC9oMT48dGFibGUgY2xhc3M9XFxcInNjb3JlYm9hcmRfX3RhYmxlXFxcIj48dHIgY2xhc3M9XFxcInNjb3JlYm9hcmRfX3RhYmxlX190clxcXCI+PHRkIGNsYXNzPVxcXCJzY29yZWJvYXJkX190YWJsZV9fdHJfX3RkXFxcIj4jPC90ZD48dGQgY2xhc3M9XFxcInNjb3JlYm9hcmRfX3RhYmxlX190cl9fdGRcXFwiPtCY0LzRjzwvdGQ+PHRkIGNsYXNzPVxcXCJzY29yZWJvYXJkX190YWJsZV9fdHJfX3RkXFxcIj7QmtC+0LvQuNGH0LXRgdGC0LLQviDQsdC+0LXQsjwvdGQ+PHRkIGNsYXNzPVxcXCJzY29yZWJvYXJkX190YWJsZV9fdHJfX3RkXFxcIj7Qn9GA0L7RhtC10L3RgiDQv9C+0LHQtdC0PC90ZD48L3RyPlwiKTt2YXIgaSxkYXRhLF9fZmVzdF9pdGVyYXRvcjA7dHJ5e19fZmVzdF9pdGVyYXRvcjA9anNvbiB8fCB7fTt9Y2F0Y2goZSl7X19mZXN0X2l0ZXJhdG9yPXt9O19fZmVzdF9sb2dfZXJyb3IoZS5tZXNzYWdlKTt9Zm9yKGkgaW4gX19mZXN0X2l0ZXJhdG9yMCl7ZGF0YT1fX2Zlc3RfaXRlcmF0b3IwW2ldO19fZmVzdF9idWYrPShcIjx0ciBjbGFzcz1cXFwic2NvcmVib2FyZF9fdGFibGVfX3RyXFxcIj48dGQgY2xhc3M9XFxcInNjb3JlYm9hcmRfX3RhYmxlX190cl9fdGRcXFwiPlwiKTt0cnl7X19mZXN0X2J1Zis9KF9fZmVzdF9lc2NhcGVIVE1MKGkpKX1jYXRjaChlKXtfX2Zlc3RfbG9nX2Vycm9yKGUubWVzc2FnZSArIFwiMTJcIik7fV9fZmVzdF9idWYrPShcIjwvdGQ+PHRkIGNsYXNzPVxcXCJzY29yZWJvYXJkX190YWJsZV9fdHJfX3RkXFxcIj5cIik7dHJ5e19fZmVzdF9idWYrPShfX2Zlc3RfZXNjYXBlSFRNTChkYXRhLnVzZXJuYW1lKSl9Y2F0Y2goZSl7X19mZXN0X2xvZ19lcnJvcihlLm1lc3NhZ2UgKyBcIjEzXCIpO31fX2Zlc3RfYnVmKz0oXCI8L3RkPjx0ZCBjbGFzcz1cXFwic2NvcmVib2FyZF9fdGFibGVfX3RyX190ZFxcXCI+XCIpO3RyeXtfX2Zlc3RfYnVmKz0oX19mZXN0X2VzY2FwZUhUTUwoZGF0YS5nYW1lcykpfWNhdGNoKGUpe19fZmVzdF9sb2dfZXJyb3IoZS5tZXNzYWdlICsgXCIxNFwiKTt9X19mZXN0X2J1Zis9KFwiPC90ZD48dGQgY2xhc3M9XFxcInNjb3JlYm9hcmRfX3RhYmxlX190cl9fdGRcXFwiPlwiKTt0cnl7X19mZXN0X2J1Zis9KF9fZmVzdF9lc2NhcGVIVE1MKGRhdGEuc2NvcmUpKX1jYXRjaChlKXtfX2Zlc3RfbG9nX2Vycm9yKGUubWVzc2FnZSArIFwiMTVcIik7fV9fZmVzdF9idWYrPShcIiAlPC90ZD48L3RyPlwiKTt9X19mZXN0X2J1Zis9KFwiPC90YWJsZT5cIik7X19mZXN0X3RvPV9fZmVzdF9jaHVua3MubGVuZ3RoO2lmIChfX2Zlc3RfdG8pIHtfX2Zlc3RfaXRlcmF0b3IgPSAwO2ZvciAoO19fZmVzdF9pdGVyYXRvcjxfX2Zlc3RfdG87X19mZXN0X2l0ZXJhdG9yKyspIHtfX2Zlc3RfY2h1bms9X19mZXN0X2NodW5rc1tfX2Zlc3RfaXRlcmF0b3JdO2lmICh0eXBlb2YgX19mZXN0X2NodW5rPT09XCJzdHJpbmdcIikge19fZmVzdF9odG1sKz1fX2Zlc3RfY2h1bms7fSBlbHNlIHtfX2Zlc3RfZm49X19mZXN0X2Jsb2Nrc1tfX2Zlc3RfY2h1bmsubmFtZV07aWYgKF9fZmVzdF9mbikgX19mZXN0X2h0bWwrPV9fZmVzdF9jYWxsKF9fZmVzdF9mbixfX2Zlc3RfY2h1bmsucGFyYW1zLF9fZmVzdF9jaHVuay5jcCk7fX1yZXR1cm4gX19mZXN0X2h0bWwrX19mZXN0X2J1Zjt9IGVsc2Uge3JldHVybiBfX2Zlc3RfYnVmO319XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9wdWJsaWMvdGVtcGxhdGVzL3Njb3JlYm9hcmQudG1wbC54bWxcbi8vIG1vZHVsZSBpZCA9IDEyNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgVXNlck1vZGVsIGZyb20gJy4uL21vZGVscy9Vc2VyTW9kZWwnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVc2VyQ29sbGVjdGlvbiB7XG4gICAgY29uc3RydXRvcigpIHtcbiAgICAgICAgdGhpcy5fZGF0YSA9IFtdO1xuICAgIH1cblxuICAgIGZldGNoKCkge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgcmV0dXJuIGZldGNoKCcvcmF0aW5nJykudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3Byb21pc2UnKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gICAgICAgICAgICAgICAgfSkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5fZGF0YSA9IGRhdGE7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc29ydCgpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygndGhlbicsIHNlbGYuX2RhdGEpO1xuICAgICAgICAgICAgICAgIH0pLmNhdGNoKCk7XG4gICAgfVxuXG4gICAgc29ydCgpIHtcbiAgICAgICAgdGhpcy5fZGF0YS5zb3J0KChhLCBiKSA9PiBiLnNjb3JlIC0gYS5zY29yZSk7XG4gICAgfVxuXG4gICAgZ2V0Q29sbGVjdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGE7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcHVibGljL2pzL2NvbGxlY3Rpb25zL1VzZXJDb2xsZWN0aW9uLmpzIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVxdWVzdCh1cmwsIG1ldGhvZCwgZGF0YSkge1xuICBjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgeGhyLm9wZW4obWV0aG9kLCB1cmwsIGZhbHNlKTtcbiAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XG4gIHhoci5zZW5kKEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcblxuICByZXR1cm4geGhyO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcHVibGljL2pzL2xpYnMuanMiLCJpbXBvcnQgcmVxdWVzdCBmcm9tICcuLi9saWJzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlck1vZGVsIHtcbiAgICBjb25zdHJ1Y3RvcihkYXRhID0ge30pIHtcbiAgICAgICAgdGhpcy51c2VybmFtZSA9IGRhdGEudXNlcm5hbWUgfHwgJyc7XG4gICAgICAgIHRoaXMuZW1haWwgPSBkYXRhLmVtYWlsO1xuICAgICAgICB0aGlzLnBhc3N3b3JkID0gZGF0YS5wYXNzd29yZDtcbiAgICAgICAgdGhpcy5zY29yZSA9IDA7XG4gICAgICAgIHRoaXMuZ2FtZXMgPSAwO1xuXG4gICAgICAgIHRoaXMuZW1haWxFcnJvciA9ICcnO1xuICAgICAgICB0aGlzLnBhc3N3b3JkRXJyb3IgPSAnJztcbiAgICAgICAgdGhpcy5sb2dpbkVycm9yID0gJyc7XG4gICAgfVxuXG4gICAgdmFsaWRhdGVMb2dpbiAoKSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgICBpZiAoc2VsZi51c2VybmFtZS5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgICBzZWxmLmxvZ2luRXJyb3IgPSAn0J/QvtC20LDQu9GD0LnRgdGC0LAsINCy0LLQtdC00LjRgtC1INC60LvQuNC60YPRhdGDISc7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgc2VsZi5sb2dpbkVycm9yID0gJyc7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHZhbGlkYXRlUGFzc3dvcmQoKSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgICBpZiAoc2VsZi5wYXNzd29yZC5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgICBzZWxmLnBhc3N3b3JkRXJyb3IgPSAn0J/QvtC20LDQu9GD0LnRgdGC0LAsINCy0LLQtdC00LjRgtC1INC/0LDRgNC+0LvRjCEnO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzZWxmLnBhc3N3b3JkLmxlbmd0aCA8IDgpIHtcbiAgICAgICAgICAgIHNlbGYucGFzc3dvcmRFcnJvciA9ICfQn9Cw0YDQvtC70Ywg0L3Rg9C20LXQvSDQtNC70LjQvdC90LXQtSA4INGB0LjQvNCy0L7Qu9C+0LIgPSgnO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHNlbGYucGFzc3dvcmRFcnJvciA9ICcnO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICB2YWxpZGF0ZUVtYWlsKCkge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgaWYgKHNlbGYuZW1haWwuc2VhcmNoKC8uK0AuK1xcLi4rLykgPT09IC0xKSB7XG4gICAgICAgICAgICBzZWxmLmVtYWlsRXJyb3IgPSAn0J/QvtC20LDQu9GD0LnRgdGC0LAsINC/0YDQvtCy0LXRgNGM0YLQtSDQv9GA0LDQstC40LvRjNC90L7RgdGC0YwgZS1tYWlsJztcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBzZWxmLmVtYWlsRXJyb3IgPSAnJztcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgdmFsaWRhdGUoKSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgICByZXR1cm4gc2VsZi52YWxpZGF0ZUVtYWlsKCkgJiYgc2VsZi52YWxpZGF0ZUxvZ2luKCkgJiYgc2VsZi52YWxpZGF0ZVBhc3N3b3JkKCk7XG4gICAgfVxuXG4gICAgZ2V0RW1haWxFcnJvciAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVtYWlsRXJyb3I7XG4gICAgfVxuXG4gICAgZ2V0TG9naW5FcnJvciAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxvZ2luRXJyb3I7XG4gICAgfVxuXG4gICAgZ2V0UGFzc3dvcmRFcnJvciAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhc3N3b3JkRXJyb3I7XG4gICAgfVxuXG4gICAgc2F2ZSAoKSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICAgICAgdXNlcm5hbWU6IHNlbGYudXNlcm5hbWUsXG4gICAgICAgICAgICBlbWFpbDogc2VsZi5lbWFpbCxcbiAgICAgICAgICAgIHBhc3N3b3JkOiBzZWxmLnBhc3N3b3JkLFxuICAgICAgICAgICAgZ2FtZXM6IHNlbGYuZ2FtZXMsXG4gICAgICAgICAgICBzY29yZTogc2VsZi5zY29yZSxcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKCFzZWxmLnZhbGlkYXRlKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gcmVxdWVzdCgnaHR0cHM6Ly9haXItZHJvbmUuaGVyb2t1YXBwLmNvbS91c2VyJywgJ1BPU1QnLCBkYXRhKTtcbiAgICAgICAgc3dpdGNoIChyZXNwb25zZS5zdGF0dXMpIHtcbiAgICAgICAgICAgIGNhc2UgNDAwOlxuICAgICAgICAgICAgY2FzZSA0MDM6IHNlbGYuZW1haWxFcnJvciA9ICfQn9C+0LvRjNC30L7QstCw0YLQtdC70Ywg0YEg0YLQsNC60LjQvCDQsNC00YDQtdGB0L7QvCDRg9C20LUg0LvQtdGC0LDQtdGCISc7XG4gICAgICAgICAgICAgICAgICAgICAgc2VsZi5wYXNzd29yZEVycm9yID0gJyc7XG4gICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDIwMDogc2VsZi5lbWFpbEVycm9yID0gc2VsZi5wYXNzd29yZEVycm9yID0gc2VsZi5sb2dpbkVycm9yID0gJyc7XG4gICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OiBjb25zb2xlLmxvZygn0KfRgtC+LdGC0L4g0L3QtSDRgtCw0LosINC90L4g0L3QtSA0MDAnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgZGVsZXRlICgpIHtcbiAgICAgICAgLy8gVE9ET1xuICAgIH1cblxuICAgIGxvZ2luICgpIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgICAgICB1c2VybmFtZTogc2VsZi51c2VybmFtZSxcbiAgICAgICAgICAgIHBhc3N3b3JkOiBzZWxmLnBhc3N3b3JkLFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IHJlcXVlc3QoJ2h0dHBzOi8vYWlyLWRyb25lLmhlcm9rdWFwcC5jb20vc2Vzc2lvbicsICdQT1NUJywgZGF0YSk7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlLnN0YXR1cylcbiAgICAgICAgc3dpdGNoIChyZXNwb25zZS5zdGF0dXMpIHtcbiAgICAgICAgICAgIGNhc2UgNDAwOlxuICAgICAgICAgICAgY2FzZSA0MDM6IHNlbGYuZW1haWxFcnJvciA9ICfQndC10LLQtdGA0L3Ri9C5INC70L7Qs9C40L0g0LjQu9C4INC/0LDRgNC+0LvRjCEnO1xuICAgICAgICAgICAgICAgICAgICAgIHNlbGYucGFzc3dvcmRFcnJvciA9ICcnO1xuICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyMDA6IHNlbGYuZW1haWxFcnJvciA9IHNlbGYucGFzc3dvcmRFcnJvciA9IHNlbGYubG9naW5FcnJvciA9ICcnO1xuICAgICAgICAgICAgICAgICAgICAgIHNlbGYudXNlcm5hbWUgPSByZXNwb25zZS5yZXNwb25zZS51c2VybmFtZTsgLy8g0JrQvtCz0LTQsCDQvdC1INCx0YPQtNC10YIg0YDQsNCx0L7RgtCw0YLRjCwg0L7RiNC40LHQutGDINC40YHQutCw0YLRjCDQt9C00LXRgdGMLlxuICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc2NvcmUgPSByZXNwb25zZS5yZXNwb25zZS5zY29yZTtcbiAgICAgICAgICAgICAgICAgICAgICBzZWxmLmdhbWVzID0gcmVzcG9uc2UucmVzcG9uc2UuZ2FtZXM7XG4gICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OiBjb25zb2xlLmxvZygn0KfRgtC+LdGC0L4g0L3QtSDRgtCw0LosINC90L4g0L3QtSA0MDAnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgZ2V0U2NvcmUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNjb3JlO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3B1YmxpYy9qcy9tb2RlbHMvVXNlck1vZGVsLmpzIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGF0aFRvUmVnZXggKHBhdGhuYW1lKSB7XG5cdGxldCBrZXlOYW1lcyA9IFtdO1xuXHRsZXQgcGFydHMgPSBwYXRobmFtZVxuXHRcdC5zcGxpdCgnLycpXG5cdFx0LmZpbHRlcihwYXJ0ID0+IHBhcnQpXG5cdFx0Lm1hcChwYXJ0ID0+IHtcblx0XHRcdGlmICgvXjovLmV4ZWMocGFydCkpIHtcblx0XHRcdFx0a2V5TmFtZXMucHVzaChwYXJ0LnNsaWNlKDEpKTtcblx0XHRcdFx0cmV0dXJuIG5ldyBSZWdFeHAoYF5cXC8oW14vXSspYCwgYGlgKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBuZXcgUmVnRXhwKGBeXFwvJHtwYXJ0fWAsIGBpYCk7XG5cdFx0fSk7XG5cblxuXHRyZXR1cm4gZnVuY3Rpb24gKHBhdGgpIHtcblxuXHRcdGxldCBrZXlzID0gW107XG5cdFx0bGV0IGNoZWNrID0gcGFydHMuZXZlcnkoKHJlZ2V4cCwgc3RlcCkgPT4ge1xuXHRcdFx0bGV0IHRtcCA9IHJlZ2V4cC5leGVjKHBhdGgpO1xuXHRcdFx0aWYgKCF0bXApIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHRtcC5sZW5ndGggPT09IDIpIHtcblx0XHRcdFx0a2V5cy5wdXNoKHRtcFsxXSk7XG5cdFx0XHR9XG5cdFx0XHRwYXRoID0gcGF0aC5yZXBsYWNlKHJlZ2V4cCwgJycpO1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fSk7XG5cblx0XHRpZiAoY2hlY2spIHtcblx0XHRcdHJldHVybiBrZXlzLnJlZHVjZSgocHJldiwgY3VyciwgcG9zKSA9PiB7XG5cdFx0XHRcdHByZXZba2V5TmFtZXNbcG9zXV0gPSBjdXJyO1xuXHRcdFx0XHRyZXR1cm4gcHJldjtcblx0XHRcdH0sIHt9KTtcblx0XHR9XG5cdFx0cmV0dXJuIG51bGw7XG5cdH07XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcHVibGljL2pzL21vZHVsZXMvcGF0aFRvUmVnZXguanMiLCJsZXQgaWQgPSAwO1xuaW1wb3J0IHBhdGhUb1JlZ2V4IGZyb20gJy4vcGF0aFRvUmVnZXgnO1xuXG4vKiog0JrQu9Cw0YHRgSDQv9GA0LXQtNGB0YLQsNCy0LvRj9C10YIg0YHQvtCx0L7QuSDQn9GD0YLRjCDQsiDQstCw0YjQtdC8INC/0YDQuNC70L7QttC10L3QuNC4ICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb3V0ZSB7XG5cdC8qKlxuXHQgKiDQodC+0LfQtNCw0ZHRgiDQvdC+0LLRi9C5IFJvdXRlIC0g0LDRgdGB0L7RhtC40LjRgNGD0LXRgiDQvdC10LrQvtGC0L7RgNGD0Y4gdmlldyDRgSDRiNCw0LHQu9C+0L3QvtC8INC/0YPRgtC4XG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBwYXRobmFtZSAtINCo0LDQsdC70L7QvSDQv9GD0YLQuFxuXHQgKiBAcGFyYW0ge1ZpZXd9IHZpZXcgLSDQmtC70LDRgdGBINC60L7QvdC60YDQtdGC0L3QvtC5IFZpZXdcblx0ICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSAtINCU0L7Qv9C+0LvQvdC40YLQtdC70YzQvdGL0LUg0L/QsNGA0LDQvNC10YLRgNGLLCDQutC+0YLQvtGA0YvQtSDQsdGD0LTRg9GCINC/0LXRgNC10LTQsNC90Ysg0LLQviB2aWV3INC/0YDQuCDQtdGRINGB0L7Qt9C00LDQvdC40Lgg0Lgg0LjQvdC40YbQuNCw0LvQuNC30LDRhtC40Lhcblx0ICovXG5cdGNvbnN0cnVjdG9yKHBhdGhuYW1lLCB2aWV3LCBvcHRpb25zID0ge30pIHtcblx0XHQvL1RPRE86INCh0YPRidC40Lkg0LDQtNC40YnQtSwg0L3QsNC8INC90YPQttC90L4g0LzQtdC90LXQtNC20LXRgNC40YLRjCDQtNC10L/RgdGLXG5cdFx0dGhpcy5wYXRoVG9SZWdleCA9IHBhdGhUb1JlZ2V4O1xuXG5cdFx0dGhpcy5pZCA9ICdwJyArIGlkO1xuXHRcdGlkKys7XG5cdFx0dGhpcy5wYXRobmFtZSA9IHBhdGhuYW1lO1xuXHRcdHRoaXMucmVnZXggPSB0aGlzLnBhdGhUb1JlZ2V4KHBhdGhuYW1lKTtcblx0XHR0aGlzLlZpZXcgPSB2aWV3O1xuXHRcdHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG5cdH1cblxuXHQvKipcblx0ICog0J/RgNC+0LLQtdGA0Y/QtdGCLCDRgdC+0L7RgtCy0LXRgtGB0YLQstGD0LXRgiDQu9C4INC/0LXRgNC10LTQsNC90L3Ri9C5IHBhdGhuYW1lINGC0LXQutGD0YnQtdC80YMgUm91dGVcblx0ICogQHBhcmFtIHtzdHJpbmd9IHBhdGhuYW1lIC0g0J/Rg9GC0Ywg0LIg0L/RgNC40LvQvtC20LXQvdC40Lhcblx0ICogQHJldHVybnMge2Jvb2xlYW59INCg0LXQt9GD0LvRjNGC0LDRgiDQv9GA0L7QstC10YDQutC4XG5cdCAqL1xuXHRtYXRjaChwYXRobmFtZSkge1xuXHRcdHJldHVybiAhIXRoaXMucmVnZXgocGF0aG5hbWUpO1xuXHR9XG5cblx0LyoqXG5cdCAqINCQ0LrRgtC40LLQuNGA0YPQtdGCINGC0LXQutGD0YnQuNC5IFJvdXRlICjQv9C10YDQtdGF0L7QtNC40YIg0L/QviDQvdC10LzRgylcblx0ICogQHBhcmFtIHtzdHJpbmd9IHBhdGhuYW1lIC0g0J/Rg9GC0Ywg0LIg0L/RgNC40LvQvtC20LXQvdC40Lhcblx0ICogQHBhcmFtIHtPYmplY3R9IFtzdGF0ZT17fV0gLSDQntCx0YrQtdC60YIgc3RhdGUsINC60L7RgtC+0YDRi9C5INCx0YvQuyDQv9C10YDQtdC00LDQvSDQsiDRgdC+0LHRi9GC0LjQtSBwb3BzdGF0ZSDQtNC70Y8g0L7QsdGK0LXQutGC0LAgd2luZG93XG5cdCAqL1xuXHRuYXZpZ2F0ZShwYXRobmFtZSwgc3RhdGUgPSB7fSkge1xuXHRcdHN0YXRlID0gc3RhdGUgfHwge307XG5cdFx0bGV0IGtleXMgPSB0aGlzLnJlZ2V4KHBhdGhuYW1lKTtcblx0XHRpZiAoIXRoaXMuX3ZpZXcpIHtcblx0XHRcdGxldCB2aWV3ID0gbmV3IHRoaXMuVmlldyh0aGlzLm9wdGlvbnMpO1xuXHRcdFx0dmlldy5pbml0KHRoaXMub3B0aW9ucyk7XG5cdFx0XHR2aWV3LnNldFJvdXRlcih0aGlzLl9fcm91dGVyKTtcblx0XHRcdHRoaXMuX3ZpZXcgPSB2aWV3O1xuXHRcdH1cblxuXHRcdHRoaXMuX3ZpZXcucmVzdW1lKE9iamVjdC5hc3NpZ24oc3RhdGUsIGtleXMpKTtcblx0fVxuXG5cdC8qKlxuXHQgKiDQlNC10LDQutGC0LjQstC40YDRg9C10YIg0YLQtdC60YPRidC40LkgUm91dGVcblx0ICovXG5cdGxlYXZlKCkge1xuXHRcdHRoaXMuX3ZpZXcgJiYgdGhpcy5fdmlldy5wYXVzZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqINCj0YHRgtCw0L3QsNCy0LvQuNCy0LDQtdGCINGC0LXQutGD0YnQtdC80YMgUm91dGUg0LjQvdGB0YLQsNC90YEg0YDQvtGD0YLQtdGA0LBcblx0ICogQHBhcmFtIHtSb3V0ZXJ9IHJvdXRlciAtINCY0L3RgdGC0LDQvdGBINGA0L7Rg9GC0LXRgNCwXG5cdCAqL1xuXHRzZXRSb3V0ZXIocm91dGVyKSB7XG5cdFx0dGhpcy5fX3JvdXRlciA9IHJvdXRlcjtcblx0fVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcHVibGljL2pzL21vZHVsZXMvcm91dGUuanMiLCJpbXBvcnQgUm91dGVyIGZyb20gJy4vbW9kdWxlcy9yb3V0ZXInO1xuaW1wb3J0IExvZ2luVmlldyBmcm9tICcuL3ZpZXdzL2xvZ2luVmlldyc7XG5pbXBvcnQgUmVnaXN0cmF0aW9uVmlldyBmcm9tICcuL3ZpZXdzL3JlZ2lzdHJhdGlvblZpZXcnO1xuaW1wb3J0IFNjb3JlYm9hcmRWaWV3IGZyb20gJy4vdmlld3Mvc2NvcmVib2FyZFZpZXcnO1xuXG5sZXQgcm91dGVyID0gbmV3IFJvdXRlcigpO1xucm91dGVyLmFkZFJvdXRlKCcvbG9naW4nLCBMb2dpblZpZXcpO1xucm91dGVyLmFkZFJvdXRlKCcvcmVnaXN0cmF0aW9uJywgUmVnaXN0cmF0aW9uVmlldyk7XG5yb3V0ZXIuYWRkUm91dGUoJy9zY29yZWJvYXJkJywgU2NvcmVib2FyZFZpZXcpO1xucm91dGVyLmFkZFJvdXRlKCcvJywgTG9naW5WaWV3KTtcbnJvdXRlci5zdGFydCgpO1xud2luZG93LnJvdXRlciA9IHJvdXRlcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3B1YmxpYy9qcy9haXJkcm9uZS5qcyIsIi8qKlxuICog0JrQu9Cw0YHRgSDQv9GA0LXQtNGB0YLQsNCy0LvRj9C10YIg0YHQvtCx0L7QuSB2aWV3XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpZXcge1xuXHQvKipcblx0ICog0KHQvtC30LTQsNGR0YIg0L3QvtCy0YPRjiB2aWV3XG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gLSDQntCx0YrQtdC60YIg0YEg0L/QsNGA0LDQvNC10YLRgNCw0LzQuFxuXHQgKi9cblx0Y29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIHRoaXMuc2V0Um91dGVyKHdpbmRvdy5yb3V0ZXIpO1xuXHRcdHRoaXMudGFnTmFtZSA9IG9wdGlvbnMudGFnTmFtZSB8fCAnZGl2JztcbiAgICAgICAgdGhpcy5fZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKG9wdGlvbnMuZWxlbWVudCkgfHwgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0aGlzLnRhZ05hbWUpO1xuICAgICAgICBjb25zb2xlLmxvZygnaGVyZTogJywgdGhpcy5fZWwpO1xuICAgICAgICB0aGlzLmhpZGUoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiDQmNC90LjRhtC40LDQu9C40LfQsNGG0LjRjyDQv9Cw0YDQsNC80LXRgtGA0L7QsiB2aWV3ICjQstGL0L/QvtC70L3Rj9C10YLRgdGPINGB0YDQsNC30YMg0L/QvtGB0LvQtSDRgdC+0LfQtNCw0L3QuNGPKVxuXHQgKiDQndC10L7QsdGF0L7QtNC40LzQviDQv9C10YDQtdC/0YDQtdC00LXQu9GP0YLRjFxuXHQgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIC0g0J7QsdGK0LXQutGCINGBINC/0LDRgNCw0LzQtdGC0YDQsNC80Lhcblx0ICovXG5cdGluaXQob3B0aW9ucyA9IHt9KSB7XG5cdFx0dGhpcy5zZXRBdHRycyhvcHRpb25zLmF0dHJzKTtcblx0fVxuXG5cdC8qKlxuXHQgKiDQktGL0LfRi9Cy0LDQtdGC0YHRjyDQv9GA0Lgg0L/RgNC40L7RgdGC0LDQvdC+0LLQutC1INGA0LDQsdC+0YLRiyB2aWV3ICjQv9GA0Lgg0YHQutGA0YvRgtC40LggdmlldyDQuNC70Lgg0L/QtdGA0LXRhdC+0LTQtSDQvdCwINC00YDRg9Cz0YPRjiB2aWV3KVxuXHQgKiDQndC10L7QsdGF0L7QtNC40LzQviDQv9C10YDQtdC+0L/RgNC10LTQtdC70Y/RgtGMINGB0LLQvtC10Lkg0LvQvtCz0LjQutC+0Llcblx0ICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSAtINCe0LHRitC10LrRgiDRgSDQv9Cw0YDQsNC80LXRgtGA0LDQvNC4XG5cdCAqL1xuXHRwYXVzZShvcHRpb25zID0ge30pIHtcblx0XHR0aGlzLmhpZGUoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiDQktGL0LfRi9Cy0LDQtdGC0YHRjyDQv9GA0Lgg0L3QsNGH0LDQu9C1INC40LvQuCDQv9GA0L7QtNC+0LvQttC10L3QuNC4INGA0LDQsdC+0YLRiyB2aWV3ICjQv9C+0YHQu9C1INGC0L7Qs9C+LCDQutCw0LogdmlldyDQsdGL0LvQsCDRgdC60YDRi9GC0LApXG5cdCAqINCd0LXQvtCx0YXQvtC00LjQvNC+INC/0LXRgNC10L7Qv9GA0LXQtNC10LvRj9GC0Ywg0YHQstC+0LXQuSDQu9C+0LPQuNC60L7QuVxuXHQgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIC0g0J7QsdGK0LXQutGCINGBINC/0LDRgNCw0LzQtdGC0YDQsNC80Lhcblx0ICovXG5cdHJlc3VtZShvcHRpb25zID0ge30pIHtcblx0XHR0aGlzLnNob3coKTtcblx0fVxuXG5cdC8qKlxuXHQgKiDQn9C+0LrQsNC30YvQstCw0LXRgiB2aWV3XG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gLSDQntCx0YrQtdC60YIg0YEg0L/QsNGA0LDQvNC10YLRgNCw0LzQuFxuXHQgKi9cblx0c2hvdyhvcHRpb25zID0ge30pIHtcblx0XHR0aGlzLl9lbC5oaWRkZW4gPSBmYWxzZTtcblx0fVxuXG5cdC8qKlxuXHQgKiDQodC60YDRi9Cy0LDQtdGCIHZpZXdcblx0ICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSAtINCe0LHRitC10LrRgiDRgSDQv9Cw0YDQsNC80LXRgtGA0LDQvNC4XG5cdCAqL1xuXHRoaWRlKG9wdGlvbnMgPSB7fSkge1xuXHRcdHRoaXMuX2VsLmhpZGRlbiA9IHRydWU7XG5cdH1cblxuXHQvKipcblx0ICog0KDQtdC90LTQtdGA0LjRgiB2aWV3XG5cdCAqINCd0LXQvtCx0YXQvtC00LjQvNC+INC/0LXRgNC10L7Qv9GA0LXQtNC10LvRj9GC0Yxcblx0ICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSAtINCe0LHRitC10LrRgiDRgSDQv9Cw0YDQsNC80LXRgtGA0LDQvNC4XG5cdCAqL1xuXHRyZW5kZXIob3B0aW9ucyA9IHt9KSB7XG5cblx0fVxuXG5cdC8qKlxuXHQgKiDQktGB0YLQsNCy0LvRj9C10YIg0YLQtdC60YPRidGD0Y4gdmlldyDQsiDQv9C10YDQtdC00LDQvdC90YvQuSDRjdC70LXQvNC10L3RglxuXHQgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbCAtIEhUTUwt0Y3Qu9C10LzQtdC90YIsINC6INC60L7RgtC+0YDQvtC80YMg0LTQvtCx0LDQstC70Y/QtdGC0YHRjyDRjdC70LXQvNC10L3RgiDRgtC10LrRg9GJ0LXQuSB2aWV3XG5cdCAqL1xuXHRhcHBlbmRUbyhlbCkge1xuXHRcdGVsLmFwcGVuZENoaWxkKHRoaXMuX2VsKTtcblx0fVxuXG5cdC8qKlxuXHQgKiDQo9C00LDQu9GP0LXRgiDRjdC70LXQvNC10L3RgiDRgtC10LrRg9GJ0LXQuSB2aWV3XG5cdCAqL1xuXHRyZW1vdmUoKSB7XG5cdFx0dGhpcy5fZWwgJiYgdGhpcy5fZWwucmVtb3ZlKCk7XG5cdH1cblxuXHQvKipcblx0ICog0JfQsNC80LXQvdGP0LXRgiDRjdC70LXQvNC10L3RgiDRgtC10LrRg9GJ0LXQuSB2aWV3XG5cdCAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsIC0gSFRNTC3RjdC70LXQvNC10L3Rgiwg0LrQvtGC0L7RgNGL0Lkg0YHRgtCw0L3QvtCy0LjRgtGB0Y8g0Y3Qu9C10LzQtdC90YLQvtC8INGC0LXQutGD0YnQtdC5IHZpZXdcblx0ICovXG5cdHNldEVsZW1lbnQoZWwpIHtcblx0XHR0aGlzLl9lbCAmJiB0aGlzLl9lbC5yZW1vdmUoKTtcblx0XHR0aGlzLl9lbCA9IGVsO1xuXHR9XG5cblx0LyoqXG5cdCAqINCj0YHRgtCw0L3QsNCy0LvQuNCy0LDQtdGCINGC0LXQutGD0YnQtdC5IHZpZXcg0L3QsNCx0L7RgCDQsNGC0YDQuNCx0YPRgtC+0LJcblx0ICogQHBhcmFtIHtPYmplY3R9IFthdHRycz17fV0gLSDQntCx0YrQtdC60YIg0YEg0LDRgtGA0LjQsdGD0YLQsNC80LgsINC60L7RgtC+0YDRi9C1INCx0YPQtNGD0YIg0YPRgdGC0LDQvdC+0LLQu9C10L3RiyDRgyDRgtC10LrRg9GJ0LXQs9C+INGN0LvQtdC80LXQvdGC0LAgdmlld1xuXHQgKi9cblx0c2V0QXR0cnMoYXR0cnMgPSB7fSkge1xuXHRcdE9iamVjdC5rZXlzKGF0dHJzKS5mb3JFYWNoKG5hbWUgPT4ge1xuXHRcdFx0dGhpcy5fZWwuc2V0QXR0cmlidXRlKG5hbWUsIGF0dHJzW25hbWVdKTtcblx0XHR9KVxuXHR9XG5cblx0LyoqXG5cdCAqINCS0L7Qt9Cy0YDQsNGJ0LDQtdGCINGB0YLRgNC+0LrRgywg0YHQvtC00LXRgNC20LDRiNGD0Y4g0YLQtdC60YHRgtC+0LLQvtC1INC/0YDQtdC00YHRgtCw0LLQu9C10L3QuNC1INGC0LXQutGD0YnQtdC5IHZpZXdcblx0ICogQHJldHVybnMge3N0cmluZ31cblx0ICovXG5cdHRvU3RyaW5nKCkge1xuXHRcdHJldHVybiB0aGlzLl9lbC5vdXRlckhUTUw7XG5cdH1cblxuXHQvKipcblx0ICog0KPRgdGC0LDQvdCw0LLQu9C40LLQsNC10YIg0YLQtdC60YPRidC10LkgdmlldyDRgNC+0YPRgtC10YBcblx0ICogQHBhcmFtIHtSb3V0ZXJ9IHJvdXRlciAtINC40L3RgdGC0LDQvdGBINGA0L7Rg9GC0LXRgNCwXG5cdCAqL1xuXHRzZXRSb3V0ZXIocm91dGVyKSB7XG5cdFx0dGhpcy5yb3V0ZXIgPSByb3V0ZXI7XG5cdH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3B1YmxpYy9qcy9tb2R1bGVzL3ZpZXcuanMiXSwic291cmNlUm9vdCI6IiJ9