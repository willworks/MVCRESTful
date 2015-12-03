// 控制器
var controller = require( '../controllers/controller');

exports.router = function(req, res, callback){ 
	var method = req.method.toUpperCase();

	/*
	// 调通测试代码
	controller.listAll(req, res, callback);
	*/
	
	// 过滤多余的请求
	if (req.action === 'favicon.ico') {
		return;
	} else {
		switch (method) {
			case 'GET'    : controller.listUser(req, res, callback); 
							break;
			case 'POST'   : controller.addUSer(req, res, callback);
							break;
			case 'PUT'    : controller.updateUser(req, res, callback); 
							break;
			case 'DELETE' : controller.deleteUser(req, res, callback); 
							break;
			default       : controller.errQeq(req, res, callback); 
							break;
		}
	}
};
