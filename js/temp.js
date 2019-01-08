function editStyle(event,element){  //TODO: parent is affected when clicked on nested div
  event.stopPropagation();
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

function createDiv(){
  var w = document.getElementById("drag_width").value;
  var h = document.getElementById("drag_height").value;
  //var id = document.getElementById("drag_id").value;
  dragged = new Div('Name', h,w,null);

  document.getElementById("drag").style.width = w;
  document.getElementById("drag").style.height = h;

  //TODO: walidacja danych
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


function createDiv(){
  var w = document.getElementById("drag_width").value;
  var h = document.getElementById("drag_height").value;
  var id = document.getElementById("drag_id").value;
  dragged = new Div(h,w,null);
  dragged.id = id;
  document.getElementById("drag").style.width = w+"px";
  document.getElementById("drag").style.height = h+"px";


  //TODO: walidacja danych
}

function removeFromTree(event,id){
  event.stopPropagation();

  var div = model;
  var index;
  var path = translateName(id);
  for(var i = 0 ; i < path.length ; i++){
    div = div.inner[path[i]];
    index = path[i];
  }
  div.parent.inner.splice(index,1);
  draw();
}



function getPageCode(){
  code = getInnerPageCode(model,0);
  //console.log(code);
  return code;
}
function getInnerPageCode(div, depth){
  var code = "";
  for(var i = 0; i < div.inner.length ; i++){
    for(var j=0;j<depth;j++){ code+="\t"; }


    code += '<'+div.inner[i].type;
    if(div.inner[i].id == null){
      code+='>\n';
    }else{
      code+=' id="' + div.inner[i].id +'">\n';
    }
    code+=getInnerPageCode(div.inner[i],depth+1);

    for(var j=0;j<depth;j++){ code+="\t"; }
    code+='</'+div.inner[i].type+'>\n';
  }
  return code;
}
