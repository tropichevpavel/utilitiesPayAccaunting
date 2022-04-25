
const HTTP_URL = 'http://milk.bidone.ru/api/vTest/utilPayAcc';

const HttpMethods = { GET: 'GET', POST: 'POST', PUT: 'PUT', DELETE: 'DELETE' };
const { GET, POST, PUT, DELETE } = HttpMethods;

const ERROR = '{"status":500, "message":"Проверьте соединение с интернетом"}';

export default class API {
	constructor(app) { this._app = app; }

	async login(token) {return await this._network(`/users/${token}`, GET); }
	async regUser(token) { return await this._network(`/users/${token}`, POST); }

	async getObjects() { return await this._network(`/objects/`); }

	async getObject(id) 	{ return await this._network(`/objects/${id}`); }
	async addObject(object) { return await this._network(`/objects/`, POST, object); }
	async updObject(object) { return await this._network(`/objects/${object.id}`, PUT, object.del('id')); }
	async delObject(object) { return await this._network(`/objects/${object.id}`, DELETE); }

	async saveObjectData(data) { return await this._network(`/objects/${data.oID}/data`, PUT, data.del('oID')); }

	async _network (api, method = GET, data = {}) {
		const resp = await new Promise((load) => {
			const _xhr = new XMLHttpRequest();

			_xhr.onload = () => load(_xhr.response);
			_xhr.onerror = () => load(ERROR);
			_xhr.ontimeout = () => load(ERROR);

			_xhr.open(method, `${HTTP_URL}${api}`);

			if (this._app.token) _xhr.setRequestHeader('X-Authorization', this._app.token);

			if (Object.keys(data).length) {
				_xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
				_xhr.send(JSON.stringify(data));

			} else _xhr.send();
		});

		try {
			const json = JSON.parse(resp);
			if (json.status !== 200) throw new Error(`ERROR ${json.status}: ${json.message}`);
			if (json.message) this._app.showToast(json.message);

			return json;
		} catch (err) {
			this._app.showToast(err.message);
		}

		return false;
	}
}