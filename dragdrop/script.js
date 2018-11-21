class Div {
    constructor(height, width, parent) {
      this.inner = [];//new Array();
      this.parent = parent;
      this.height = height;
      this.width = width;
    }
}
var dragged = new Div(100,100,null);

/*model = new Div(600,400,null);
  model.inner[0] = new Div(400,400,model);
    model.inner[0].inner[0] = new Div(150,100,model.inner[0]);
      model.inner[0].inner[0].inner[0] = new Div(50,50,model.inner[0].inner[0]);
    model.inner[0].inner[1] = new Div(100,150,model.inner[0]);
model.inner[1] = new Div(200,200,model);
*/
model = new Div(800,600,null);
  model.inner[0] = new Div(800,600,model);


  function draw() {
    var code = "";
    var id = "model";
    /*if(typeof model.inner == 'undefined'){return ""; }*/

    /*
    for(var i = 0;  i < model.inner.length ; i++){
        code+='<div id="'+id+'_'+i+'" ondrop="drop(event)" ondragover="allowDrop(event)" ondragleave="leave(event)"' +
            ' style="border: 2px solid black; width: '+model.inner[i].width+'px; height: '+model.inner[i].height+'px;">\n';
        code+=getInnercode(model.inner[i] , 1 , id+'_'+i );
        code+='</div>\n';
    }*/
    code = getInnercode(model,0,"model");
    var elem = document.getElementById("model");
    elem.innerHTML =  code;
    console.log(code);
  }

  function getInnercode(div, depth, id){
  /*  if(typeof div.inner == 'undefined' || div.inner.length == 0){
      return "";
    }
    else{*/
      var code = "";
      for(var i = 0; i < div.inner.length ; i++){

        for(var j=0;j<depth;j++){
          code+="\t";
        }
        code+='<div id="'+id+'_'+i+'" ondrop="drop(event)" ondragover="allowDrop(event)" ondragleave="leave(event)"' +
            ' style="border: 2px solid black; '+
            ' width: '+div.inner[i].width+'px; height: '+div.inner[i].height+'px;">\n';

            code+=getInnercode(div.inner[i],depth+1,id+'_'+i);

        for(var j=0;j<depth;j++){
          code+="\t";
        }
        code+='</div>\n';
      }
      return code;
    //}
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
/*
      ev.target.addEventListener('mousedown', function() { this.parentNode.setAttribute("ondragover", "leave(event)"); });
      ev.target.addEventListener('mouseup', function() { this.parentNode.setAttribute("ondragover", "allowDrop()"); });
*/

      var rect = ev.target.getBoundingClientRect();
      var condition = (ev.clientY - rect.top)/(rect.bottom - rect.top);
      if(condition<0.2){ //top of div drop
        ev.target.style.backgroundImage = "linear-gradient(black, white)";
      }else if(condition<0.8){ //middle of div drop

        ev.target.style.backgroundImage = "radial-gradient(black, white)";
      }else{
        ev.target.style.backgroundImage = "linear-gradient(white, black)";
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
            console.log("cond1")
          }else if(condition<0.8){ //middle of div drop
            if(typeof div.inner == 'undefined'){
              div.inner[0] = new Div(dragged.height, dragged.width, div);
              console.console.log("conde");
            }else {
              div.inner[div.inner.length] = new Div(dragged.height, dragged.width, div);
              console.log("second and next");
            }

          }else if(condition <= 1){ //dla zwykłego else cond = infinity dla rodzica i rysuje
            div.parent.inner.splice(index+1,0,new Div(dragged.height, dragged.width, div.parent));
          }
            draw();
        }
