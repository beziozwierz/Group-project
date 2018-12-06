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

function draw() {
  var code = getInnercode(model,0,"model");
  var elem = document.getElementById("model");
  elem.innerHTML =  code;
}
function getDivCode(div,depth,id){
  var code="";
  for(var j=0;j<depth;j++){ code+="\t"; }
  var code = '<div id="'+id+'_'+i+'"'+
    ' ondrop="drop(event)" ondragover="allowDrop(event)" ondragleave="leave(event)" onclick="editStyle(this)"' +
    ' style="border: 2px solid black; box-sizing: border-box; cursor: pointer;'+
    ' width: ' + div.width+'px;'+
    ' height: ' + div.height+'px;">"';
    code+=getInnercode(div,depth+1,id);
    code+="</div>\n";
}
function createDiv(){
  var w = document.getElementById("drag_width").value;
  var h = document.getElementById("drag_height").value;
  //var id = document.getElementById("drag_id").value;
  dragged = new Div(h,w,null);

  document.getElementById("drag").style.width = w+"px";
  document.getElementById("drag").style.height = h+"px";

  //TODO: walidacja danych
}
function getInnercode(div, depth, id){
  var code = "";

  var clear = false;
  for(var i = 0; i < div.inner.length ; i++){
    for(var j=0;j<depth;j++){ code+="\t"; }
    code += '<div id="'+id+'_'+i+'"'+
      ' ondrop="drop(event)" ondragover="allowDrop(event)" ondragleave="leave(event)" onclick="editStyle(this)"' +
      ' style="border: 2px solid black; box-sizing: border-box; cursor: pointer;'+
      ' width: ' + div.inner[i].width+'px;'+
      ' height: ' + div.inner[i].height+'px;';
    if( div.inner[i].float != null){
      clear = true;
      code += ' float: ' + div.inner[i].float +'">\n';
    }else{
      if(clear == true){
        code += 'clear: both; ">';
        clear = false;
      }else{
        code += '">';
      }
    }
    code+=getInnercode(div.inner[i],depth+1,id+'_'+i);

    for(var j=0;j<depth;j++){ code+="\t"; }
    code+='</div>\n';
  }
  return code;
}

function translateName(id){
  var path = id.substring(6).split('_').map(Number);
  return path;
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}
function allowDrop(ev) {
  ev.preventDefault();
  /* highlight */
  var rect = ev.target.getBoundingClientRect();
  var condition = (ev.clientY - rect.top)/(rect.bottom - rect.top);
  if(condition<0.2){ //over top of div
    ev.target.style.borderTop = "20px double green";
    ev.target.style.borderBottom = "1px solid black";
    ev.target.style.backgroundImage = "";
    //ev.target.style.backgroundImage = "linear-gradient(black, white)";
  }else if(condition<0.8){ //over middle of div
    ev.target.style.borderTop = "1px solid black";
    ev.target.style.borderBottom = "1px solid black";
    ev.target.style.backgroundImage = "radial-gradient(green, lightgrey, lightgrey)";
  }else{ //over bottom of div
    ev.target.style.borderTop = "1px solid black";
    ev.target.style.borderBottom = "20px double green";
    ev.target.style.backgroundImage = "";
    //ev.target.style.backgroundImage = "linear-gradient(white, black)";
  }
}
function leave(event) { //reset div style (no highlight)
  event.target.style.backgroundImage = "";
  event.target.style.border = "1px solid black";
}

function drop(ev) {
  ev.preventDefault();

  var div = model;
  var index;
  var path = translateName(ev.target.id);
  for(var i = 0 ; i < path.length ; i++){
    div = div.inner[path[i]];
    index = path[i];
  }
  // found div in our model and know it position in parent (index)

  var rect = ev.target.getBoundingClientRect();
  var condition = (ev.clientY - rect.top)/(rect.bottom - rect.top); //position relative to parent

  if(condition<0.2){ //top of div drop
    div.parent.inner.splice(index,0,new Div(dragged.height, dragged.width, div.parent));
  }else if(condition<0.8){ //middle of div drop
    div.inner[div.inner.length] = new Div(dragged.height, dragged.width, div);
  }else if(condition <= 1){ // <=1 (not else) important to not trigger parent (cond = inf for parent)
    div.parent.inner.splice(index+1,0,new Div(dragged.height, dragged.width, div.parent));
  }
  draw();
}

function editStyle(element){  //TODO: parent is affected when clicked on nested div

  var div = model;
  var path = translateName(element.id);
  for(var i = 0 ; i < path.length ; i++){
    div = div.inner[path[i]];
  }

  pathToEdited = path;

  code = '<b>Edytor styli</b>' +
    '<br/>' +
    'Width: <br/>' +
    '<input type="text" id="editW" value="' + div.width + '"/> <br/>' +
    'Height: <br/>' +
    '<input type="text" id="editH" value="' + div.height + '"/> <br/>' +
    'Float: <br/>' +
    '<input type="text" id="editFloat" value="' + div.float + '"/> <br/>' +
    '<button onclick="saveChanges()"> Save </button>';

  elem = document.getElementById("styler");
  elem.innerHTML = code;
}
function saveChanges(){
  var w = document.getElementById("editW").value;
  var h = document.getElementById("editH").value;
  var f = document.getElementById("editFloat").value;

  var div = model;
  for(var i = 0 ; i < pathToEdited.length ; i++){
    div = div.inner[pathToEdited[i]];
  }
  div.width = w;
  div.height = h;
  div.float = f;

  draw();
  //TODO: walidacja danych
}
