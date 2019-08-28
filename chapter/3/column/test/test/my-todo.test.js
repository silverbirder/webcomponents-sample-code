import {html, fixture} from '@open-wc/testing-helpers';
import {expect} from '@open-wc/testing';
import '../my-todo.js';

const parser = new DOMParser();

describe('MyTodo Basic Test', () => {
  function todoItemCount(el) {
    let shadowHTML = el.shadowRoot.innerHTML;
    let doc = parser.parseFromString(shadowHTML, 'text/html');
    return doc.querySelectorAll('todo-item').length;
  }

  it('contains todo-item and todo-input', async () => {
    const el = await fixture(html`
      <my-todo></my-todo>
    `);
    let shadowHTML = el.shadowRoot.innerHTML;
    let doc = parser.parseFromString(shadowHTML, 'text/html');
    let todoItem = doc.querySelector('todo-item');
    let todoInput = doc.querySelector('todo-input');
    expect(todoItem).to.be.exist;
    expect(todoInput).to.be.exist;
  });
  it('listen onSubmit', async () => {
    const el = await fixture(html`
      <my-todo></my-todo>
    `);
    expect(todoItemCount(el)).to.be.equal(2);
    const todoInput = el.shadowRoot.querySelector('todo-input');
    todoInput.dispatchEvent(new CustomEvent('onSubmit', {detail: 'my todo 3'}));
    expect(todoItemCount(el)).to.be.equal(3);
  });
  it('listen onRemove', async () => {
    const el = await fixture(html`
      <my-todo></my-todo>
    `);
    expect(todoItemCount(el)).to.be.equal(2);
    const todoItem = el.shadowRoot.querySelector('todo-item');
    todoItem.dispatchEvent(new CustomEvent('onRemove', {detail: 0}));
    expect(todoItemCount(el)).to.be.equal(1);
  });
  it('listen onToggle', async () => {
    const el = await fixture(html`
      <my-todo></my-todo>
    `);
    let todoItem = el.shadowRoot.querySelector('todo-item');
    expect(todoItem.checked).to.be.false;
    todoItem.dispatchEvent(new CustomEvent('onToggle', {detail: 0}));
    todoItem = el.shadowRoot.querySelector('todo-item');
    expect(todoItem.checked).to.be.true;
  });
});
