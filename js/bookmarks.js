function toolbox(option){
    document.getElementById("toolbar-welcome-text-container").style.display = "none";
    var elements = document.getElementsByClassName("toolbar-container");
    for (var i = 0; i < elements.length; i++ ) {
        elements[i].style.display = "none";
    }
    switch(option) {
        case 0:
            document.getElementById("toolbar-container-html").style.display = "block";
            break;
        case 1:
            document.getElementById("toolbar-container-css").style.display = "block";
            break;
        case 2:
            document.getElementById("toolbar-container-js").style.display = "block";
            break;
        case 3:
            document.getElementById("toolbar-container-grid").style.display = "block";
            break;
        case 4:
            document.getElementById("toolbar-container-template").style.display = "block";
            break;
        case 5:
            document.getElementById("toolbar-welcome-text-container").style.display = "block";
            break;
    }
}

function work_site(option){
    var elements = document.getElementsByClassName("work-site-container");
    for (var i = 0; i < elements.length; i++ ) {
        elements[i].style.display = "none";
    }
    switch(option) {
        case 0:
            document.getElementById("work-site-container-drop").style.display = "block";
            break;
        case 1:
            var elem = document.getElementById("work-site-container-code")
            elem.style.display = "block";
            console.log(getPageCode());
            break;
    }
}

function close_me(me) {
    document.getElementById(me).style.display = "none";

}
