
export const RouterMode = {
	HISTORY: 'history',
	HASH: 'hash'
};

export default class Router {
	constructor(options) {
		this._current = undefined;
		this._routes = [];
		this._root = '/';
		this._mode = window.history.pushState ? RouterMode.HISTORY : RouterMode.HASH;

		if (options.mode) this._mode = options.mode;
		if (options.root) this._root = options.root;
		this._initHandlers();
	}

	add(path, cb) {
		this._routes.push({path, cb});
		return this;
	}

	remove(path) {
		this._routes.slice(this._routes.findIndex((e) => e.path === path), 1);
		return this;
	}

	flush() {
		this._routes = [];
		return this;
	}

	start() {
		this._onRouteChange();
	}

	navigate(path) {
		window.location = `#${path}`;
		// history.pushState({}, '', `#${path}`);
	}

	get _path() {
		let path = '';
		if (this._mode === RouterMode.HISTORY) {
			path = this._clearSlashes(decodeURI(window.location.pathname + window.location.search));
			path = path.replace(/\?(.*)$/, '');
			path = this.root !== '/' ? path.replace(this.root, '') : path;
		
		} else {
			const match = window.location.href.match(/#(.*)$/);
			path = match ? match[1] : '';
		}
		return this._clearSlashes(path);
	}

	_initHandlers() {
		window.addEventListener('popstate', this._onRouteChange.bind(this));
	}

	_onRouteChange() {
		if (this._current === this._path) return;
		this._current = this._path;

		this._routes.some((route) => {
			const match = this._current.match(route.path);
			if (match) {
				match.shift();
				route.cb.apply({}, match);
				return match;
			}
			return false;
		});
	}

	_clearSlashes(path) {
		return path.toString().replace(/\/$/, '').replace(/^\//, '');
	}
}