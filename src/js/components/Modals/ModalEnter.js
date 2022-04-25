
import Modal from '../../entities/Modal';
import Water from '../Enters/Water';
import Gas from '../Enters/Gas';
import Electro from '../Enters/Electro';

export const EnterTypes = {
	WATER: 0,
	GAS: 1,
	ELECTRO: 2
};

const { WATER, GAS, ELECTRO } = EnterTypes;

export default class ModalEnter extends Modal {
	constructor(type, values, onSave) {
		super(template(type, !values.values), !values.values);

		this._type = type;
		this._values = values;
		this._onSave = onSave;

		this._selector = this.element.querySelector('select');
		this._body = this.element.querySelector('section');

		this._btnSave = this.element.querySelector('.modal__btn-save');
		this._btnCancel = this.element.querySelector('.modal__btn-cancel');
		
		this._initHandlers();
		this._drawEnter();
	}

	_initHandlers() {
		// this._selector.addEventListener('change', this._onSelectorChange.bind(this));

		this._btnSave.addEventListener('click', this._save.bind(this));
		this._btnCancel.addEventListener('click', this._close.bind(this));
	}

	_onSelectorChange() {

	}

	_drawEnter() {
		this._enter = this._type === WATER ? new Water(this._values)
					: this._type === GAS ? new Gas(this._values)
					: this._type === ELECTRO ? new Electro(this._values) : false;

		this._body.innerHTML = '';
		if (this._enter)
			this._body.appendChild(this._enter.element);
	}

	async _save() {
		if (await this._onSave(this._enter.values)) this._close();
	}
}

const template = (type, settings = false) => `
	<div>
		<!--select ${settings ? '' : 'disabled'}>
			<option value="${EnterTypes.WATER}" ${type === EnterTypes.WATER ? 'selected' : ''}>Вода</option>
			<option value="${EnterTypes.GAS}" ${type === EnterTypes.GAS ? 'selected' : ''}>Газ</option>
			<option value="${EnterTypes.ELECTRO}" ${type === EnterTypes.ELECTRO ? 'selected' : ''}>Электричество</option>
			<option value="" disable>Налоги</option>
		</select-->
		<section></section>
		<div class="m-t-10">
			<button class="modal__btn-cancel">Отмена</button>
			<button class="modal__btn-save">Сохранить</button>
		</div>
	</div>
`;
