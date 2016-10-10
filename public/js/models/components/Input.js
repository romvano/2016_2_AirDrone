(function () {
  class Input extends Component {
    constructor (options) {
      super(options);
      this.el = document.createElement('input');
    }
    
    setAttrs (attrs) {
      super.setAttrs(attrs);
    }

    render () {
      return super.render();
    }

    toString () {
      return super.toString();
    }
  }

  //export
  window.Input = Input;
} ());
