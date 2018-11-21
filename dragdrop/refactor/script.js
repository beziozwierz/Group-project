class Div {
    constructor(height, width, parent) {
      this.inner = new Array();
      this.parent = parent;
      this.height = height;
      this.width = width;
      this.rows = null;
    }
}
var dragged = new Div(100,100,null);
model = new Div(600,400,null);
model.inner[0] = new Div(200,100,model);
model.inner[1] = new Div(150,150,model);



  function draw() {
    var code = "";
    var id = "model";
    if(typeof model.inner == 'undefined'){return ""; }

    for(var i = 0;  i < model.inner.length ; i++){
        code+='<div id="'+id+'_'+i+'" ondrop="drop(event)" ondragover="allowDrop(event)" ondragleave="leave(event)"' +
            ' style="border: 2px solid black; width: '+model.inner[i].width+'px; height: '+model.inner[i].height+'px;">\n';
        code+=getInnercode(model.inner[i] , 1 , id+'_'+i );
        code+='</div>\n';
    }
    var elem = document.getElementById("model");
    elem.innerHTML =  code;
    console.log(code);
  }

  function getInnercode(div, depth, id){
    if(typeof div.inner == 'undefined' || div.inner.length == 0){
      return "";
    }
    else{
      var code = "";
      for(var i = 0; i < div.inner.length ; i++){

        for(var j=0;j<depth;j++){
          code+="\t";
        }
        code+='<div id="'+id+'_'+i+'" ondrop="drop(event)" ondragover="allowDrop(event)" ondragleave="leave(event)"' +
            ' style="border: 2px solid black; '+
            ' width: '+div.inner[i].width+'px; height: '+div.inner[i].height+'px;">\n';


        if(typeof div.inner[i].inner !== 'undefined'){
          for(var i = 0 ; i < div.inner.length ; i++){
            code+=getInnercode(div.inner[i],depth+1,id+'_'+i);
          }
        }

        for(var j=0;j<depth;j++){
          code+="\t";
        }
        code+='</div>\n';
      }
      return code;
    }
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


      <!-- highlight -->
      ev.currentTarget.addEventListener('mousedown', function() { this.parentNode.setAttribute("ondragover", "leave(event)"); });
      ev.currentTarget.addEventListener('mouseup', function() { this.parentNode.setAttribute("ondragover", "allowDrop()"); });


      var rect = ev.target.getBoundingClientRect();
      var condition = (ev.clientY - rect.top)/(rect.bottom - rect.top);
      if(condition<0.2){ //top of div drop
        ev.currentTarget.style.backgroundImage = "linear-gradient(black, white)";
      }else if(condition<0.8){ //middle of div drop

        ev.currentTarget.style.backgroundImage = "linear-gradient(white, black, white)";
      }else{
        ev.currentTarget.style.backgroundImage = "linear-gradient(white, black)";
      }

    }
  function leave(event) {
    event.target.style.backgroundImage = "";
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
          console.log("condition: "+condition);

          if(condition<0.2){ //top of div drop
            div.parent.inner.splice(index,0,new Div(dragged.height, dragged.width, div.parent));
          }else if(condition<0.8){ //middle of div drop
            if(typeof div.inner == 'undefined'){
              div.inner[0] = new Div(dragged.height, dragged.width, div);
            }else {
              div.inner[div.inner.length] = new Div(dragged.height, dragged.width, div);
              console.log("second and next");
            }

          }else{
            div.parent.inner.splice(index+1,0,new Div(dragged.height, dragged.width, div.parent));
          }
            draw();
        }
