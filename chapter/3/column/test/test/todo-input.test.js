import {html, fixture, expect} from '@open-wc/testing';
import '../my-todo.js';

describe('TodoInput', () => {
  it('todo input', async () => {
    const el = await fixture(html`
      <todo-input></todo-input>
    `);
    expect(el.shadowRoot.innerHTML).to.contain("input")
  });
});
