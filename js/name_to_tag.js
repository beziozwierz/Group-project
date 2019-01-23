function nameToTag(text){
  var name;
  switch (text) {
    case "Default container":
      name = "div";
      break;
    case "Text container":
      name = "span";
      break;
    case "Website container":
      name = "iframe";
      break;
    case "Great header":
      name = "h1";
      break;
    case "Huge header":
      name = "h2";
      break;
    case "Big header":
      name = "h3";
      break;
    case "Medium header":
      name = "h4";
      break;
    case "Small header":
      name = "h5";
      break;
    case "Tiny header":
      name = "h6";
      break;
    case "Normal text":
      name="text";
      break;
    case "Table":
      name = "table";
      break;
    case "Table row":
      name = "tr";
      break;
    case "Table cell":
      name = "td";
      break;
    case "Ordered list":
      name = "ol";
      break;
    case "Unordered list":
      name = "ul";
      break;
    case "List element":
      name = "li";
      break;
    case "Webpage link":
      name = "a";
      break;
    case "Graphics":
      name = "img";
      break;
    case "Audio":
      name = "audio";
      break;
    case "Video":
      name = "video";
      break;
    case "Form":
      name = "form";
      break;
    case "Input":
      name = "input";
      break;
    case "Textarea":
      name = "textarea";
      break;
    case "Button":
      name = "button";
      break;
    case "Select":
      name = "select";
      break;
    case "Option":
      name = "option";
      break;
    case "Header":
      name = "header";
      break;
    case "Navigation":
      name = "nav";
      break;
    case "Section":
      name = "section";
      break;
    case "Article":
      name = "article";
      break;
    case "Aside":
      name = "aside";
      break;
    case "Footer":
      name = "footer";
      break;
    default:
      name="";
  }
  return name;
}
