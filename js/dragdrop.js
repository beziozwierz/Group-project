function translateName(id){
  var path = id.substring(6).split('_').map(Number);
  return path;
}

function drag(ev, type) {
  ev.dataTransfer.setData("text", ev.target.id);
  global_name = type;
}
function allowDrop(ev) {
  ev.preventDefault();

  //highlighting
  var rect = ev.target.getBoundingClientRect();
  var condition = (ev.clientY - rect.top)/(rect.bottom - rect.top);
  if(condition<0.2){ //over top of div
    $( ev.target ).css({
      'borderTop': "20px double black",
      'borderBottom': "1px solid black",
      'backgroundImage': ""
    });
  }else if(condition<0.8){ //over middle of div
    $( ev.target ).css({
      'borderTop': "1px solid black",
      'borderBottom': "1px solid black",
      'backgroundImage': "radial-gradient(black, lightgrey, lightgrey)"
    });
  }else{  //over bottom of the div
    $( ev.target ).css({
      'borderBottom': "20px double black",
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

function drop(ev) {
  ev.preventDefault();
  ev.stopPropagation();

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
    div.parent.inner.splice(index,0,new Div(global_name, dragged.height, dragged.width, div.parent));
  }else if(condition<0.8){ //middle of div drop
    div.inner[div.inner.length] = new Div(global_name, dragged.height, dragged.width, div);
  }else {
    div.parent.inner.splice(index+1,0,new Div(global_name, dragged.height, dragged.width, div.parent));
  }
  draw();
}
