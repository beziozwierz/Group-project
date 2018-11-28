function toolbar_element(option){

    switch(option.innerText) {
        case "header":

            break;
        case "title":

            break;
        case "settings":

            break;
        case "section":

            break;
        case "heade1r":

            break;
        case "navigation":

            break;
        case "article":

            break;
        case "footer":

            break;
        case "div":

            break;
        case "list":

            break;
        case "line":

            break;
    }

    document.getElementById("edit-element-container").style.display = "block";
    document.getElementById("edit-element-title-container").innerText = option.innerText;
}