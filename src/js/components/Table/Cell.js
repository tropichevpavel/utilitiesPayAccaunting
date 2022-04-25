
import View from "../../entities/View";

export default class Cell extends View {
	constructor(row, id, data, templ = false) {
		super(templ ? templ : tmp_cell(data), 'td');

		this._row = row;
		this._id = id;
		this._data = data;
	}

	get id() {
		return this._id;
	}

	set data(data) {
		this._data = data;
	}

	get data() {
		return this._data;
	}

	get value() {
		return Number(this._data);
	}
}

export const tmp_cell = (value = '', edit = false) => `<td ${edit ? 'contenteditable="true"' : ''} inputmode="decimal">${value}</td>`;
