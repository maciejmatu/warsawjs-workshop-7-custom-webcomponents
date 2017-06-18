
class Mockup extends HTMLElement {
	constructor() {
		super();

		this.shadow = this.attachShadow({ mode: 'open' });
		console.log('test');
	}

	connectedCallback() {
		let template = document.currentScript.ownerDocument.querySelector('#tmpl-mockup').content.cloneNode(true);
		template.querySelector('h1').innerHTML = this.attributes.text.value;
		template.querySelector('img').src = this.attributes.image.value;

		this.shadow.appendChild(template);
	}
}

window.customElements.define('mm-mockup', Mockup);