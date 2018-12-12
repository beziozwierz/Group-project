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
  //TODO: klasami/jquery
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
  //TODO: klasami
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
