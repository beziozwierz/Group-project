function getPageCode(){
  console.log (JSON.stringify(model));
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

    code += '<'+div.inner[i].name; //name: main, nav itp
    //dodanie id (jeżeli istnieje)
    if(div.inner[i].id == null){
      code+='>\n';
    }else{
      code+=' id="' + div.inner[i].id +'">\n';
    }
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
