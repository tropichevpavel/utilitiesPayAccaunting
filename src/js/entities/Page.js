
import View from "./View";

export default class Page {
	constructor(app, templ) {
		this._app = app;
		this._view = new View(templ);
	}

	get element() {
		return this._view.element;
	}
}
