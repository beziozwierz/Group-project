/***
Funkcje przycisków w panelach divów w modelu
***/

/***
??Otwiera edycję styli danego diva??
***/

  function editStyle(event,caller_div){
    var div = model;
    path = translateName(caller_div.id);
    for(var i = 0 ; i < path.length; i++){
      div = div.inner[path[i]];
      index = path[i];
    }
    deleteStylesDiv = div;
    code = '<div class="edit-element-close" ';
    code += 'onclick="close_me('+"'edit-styles-window')"+'">×</div>';
    if (typeof div.id !== 'undefined' && div.id.length > 0){
      for (var k = 0; k < div.id.length; k++) {
        xx = div.id[k].get_name();
        code+='<div class="rm-style" '+
        'onclick="delete_id_from_div('+"'"+xx+"'"+'); this.style.display='+"'none';"+'">'+xx+'</div>';
      }
    }
    if (typeof div.class !== 'undefined' && div.class.length > 0){
      for (var k = 0; k < div.class.length; k++) {
        xx = div.class[k].get_name();
        code+='<div class="rm-style" '+
        'onclick="delete_class_from_div('+"'"+xx+"'"+'); this.style.display='+"'none';"+'">'+xx+'</div>';
      }
    }
    console.log(code);
    w = document.getElementById("edit-styles-window");
    w.innerHTML = code;
    w.style.display = "block";
    /*
    if (typeof div.inner[i].class !== 'undefined' && div.inner[i].class.length > 0){

    }
    code += </div>';
    getElementById("edit-styles-window").style.display = "block";*/
}
function delete_id_from_div(name){
  for (var k = 0; k < deleteStylesDiv.id.length; k++) {
      if(deleteStylesDiv.id[k].get_name() === name){
        deleteStylesDiv.id.splice(k, 1);
        break;
      }
  }
  draw();
}
function delete_class_from_div(name){
  for (var k = 0; k < deleteStylesDiv.class.length; k++) {
      if(deleteStylesDiv.class[k].get_name() === name){
        deleteStylesDiv.class.splice(k, 1);
        break;
      }
  }
  draw();
}
/***
Usuwa dany div z modelu i z drzewa
TODO: (może) przenosi do kosza?
***/
function removeFromTree(event,id){
  event.stopPropagation();

  var div = model;
  var index;
  var path = translateName(id);
  var div2 = div;
  for(var i = 0 ; i < path.length ; i++){
    div2 = div;
    div = div.inner[path[i]];
    index = path[i];
  }
  div2.inner.splice(index,1);
  draw();
}

/***
Ustawia zmienne globalną viewpoint_root i viewpoint_name
na wartości odpowiadające div'owi na którym funkcja
została wywołana.
Metoda draw() rozpocznie od teraz rysowanie modelu
od tego węzła.
***/
function zoom(event,caller_div){
  event.stopPropagation();

  var div = model;
  path = translateName(caller_div.id);
  for(var i = 0 ; i < path.length; i++){
    div = div.inner[path[i]];
    index = path[i];
  }
  viewpoint_root = div;
  viewpoint_name = caller_div.id;
  zoomed = true;
  //odśwież
  draw();
}

/***
Ustawia węzeł od którego metoda draw()
rozpoczyna rysowanie z powrotem na
pierwszy węzeł w drzewie.
***/
function unzoom(){
  viewpoint_name = "model_0";
  viewpoint_root = model.inner[0];
  zoomed = false;
  draw();
}


var currently_edited = null; //temporarly added
function editText(event,id){
  event.stopPropagation();

  var div = model;
  var index;
  var path = translateName(id);
  for(var i = 0 ; i < path.length ; i++){
    div = div.inner[path[i]];
    index = path[i];
  }
  currently_edited = div;

  code = '<div class="edit-element-close" ';
  code += 'onclick="close_me('+"'edit-text-container')"+'">×</div>';
  code += '<h4 style="text-align: center; margin-top: 0px; margin-bottom: 0px;">Change text:</h1>'
  code += '<textarea id= "edit-text-input">';
  code += div.text;
  code+='</textarea>'
  code += '<div id="edit-text-btn" onclick="saveText()">SAVE CHANGES</div>';
/*
  code = '<div class="edit-element-close" ';
  code += 'onclick="close_me('+"'edit-text-container')"+'">×</div>';
  code += '<h4 style="text-align: center;">Zmień tekst:</h1>'
  code += '<input id= "edit-text-input" type="text" name="content" value="';
  code += div.text;
  code += '"><br/><br/>';
  code += '<div id="edit-text-btn" onclick="saveText()">SAVE</div>';*/

  var editor = document.getElementById("edit-text-container");
  editor.style.display = 'block';
  editor.innerHTML = code;
}
function saveText(div){
  //text = document.getElementsByName("content")[0].value;
  text = document.getElementById("edit-text-input").value;
  currently_edited.text = text;
  close_me('edit-text-container');
  //console.log(text);
}

/***
Dodaje kliknięte poddrzewo do templatek
***/
function create_template(event,id){
  event.stopPropagation();

  var div = model;
  var path = translateName(id);

  for(var i = 0 ; i < path.length ; i++){
    div = div.inner[path[i]];
  }
  copy = JSON.parse(JSON.stringify(div));
  //modal, podanie id
  var txt;
  var name = prompt("Podaj nazwę templatki:", "");
  if (name == null || name == "" || templates[name]!=null) {
    window.alert("Błąd, podaj inna nazwe");
  } else {
   templates[name] = copy;
   var v = document.getElementById("custom-templates-container");
   v.innerHTML+= '<div id="'+name+'" class="toolbar-content-element" draggable="true" ondragstart="dragTemplate(event)">'+name+'</div>';
  }

}
//if(=== 'img')
function open_get_src_window(){
  code = '<div class="edit-element-close" ';
  code += 'onclick="close_me('+"'get-source-window')"+'">×</div>';
  code += '<h4 style="text-align: center; margin-top: 0px; margin-bottom: 0px;">Enter the path to the file:</h1>'
  code += '<textarea id= "get-source-input">';
  code+='</textarea>'
  code += '<div id="get-source-btn" onclick="saveSrc()">SAVE</div>';

  w = document.getElementById("get-source-window");
  w.innerHTML = code;
  w.style.display = "block";
}
function saveSrc(){
  srcDiv.src=document.getElementById("get-source-input").value;
  close_me("get-source-window");
}
