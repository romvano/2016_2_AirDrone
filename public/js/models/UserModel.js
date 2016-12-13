import request from '../libs';

export default class UserModel {
    constructor(data = {}) {
        this.username = data.username || '';
        this.email = data.email;
        this.password = data.password;
        this.score = 0;
        this.games = 0;

        this.emailError = '';
        this.passwordError = '';
        this.loginError = '';
    }

    validateLogin () {
        const self = this;
        if (self.username.length < 1) {
            self.loginError = 'Пожалуйста, введите кликуху!';
            return false;
        }
        self.loginError = '';
        return true;
    }

    validatePassword() {
        const self = this;
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

    validateEmail() {
        const self = this;
        if (self.email.search(/.+@.+\..+/) === -1) {
            self.emailError = 'Пожалуйста, проверьте правильность e-mail';
            return false;
        }
        self.emailError = '';
        return true;
    }

    validate() {
        const self = this;
        return self.validateEmail() && self.validateLogin() && self.validatePassword();
    }

    getEmailError () {
        return this.emailError;
    }

    getLoginError () {
        return this.loginError;
    }

    getPasswordError () {
        return this.passwordError;
    }

    save () {
        const self = this;
        const data = {
            username: self.username,
            email: self.email,
            password: self.password,
            games: self.games,
            score: self.score,
        };
        if (!self.validate()) {
            return null;
        }
        const response = request('https://air-drone.herokuapp.com/user', 'POST', data);
        switch (response.status) {
            case 400:
            case 403: self.emailError = 'Пользователь с таким адресом уже летает!';
                      self.passwordError = '';
                      break;
            case 200: self.emailError = self.passwordError = self.loginError = '';
                      break;
            default: console.log('Что-то не так, но не 400');
        }
        return response;
    }

    delete () {
        // TODO
    }

    login () {
        const self = this;
        const data = {
            email: self.email,
            password: self.password,
        };
        const response = request('https://air-drone.herokuapp.com/session', 'POST', data);
        console.log(response.status)
        switch (response.status) {
            case 400:
            case 403: self.emailError = 'Неверный логин или пароль!';
                      self.passwordError = '';
                      break;
            case 200: self.emailError = self.passwordError = self.loginError = '';
                      self.username = response.response.username; // Когда не будет работать, ошибку искать здесь.
                      self.score = response.response.score;
                      self.games = response.response.games;
                      break;
            default: console.log('Что-то не так, но не 400');
        }
        return response;
    }

    getScore() {
        return this.score;
    }
}
