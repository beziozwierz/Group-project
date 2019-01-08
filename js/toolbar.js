function toolbar_element(option){

    switch(option.innerText) {
        case "header":
            document.getElementById("edit-element-title-container").innerHTML = "";
            break;
        case "title":
            document.getElementById("edit-element-title-container").innerHTML = "";
            break;
        case "settings":
            document.getElementById("edit-element-title-container").innerHTML = "";
            break;
        case "section":
            document.getElementById("edit-element-title-container").innerHTML = "";
            break;
        case "heade1r":
            document.getElementById("edit-element-title-container").innerHTML = "";
            break;
        case "navigation":
            document.getElementById("edit-element-title-container").innerHTML = "";
            break;
        case "article":
            document.getElementById("edit-element-title-container").innerHTML = "";
            break;
        case "footer":
            document.getElementById("edit-element-title-container").innerHTML = "";
            break;
        case "div":
        document.getElementById("edit-element-title-container").innerHTML = ""+
          '<div id="creator">'+
          'ID: <br/>'+
          '<input type="text" id="drag_id" /> <br/>'+
          'Width: <br/>'+
          '<input type="text" id="drag_width" /> <br/>'+
          'Height: <br/>'+
          '<input type="text" id="drag_height" /> <br/>'+
          '<button onclick="createDiv()"> Create </button>'+
          '</div>';
          //getCreatorCode()
            break;
        case "list":
            document.getElementById("edit-element-title-container").innerHTML = "";
            break;
        case "line":
            document.getElementById("edit-element-title-container").innerHTML = "";
            break;
    }

    document.getElementById("edit-element-container").style.display = "block";
    document.getElementById("edit-element-title-container").innerText = option.innerText.toUpperCase();
}
