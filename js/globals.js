/***
Plik przechowujący zmienne globalne
***/


//przechowuje poddrzewa - templatki
var templates = [];
var default_templates = [];
//Default;
x = new Div('nav', '90','90');//, null);
x.inner[0]=new Div('a', '80','40px');
x.inner[1]=new Div('a', '80','40px');
x.inner[2]=new Div('a', '80','40px');
x.inner[3]=new Div('a', '80','40px');
x.inner[4]=new Div('a', '80','40px');
default_templates['navbar'] = x;
y = new Div('article', '90','90');
y.inner[0]=new Div('span', '80','40px');
y.inner[1]=new Div('span', '80','40px');
y.inner[2]=new Div('span', '80','40px');
default_templates['article'] = y;
z = new Div('ul', '90','90');
z.inner[0]=new Div('li', '80','40px');
z.inner[1]=new Div('li', '80','40px');
z.inner[2]=new Div('li', '80','40px');
z.inner[3]=new Div('li', '80','40px');
z.inner[4]=new Div('li', '80','40px');
default_templates['list'] = z;

var kkk = document.getElementById("default-templates-container");
kkk.innerHTML+= '<div id="navbar" class="toolbar-content-element" draggable="true" ondragstart="dragTemplate2(event)">navbar</div>';
kkk.innerHTML+= '<div id="article" class="toolbar-content-element" draggable="true" ondragstart="dragTemplate2(event)">article</div>';
kkk.innerHTML+= '<div id="list" class="toolbar-content-element" draggable="true" ondragstart="dragTemplate2(event)">list</div>';


var global_name = "HTML";
var global_type = "HTML";

var global_CSS_id = [];
var global_CSS_class = [];

/***
Aktualnie 'chwycony' element
***/
var dragged = new Div(global_name, '100','50px');//,null);

var pathToEdited = null;

/***
Referencja do korzenia drzewa modelu.
Korzeń nie jest rysowany, jest tylko kontenerem.
***/
model = new Div('root', 0,0);//,null);
/***
Pierwszy element drzewa.
(??Zmienić nazwę na body??)
***/
model.inner[0] = new Div('MainModel', '100','100px');//,model);


 //Zmienne przechowujące obecny punkt odniesienia do rysowania
var viewpoint_root = model.inner[0];
var viewpoint_name = "model_0";

var zoomed = false;

//przechowuje div do ktorego doda sie source
var srcDiv;
var deleteStylesDiv;
