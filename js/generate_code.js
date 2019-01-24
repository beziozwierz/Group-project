function getPageCode(){
  //console.log (JSON.stringify(model));
  code = getInnerPageCode(model,0);
  //console.log(code);
  return code;
}
function getInnerPageCode(div, depth){
  var code = "";
  for(var i = 0; i < div.inner.length ; i++){

    //wcięcia
    for(var j=0;j<depth;j++){ code+="\t"; }

    if(div.inner[i].name == "TEXT"){
      code += div.inner[i].text;
      code += '\n';
      continue;
    }

    //dodanie id i class(jeżeli istnieją)
    if (typeof div.inner[i].id !== 'undefined' && div.inner[i].id.length > 0) {
        code += ' id="';
        for (var k = 0; k < div.inner[i].id.length; k++) {
            code += div.inner[i].id[k].get_name() +' ';
        }
        code += '"';
    }
    if (typeof div.inner[i].class !== 'undefined' && div.inner[i].class.length > 0) {
        code+=' class="';
        for(var k=0; k<div.inner[i].class.length; k++ ){
          code+= div.inner[i].class[k].get_name()+' ';
        }
        code+='"';
    }
    //dla img stwórz pojedynczy tag!!
    code += '<'+div.inner[i].name; //name: main, nav itp
    if(div.inner[i].name==='img'){
      code+=' src="'+div.inner[i].src+'"/>\n';
      continue;
    }
    
    code+='>\n';

    //dodanie tekstu dla tekstowych zmiennych (h1,label itp)
    if(div.inner[i].type==='text'){
      //wcięcia
      for(var j=0;j<=depth;j++){ code+="\t"; }
      code+=div.inner[i].text;
      code+='\n';
    }
    code+=getInnerPageCode(div.inner[i],depth+1);

    for(var j=0;j<depth;j++){ code+="\t"; }
    code+='</'+div.inner[i].name+'>\n';
  }
  return code;
}


function getCssCode(){
  code="";
  //kod dla ID'ków
  for(var i=0; i<global_CSS_id.length; i++){
    code+='#'+global_CSS_id[i].get_name()+'{\n';
    for(var j=0; j<global_CSS_id[i].elements.length; j++){
      code+='\t'+global_CSS_id[i].elements[j]+'\n';
    }
    code+='}\n';
  }
  //kod dla klas
  for(var i=0; i<global_CSS_class.length; i++){
    code+='.'+global_CSS_class[i].get_name()+'{\n';
    for(var j=0; j<global_CSS_class[i].elements.length; j++){
      code+='\t'+global_CSS_class[i].elements[j]+'\n';
    }
    code+='}\n';
  }
  return code;
}
