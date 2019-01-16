class CSS{
    constructor(){
        this.name = "Temp CSS";
        this.elements = [];
    }
    set_name(name){
        this.name = name;
    }
    get_name(){
        return this.name;
    }
    add(element){
        this.elements.push(element);
    }
    get(){
        alert(this.elements[1]);
    }
}

class Div {
  constructor(name, width, height, parent) {
    this.inner = [];
    this.id = [];
    this.class = [];
    this.style = [];
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
  addCSS(object, type){
      alert("Wchodze");
      if(type === "id"){
          this.id.push(object);
      }
      else if(type === "class"){
          this.class.push(object);
      }
      else{
          this.style.push(object);
      }
      alert("Wychodze");
  }

  toJSON() {
        return parseDiv(this);
    }
}

function parseDiv (Div) {
	var inner = [];
	var parent = [];
	
	if (Div.inner.length > 0) {
		for(var i = 0; i < Div.inner.length ; i++){
			inner[i] = parseDiv(Div.inner[i])
		}
	}

	return {
        inner: inner,
		type: Div.type,
		parent: [],
		height: Div.height,	
		width: Div.width,
		float: Div.float,
    }
}

function restoreDiv (json) {
	var div = new Div(json.type, json.width, json.height, json.parent);
	
	if (json.inner.length > 0) {
		for(var i = 0; i < json.inner.length ; i++){
			div.inner[i] = restoreDiv(json.inner[i])
		}	
	}
	
	return div;
}

function fn_save_html() {
	var html = JSON.stringify(model);
	$.ajax({
		url: "save_html.php",
		method : "post",
		data: { html : html },
		success: function(result){
			console.log('ok');
	  	}
	});
}



function fn_load_html() {
	$.ajax({
		url: "load_html.php",
		method : "get",
		success: function(result) {
			html = JSON.parse(result);
			console.log(JSON.parse(html));	
			
			model = restoreDiv(JSON.parse(html));
			console.log(model);
			viewpoint_name = "model";
			viewpoint_root = model;
			zoomed = false;
			draw();
	  	}
	});
}



var global_name = "HTML";
var global_type = "HTML";

var dragged = new Div(global_name, '100','50px',null);
var pathToEdited = null;

model = new Div('root', 0,0,null);
model.inner[0] = new Div('MainModel', '100','100%',model);

 //Zmienne przechowujące obecny punkt odniesienia do rysowania
var viewpoint_root = model;
var viewpoint_name = "model";
var zoomed = false;
