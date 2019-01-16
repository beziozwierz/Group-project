function translateName(id){
  var path = id.substring(6).split('_').map(Number);
  return path;
}

function drag(ev, type) {
  ev.dataTransfer.setData("text", ev.target.id);
  global_name = type;
  global_type = "HTML";
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

function allowDrop(ev) {
    if(ev.target.className === "model-element-title")
        return;
    ev.preventDefault();

        //highlighting
        var rect = ev.target.getBoundingClientRect();
        var condition = (ev.clientY - rect.top) / (rect.bottom - rect.top);
        if(condition<0.2){ //over top of div
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
        }else{  //over bottom of the div
          $( ev.target ).css({
            'borderBottom': "20px double green",
            'borderTop': "1px solid black",
            'backgroundImage': ""
          });
        }
  }

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
    if(ev.target.className === "model-element-title")
        return;
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
        if (div.type !== "MainModel") {
            if (condition < 0.2) { //top of div drop
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
            } else {
                div.parent.inner.splice(index + 1, 0, new Div(global_name, 80 / div.parent.inner.length, dragged.height, div.parent));
                div.parent.height = 'DEFAULT';
                for (var i = 0; i < div.parent.inner.length; i++) {
                    div.parent.inner[i].width = 90;
                }
            }
        }
        else {
            div.inner[div.inner.length] = new Div(global_name, 80 / (div.inner.length + 1), dragged.height, div);
            div.height = 'DEFAULT';
            for (var i = 0; i < div.inner.length; i++) {
                div.inner[i].width = 90;
            }
        }
    }
    else if(global_type === "CSS"){
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