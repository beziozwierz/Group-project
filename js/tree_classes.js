class Div {
  constructor(type, width, height, parent) {
    this.inner = [];
    this.type = type;
    this.parent = parent;
    this.height = height;
    this.width = width;
    this.float = null;
  }
}

var global_name = "HTML";

var dragged = new Div(global_name, '100','50px',null);
var pathToEdited = null;

model = new Div('root', 0,0,null);
model.inner[0] = new Div('MainModel', '100','100%',model);

 //Zmienne przechowujące obecny punkt odniesienia do rysowania
var viewpoint_root = model;
var viewpoint_name = "model";
var zoomed = false;
