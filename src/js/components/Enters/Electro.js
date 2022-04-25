
import Enter from './Enter';

const InputDecimalAttr = 'type="text" inputmode="numeric" pattern="\D"';

export default class Electro extends Enter {
	constructor(values) {
		super(template(values));
		this._values = values;

		this._inputs = {
			prev: [
				this.element.querySelector('#enter__electro-t1__prev'),
				this.element.querySelector('#enter__electro-t2__prev'),
				this.element.querySelector('#enter__electro-t3__prev')
			],
			values: [
				this.element.querySelector('#enter__electro-t1__value'),
				this.element.querySelector('#enter__electro-t2__value'),
				this.element.querySelector('#enter__electro-t3__value')
			],
			tariffs: [
				this.element.querySelector('#enter__electro-t1__tariff'),
				this.element.querySelector('#enter__electro-t2__tariff'),
				this.element.querySelector('#enter__electro-t3__tariff')
			]
		};
	}
}

const template = (values) => `
	<div class="flex column">
		<div class="flex column">
			<h4>T1, кВт/ч</h4>
			<div class="flex">
				<label class="flex column">
					${values.values ? 'Показатель прошлого месяца' : 'Начальный показатель'}, кВт/ч
					<input id="enter__electro-t1__prev" ${InputDecimalAttr} value="${values.prev[0]}" ${values.values ? 'disabled' : ''}>
				</label>
				${values.values ? `
				<label class="flex column">
					Показатель текущего месяца, кВт/ч
					<input id="enter__electro-t1__value" ${InputDecimalAttr} value="${values.values[0]}">
				</label>` : ''}
				<label class="flex column">
					Тариф, кВт/ч/руб
					<input id="enter__electro-t1__tariff" ${InputDecimalAttr} value="${values.tariffs[0]}">
				<label>
			</div>
		</div>
		<div class="flex column">
			<h4>T2, кВт/ч</h4>
			<div class="flex">
				<label class="flex column">
					${values.values ? 'Показатель прошлого месяца' : 'Начальный показатель'}, кВт/ч
					<input id="enter__electro-t2__prev" ${InputDecimalAttr} value="${values.prev[1]}" ${values.values ? 'disabled' : ''}>
				</label>
				${values.values ? `
				<label class="flex column">
					Показатель текущего месяца, кВт/ч
					<input id="enter__electro-t2__value" ${InputDecimalAttr} value="${values.values[1]}">
				</label>` : ''}
				<label class="flex column">
					Тариф, кВт/ч/руб
					<input id="enter__electro-t2__tariff" ${InputDecimalAttr} value="${values.tariffs[1]}">
				<label>
			</div>
		</div>
		<div class="flex column">
			<h4>T3, кВт/ч</h4>
			<div class="flex">
				<label class="flex column">
					${values.values ? 'Показатель прошлого месяца' : 'Начальный показатель'}, кВт/ч
					<input id="enter__electro-t3__prev" ${InputDecimalAttr} value="${values.prev[2]}" ${values.values ? 'disabled' : ''}>
				</label>
				${values.values ? `
				<label class="flex column">
					Показатель текущего месяца, кВт/ч
					<input id="enter__electro-t3__value" ${InputDecimalAttr} value="${values.values[2]}">
				</label>` : ''}
				<label class="flex column">
					Тариф, кВт/ч/руб
					<input id="enter__electro-t3__tariff" ${InputDecimalAttr} value="${values.tariffs[2]}">
				<label>
			</div>
		</div>
	</div>`;
