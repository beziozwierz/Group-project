

function parseDiv (Div) {
	var inner = [];
	var parent = [];
	
	if (Div.inner.length > 0) {
		for(var i = 0; i < Div.inner.length ; i++){
			inner[i] = parseDiv(Div.inner[i])
		}
	}

	return {
        inner: inner,
		type: Div.type,
		parent: [],
		height: Div.height,	
		width: Div.width,
		float: Div.float,
    }
}

function restoreDiv (json) {
	var div = new Div(json.type, json.width, json.height, json.parent);
	
	if (json.inner.length > 0) {
		for(var i = 0; i < json.inner.length ; i++){
			div.inner[i] = restoreDiv(json.inner[i])
		}	
	}
	
	return div;
}

function fn_save_html() {
	var html = JSON.stringify(model);
	$.ajax({
		url: "save_html.php",
		method : "post",
		data: { html : html },
		success: function(result){
			console.log('ok');
	  	}
	});
}



function fn_load_html() {
	$.ajax({
		url: "load_html.php",
		method : "get",
		success: function(result) {
			html = JSON.parse(result);
			console.log(JSON.parse(html));	
			
			model = restoreDiv(JSON.parse(html));
			console.log(model);
			viewpoint_name = "model";
			viewpoint_root = model;
			zoomed = false;
			draw();
	  	}
	});
}

