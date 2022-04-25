
import Enter from './Enter';

const InputDecimalAttr = 'type="text" inputmode="numeric" pattern="\D"';

export default class Gas extends Enter {
	constructor(values) {
		super(template(values));
		this._values = values;

		this._inputs = {
			prev: [
				this.element.querySelector('#enter__gas__prev')
			],
			values: [
				this.element.querySelector('#enter__gas__value')
			],
			tariffs: [
				this.element.querySelector('#enter__gas__tariff')
			]
		};
	}
}

const template = (values) => `
		<div class="flex column">
			<h4>Газ, м3</h4>
			<div class="flex">
				<label class="flex column">
					${values.values ? 'Показатель прошлого месяца' : 'Начальный показатель'}, м3
					<input id="enter__gas__prev" ${InputDecimalAttr} value="${values.prev[0]}" ${values.values ? 'disabled' : ''}>
				</label>
				${values.values ? `
				<label class="flex column">
					Показатель текущего месяца, м3
					<input id="enter__gas__value" ${InputDecimalAttr} value="${values.values[0]}">
				</label>` : ''}
				<label class="flex column">
					Тариф, м3/руб
					<input id="enter__gas__tariff" ${InputDecimalAttr} value="${values.tariffs[0]}">
				<label>
			</div>
		</div>`;
