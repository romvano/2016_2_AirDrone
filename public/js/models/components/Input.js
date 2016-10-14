(function () {
  class Input extends Component {
    constructor(options) {
      super(options);
      this.el = document.createElement('input');
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
  window.Input = Input;
}());
