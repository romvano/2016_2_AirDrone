(function () {
  const Component = window.Component;

  class Header extends Component {
    constructor(options) {
      super(options);
      this.el = document.createElement('h1');
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
  window.Header = Header;
}());
