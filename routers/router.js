function router(params, res, callback){ 
	var method = params.method.toLowerCase();
	console.log('router ' + method);
	var module = require( '../controllers/controller');
	var controller = new module.controller();
	controller(params.method, params.id, params.action, function(result){
		console.log('router ' + params.id);

		var stringfyResult = JSON.stringify(result);
		callback(stringfyResult);
	});
}

exports.router = router;