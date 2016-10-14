(function () {
  class Component {
    constructor(options) {
      this.text = options.text;
      this.attrs = options.attrs || [];
      this.eventListeners = options.eventListeners || [];
    }

    setAttrs(attrs) {
      Object.keys(attrs).forEach((name) => {
        this.el.setAttribute(name, attrs[name]);
      });
    }

    setEventListeners(eventListeners) {
      Object.keys(eventListeners).forEach((event) => {
        this.el.addEventListener(event, eventListeners[event]);
      });
    }

    render() {
      this.el.innerHTML = this.text;
      this.setAttrs(this.attrs);
      this.setEventListeners(this.eventListeners);
      return this.el;
    }

    toString() {
      return this.el.outerHTML;
    }
  }

  // export
  window.Component = Component;
}());
