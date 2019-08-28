import {html, fixture, elementUpdated, oneEvent} from '@open-wc/testing-helpers';
import {expect} from '@open-wc/testing';
import '../my-todo.js';

const parser = new DOMParser();

describe('TodoItem Basic Test', () => {
  it('contains necessary tags', async () => {
    const el = await fixture(html`
      <todo-item text="my todo 1"></todo-item>
    `);
    const shadowHTML = el.shadowRoot.innerHTML;
    const doc = parser.parseFromString(shadowHTML, 'text/html');
    const input = doc.querySelector('input');
    const button = doc.querySelector('button');
    const label = doc.querySelector('label');
    expect(input).to.be.exist;
    expect(button).to.be.exist;
    expect(label).to.be.exist;
  });
  it('update text attribute', async () => {
    let text = 'my todo 1';
    const el = await fixture(html`
      <todo-item text=${text}></todo-item>
    `);
    let shadowHTML = el.shadowRoot.innerHTML;
    let doc = parser.parseFromString(shadowHTML, 'text/html');
    let labelText = doc.querySelector('label').innerText;
    expect(labelText).to.be.equal(text);

    text = 'my todo 2';
    el.setAttribute('text', text);
    await elementUpdated(el);
    shadowHTML = el.shadowRoot.innerHTML;
    doc = parser.parseFromString(shadowHTML, 'text/html');
    labelText = doc.querySelector('label').innerText;
    expect(labelText).to.be.equal(text);
  });
  it('update checked attribute', async () => {
    const el = await fixture(html`
        <todo-item text="my todo 1"></todo-item>
    `);
    el.checked = true;
    await elementUpdated(el);
    const shadowHTML = el.shadowRoot.innerHTML;
    const doc = parser.parseFromString(shadowHTML, 'text/html');
    const liClass = doc.querySelector('li').getAttribute('class');
    expect(liClass).to.be.contain('completed');
  });
  it('dispatch click event for remove button', async () => {
    const el = await fixture(html`
      <todo-item text="my todo 1"></todo-item>
    `);
    const index = 1;
    el.index = index;
    await elementUpdated(el);
    const button = el.shadowRoot.querySelector('button');
    setTimeout(() => button.dispatchEvent(new Event('click')));
    const {detail} = await oneEvent(el, 'onRemove');
    expect(detail).to.be.equal(index);
  });
  it('dispatch click event for check input', async () => {
    const el = await fixture(html`
      <todo-item text="my todo 1"></todo-item>
    `);
    const index = 1;
    el.index = index;
    await elementUpdated(el);
    const input = el.shadowRoot.querySelector('input');
    setTimeout(() => input.dispatchEvent(new Event('click')));
    const {detail} = await oneEvent(el, 'onToggle');
    expect(detail).to.be.equal(index);
  })
});
