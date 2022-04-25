
if (!Object.prototype.del) {
	Object.defineProperty(Object.prototype, 'del', {
		value: function (prot) {
			if (this == null) throw new TypeError('Not an object');
			delete this[prot];
			return this;
		}
	});
}

export const isset = (elem) => typeof elem !== 'undefined';

export const str2num = (value) => value === '' ? 0 : Number(value);

export const generateToken = () => randStr() + randStr();

const randStr = () => Math.random().toString(36).substring(2);

export class TextEditable {
	static getCursorPosition(parent) {
		const selection = document.getSelection();
		const range = new Range;
		range.setStart(parent, 0);
		range.setEnd(selection.anchorNode, selection.anchorOffset);
		return range.toString().length;
	}

	static setCursorPosition(parent, position) {
		let child = parent.firstChild;
		if (!child) return;
		while (position > 0) {
			let length = child.textContent;
			if (position > length) {
				position -= length;
				child = child.nextSibling ? child.nextSibling : child;
			
			} else {
				if(child.nodeType == 3) return document.getSelection().collapse(child, position)
				child = child.firstChild;
			}
		}
	}

	static textWatcher(evt, target) {
		let text = evt.target[target];
		text = text.replace(/<br>/g, '');

		if (evt.inputType !== 'deleteContentBackward'
				&& (!/^[0-9.,\b]+$/.test(evt.data) || !/^\d+\.?\d{0,2}$/.test(text))) {

			const cursor = TextEditable.getCursorPosition(evt.target);
			const shift = evt.inputType === 'insertParagraph' ? 4 : evt.data.length ; //evt.inputType !== 'insertCompositionText' ? 1 : 


			// if () str.replace(/\D/g, '');
			
			// console.log(text);

			text = text.substring(0, cursor - shift) + text.substring(cursor);
			// text = text.replace('˜', '');

			evt.target[target] = text;
			TextEditable.setCursorPosition(evt.target, cursor - 1);
		}

		return text;
	}
}

