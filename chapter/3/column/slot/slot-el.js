const template = document.createElement('template');
template.innerHTML = `
	<h1>slot1</h1>
	<slot name="slot1"></slot>
	<h1>slot2</h1>
	<slot name="slot2"></slot>
	<h1>default slot</h1>
	<slot></slot>
	<h1>fallback slot</h1>
	<slot name="slot3">slot3</slot>
`;

class SlotElement extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('slot-el', SlotElement);