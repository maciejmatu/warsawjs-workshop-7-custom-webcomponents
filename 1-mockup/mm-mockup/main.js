
class Mockup extends HTMLElement {
	constructor() {
		super();

		this.shadow = this.attachShadow({ mode: 'open' });

		let currentLocation = Mockup.DOCUMENT.src.split('/')
		currentLocation.pop();
		this.currentLocation = currentLocation.join('/');

	}

	connectedCallback() {
		let template = Mockup.DOCUMENT.ownerDocument.querySelector('#tmpl-mockup').content.cloneNode(true);
		template.querySelector('h1').innerHTML = this.attributes.text.value;
		template.querySelector('img').src = this.attributes.image.value;
		template.querySelector('link').href = this.currentLocation + '/main.css';

		this.shadow.appendChild(template);
	}
}

Mockup.DOCUMENT = document.currentScript;

window.customElements.define('mm-mockup', Mockup);