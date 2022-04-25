
export default class View {
	constructor(templ, tag = false) {
		const element = document.createElement('template');
		element.innerHTML = templ;
		
		this._element = tag ? element.content.querySelector(tag) : element.content;
	}

	get element() {
		return this._element;
	}
}