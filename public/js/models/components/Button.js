(function () {
  class Button extends Component {
    constructor (options) {
      super(options);
      this.el = document.createElement('button');
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
  window.Button = Button;
} ());
