
import Page from '../entities/Page';
import { generateToken } from '../utils';

export default class LoginPage extends Page {
	constructor(app) {
		super(app, template);

		this._btnGetToken = this.element.querySelector('#login-page__btn-get-token');
		this._inputToken = this.element.querySelector('#login-page__input-token');
		this._btnLogin = this.element.querySelector('#login-page__btn-login');

		this._initHandlers();
	}

	_initHandlers() {
		this._btnGetToken.addEventListener('click', this._onGetTokenClick.bind(this));
		this._btnLogin.addEventListener('click', this._login.bind(this));
	}

	async _onGetTokenClick(e) {
		e.target.innerHTML = 'load...';
		const token = generateToken();
		
		if (await this._app.api.regUser(token)) {
			this._app.token = token;
			this._app.navigate('/objects/');
		}

		e.target.innerHTML = 'Get Token!';
	}

	async _login(e) {
		e.target.innerHTML = 'check...';
		const token = this._inputToken.value;

		if (await this._app.api.login(token)) {
			this._app.token = token;
			this._app.navigate('/objects/');
		}

		e.target.innerHTML = 'Login';
	}
}

const template = `
	<div>
		<h1>Login</h1>
		<span>Hello new user! to Start get a token!</span>
		<button id="login-page__btn-get-token" class="btn">Get Token!</button>
		<input id="login-page__input-token" type="text" placeholder="Введите токен">
		<button id="login-page__btn-login" class="btn">Login</button>
	</div>`;
