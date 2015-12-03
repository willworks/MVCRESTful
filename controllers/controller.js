var querystring = require('querystring');
var model = require('../models/model');
/*
 * req.method 请求方式
 * req.path 请求路径
 * req.action 动作
 * req.id 操作的具体资源
 */

/*
// 调通测试代码
exports.test = function(req, res, callback){
	callback(req.method);
	callback(req.action);
	callback(req.id);
	console.log(req.method);
	console.log(req.action);
	console.log(req.id);
};
*/
/*过滤非RESTful请求
 * 1.判断方法跟请求是否一致
 * 2.判断操作跟请求是否一致
 * 3.判断操作的具体资源是否存在
*/
function filter(method) {

}
// http://host/listUser
// http://host/listUser/id
exports.listUser = function(req, res, callback){
	/*
	// 调通测试代码
	model.test(req.action, callback);
	*/
	if (req.id === undefined) {
		
	} else {
		callback('具体用户');
	}
};

// http://host/addUSer
exports.addUSer = function(req, res, callback){};

// http://host/updateUser/id
exports.updateUser = function(req, res, callback){};

// http://host/updateUser/id
exports.deleteUser = function(req, res, callback){};

exports.errQeq = function(req, res, callback){
	callback('Request URL is not in RESTful style!');
};