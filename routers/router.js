// 控制器
var controller = require( '../controllers/controller');

exports.router = function(req, res, callback){ 
	var method = req.method.toUpperCase();

	/*
	// 调通测试代码
	controller.listAll(req, res, callback);
	*/

	// 过滤RESTful之外的http动词
	if (req.action === 'favicon.ico') {
		return;
	} else {
		switch (method) {
			case 'GET'    : controller.listUser(req, callback); 
							break;
			case 'POST'   : controller.addUser(req, callback);
							break;
			case 'PUT'    : controller.updateUser(req, callback); 
							break;
			case 'DELETE' : controller.deleteUser(req, callback); 
							break;
			default       : controller.errQeq(req, callback); 
							break;
		}
	}
};
