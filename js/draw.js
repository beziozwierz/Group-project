/***
Wywołanie funkcji draw() powoduje odświeżenie
divów w modelu (są one "rysowane" na nowo)
na podstawie drzewa.
***/
function draw() {
  var code = "";
  if(zoomed){
    code = '<div id="return-to-model" onclick="unzoom()" >POWRÓT DO MODELU</div>';
  }
  //code+=getModelDivCode(viewpoint_root,viewpoint_name);
   code += getModelDivCode(viewpoint_root,viewpoint_name);
   ////console.log(code);
   var elem = document.getElementById("model-blocks-select-container");
   elem.innerHTML =  code;
}

/***
Generuje kod podanego diva (do modelu)
***/
function getModelDivCode(div,id){
  code='<div id="'+viewpoint_name;
  code+='" class="model-div" '+
  'ondrop="drop(event)" '+
  'ondragover="allowDrop(event)" ' +
  'ondragleave="leave(event)" '+
  ' style="'+
  ' width: ' + div.width+'%;';

  if(div.height !== 'DEFAULT')
    code += ' min-height: ' + div.height+';">\n';
  else {
    code+='">';
  }
  code+=getEditionPanelCode(div.name, div.type);
  code+=getInnerCode(div,1,viewpoint_name);
  code+='</div>';

  return code;
}

/***
Funkcja zwraca kod wszystkich wewnętrznych elementów danego div'a z drzewa,
odwołując się do tablicy "inner".
Depth określa ilość wcięć,
id określa przedrostek nazwy, po której możliwe będzie odnalezienie diva w drzewie.
***/
function getInnerCode(div, depth, id){
  //console.log(div.name);
  var code = "";

  //var clear = false;
  for(var i = 0; i < div.inner.length ; i++){
    //tworzenie wcięć
    for(var j=0;j<depth;j++){ code+="\t"; }
      code +=
        '<div id="'+id+'_'+i+'"'+' class="model-div" '+
        'ondrop="drop(event)" '+
        'ondragover="allowDrop(event)" ' +
        'ondragleave="leave(event)" '+
        //' onclick="editStyle(event,this)"' +
        ' style="'+
        ' width: ' + div.inner[i].width+'%;';

    if(div.inner[i].height !== 'DEFAULT'){
      code += ' min-height: ' + div.inner[i].height+';">\n';
    } else {
      code += '">';
    }
    code+=getEditionPanelCode(div.inner[i].name, div.inner[i].type);
    code+=getInnerCode(div.inner[i],depth+1,id+'_'+i);

      //TODO:
    for(var k = 0; k < div.inner[i].id.length; k++) {
      code += '<div class="model-css-container">';
      code += '<div class="model-css-header">' + div.inner[i].id[k].get_name() + '</div>';
      for(var l = 0; l < div.inner[i].id[k].elements.length; l++) {
        code +=
          '<div class="model-css-element">' + div.inner[i].id[k].get(l) + '</div>';
      }
        code += '</div>';
    }

      for(var k = 0; k < div.inner[i].class.length; k++) {
          code += '<div class="model-css-container">';
          code += '<div class="model-css-header">' + div.inner[i].class[k].get_name() + '</div>';
          for(var l = 0; l < div.inner[i].class[k].elements.length; l++) {
              code +=
                  '<div class="model-css-element">' + div.inner[i].class[k].get(l) + '</div>';
          }
          code += '</div>';
      }

    //tworzenie wcięć
    for(var j=0;j<depth;j++){ code+="\t"; }
    code+='</div>\n';
  }
  return code;
}




/***
Funkcja zwraca kod zawierający pasek narzędzi
elementów w modelu, który zawiera przyciski:
usuń, przybliż, edytuj styl, edytuj tekst(dla typów tekstowych),
***/
function getEditionPanelCode(name,type){
  code='<div class="model-options-bar">';

  code += '<div class="model-element-title">' + name + '</div>';
  if(name!=="MainModel"){
      code+='<img src="icons/delete.png" class="model-options-bar-btn" onclick="removeFromTree(event,this.parentNode.parentNode.id)"/>';
      if(name!=='text'){
        code+='<img src="icons/zoom.png" class="model-options-bar-btn" onclick="zoom(event,this.parentNode.parentNode)"/>';
        code+='<img src="icons/edit.png" class="model-options-bar-btn" onclick="editStyle(event,this.parentNode.parentNode)"/>';
        code+='<img src="icons/copy.png" class="model-options-bar-btn" onclick="create_template(event,this.parentNode.parentNode.id)"/>';
      }
      if(type==='text'){
          code+='<img src="icons/text.png" class="model-options-bar-btn" onclick="editText(event,this.parentNode.parentNode.id)"/>';
      }
  }
  code+='</div>\n';
  return code;
}
