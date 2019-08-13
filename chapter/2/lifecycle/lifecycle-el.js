const template = document.createElement('template');
template.innerHTML = `
      <style>
        p {
          color: #f0f;
        }
      </style>
      <p>This is a custom element!</p>
`;

class LifecycleElement extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.appendChild(template.content.cloneNode(true));
        console.log('constructor');
    }

    connectedCallback() {
        console.log('connectedCallback');
    }

    disconnectedCallback() {
        console.log('disconnectedCallback');
    }

    static get observedAttributes() {
        return ['name'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`attributeChangedCallback ${name}:${oldValue}->${newValue}`);
    }

    adoptedCallback(oldDocument, newDocument) {
        console.log(`adoptedCallback ${oldDocument}->${newDocument}`);
    }
}

customElements.define('lifecycle-el', LifecycleElement);