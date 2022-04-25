
import View from '../../entities/View';
import { str2num } from '../../utils';

export default class Enter extends View {
	constructor(templ, settings = false) {
		super(templ, 'div');

		this._settings = settings;
		this._inputs = {
			prev: [],
			values: [],
			tariffs: []
		};
	}

	get values() {
		if (!this._values.values)
			return this._getSettings();
		return this._getValues();
	}

	_getSettings() {
		const settings = { prev: [], tariffs: [] };

		this._inputs.prev.forEach((input) => settings.prev.push(str2num(input.value)));
		this._inputs.tariffs.forEach((input) => settings.tariffs.push(str2num(input.value)));

		return settings;
	}

	_getValues() {
		const values = [[], []];

		this._inputs.values.forEach((input) => values[0].push(str2num(input.value)));
		this._inputs.tariffs.forEach((input) => values[1].push(str2num(input.value)));

		return values;
	}
}
