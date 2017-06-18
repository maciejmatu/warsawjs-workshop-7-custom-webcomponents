class MediaProjector extends HTMLElement {
	constructor() {
		super();

		this.shadow = this.attachShadow({ mode: 'open' });

		let currentLocation = document.currentScript.src.split('/')
		currentLocation.pop();
		this.currentLocation = currentLocation.join('/');
		this.document = document.currentScript.ownerDocument;
	}

	connectedCallback() {
		this._renderTemplate();
		this.addEventListener('click', this._onClickHandler);
	}

	disconnectedCallback() {
		this.removeEventListener('click', this._onClickHandler);
	}

	_onClickHandler() {
		if (this.slider) return console.warn('Click handler was disabled');

		this.slider = new Slider({
			items: this.children,
			callback: el => this._displayMedia(el.cloneNode(true))
		})
	}

	_displayMedia($element) {
		let $screen = this.shadow.querySelector('.media-screen');
		$screen.innerText = '';
		$screen.appendChild($element);
	}

	_renderTemplate() {
        const template = this.document.querySelector('#media-projector-template')
            .content.cloneNode(true);

		template.querySelector('link').href = this.currentLocation + '/main.css';
        this.shadow.appendChild(template);
    }
}

window.customElements.define('mm-media-projector', MediaProjector);