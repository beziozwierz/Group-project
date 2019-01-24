/***
Zamienia id elemntu wyświetlanego w modelu na tablicę,
która zawiera ścieżkę do tego elementu w drzewie

Przykład:
ID: model_0_2_0
Zwrócona tablica: [0,2,0]
Ścieżka w drzewie:
root.inner[0]->inner[1]->inner[0],
gdzie inner to tablica elementów wewnętrznych danego div'a
***/
function translateName(id){
  var path = id.substring(6).split('_').map(Number);
  return path;
}


/***
Zdarzenie "drag" dla elementów html w
pasku narzędzi:
Zapamiętujemy nazwę chwyconego elementu
***/
function dragHtmlElement(ev){//}, type) {
  var name = nameToTag(ev.target.innerText);
  //ev.dataTransfer.setData("text", ev.target.id);
  ev.dataTransfer.setData("text", name);
  global_name = name;
  global_type = "HTML";
  element_leaved();
}


/***
Funkcja aktywowana, gdy nad elementem znajduje się inny,
gotowy do upuszczenia.
Aktywowana dla elementów wyświetlanych w modelu.

Podświetla dla tych elementów część, gdzie znajdzie
się element po upuszczeniu (dla upuszczania nowych elementów HTML),
lub podświetla cały div (dla styli CSS)
***/
function allowDrop(ev) {
  if(ev.target.className !== "model-div"){
    console.log("NIE ODPALAĆ PODŚWIETLENIA");
    return;
  }
  ev.preventDefault();

  //Nad elementem znajduje się styl css
  if(global_type === "CSS"){
    //podświetla środek
    $( ev.target ).css({
      'borderTop': "1px solid black",
      'borderBottom': "1px solid black",
      'backgroundImage': "radial-gradient(green, #f8a683, #f8a683)"
    });
  }else{ //Nad elementem znajduje się element HTML lub TREE(template)

    //Znajduje względne położenie kursora w divie modelu
    var rect = ev.target.getBoundingClientRect();
    var condition = (ev.clientY - rect.top) / (rect.bottom - rect.top);

    //podświetlanie
    if(condition<0.2 && ev.target.id !== viewpoint_name){//over top of div, not 1st element in view
      $( ev.target ).css({
        'borderTop': "20px double green",
        'borderBottom': "1px solid black",
        'backgroundImage': ""
      });
    }else if(condition<0.8){ //over middle of div
      //Nie można upuszczać wewnątrz zwykłego tekstu
      var path = translateName(ev.target.id);
      var div = model;
      for (var i = 0; i < path.length; i++) {
        div = div.inner[path[i]];
      }
      if((div.name === 'text')||(div.name ==='img')){
          leave(ev);
      }else{
          $( ev.target ).css({
            'borderTop': "1px solid black",
            'borderBottom': "1px solid black",
            'backgroundImage': "radial-gradient(green, #f8a683, #f8a683)"
          });
      }
    }else if(ev.target.id !== viewpoint_name){  //over bottom of the div, not 1st element in view
      $( ev.target ).css({
        'borderBottom': "20px double green",
        'borderTop': "1px solid black",
        'backgroundImage': ""
      });
    }
  }
}
/***
Funkcja wywoływana po opuszczeniu diva z elementem
gotowym do upuszczenia.
Powoduje Przywrócenie domyślnego stylu (znika podświetlenie)
***/
function leave(event) { //reset div style (no highlight)
  $( event.target ).css({
    'border': "1px solid black",
    'backgroundImage': ""
  });
}

function leave2(event) { //reset div style (no highlight)
    $( event.target ).css({
        'outline': "none"
    });
}

function cssDrop(ev) {
    ev.preventDefault();
    var html = document.getElementById("edit-element-drop-container").innerHTML;
    document.getElementById("edit-element-drop-container").innerHTML = html + "<div class='edit-element-css'>" +  ev.dataTransfer.getData("text")
        + ": <input class='edit-element-input' type='text'></div>";
}


