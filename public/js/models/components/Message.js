(function () {
  class Message extends Component {
    constructor (options) {
      super(options);
      this.el = document.createElement('span');
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
  window.Message = Message;
} ());
