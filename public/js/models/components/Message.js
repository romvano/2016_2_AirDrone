(function () {
  const Component = window.Component;

  class Message extends Component {
    constructor(options) {
      super(options);
      this.el = document.createElement('span');
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
  window.Message = Message;
}());
