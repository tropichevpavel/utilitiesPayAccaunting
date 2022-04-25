
import { TextEditable } from "../../utils";
import Cell, { tmp_cell } from "./Cell";

export default class CellEdit extends Cell {
	constructor(row, id, data = '') {
		super(row, id, data, tmp_cell(data, id !== -1));

		if (this._id !== -1) this._initHandlers();
	}

	_initHandlers() {
		this.element.addEventListener('blur', this._save.bind(this));
		this.element.addEventListener('input', this._textWatcher.bind(this));
	}

	_textWatcher(evt) {
		console.log(evt);
		if (evt.isTrusted) {
			if (evt.inputType === 'insertParagraph') this._save(evt);

			this.data = Number(TextEditable.textWatcher(evt, 'innerHTML'));

			if (this._row.onCellChange) this._row.onCellChange(evt);
		}
	}

	async _save(evt) {
		console.log(evt);
		if (evt.isTrusted && (evt.inputType === 'insertParagraph' || evt.relatedTarget)) {
			evt.target.innerHTML = evt.target.innerHTML.replace(/<br>/g, '');

			if (evt.type !== 'blur') this.element.blur();

			if (this.data === evt.target.innerHTML) return;

			this.element.setAttribute('contenteditable', 'false');
			await this._row._table.onSave({ row: this._row.id, col: this.id, value: this.data });
			this.element.setAttribute('contenteditable', 'true');
		}
	}
}
