import View from "../entities/View";

export default class Object extends View {
	constructor(app, object, cb) {
		super(template(object));

		this._app = app;
		this._object = object;
		this._cb = cb;

		this._card = this.element.querySelector('.object-list__card');
		this._btnEdit = this.element.querySelector('.object-card__btn-edit');
		this._btnDel = this.element.querySelector('.object-card__btn-del');

		this._initHandlers();
	}

	_initHandlers() {
		this._card.addEventListener('click', this._onObjectClick.bind(this));
		this._btnEdit.addEventListener('click', this._onEditBtnClick.bind(this));
		this._btnDel.addEventListener('click', this._onDeleteBtnClick.bind(this));
	}

	async _onDeleteBtnClick(e) {
		if (confirm('del?') && await this._app.api.delObject(this._object)) this._cb();
	}

	async _onEditBtnClick(e) {
		const name = prompt('Введите имя', this._object.name);
		if (name && name.length) {
			this._object.name = name;
			if (await this._app.api.updObject(this._object))
				this._cb();
		}
	}

	async _onObjectClick(e) {
		if (e.target === this._card) this._app.navigate(`/objects/${this._object.id}/`);
	}
}

const template = (object) => `
	<div class="object-list__card" data-id="${object.id}">
		<div>${object.name}</div>
		<button class="object-card__btn-edit">edit</button>
		<button class="object-card__btn-del">del</button>
	</div>`;