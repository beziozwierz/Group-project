class Div {
  constructor(height, width, parent) {
    this.inner = [];
    this.parent = parent;
    this.height = height;
    this.width = width;
    this.float = null;
  }
}

var dragged = new Div(100,100,null);
var pathToEdited = null;
model = new Div(800,600,null);
model.inner[0] = new Div(600,400,model);
