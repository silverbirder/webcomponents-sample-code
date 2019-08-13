const template = document.createElement('template');
template.innerHTML = `
<style>
    section {
        background: #fff;
        margin: 30px 0 40px 0;
        position: relative;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
    }
    #list-container {
        margin: 0;
        padding: 0;
        list-style: none;
        border-top: 1px solid #e6e6e6;
    }
</style>
<section>
    <todo-input></todo-input>
    <ul id="list-container"></ul>
</section>
`;

class MyTodoElement extends HTMLElement {
    constructor() {
        super();
        this._root = this.attachShadow({mode: 'open'});
        this._list = [
            {text: 'my todo 1'},
            {text: 'my todo 2'}
        ];
    }

    connectedCallback() {
        this._root.appendChild(template.content.cloneNode(true));
        this.$input = this._root.querySelector('todo-input');
        this.$listContainer = this._root.querySelector('#list-container');
        this._render();
    }

    _render() {
        if (!this.$listContainer) return;
        this.$listContainer.innerHTML = '';
        this._list.forEach((item, index) => {
            let $item = document.createElement('todo-item');
            $item.setAttribute('text', item.text);
            this.$listContainer.appendChild($item);
        });
    }
}

window.customElements.define('my-todo', MyTodoElement);