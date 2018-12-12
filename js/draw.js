function draw() {
  var code = getInnercode(model,0,"model");
  var elem = document.getElementById("model");
  elem.innerHTML =  code;
}

function getDivCode(div,depth,id){
  var code="";
  for(var j=0;j<depth;j++){ code+="\t"; }
  var code = '<div id="'+id+'_'+i+'"'+
    ' ondrop="drop(event)" ondragover="allowDrop(event)" ondragleave="leave(event)" onclick="editStyle(this)"' +
    ' style="border: 2px solid black; box-sizing: border-box; cursor: pointer;'+
    ' width: ' + div.width+'px;'+
    ' height: ' + div.height+'px;">"';
    code+=getInnercode(div,depth+1,id);
    code+="</div>\n";
}


function getInnercode(div, depth, id){
  var code = "";

  var clear = false;
  for(var i = 0; i < div.inner.length ; i++){
    for(var j=0;j<depth;j++){ code+="\t"; }
    code += '<div id="'+id+'_'+i+'"'+
      ' ondrop="drop(event)" ondragover="allowDrop(event)" ondragleave="leave(event)" onclick="editStyle(this)"' +
      ' style="border: 2px solid black; box-sizing: border-box; cursor: pointer;'+
      ' width: ' + div.inner[i].width+'px;'+
      ' height: ' + div.inner[i].height+'px;';
    if( div.inner[i].float != null){
      clear = true;
      code += ' float: ' + div.inner[i].float +'">\n';
    }else{
      if(clear == true){
        code += 'clear: both; ">';
        clear = false;
      }else{
        code += '">';
      }
    }
    code+=getInnercode(div.inner[i],depth+1,id+'_'+i);

    for(var j=0;j<depth;j++){ code+="\t"; }
    code+='</div>\n';
  }
  return code;
}
