function htmlToElements(html) {
    var template = document.createElement('template');
    template.innerHTML = html;
    return template.content.childNodes;
}

function makeDocument() {
  var frame = document.getElementById("theFrame");         
  var doc = document.implementation.createHTMLDocument("New Document");
	var rows = htmlToElements(getPageCode());
	for (var i = 0; i < rows.length; i++) {	
    doc.body.appendChild(rows[i]);
}
  var destDocument = frame.contentDocument;
  var srcNode = doc.documentElement;
  var newNode = destDocument.importNode(srcNode, true); 
  destDocument.replaceChild(newNode, destDocument.documentElement);
}