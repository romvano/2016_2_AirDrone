(function () {
  class LoginForm {
    constructor() {
      const self = this;

      self.el = document.createElement('form');
      self.el.classList.add('login__form');
      self.el.onsubmit = function () { self.login(); return false; };

      self.h1 = new Header({
        text: 'Вход',
        attrs: {
          class: 'login__header',
        },
      });

      self.emailError = new Message({
        text: 'Пожалуйста, введите валидный e-mail!',
        attrs: {
          hidden: 'hidden',
          class: 'js-email-error login__form__error',
          name: 'emailError',
        },
      });

      self.email = new Input({
        attrs: {
          placeholder: 'E-mail',
          type: 'text',
          class: 'js-email login__form__input',
          name: 'email',
        },
        eventListeners: {
          blur: function onbluronblur() { self.validateEmail(); },
        },
      });

      self.passwordError = new Message({
        text: 'Пожалуйста, введите пароль!',
        attrs: {
          hidden: 'hidden',
          class: 'js-password-error login__form__error',
          name: 'passwordError',
        },
      });

      self.password = new Input({
        attrs: {
          placeholder: 'Password',
          type: 'password',
          class: 'js-password login__form__input',
          name: 'password',
        },
        eventListeners: {
          blur: function onblur() {
            self.validatePassword();
          },
          keyup: function onkeyup(e) {
            if (e.keyCode !== 9 && e.keyCode !== 8) {
              self.validatePassword();
            }
          },
        },
      });

      self.submit = new Button({
        text: 'Войти!',
        attrs: {
          class: 'js_submit login__form__button',
          name: 'button',
        },
      });

      self.registrationLink = new Link({
        text: 'Регистрация',
        attrs: {
          class: 'login__form__link',
          onclick: 'hideLogin(); showRegistration();',
          name: 'registration',
        },
      });

      self.el.appendChild(self.h1.render());
      self.el.appendChild(self.emailError.render());
      self.el.appendChild(self.email.render());
      self.el.appendChild(self.passwordError.render());
      self.el.appendChild(self.password.render());
      self.el.appendChild(self.submit.render());
      self.el.appendChild(self.registrationLink.render());
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
      return self.validateEmail() && self.validatePassword();
    }

    login() {
      const self = this;
      if (!self.validate()) {
        return;
      }
      const data = {
        email: self.email.value,
        password: self.password.value,
      };
      const response = request('https://air-drone.herokuapp.com/session', 'POST', data);
      alert(response);
    }
  }

  // export
  window.LoginForm = LoginForm;
}());
