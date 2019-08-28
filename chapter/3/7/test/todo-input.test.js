import {html, fixture, oneEvent} from '@open-wc/testing-helpers';
import {expect} from '@open-wc/testing';
import '../my-todo.js';

const parser = new DOMParser();

describe('TodoInput Basic Test', () => {
  it('contains form', async () => {
    const el = await fixture(html`
      <todo-input></todo-input>
    `);
    let shadowHTML = el.shadowRoot.innerHTML;
    let doc = parser.parseFromString(shadowHTML, 'text/html');
    let formID = doc.querySelector('form').getAttribute('id');
    expect(formID).to.be.equal('new-todo-form');
  });
  it('dispatch submit event', async () => {
    const el = await fixture(html`
      <todo-input></todo-input>
    `);
    const inputValue = 'my todo 1';
    const form = el.shadowRoot.getElementById('new-todo-form');
    const input = el.shadowRoot.getElementById('new-todo');
    input.setAttribute('value', inputValue);
    setTimeout(() => form.dispatchEvent(new Event('submit')));
    const {detail} = await oneEvent(el, 'onSubmit');
    expect(detail).to.be.equal(inputValue);

    // for no input value
    setTimeout(() => form.dispatchEvent(new Event('submit')));
    expect(input.value).to.be.empty
  });
});
