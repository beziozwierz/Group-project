

function parseDiv (Div) {
	var inner = [];
	
	if (Div.inner.length > 0) {
		for(var i = 0; i < Div.inner.length ; i++){
			inner[i] = parseDiv(Div.inner[i])
		}
	}

	return {
        inner: inner,
        id: Div.id,
        class: Div.class,
        style: Div.style,
        name: Div.name,
		height: Div.height,	
		width: Div.width,
		float: Div.float,
		type: Div.type
    }
}

function restoreDiv (json) {
	var div = new Div(json.name, json.width, json.height);
	
	if (json.inner.length > 0) {
		for(var i = 0; i < json.inner.length ; i++){
			div.inner[i] = restoreDiv(json.inner[i])
		}	
	}
	
	return div;
}

function fn_save_html() {
	// console.log(model);
	var html = JSON.stringify(model);
	// console.log(html);
	$.ajax({
		url: "save_html.php",
		method : "post",
		data: { html : html },
		success: function(result){
			console.log(result);
	  	}
	});
}



function fn_load_html() {
	$.ajax({
		url: "load_html.php",
		method : "get",
		success: function(result) {
			console.log(result);
			html = JSON.parse(result);
			console.log(JSON.parse(html));	
			
			model = restoreDiv(JSON.parse(html));
			console.log(model);
			viewpoint_name = "model_0";
			viewpoint_root = model.inner[0];
			zoomed = false;
			draw();
	  	}
	});
}

