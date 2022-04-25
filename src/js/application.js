
import Core from './core';

import LoginPage from './pages/LoginPage';
import ObjectsPage from './pages/ObjectsPage';
import TablesPage from './pages/TablesPage';

class Application extends Core {
	constructor() {
		super();

		this.toast = document.querySelector('#app-messages');
		this._modals = document.querySelector('#app-modals');
		this._mainNode = document.querySelector('#app');

		this._initRouter();
	}

	showLoginPage() {
		this.changePage(new LoginPage(this).element);
	}

	showObjectsPage() {
		if (!this.token) this.navigate('');
		else this.changePage(new ObjectsPage(this).element);
	}

	showTablesPage(id) {
		if (!this.token) this.navigate('');
		else this.changePage(new TablesPage(this, id).element);
	}

	showStartPage() {
		if (this.token) this.navigate('/objects/');
		else this.showLoginPage();
	}

	_initRouter() {
		this._router
			.add(/objects\/(.*)/, this.showTablesPage.bind(this))
			.add(/objects/, this.showObjectsPage.bind(this))
			.add('', this.showStartPage.bind(this));
	}

	logout() {
		this.token = false;
		this.navigate('');
	}

	start() {
		this._router.start();
	}
}

const application = new Application();

export default application;