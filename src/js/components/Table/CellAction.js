
import Cell, { tmp_cell } from './Cell';
import ModalEnter from '../Modals/ModalEnter';

export default class CellAction extends Cell {
	constructor(row, id, data) {
		super(row, id, data, tmp_cell());
		this._initHandlers();
		this.data = data;
	}

	_initHandlers() {
		this.element.addEventListener('click', this._onClick.bind(this));
	}

	_onClick() {
		const prev = this._row.getCellDataValues(this.id - 1);
		if (prev[0] === '') return alert('Предыдущий месяц не заполнен!');

		const onSave = async (data) => {
			const res = await this._row._table.onSave({ row: this._row.id, col: this.id, value: data });
			if (res) {
				this.data = data;
				return true;
			}
		};

		this._row._table._object._app.showModal((new ModalEnter(this._row.type, {...this.data, prev: prev}, (v) => onSave(v))).element);
	}

	recalc() {
		this.element.innerHTML = this.value;
	}

	set data(data) {
		this._data = {
			values: data[0],
			tariffs: data[1]
		};
		this.recalc();
	}

	get data() {
		if (this._data.tariffs[0] !== '') return this._data;
		return {
			values: this._data.values,
			tariffs: this._row.tariffs
		};
	}

	get value() {
		if (this._data.values[0] === '') return '';

		const prev = this._row.getCellDataValues(this.id - 1);
		let value = 0;
		this._data.values.forEach((val, i) => value += (val - (prev[i] ? prev[i] : 0)) * (this._data.tariffs[i] ? this._data.tariffs[i] : this._row.tariffs[i]));
		return value.toFixed(2);
	}
}
