class Div {
    constructor(height, width, type) {
      this.height = height;
      this.width = width;
      this.type = type; /*type: left, right, mid , null=normalDiv*/
      this.rows = null;
    }
  }
  class Row {
    constructor(type) {
      this.type = type; /* can be regural divs or bar*/
      this.length = 0;
      this.divs = null;
      /*this.divs = [new Div(50,50,"left"), new Div(50,50,null), new Div(50,50,"right")];*/
    }
  }

  function translateName(name) {
    var array = name.split('_').map(Number);
    return array; /* WARNING: result array starts with xtra 0 */
  }

  function generateRowCode(row,idPrefix) {
    var len = row.length;
    var code = "";
    if(row.type == "bar"){
      code += '<div id="'+idPrefix+'" class="bar" ondrop="dropBar(event)" ondragover="allowDrop(event)" >  </div>';
    }else{
      for (var i = 0; i < len; i++) {
        code += generateDivCode(row.divs[i],idPrefix+"_"+i);
      }
       code += '<div style="clear: both"></div>'; /*clearfix*/

    }
    return code;
  }

  function generateDivCode(div,idPrefix){
    var code = "";
    if(div.type == "left"){
      code += '<div id="'+idPrefix+'" class="btn" ondrop="dropLeft(event)" ondragover="allowDrop(event)" > <- </div>';
    }else if(div.type == "mid"){
      code += '<div id="'+idPrefix+'" class="btn" ondrop="dropInRow(event)" ondragover="allowDrop(event)" > :: </div>';
    }else if(div.type == "right"){
        code += '<div id="'+idPrefix+'" class="btn" ondrop="dropRight(event)" ondragover="allowDrop(event)" > -> </div>';
    }else{
      if(div.rows!=null){
        var len = div.rows.length;
        for(var i=0;i<len;i++){
          code+=generateRowCode(div.rows[i],idPrefix+"_"+i);
        }
      }else{
        code += '<div id="'+idPrefix+'" class="btn"> divv </div>';
      }
    }
    return code;
  }

  function draw() {
    var x = rows.length;
    var code = "";
    for(var i=0; i<x; i++){
      code += generateRowCode(rows[i],"_"+i);
    }
    var container = document.getElementById('container').innerHTML = code;
  }


  function drag(ev) {
      ev.dataTransfer.setData("text", ev.target.id); /* zmienić na div */
  }
  function allowDrop(ev) {
      ev.preventDefault();
  }

  function dropBar(ev) {
      ev.preventDefault();
      var id = ev.target.id;
      var path = translateName(id);

        var x = path[1];

        var row = new Row("divs");
        row.length = 3;
        row.divs = [new Div(50,50,"left"), new Div(50,50,null), new Div(50,50,"right")];
        rows.splice(x+1,0,row,new Row("bar"));
        draw();
      }

      function dropRight(ev) {
          ev.preventDefault();
          var id = ev.target.id;
          var path = translateName(id);

          var row = rows[path[1]];
          var div;
          for(var i=2; i<path.length-1; i+=2) {
            div = row.divs[path[i]];
             row = div.rows[path[i+1]];
          }
          /* have rov that point to div searched for */
            var x = path[i];
            var divs = row.divs;
            row.length += 2;
            divs.splice(x,1,new Div(50,50,"mid"),new Div(50,50,"null"),new Div(50,50,"right"));
            draw();
          }
