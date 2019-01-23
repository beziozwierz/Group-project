/***
Funkcje przycisków w panelach divów w modelu
***/

/***
??Otwiera edycję styli danego diva??
***/
function editStyle(event,element){

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
  code += '<h1>Zmień tekst:</h1>'
  code += '<input type="text" name="content" value="';
  code += div.text;
  code += '"><br/><br/>';
  code += '<div id="edit-text-btn" onclick="saveText()">SAVE</div>';

  var editor = document.getElementById("edit-text-container");
  editor.style.display = 'block';
  editor.innerHTML = code;
}
function saveText(div){
  text = document.getElementsByName("content")[0].value;
  currently_edited.text = text;
  close_me('edit-text-container');
  console.log(text);
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
