class Div {
    constructor(height, width, type) {
      this.height = height;
      this.width = width;
      this.type = type;
      this.rows = [];
    }
  }
  class Row {
    constructor() {
      this.height = 100;
      this.left = [];
      this.right = [];
    }
  }

rows = [];
rows[0] = new Row();
rows[0].left[0] = new Div(100,100,null);
rows[0].left[0].rows[0] = new Div(50,50,null);
rows[0].left[0].rows[1] = new Div(50,50,null);

rows[0].left[1] = new Div(100,100,null);
rows[0].left[2] = new Div(100,100,null);
rows[0].right[0] = new Div(100,100,null);
rows[0].right[1] = new Div(100,100,null);
rows[0].right[2] = new Div(100,100,null);
rows[0].right[3] = new Div(100,100,null);

rows[1] = new Row();
rows[1].left[0] = new Div(100,100,null);
rows[2] = new Row();
rows[2].left[0] = new Div(100,100,null);
rows[2].left[1] = new Div(100,100,null);


function drawModel() {
  var x = rows.length;
  var code = "";
  if(x>0){
    code += generateBarCode(20,"model_0");
    for(var i=0; i<x; i++){
      code += generateRowCode(rows[i],"model_"+(i*2+1),1,1,600);
      code += generateBarCode(20, "model_"+(i*2+2));
    }
  }else{

  }
  document.getElementById('model').innerHTML = code;
  console.log(code);
}


function generateBarCode(height,id){
  return '<div id="'+id+'" class="bar" \
          ondrop="dropBar(event)" ondragover="allowDrop(event)" \
          style="height:'+height+'px;" >  </div>\n\n';
}

function getClearFix(){
  return '<div style="clear: both"></div>\n';
}

function generateSpanCode(width,id,float){
  return '<div id="'+id+'" class="span" \
          ondrop="dropSpan(event)" ondragover="allowDrop(event)" \
          style="width: '+width+'px; height: 100px;float: '+float+'; " >  </div>\n\n';
}


function getWidthSum(row){
  var sum = 0;
  for(var i=0; i<row.left.length; i++){
    sum += row.left[i].width;
  }
  for(var i=0; i<row.right.length; i++){
    sum += row.right[i].width;
  }
  return sum;
}

function generateRowCode(row,id,resizeH,resizeW, width){
  var code="";

  //Przeskalowuje divy w rzedzie na szerokosc, aby zmiesciły sie słupki
  var numberOfSpans = row.left.length + row.right.length + 2;
  var spanSize = width * (1.0 / (5.0 * numberOfSpans));
  var divsWidth = getWidthSum(row);

  if(spanSize * numberOfSpans + divsWidth > width){
    var scale = width / (spanSize * numberOfSpans + divsWidth);
    resizeW *= scale;
  }

  //pierwszy słupek po lewej
  code += generateSpanCode(spanSize*resizeW,id+"_"+0,"left");

  for(var i=0; i<row.left.length; i++){
    code += generateDivCode(row.left[i],id+"_"+(i*2+1),"left",resizeH,resizeW); //TODO RESIZE!!!
    code += generateSpanCode(spanSize*resizeW,id+"_"+(i*2+2),"left");
  }

  //pierwszy słupek po prawej
  code += generateSpanCode(spanSize*resizeW,id+"_"+0,"right");

  for(var i=0; i<row.right.length; i++){
    code += generateDivCode(row.right[i],id+"_"+(row.left.length + i*2+1),"right",resizeH,resizeW);
    code += generateSpanCode(spanSize*resizeW,id+"_"+(row.left.length + i*2+2),"right");
  }


  code += getClearFix();
  return code;
}



function getHeightSum(div){
  var sum = 0;
  for(var i=0; i<div.rows.length; i++){
    sum += div.row[i].height;
  }
  return sum;
}

function generateDivCode(div,id,float,resizeH,resizeW){
  var code = '<div id="'+id+'" class="model" \
              style="width: '+ ((div.width - 2) * resizeW)+'px;'
  if(float == null ){
    code += '">\n';
  }else{
    code += 'float: '+float+ ';">\n';
  }

  var x = div.rows.length;
  if(x>0){
    var numberOfBars = x * 2 + 1;
    var barSize = div.height * (1.0 / (5.0 * numberOfBars));
    var rowsH = getHeightSum(div);

    if(barSize * numberOfBars + rowsH > div.height){
      var scale = div.height / (barSize * numberOfBars + rowsH);
      resizeH *= scale;
    }


    code += generateBarCode(barSize*resizeH,id+"_"+0);
    for(var i=0; i<div.rows.length; i++){
      code += generateRowCode(div.rows[i],id+"_"+(i*2+1),resizeH,resizeW, div.width);
      code += generateBarCode(barSize*resizeH,id+"_"+(i*2+2));

    }
  }
  code +=  "</div>\n";
  return code;
}



/*
function getCssCode(div){
  var code = 'style="';
  var style = div.css;
  for(var property in div.css) {
    code+=
   // propertyName is what you want
   // you can get the value like this: myObject[propertyName]
 }*/

  function translateName(id){
    var path = id.substring(6).split('_').map(Number); //model_1_2_4
    return path;
  }
