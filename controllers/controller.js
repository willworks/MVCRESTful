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

// http://host/listUser
// http://host/listUser/id
exports.listUser = function(req, callback){
	/*
	// 调通测试代码
	model.test(req.action, callback);
	*/
	if(req.action === 'listUser') {
		model.read(req.id, callback);
	} else {
		callback('Request URL is not in RESTful style!');
	}
};

// http://host/addUser
exports.addUser = function(req, callback){
	if(req.action === 'addUser') {
		var params;
	    req.addListener('data', function(chunk){  
	        params += chunk;  
	    })  
	    .addListener('end', function(){	  
	    	callback(params);  
	    	// model.create(params, callback);
	    });
	} else {
		callback('Request URL is not in RESTful style!');
	}
};

// http://host/updateUser/id
exports.updateUser = function(req, callback){
	if(req.action === 'updateUser') {
		if(req.id === '') {
			callback('Request URL is not in RESTful style!');
		} else {
			model.update(req.id, callback);
		}
	} else {
		callback('Request URL is not in RESTful style!');
	}
};

// http://host/deleteUser/id
exports.deleteUser = function(req, callback){
	if(req.action === 'deleteUser') {
		if(req.id === '') {
			callback('Request URL is not in RESTful style!');
		} else {
			model.delete(req.id, callback);
		}
	} else {
		callback('Request URL is not in RESTful style!');
	}
};

exports.errQeq = function(req, callback){
	callback('Request URL is not in RESTful style!');
};