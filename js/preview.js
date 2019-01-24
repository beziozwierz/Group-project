/***
Scrypty do wyswietlenia  strony z wczesniej napisnargo kodu
***/

/***
Przetwarzanie html stringów w elementy które budują strone
@param html - kod do generacji strony
@return - uporządkowane drzewo elementów
***/
function htmlToElements(html) {
    var template = document.createElement('template');
    template.innerHTML = html;
    return template.content.childNodes;
}

/***
Tworzenie podswietlonej strony

***/
function makeDocument() {
  var frame = document.getElementById("theFrame");
  var doc = document.implementation.createHTMLDocument("New Document");
  //console.log(getPageCode());
	var rows = htmlToElements(getPageCode());
	for (var i = 0; i < rows.length; i++) {
    doc.body.appendChild(rows[i]);
}
  var destDocument = frame.contentDocument;
  var srcNode = doc.documentElement;
  var newNode = destDocument.importNode(srcNode, true);
  destDocument.replaceChild(newNode, destDocument.documentElement);
  document.getElementById('theFrame').contentWindow.location.reload();
  // //console.log(model);
}
