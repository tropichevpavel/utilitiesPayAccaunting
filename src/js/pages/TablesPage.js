
import Page from '../entities/Page';

import Table from '../components/Table/Table';

export default class TablesPage extends Page {
	constructor(app, id) {
		super(app, template(id));

		this._app = app;
		this._id = id;

		this._table = this.element.querySelector('.table');
		this._loadObject(id);
	}

	async _loadObject(id) {
		this._table.innerHTML = 'Загрузка...';
		this._object = await this._app.api.getObject(id);

		if (this._object) {
			console.log(this._object);
			this._initTable(this._object.data);
			this._id = this._object.data.id;
		}
	}

	_initTable(object) {
		this._table.innerHTML = '';
		this._table.appendChild((new Table(this, {
			spanable: false,
			firstMonth: 0,
			rows: object.data
		}).element));
	}
}

const template = (id) => `
	<a href="/eertu67emd2904/#/objects">Objects</a>
	<h1>Table of Object ${id}</h1>
	<div class="table"><div>`;
