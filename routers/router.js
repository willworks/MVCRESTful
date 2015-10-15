var fs = require('fs'),
	querystring = require('querystring');
var _events = ['listAll', 'listUser', 'createUser', 'addUSer', 'deleteUser'];


function router(req){ 
	console.log(req.resource);
	if(req.resource.method == 'GET'){
		console.log('bye');
	}else{
		console.log('error');
	}
}

function router(req, res, callback){
	// 将请求解析成不同的命令

	var event = emitEvent(method, req.resource);
	if(supportEvent(event)){
			//执行HTTP请求
			return execute(req, event, callback);
	}else{
		return 'No supported event found!';
	}
}

exports.router = router;