
import View from '../../entities/View';

import Row from './Row';

export default class Table extends View {
	constructor(object, opts) {
		super(tmp_table(12, 3));
		this._object = object;
		this._data = opts.rows;

		this._tbody = this.element.querySelector('tbody');

		this._rows = [];

		this.drawRows();
	}

	drawRows() {
		this._tbody.innerHTML = '';
		this._rows = [];

		this._data.forEach((row, i) => this._rows.push(new Row(this, i, row)));		
		this._rows.forEach((row) => this._tbody.appendChild(row.element));

		this._tbody.appendChild((new Row(this, -1, { name: 'Итого', data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]})).element);

		this.onCellChange();
	}

	get columns() { return 12; }

	get tbody() {
		return this._tbody;
	}

	async onSave(data) {
		data.oID = this._object._id;
		console.log(data);
		return await this._object._app.api.saveObjectData(data);
	}

	onCellChange() {
		let sum = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		// this._rows.forEach((row) => row.cells.forEach((cell, i) =>  sum[i] += cell !== cell.data));
		[...this._tbody.children].forEach((row) => row !== this._tbody.lastElementChild ? [...row.children].forEach((cell, i) => sum[i] += cell !== row.firstElementChild ? Number(cell.innerHTML.replace(/<br>/g, '')) : 0) : '');
		[...this._tbody.lastElementChild.children].forEach((cell, i) => cell.innerHTML = cell !== this._tbody.lastElementChild.firstElementChild ? sum[i].toFixed(2) : cell.innerHTML);
	}

	indexRow(row) {
		return this._rows.indexOf(row);
	}

	positionRow(row) {
		return [...this._tbody.children].indexOf(row.element);
	}

	switchRow(id1, id2) {
		this._rows[id1].id = id2;
		this._rows[id2].id = id1;
	}
}

const tmp_table = (columns, first = 0) => `<table><thead>${tmp_header(columns, first)}</thead><tbody></tbody></table>`;

const tmp_header = (columns, first = 0) => {
	let headers = [];
	while (headers.length <= columns - 1) headers.push(`Месяц ${first++ % columns + 1}`);
	headers.push('Итого');
	return `<th></th><th>${headers.join('</th><th>')}</th>`;
};
