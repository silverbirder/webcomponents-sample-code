import {html, fixture, expect} from '@open-wc/testing';
import '../my-todo.js';

describe('MyTodo', () => {
  it('my todo', async () => {
    const el = await fixture(html`
      <my-todo></my-todo>
    `);
    expect(el.shadowRoot.innerHTML).to.contain("todo-item")
    expect(el.shadowRoot.innerHTML).to.contain("todo-input")
  });
});
