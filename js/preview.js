function parse_string(str){
    var str2 = "";
    for(var i = 0; i<str.length;i++){
                if(str.charAt(i) == '\n'){
                    str2 += "<br />";
                }else if(str.charAt(i) == '\t')
                {
                    str2 += "&emsp;";
                }else if(str.charAt(i) == '<'){
                    str2 += "&lt;"
                }else if(str.charAt(i) == '>'){
                    str2 += "&gt;"
                }
                else{
                str2 += str.charAt(i);
            }
            }
            return str2;


}
function htmlToElements(html) {
    var template = document.createElement('template');
    template.innerHTML = html;
    return template.content.childNodes;
}

function makeDocument() {
  var frame = document.getElementById("theFrame");
          
  var doc = document.implementation.createHTMLDocument("New Document");
  	var html2 =  getPageCode();
  	var html3 = html2.replace(/\s/g, "");
  	var test = '<div><span>nested</span> <span>stuff</span></div>';
	var rows = htmlToElements(html3);
	console.log(html3);
	var r = rows.length;
	for (var i = 0; i< r;i++){	
  	 doc.body.appendChild(rows[0]);
  	 console.log(rows);
	}

  var destDocument = frame.contentDocument;
  var srcNode = doc.documentElement;
  var newNode = destDocument.importNode(srcNode, true);
  
  destDocument.replaceChild(newNode, destDocument.documentElement);
}