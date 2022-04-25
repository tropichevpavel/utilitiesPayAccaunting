
import Enter from './Enter';

const InputDecimalAttr = 'type="text" inputmode="numeric" pattern="^\d+\.?\d{0,2}$"';

export default class Water extends Enter {
	constructor(values) {
		super(template(values));
		this._values = values;

		this._inputs = {
			prev: [
				this.element.querySelector('#enter__water-cold__prev'),
				this.element.querySelector('#enter__water-hot__prev'),
			],
			values: [
				this.element.querySelector('#enter__water-cold__value'),
				this.element.querySelector('#enter__water-hot__value'),
				this.element.querySelector('#enter__water-remove__value')
			],
			tariffs: [
				this.element.querySelector('#enter__water-cold__tariff'),
				this.element.querySelector('#enter__water-hot__tariff'),
				this.element.querySelector('#enter__water-remove__tariff')
			]
		};
	}
}

const template = (values) => `
	<div class="flex column">
		<div class="flex column">
			<h4>ХВС, м3</h4>
			<div class="flex">
				<label class="flex column">
					${values.values ? 'Показатель прошлого месяца' : 'Начальный показатель'}, м3
					<input id="enter__water-cold__prev" ${InputDecimalAttr} value="${values.prev[0]}" ${values.values ? 'disabled' : ''}>
				</label>
				${values.values ? `
				<label class="flex column">
					Показатель текущего месяца, м3
					<input id="enter__water-cold__value" ${InputDecimalAttr} value="${values.values[0]}">
				</label>` : ''}
				<label class="flex column">
					Тариф, м3/руб
					<input id="enter__water-cold__tariff" ${InputDecimalAttr} value="${values.tariffs[0]}">
				<label>
			</div>
		</div>
		<div class="flex column">
			<h4>ГВС, м3</h4>
			<div class="flex">
				<label class="flex column">
					${values.values ? 'Показатель прошлого месяца' : 'Начальный показатель'}, м3
					<input id="enter__water-hot__prev" ${InputDecimalAttr} value="${values.prev[1]}" ${values.values ? 'disabled' : ''}>
				</label>
				${values.values ? `
				<label class="flex column">
					Показатель текущего месяца, м3
					<input id="enter__water-hot__value" ${InputDecimalAttr} value="${values.values[1]}">
				</label>` : ''}
				<label class="flex column">
					Тариф, м3/руб
					<input id="enter__water-hot__tariff" ${InputDecimalAttr} value="${values.tariffs[1]}">
				<label>
			</div>
		</div>
		<div class="flex column">
			<h4>Водоотведение, м3</h4>
			<div class="flex">
				${values.values ? `
				<label class="flex column">
					Показатель текущего месяца, м3
					<input id="enter__water-remove__value" ${InputDecimalAttr} value="${values.values[2]}">
				</label>` : ''}
				<label class="flex column">
					Тариф, м3/руб
					<input id="enter__water-remove__tariff" ${InputDecimalAttr} value="${values.tariffs[2]}">
				<label>
			</div>
		</div>
	</div>`;
