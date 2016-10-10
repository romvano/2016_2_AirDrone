(function () {
  class Component {
    constructor (options) {
      this.text = options.text;
      this.attrs = options.attrs || [];
    }
    
    setAttrs (attrs) {
      Object.keys(attrs).forEach(name => {
        this.el.setAttribute(name, attrs[name]);
      });
    }

    render () {
      this.el.innerHTML = this.text;
      this.setAttrs(this.attrs);
      return this.el;
    }

    toString () {
      return this.el.outerHTML;
    }
  }

  //export
  window.Component = Component;
} ());
