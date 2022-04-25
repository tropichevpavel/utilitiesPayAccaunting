
import ObjectList from '../components/ObjectList';
import Page from '../entities/Page';

export default class ObjectsPage extends Page {
	constructor(app) {
		super(app, template);

		this._btnLogout = this.element.querySelector('#page-objects__btn-logout');
		this._btnAdd = this.element.querySelector('#page-objects__btn-add');

		this.element.querySelector('#page-objects__token').innerHTML = `Current token = ${this._app.token}`;

		this._initHandlers();
		this._drawObjectList();
	}

	_initHandlers() {
		this._btnLogout.addEventListener('click', this._app.logout.bind(this._app));
		this._btnAdd.addEventListener('click', this._addObject.bind(this));
	}

	_drawObjectList() {
		if (!this._list) {
			this._list = new ObjectList(this._app);
			this.element.appendChild(this._list.element);
		} else this._list.loadObjects();
	}

	async _addObject() {
		const name = prompt('введите имя', '');
		if ((name !== '' || name !== null) && await this._app.api.addObject({ name: name }))
			this._drawObjectList();
	}
}

const template = `
	<div>
		<button id="page-objects__btn-logout" class="">Exit</button>
		<div id="page-objects__token"></div>
		<h1>Objects</h1>
		<div>
			<div>Object list</div>
			<button id="page-objects__btn-add">add</button>
		</div>
	</div>`;
