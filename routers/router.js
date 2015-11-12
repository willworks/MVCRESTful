function router(params, res, callback){ 
	var req = params;
	var method = params.method.toLowerCase();
	// 模型定义
	// var module = require( '../controllers/controller');
	// var controller = new module.controller();
	callback(method);
	// controller(params.method, params.id, params.action, function(result){
	// 	console.log('router ' + params.id);

	// 	var stringfyResult = JSON.stringify(result);
	// 	callback(stringfyResult);
	// });
}
exports.router = router;