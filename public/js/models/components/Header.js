(function () {
  class Header extends Component {
    constructor (options) {
      super(options);
      this.el = document.createElement('h1');
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
  window.Header = Header;
} ());
