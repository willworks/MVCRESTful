var fs = require('fs');

function add(id, params, callback){
	// 获取POST传递的参数 通过addListener来实现
    req.addListener('data', function(chunk){  
        paramsPost += chunk;  
    })  
    .addListener('end', function(){	    
    	fs.readFile( __dirname + "/" + "data/users.json", 'utf8', function (err, data) {
    		/** 
    		 * 处理POST的传值
			 * 测试传值：name=mohit&password=password4&profession=teacher&id=4
			 */
			paramsPost = querystring.parse(paramsPost);
			// JSON解析
    		data = JSON.parse(data);
    		// 存储
    		data['user4'] = paramsPost;
            console.log(req.resource.method + ' store user4' + JSON.stringify(paramsPost) + ' succefully!');
            // 返回
         	res.writeHead(200, {'Content-Type': 'text/plain'}); 
         	data = JSON.stringify(data);
        	callback(data);
    	});
    });
}


// CURD
exports.create = function(info, callback){

};

exports.update = function(id, info, callback){};

exports.read = function(id, callback){
	if(id === '' || id === undefined) {
    	fs.readFile( __dirname + "/" + "../data/users.json", 'utf8', function (err, data) {
        	callback(data);
    	});
	} else {
		fs.readFile( __dirname + "/" + "../data/users.json", 'utf8', function (err, data) {
	    	var item = 'user' + id;
	    	data = JSON.parse(data);
	    	if (data[item] === undefined) {
	    		callback('Item is not found!');
	    	} else {
	    		var res = 'id:' + data[item].id + '\n' + 'name:' + data[item].name + '\n' + 'password:' + data[item].password + '\n' + 'profession:' + data[item].profession;
	    		callback(res);
	    	}
		});
	}
};

exports.delete = function(id, callback){
	if(id === '') {
        callback('Item is not found!');
	} else {
		fs.readFile( __dirname + "/" + "../data/users.json", 'utf8', function (err, data) {
	     	data = data.toString();
	    	callback(data);
		});
	}
};

/*
// 调通测试代码
exports.test = function(action, callback){
	callback(action);
};
*/