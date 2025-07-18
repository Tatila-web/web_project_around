export class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
    this._items = [];
  }

  setItems(items) {
    this._items = items;
  }

  clear() {
    this._container.innerHTML = "";
  }

  renderItems() {
    this.clear();
    this._items.forEach((item) => this._renderer(item));
  }

  addItem(element) {
    this._container.append(element);
  }
}
