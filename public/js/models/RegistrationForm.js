(function () {
  const Button = window.Button;
  const Header = window.Header;
  const Input = window.Input;
  const Message = window.Message;
  function nextStepRegistration() { window.nextStepRegistration(); }
  const request = window.request;

  const registrationData = {};

  class RegistrationForm1 {
    constructor() {
      const self = this;

      self.el = document.createElement('form');
      self.el.classList.add('registration__form');
      self.el.onsubmit = function () { self.nextStep(); return false; };

      self.h1 = new Header({
        text: 'Регистрация',
        attrs: {
          class: 'registration__header',
        },
      });

      self.emailError = new Message({
        text: 'Пожалуйста, введите валидный e-mail!',
        attrs: {
          hidden: 'hidden',
          class: 'js-email-error registration__form__error',
          name: 'emailError',
        },
      });

      self.email = new Input({
        attrs: {
          placeholder: 'E-mail',
          type: 'text',
          class: 'js-email registration__form__input',
          name: 'email',
        },
        eventListeners: {
          blur: function onblur() { self.validateEmail(); },
        },
      });

      self.passwordError = new Message({
        text: 'Пожалуйста, введите пароль!',
        attrs: {
          hidden: 'hidden',
          class: 'js-password-error registration__form__error',
          name: 'passwordError',
        },
      });

      self.password = new Input({
        attrs: {
          placeholder: 'Password',
          type: 'password',
          class: 'js-password registration__form__input',
          name: 'password',
        },
        eventListeners: {
          blur: function onblur() { self.validatePassword(); },
          keyup: function onkeyup(e) {
            if (e.keyCode !== 9 && e.keyCode !== 8) {
              self.validatePassword();
            }
          },
        },
      });

      self.submit = new Button({
        text: 'Продолжить',
        attrs: {
          class: 'js_submit registration__form__button',
          name: 'button',
        },
      });

      self.el.appendChild(self.h1.render());
      self.el.appendChild(self.emailError.render());
      self.el.appendChild(self.email.render());
      self.el.appendChild(self.passwordError.render());
      self.el.appendChild(self.password.render());
      self.el.appendChild(self.submit.render());
    }

    render() {
      const self = this;
      return self.el;
    }

    validateEmail() {
      const self = this;
      if (self.el.elements.email.value.search(/.@./) === -1) {
        self.el.children.emailError.style.display = 'block';
        return false;
      }
      self.el.children.emailError.style.display = 'none';
      return true;
    }

    validatePassword() {
      const self = this;
      if (self.el.elements.password.value.length < 1) {
        self.el.children.passwordError.style.display = 'block';
        return false;
      }
      self.el.children.passwordError.style.display = 'none';
      return true;
    }

    validate() {
      const self = this;
      return self.validateEmail(self) && self.validatePassword(self);
    }

    nextStep() {
      const self = this;
      if (!self.validate()) {
        return;
      }
      registrationData.email = document.querySelector('.js-email').value;
      registrationData.password = document.querySelector('.js-password').value;
      nextStepRegistration();
    }
  }

  class RegistrationForm2 {
    constructor() {
      const self = this;

      self.el = document.createElement('form');
      self.el.classList.add('registration__form');
      self.el.onsubmit = function () { self.register(); return false; };

      self.h1 = new Header({
        text: 'Познакомимся?',
        attrs: {
          class: 'registration__header',
        },
      });

      self.loginError = new Message({
        text: 'Пожалуйста, введите логин!',
        attrs: {
          hidden: 'hidden',
          class: 'js-login-error registration__form__error',
          name: 'loginError',
        },
      });

      self.login = new Input({
        attrs: {
          placeholder: 'Кликуха',
          type: 'text',
          class: 'js-login registration__form__input',
          name: 'login',
        },
        eventListeners: {
          blur: function onblur() { self.validateLogin(); },
          keyup: function onkeyup(e) {
            if (e.keyCode !== 9 && e.keyCode !== 8) {
              self.validateLogin();
            }
          },
        },
      });

      self.submit = new Button({
        text: 'Зарегистрироваться!',
        attrs: {
          class: 'js_submit registration__form__button',
          name: 'button',
        },
      });

      self.el.appendChild(self.h1.render());
      self.el.appendChild(self.loginError.render());
      self.el.appendChild(self.login.render());
      self.el.appendChild(self.submit.render());
    }

    render() {
      const self = this;
      return self.el;
    }

    validateLogin() {
      const self = this;
      if (self.el.elements.login.value.length < 1) {
        self.el.children.loginError.style.display = 'block';
        return false;
      }
      self.el.children.loginError.style.display = 'none';
      return true;
    }

    validate() {
      const self = this;
      return self.validateLogin();
    }

    register() {
      const self = this;
      if (!self.validate()) {
        console.log('here');
        return;
      }
      registrationData.username = document.querySelector('.js-login').value;
      const response = request('https://air-drone.herokuapp.com/user', 'POST', registrationData);
      alert(response);
    }
  }

  // export
  window.RegistrationForm1 = RegistrationForm1;
  window.RegistrationForm2 = RegistrationForm2;
}());
