function toolbar_element(option){

    switch(option.innerText) {
        case "ID":
            document.getElementsByClassName("edit-element-element-title"[0]).innerText = "Nazwa ID";
            break;
        case "Class":
            document.getElementsByClassName("edit-element-element-title"[0]).innerText = "Nazwa Klasy";
            break;
    }

    document.getElementById("edit-element-container").style.display = "block";
    document.getElementById("edit-element-title-container").innerText = option.innerText.toUpperCase();
}
