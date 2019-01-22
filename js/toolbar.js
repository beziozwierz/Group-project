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


function category_select(element){
    switch(element.innerText){
        case "HTML":
            document.getElementById("toolbar-html-categories-container").style.display = "block";
            document.getElementById("toolbar-css-categories-container").style.display = "none";
            document.getElementById("toolbar-templates-categories-container").style.display = "none";
            break;
        case "CSS":
            document.getElementById("toolbar-html-categories-container").style.display = "none";
            document.getElementById("toolbar-css-categories-container").style.display = "block";
            document.getElementById("toolbar-templates-categories-container").style.display = "none";
            break;
        case "TEMPLATES":
            document.getElementById("toolbar-html-categories-container").style.display = "none";
            document.getElementById("toolbar-css-categories-container").style.display = "none";
            document.getElementById("toolbar-templates-categories-container").style.display = "block";
            break;
    }
}

function element_select(element){
    switch(element.innerText){
        case "Containers":
            $("#toolbar-HTML_Containers").slideToggle("slow");
            break;
        case "Flow control":
            $("#toolbar-HTML_FlowControl").slideToggle("slow");
            break;
        case "External sources":
            $("#toolbar-HTML_ExternalSources").slideToggle("slow");
            break;
        case "Forms":
            $("#toolbar-HTML_Forms").slideToggle("slow");
            break;
        case "Semantics":
            $("#toolbar-HTML_Semantics").slideToggle("slow");
            break;
        case "Settings":
            $("#toolbar-HTML_Settings").slideToggle("slow");
            break;
    }
}

function element_hover(element){
    var my_position = element.getBoundingClientRect();
    var inspector = document.getElementById("model-inspector-container");
    var tag = document.getElementById("model-inspector-tag");
    var description = document.getElementById("model-inspector-description");
    var needed = document.getElementById("model-inspector-needed");
    var optional = document.getElementById("model-inspector-optional");
    inspector.style.display = "block";
    inspector.style.top = my_position.top.toString() + "px";
    document.getElementById("model-inspector-title").innerText = element.innerText;

    switch(element.innerText){
        case "Default container":
            tag.innerText = "<div>";
            description.innerText = "The <div> tag defines a division or a section in an HTML document.\n" +
                "The <div> element is often used as a container for other HTML elements to style them with CSS";
            needed.style.display = "none";
            optional.style.display = "none";
            break;
        case "Text container":
            tag.innerText = "<span>";
            description.innerText = "The <span> tag is used to group inline-elements in a document.\n" +
                "The <span> tag provides no visual change by itself.\n" +
                "The <span> tag provides a way to add a hook to a part of a text or a part of a document."
            needed.style.display = "none";
            optional.style.display = "none";
            break;
        case "Website container":
            tag.innerText = "<iframe>";
            description.innerText = "The <iframe> tag specifies an inline frame.\n" +
                "An inline frame is used to embed another document within the current HTML document.";
            needed.style.display = "block";
            needed.innerText = "Needs: src = path_to_source";
            optional.style.display = "none";
            break;

        case "Text header":
            tag.innerText = "<h1>-<h6>";
            description.innerText = "The <h1> to <h6> tags are used to define HTML headings.\n" +
                "<h1> defines the most important heading. <h6> defines the least important heading.";
            needed.style.display = "none";
            optional.style.display = "none";
            break;
        case "Table":
            tag.innerText = "<table>";
            description.innerText = "The <table> tag defines an HTML table.";
            needed.style.display = "block";
            needed.innerText = "Needs: <tr> and <td> tags inside";
            optional.style.display = "none";
            break;
        case "Table row":
            tag.innerText = "<tr>";
            description.innerText = "The <tr> tag defines a row in an HTML table.";
            needed.style.display = "block";
            needed.innerText = "Needs: <td> tag inside";
            optional.style.display = "none";
            break;
        case "Table cel":
            tag.innerText = "<td>";
            description.innerText = "The <td> tag defines a cel in an HTML table.";
            needed.style.display = "none";
            optional.style.display = "none";
            break;
    }
}

function element_leaved(){
    document.getElementById("model-inspector-container").style.display = "none";
}