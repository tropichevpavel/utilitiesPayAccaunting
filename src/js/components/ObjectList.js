import View from "../entities/View";
import Object from "./Object";

export default class ObjectList extends View {
	constructor(app) {
		super(template);
		
		this._app = app;
		this._list = this.element.querySelector('#page-objects__object-list');

		this.loadObjects();
	}

	async loadObjects() {
		this._list.innerHTML = 'Загрузка...';
		const objects = await this._app.api.getObjects();
		this._list.innerHTML = '';

		if (objects)
			if (objects.data.length) this._drawObjects(objects.data);
			else this._list.innerHTML = 'Список пуст';
	}

	_drawObjects(objects) {
		objects.forEach((object) => this._list.appendChild((new Object(this._app, object, this.loadObjects.bind(this))).element));
		this._initHandlers();
	}

	_initHandlers() {
		// [...this._list.childNodes].forEach((card) => card.addEventListener('click', this._onObjectClick.bind(this)));
	}

	
}

const template = `<div id="page-objects__object-list"><div>`;
