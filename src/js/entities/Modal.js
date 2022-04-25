import View from "./View";

export default class Modal extends View {
	constructor(modalContent) {
		super(templ(), 'div');
		this.element.querySelector('.modal-content').innerHTML = modalContent;
		
		this._keyDown = this._closeHangler.bind(this);
		
		document.body.addEventListener('keydown', this._keyDown);
		this.element.addEventListener('click', this._closeHangler.bind(this));
	}

	_closeHangler(e) {
		if ((e.type === 'click' && e.target !== this.element)
			|| (e.type === 'keydown' && e.code !== 'Escape')) return;

		e.preventDefault();
		this._close();
	}

	_close() {
		document.body.removeEventListener('keydown', this._keyDown);
		this.element.remove();
	}
}

const templ = () => `
	<div class="modal-wrapper" tabindex="-1">
		<div class="modal">
			<div class="modal-content"></div>
		</div>
	</div>`;
