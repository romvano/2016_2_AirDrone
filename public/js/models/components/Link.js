(function () {
  const Component = window.Component;

  class Link extends Component {
    constructor(options) {
      super(options);
      this.el = document.createElement('a');
    }

    setAttrs(attrs) {
      super.setAttrs(attrs);
    }

    toString() {
      return super.toString();
    }

    render() {
      return super.render();
    }
  }

  // export
  window.Link = Link;
}());
