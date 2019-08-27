import {html, fixture, expect} from '@open-wc/testing';
import '../my-todo.js';

describe('TodoItem', () => {
  it('todo item', async () => {
    const el = await fixture(html`
      <todo-item text="my todo 1"></todo-item>
    `);
    expect(el.shadowRoot.innerHTML).to.contain("<label>my todo 1</label>")
  });
});
