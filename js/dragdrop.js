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
function dragHtmlElement(ev, type) {
  ev.dataTransfer.setData("text", ev.target.id);
  global_name = type;
  global_type = "HTML";
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
  }else{ //Nad elementem znajduje się element HTML

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
      $( ev.target ).css({
        'borderTop': "1px solid black",
        'borderBottom': "1px solid black",
        'backgroundImage': "radial-gradient(green, #f8a683, #f8a683)"
      });
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
  var index;
  var path = translateName(ev.target.id);
  for (var i = 0; i < path.length; i++) {
    div = div.inner[path[i]];
    index = path[i];
  }
    // found div in our model and know it position in parent (index)

  var rect = ev.target.getBoundingClientRect();
  var condition = (ev.clientY - rect.top) / (rect.bottom - rect.top); //position relative to parent

  if(global_type === "HTML") {
//    if (div.type !== "MainModel") {
      if (condition < 0.2 && ev.target.id !== viewpoint_name) { //top of div drop
        div.parent.inner.splice(index, 0, new Div(global_name, 80 / (div.parent.inner.length + 1), dragged.height, div.parent));
        div.parent.height = 'DEFAULT';
        for (var i = 0; i < div.parent.inner.length; i++) {
          div.parent.inner[i].width = 90;
        }
      } else if (condition < 0.8) { //middle of div drop
          div.inner[div.inner.length] = new Div(global_name, 80 / (div.inner.length + 1), dragged.height, div);
          div.height = 'DEFAULT';
          for (var i = 0; i < div.inner.length; i++) {
            div.inner[i].width = 90;
          }
      } else if(ev.target.id !== viewpoint_name){
          div.parent.inner.splice(index + 1, 0, new Div(global_name, 80 / div.parent.inner.length, dragged.height, div.parent));
          div.parent.height = 'DEFAULT';
          for (var i = 0; i < div.parent.inner.length; i++) {
            div.parent.inner[i].width = 90;
          }
      }
    } else if(global_type === "CSS"){
        var new_css = new CSS();
        new_css.set_name(document.getElementById("edit-element-name-container").value);
        var tmp = document.getElementsByClassName("edit-element-css");
        var tmp2 = document.getElementsByClassName("edit-element-input");
        for (var i = 0; i < tmp.length; i++){
            new_css.add(tmp[i].innerText + tmp2[i].value + ";");
        }
        div.parent.inner[0].addCSS(new_css, "id");
    }
  draw();
}


function drag2(ev) {
    ev.dataTransfer.setData("text", ev.target.innerText);
    global_type = "CSS";
}

function allowDrop2(ev){
    ev.preventDefault();
    $(ev.target).css({
        'outline': "solid 2px #0000ff"
    });
}
