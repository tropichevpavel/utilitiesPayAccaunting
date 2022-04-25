
export const ToastType = { ERROR: 0, REGULAR: 1 };

const { ERROR, REGULAR } = ToastType;

const MESSAGE_HIDE_INTERVAL = 5000;

export default class Toast {
	constructor(msgsNode) {
		this._msgsNode = msgsNode;
	}

	show(msg, type = REGULAR) {
		const msgNode = document.createElement('div');
		msgNode.classList.add('message');
		msgNode.innerHTML = template('', msg);

		if (type == ERROR) msgNode.classList.add('error');

		const cb = () => msgNode.remove();
		msgNode.querySelector('.message__btn-close').addEventListener('click', cb);

		setTimeout(() => cb(), MESSAGE_HIDE_INTERVAL);

		this._msgsNode.appendChild(msgNode);
	}

	hide() {
		this._msgsNode.innerHTML = '';
	}
}

const template = (caption, msg) => `
	<p class="message__message">
		<span class="message__caption">${caption}</span>
		<span class="message__text">${msg}</span>
	</p>
	<button class="message__btn-close">х</button>`;
