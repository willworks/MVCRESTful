var http = require('fs');
function dao(){
	var paramsGet = ''; // 存储GET请求数据
	var paramsDelete = ''; // 存储DELETE请求数据
	var paramsPost = ''; // 存储POST传递数据
	var paramsPut = ''; // 存储PUT请求数据
	
	this.listAll = function(id, params, callback){
		fs.readFile( __dirname + "/" + "data/users.json", 'utf8', function (err, data) {
			callback(data);
		    console.log(req.resource.method + ' all users');
		});
	};

	
	this.listUser = function(id, params, callback){
		var id = 'user' + req.resource.id;
		fs.readFile( __dirname + "/" + "data/users.json", 'utf8', function (err, data) {
			var user = JSON.parse(data)[id];
			user = JSON.stringify(user);
			if(user === undefined){
				callback('user does not exist!');
				console.log('user does not exist!');
			}else{
				callback(user);
				console.log(req.resource.method + ' ' + user);
			}
		});
	};

	
	// PUT
	this.createUser = function(id, params, callback){
		// 获取PUT传递的参数 通过addListener来实现
        req.addListener('data', function(chunk){  
            paramsPut += chunk;  
        })  
        .addListener('end', function(){	    
        	fs.readFile( __dirname + "/" + "data/users.json", 'utf8', function (err, data) {
        		/** 
        		 * 处理PUT的传值
				 * 测试传值：name=mohit&password=password4&profession=teacher&id=4
				 */
    			paramsPut = querystring.parse(paramsPut);
    			// JSON解析
        		data = JSON.parse(data);
        		// 存储
        		var user = 'user' + req.resource.id;
        		data[user] = paramsPut;
	            console.log(req.resource.method + ' store ' + user + JSON.stringify(paramsPut) + ' succefully!');
             	data = JSON.stringify(data);
            	callback(data);
        	});
        });

	};

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

	
	this.deleteUser = function(id, params, callback){
		var id = 'user' + req.resource.id;
		fs.readFile( __dirname + "/" + "data/users.json", 'utf8', function (err, data) {
			var users = JSON.parse(data);
			var user = users[id];
			user = JSON.stringify(user);
			if(user === undefined){
				callback('user does not exist!');
			}else{
				res.writeHead(200, {'Content-Type': 'text/plain'});
				delete users[id];
				callback(JSON.stringify(users));
				console.log(req.resource.method + ' ' + user);
			}
		});
	};

}

exports.dao = dao;
