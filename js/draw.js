function draw() {
   var code = getInnercode(model,0,"model");
   var elem = document.getElementById("model");
   elem.innerHTML =  code;
   console.log(code)
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
       code += '<div class="model-element-title">' + div.inner[i].type + '</div>'
   //  code+=getEditionPanelCode();
       code+=getInnercode(div.inner[i],depth+1,id+'_'+i);

       for(var j=0;j<depth;j++){ code+="\t"; }
       code+='</div>\n';
   }
       return code;
}

function getEditionPanelCode(){
      code='<div class="model-options-bar">\n';
      code+='<div class="edit-style-btn" onclick="editStyle(event,this.parentNode.parentNode)">EDIT</div>';
      code+='<div class="remove-div-btn" onclick="removeFromTree(event,this.parentNode.parentNode.id)">×<br/>DELETE</div>';
      code+='</div>\n'
      return code;
}
