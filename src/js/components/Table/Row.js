
import View from '../../entities/View';
import CellEdit from './CellEdit';
import Cell from './Cell';

import CellAction from './CellAction';

import ModalEnter, { EnterTypes } from '../Modals/ModalEnter';

export default class Row extends View {
	constructor(table, id, data) {
		super(tmp_row(id !== -1), 'tr');
		this._table = table;
		
		this._id = id;
		this._header = data.name;
		this._data = data.data;
		this._meta = {
			type: data.type,
			prev: data.prev,
			tariffs: data.tariffs
		};

		this._cells = [];

		this._drawRow();
	}

	_drawRow() {
		this.element.appendChild(this._th = (new View(tmp_row_h(this.header, this._id !== -1, this._meta.tariffs), 'th')).element);

		this.data.forEach((data, i) => 
			this._cells.push(typeof data === 'object' ? new CellAction(this, i, data)
													  : new CellEdit(this, this._id !== -1 ? i : -1, data)));

		this._cells.forEach((cell) => this.element.appendChild(cell.element));

		this.element.appendChild(this._sum = (new Cell(this, -1)).element);

		this._initHandlers();
		this.onCellChange();
	}

	_initHandlers() {
		if (this._meta.tariffs)
			this._th.querySelector('span').addEventListener('click', this._showSettings.bind(this));
		else {
			this._th.addEventListener('input', this._textWatcher.bind(this));
			this._th.addEventListener('blur', this._saveHeader.bind(this));
		}

		this.element.addEventListener('dragstart', this._dragStartHandler.bind(this));
		this.element.addEventListener('dragover', this._dragMoveHandler.bind(this));
		this.element.addEventListener('dragend', this._dragEndHandler.bind(this));

		this.element.addEventListener('touchstart', this._dragStartTouchHandler.bind(this));
		this.element.addEventListener('touchmove', this._dragMoveHandler.bind(this));
		this.element.addEventListener('touchend', this._dragEndHandler.bind(this));
	}

	_showSettings() {
		const modal = new ModalEnter(this.type, this._meta, this._onSettingsChange.bind(this));
		this._table._object._app.showModal(modal.element);
	}

	async _onSettingsChange(data) {
		data.row = this._id;
		console.log(data);
		const res = await this._table.onSave(data);
		if (res) {
			this.meta = data;
			this._cells.forEach((cell) => cell.recalc());
			this.onCellChange();
		}
		return res;
	}

	_textWatcher(evt) {
		if (!evt.isTrusted || evt.inputType !== 'insertParagraph') return;
		evt.target.innerHTML = evt.target.innerHTML.replace(/<br>/g, '');
		this._saveHeader(evt);
	}

	async _saveHeader(evt) {
		if (evt.isTrusted) {
			if (evt.type !== 'blur') evt.target.blur();
			evt.target.contenteditable = false;
			await this._table.onSave({row: this._id, name: evt.target.innerHTML});
			evt.target.contenteditable = true;
		}
	}

	onCellChange(evt) {
		let sum = 0;
		[...this.element.childNodes].forEach((cell) => sum += (cell !== this.element.firstChild && cell !== this.element.lastChild) ? Number(cell.innerHTML.replace(/<br>/g, '')) : 0);
		this._sum.innerHTML = sum.toFixed(2);

		if (evt) this._table.onCellChange(evt);
	}

	_dragStartTouchHandler(evt) {
		this._dragTouchHandler = setTimeout(() => this._dragStartHandler(evt), 1000);
	}

	_dragStartHandler(evt) {
		if (evt.type === 'touchstart') {
			document.getSelection().empty();
			evt.preventDefault();
		}
		getRow(evt.target).classList.add('drag');
	}

	async _dragEndHandler(evt) {
		getRow(evt.target).classList.remove('drag');
		if (this._dragTouchHandler) clearTimeout(this._dragTouchHandler);

		this.element.setAttribute('draggable', 'false');
		
		const pos = this._table.positionRow(this);
		if (this._id !== pos) {
			if (await this._table.onSave({ row: this._id, pos: pos }))
				this._table.switchRow(this._id, pos);
			else this._table.drawRows();
		}
		this.element.setAttribute('draggable', 'true');
	}

	_dragMoveHandler(evt) {
		evt.preventDefault();

		let touchPos = evt.type === 'touchmove' ? evt.targetTouches[0].pageY - this._table.tbody.offsetTop / 2 : 0;

		const activeElement = this._table.tbody.querySelector('.drag');
		
		if (!activeElement) return;
		const currentElement = (evt.type === 'dragover') ? getRow(evt.target) : 
				(activeElement.previousElementSibling != null && touchPos < activeElement.previousElementSibling.getBoundingClientRect().bottom)
						? activeElement.previousElementSibling
						: (activeElement.nextElementSibling != null && touchPos > activeElement.nextElementSibling.getBoundingClientRect().top)
								? activeElement.nextElementSibling
								: activeElement;

		if (!currentElement.draggable) return;

		const isMove = (activeElement !== currentElement);

		if (!isMove) return;

		const nextElement = (currentElement === activeElement.nextElementSibling)
								? currentElement.nextElementSibling
								: currentElement;

		this._table.tbody.insertBefore(activeElement, nextElement);
	}

	set id(id) {
		this._id = id;
	}

	get id() {
		return this._id;
	}

	get header() {
		return this._header;
	}

	get data() {
		return this._data;
	}

	get prev() {
		return this._meta.prev;
	}

	get tariffs() {
		return this._meta.tariffs;
	}
	
	get type() {
		return this._meta.type;
	}

	get cells() {
		return this._cells;
	}

	getCellDataValues(i) {
		return i > -1 ? this._cells[i].data.values : this.prev;
	}

	set meta(meta) {
		for (const key of Object.keys(meta))
			this._meta[key] = meta[key];
	}
}

export const getRow = (node) =>  {
	while (node.tagName !== 'TR' && node !== null) node = node.parentNode;
	return node;
}

const tmp_row = (drag = true) => `<tr ${drag ? 'draggable="true"' : ''}></tr>`;
const tmp_row_h = (name, edit = false, set = false) => `<th><div ${edit && !set ? 'contenteditable="true"' : ''}>${name}</div>${set ? '<span>☼</span>' : ''}</th>`;