function drop(ev) {

  //Nie pozwala na upuszczanie w pasku narzędzi
  if(ev.target.className !== "model-div"){
    //console.log("NIE ODPALAĆ DROPA");
    return;
  }

  ev.preventDefault();
  ev.stopPropagation();

  var div = model;
  var parent;
  var index;
  var path = translateName(ev.target.id);
  for (var i = 0; i < path.length; i++) {
    parent = div;
    div = div.inner[path[i]];
    index = path[i];
  }
    // found div in our model and know it position in parent (index)

  var rect = ev.target.getBoundingClientRect();
  var condition = (ev.clientY - rect.top) / (rect.bottom - rect.top); //position relative to parent

  if(global_type === "HTML") {
//    if (div.type !== "MainModel") {
      if (condition < 0.2 && ev.target.id !== viewpoint_name) { //top of div drop
        parent.inner.splice(index, 0, new Div(global_name, 80 / (parent.inner.length + 1), dragged.height));//, div.parent));
        parent.height = 'DEFAULT';
        for (var i = 0; i < parent.inner.length; i++) {
          parent.inner[i].width = 90;
        }
      } else if (condition < 0.8) { //middle of div drop
          if((div.name === 'text')||(div.name === 'img')){
            return;
          }
          div.inner[div.inner.length] = new Div(global_name, 80 / (div.inner.length + 1), dragged.height);//, div);
          div.height = 'DEFAULT';
          for (var i = 0; i < div.inner.length; i++) {
            div.inner[i].width = 90;
          }
      } else if(ev.target.id !== viewpoint_name){
          parent.inner.splice(index + 1, 0, new Div(global_name, 80 / parent.inner.length, dragged.height));//, div.parent));
          parent.height = 'DEFAULT';
          for (var i = 0; i < parent.inner.length; i++) {
            parent.inner[i].width = 90;
          }
      }
      //TODO: popup src
    } else if(global_type === "CSS_ID") {
      for (var i = 0; i < global_CSS_id.length; i++) {
          if (global_CSS_id[i].get_name() === ev.dataTransfer.getData("text")) {
              div.id.push(global_CSS_id[i]);
              console.log(getCssCode());
              break;
          }
      }
  } else if(global_type === "CSS_Class") {
      for (var i = 0; i < global_CSS_class.length; i++) {
          if (global_CSS_class[i].get_name() === ev.dataTransfer.getData("text")) {
              div.id.push(global_CSS_class[i]);
              console.log(getCssCode());
              break;
          }
      }
  } else if(global_type === "TREE"){
        //tworzenie kopii poddrzewa (templatki)
        template_name = ev.dataTransfer.getData("text");
        copy = JSON.parse(JSON.stringify(templates[template_name]));

        if(copy === templates[template_name]){
          console.log("ERR1 (dragrop)");
        }
        if(copy.inner[0] === templates[template_name].inner[0]){
          console.log("SHALLOW NIE DEEP");
        }

        if (condition < 0.2 && ev.target.id !== viewpoint_name)
          parent.inner.splice(index, 0, copy);
        else if(condition < 0.8)
          div.inner[div.inner.length] = copy;
        else if(ev.target.id !== viewpoint_name)
          parent.inner.splice(index + 1, 0, copy);

        //!!! WIĘCEJ NIŻ 1 POZIOM
        /*for (var i = 0; i < div.inner.length; i++) {
          div.inner[i].width = 90;
        }*/
    }
     makeDocument();
  draw();
}
function dragTemplate(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
  global_type = "TREE";
}


function drag2(ev, type) {
    ev.dataTransfer.setData("text", ev.target.innerText);
    global_type = "CSS_" + type;
}

function allowDrop2(ev){
    ev.preventDefault();
    $(ev.target).css({
        'outline': "solid 2px #0000ff"
    });
}







function refreshCSS(type){
    var target;
    if(type === "ID"){
        target = document.getElementById("toolbar-CSS_CreatedIDs");
        target.innerHTML = "";
        for(var i = 0; i < global_CSS_id.length; i++){
            target.innerHTML += "<div class=\"toolbar-content-element\" onmouseover=\"css_saved_hover(this, 'ID')\" onmouseleave=\"element_leaved()\" draggable=\"true\" ondragstart=\"drag2(event, 'ID')\">\n" +
                "                        " + global_CSS_id[i].get_name() + "\n" +
                "                    </div>"
        }
    }
    else if(type === "Class"){
        target = document.getElementById("toolbar-CSS_CreatedClasses");
        target.innerHTML = "";
        for(var i = 0; i < global_CSS_class.length; i++){
            target.innerHTML += "<div class=\"toolbar-content-element\" onmouseover=\"css_saved_hover(this, 'Class')\" onmouseleave=\"element_leaved()\" draggable=\"true\" ondragstart=\"drag2(event, 'Class')\">\n" +
                "                        " + global_CSS_class[i].get_name() + "\n" +
                "                    </div>"
        }
    }
}



function modifyCSSObject(){
    var target;
    var descriptions = document.getElementsByClassName("model-inspector-css-drop-element-description");
    var inputs = document.getElementsByClassName("model-inspector-css-drop-element-edit");
    if(document.getElementById("model-inspector-css-title").value.length > 0) {
        switch (document.getElementById("model-inspector-css-type").innerText) {
            case "<Create ID>":
                global_CSS_id.push(new CSS());
                target = global_CSS_id.length - 1;
                global_CSS_id[target].set_name(document.getElementById("model-inspector-css-title").value);
                for (var i = 0; i < inputs.length; i++) {
                    global_CSS_id[target].add(descriptions[i].innerText + inputs[i].value + ";");
                }
                refreshCSS("ID");
                break;

            case "<Create Class>":
                global_CSS_class.push(new CSS());
                target = global_CSS_class.length - 1;
                global_CSS_class[target].set_name(document.getElementById("model-inspector-css-title").value);
                for (var i = 0; i < inputs.length; i++) {
                    global_CSS_class[target].add(descriptions[i].innerText + inputs[i].value + ";");
                }
                refreshCSS("Class");
                break;

            case "<Edit ID>":
                target = global_CSS_id.length - 1;
                for(var i = 0; i < global_CSS_id.length; i++) {
                    if (global_CSS_id[i].get_name() === document.getElementById("model-inspector-css-title").value) {
                        target = i;
                    }
                }
                global_CSS_id[target].clear();
                global_CSS_id[target].set_name(document.getElementById("model-inspector-css-title").value);
                for (var i = 0; i < inputs.length; i++) {
                    global_CSS_id[target].add(descriptions[i].innerText + inputs[i].value + ";");
                }
                refreshCSS("ID");
                break;

            case "<Edit Class>":
                target = global_CSS_class.length - 1;
                for(var i = 0; i < global_CSS_class.length; i++) {
                    if (global_CSS_class[i].get_name() === document.getElementById("model-inspector-css-title").value) {
                        target = i;
                    }
                }
                global_CSS_class[target].clear();
                global_CSS_class[target].set_name(document.getElementById("model-inspector-css-title").value);
                for (var i = 0; i < inputs.length; i++) {
                    global_CSS_class[target].add(descriptions[i].innerText + inputs[i].value + ";");
                }
                refreshCSS("Class");
                break;
        }
    }
    document.getElementById("model-inspector-css-type").innerText = "<Create ID>";
    document.getElementById("model-inspector-container").style.display = "none";
}
