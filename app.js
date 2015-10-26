/** 
    Document   : RESTful
    Created on : 2015.10
    Author     : Kevin Zhong
    License    : MIT
    github     : https://github.com/willworks/RESTful/ 
    Description: A RESTful web system build with node
    Copyright (c) 2015 Kevin Zhong
*/
var http = require('http');

// 引入自定义模块
var parser = require('./parser'),
	router = require('./routers/router');

http.createServer(function (req, res) {
	/**
	 * params 用于存储parser切割好的数据，传递给其他层次使用
	 * params.method 请求方式
	 * params.path 请求路径
	 * params.action 动作
	 * params.id 操作的具体资源
	 */
	var params = parser.parser(req);

	console.log(params);

	if (req.url === '/favicon.ico'){
		return;
	}else{
		if (params.method === 'GET' || params.method === 'POST' || params.method === 'PUT' || params.method === 'DELETE') {
			// router处理请求，返回结果
			res.writeHead(200, {'Content-Type': 'text/plain'});
			router.router(params, res, function(result){ 
				// result 为多级回调的结果
				res.end(result); 
			}); 
		}else{
			// 处理GET POST DELETE PUT 之外的http请求类型，如TRACE HEAD等
			res.writeHead(200, {'Content-Type': 'text/plain'});
			res.write('Request URL is not in RESTful style!');
			res.end();
			console.log('Request URL is not in RESTful style!');
		}
	}

}).listen(8080); 

console.log('Server running at http://127.0.0.1:8080/');