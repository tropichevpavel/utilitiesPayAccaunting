
import Router, { RouterMode } from '../libs/router';
import Toast, { ToastType } from '../libs/toast';
import API from './api';

export default class Core {
	constructor() {
		this._router = new Router({
			mode: RouterMode.HASH,
			root: '/'
		});
		this._network = new API(this);
		this._restoreSession();
	}

	showToast(msg) {
		this._toast.show(msg, ToastType.REGULAR);
	}

	showModal(modal) {
		this._modals.appendChild(modal);
	}

	changePage(page) {
		this._mainNode.innerHTML = '';
		this._mainNode.appendChild(page);
	}

	navigate(path) {
		this._router.navigate(path);
	}

	_restoreSession() {
		this.token = Store.get('token');
	}

	get api() { return this._network; }

	set toast(toastNode) { this._toast = new Toast(toastNode)}

	get token() { return this._token; }
	set token(token) {
		this._token = token === 'false' ? false : token;
		Store.set('token', this._token);
	}
}

class Store {
	static get(item) { return localStorage.getItem(item); }
	static set(item, value) { localStorage.setItem(item, value); }
}
