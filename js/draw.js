function draw() {
  var code = "";
  if(zoomed){
    code = '<div id="return-to-model" onclick="unzoom()" >POWRÓT DO MODELU</div>';
  }
   code += getInnercode(viewpoint_root,0,viewpoint_name);
   var elem = document.getElementById("model");
   elem.innerHTML =  code;
   //console.log(code)
}


function zoom(event,caller_div){
  event.stopPropagation();
  //code = '<div id="return-to-model" onclick="draw()" >POWRÓT DO MODELU</div>';
  //console.log(parent_id);
  //znajdujemy caller div w drzewie
  var div = model;
  path = translateName(caller_div.id);
  for(var i = 0 ; i < path.length-1; i++){
    div = div.inner[path[i]];
    //index = path[i];
  }
  // found div in our model and know it position in parent (index)
  //code += getInnercode(div,0,caller_div.parentNode.id);
  viewpoint_root = div;
  viewpoint_name = caller_div.parentNode.id;
  zoomed = true;
  //var elem = document.getElementById("model");
  //elem.innerHTML =  code;
  draw();
}
function unzoom(){
  viewpoint_name = "model";
  viewpoint_root = model;
  zoomed = false;
  draw();
}

function getInnercode(div, depth, id){
   var code = "";

   var clear = false;
   for(var i = 0; i < div.inner.length ; i++){
       for(var j=0;j<depth;j++){ code+="\t"; }
       code +=
           '<div id="'+id+'_'+i+'"'+' class="model-div" '+
           'ondrop="drop(event)" '+
           'ondragover="allowDrop(event)" ' +
           'ondragleave="leave(event)" '+
           //' onclick="editStyle(event,this)"' +
           ' style="'+
           ' width: ' + div.inner[i].width+'%;';
       if(div.inner[i].height !== 'DEFAULT')
           code += ' height: ' + div.inner[i].height+';';
       if( div.inner[i].float != null){
         clear = true;
         code += ' float: ' + div.inner[i].float +'">\n';
       }else{
           if(clear === true){
             code += 'clear: both; ">';
             clear = false;
           }else{
             code += '">\n';
           }
       }
       code+=getEditionPanelCode(div.inner[i].type);
       code+=getInnercode(div.inner[i],depth+1,id+'_'+i);

       for(var j=0;j<depth;j++){ code+="\t"; }
       code+='</div>\n';
   }
       return code;
}

function getEditionPanelCode(type){
      code='<div class="model-options-bar">\n';

        code += '<div class="model-element-title">' + type + '</div>'
        if(type!=="MainModel"){
          code+='<img src="icons/zoom.png" class="model-options-bar-btn" onclick="zoom(event,this.parentNode.parentNode)"/>';
          code+='<img src="icons/edit.png" class="model-options-bar-btn" onclick="editStyle(event,this.parentNode.parentNode)"/>';
          code+='<img src="icons/delete.png" class="model-options-bar-btn" onclick="removeFromTree(event,this.parentNode.parentNode.id)"/>';
        }
      code+='</div>\n'
      return code;
}
