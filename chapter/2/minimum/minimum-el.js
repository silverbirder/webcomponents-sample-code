const template = document.createElement('template');
template.innerHTML = `
      <style>
        p {
          font-weight: bold;
        }
      </style>
      <p>This is a custom element!</p>
`;

class MinimumElement extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('minimum-el', MinimumElement);