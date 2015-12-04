var http = require('fs');
function dao(req, res, callback){
	// POST
	this.addUSer = function(id, params, callback){
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
	};

}

// CURD
exports.create = function(req, callback){
	callback('1231');
};

exports.update = function(req, callback){};

exports.read = function(req, callback){
	callback('1231');
};

exports.delete = function(req, callback){};

/*
// 调通测试代码
exports.test = function(action, callback){
	callback(action);
};
*/