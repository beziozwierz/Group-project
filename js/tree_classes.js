class Div {
  constructor(name, width, height, parent) {
    this.inner = [];
    this.name = name;
    this.parent = parent;
    this.height = height;
    this.width = width;
    this.float = null;
    if(name==='H1' || name==='H2' || name==='H3' || name==='TEXT' || name==='LABEL'){
      this.type = 'text';
      this.text = "";
    }else{
      this.type = 'container';
    }
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
