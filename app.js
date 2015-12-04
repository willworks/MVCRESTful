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
	var params = '';
    req.addListener('data', function(chunk){  
        params += chunk;  
    })  
    .addListener('end', function(){	  
    	req = parser.parser(req);
    	req.data = params;
    	/**
    	 * req 用于存储parser切割好的数据，传递给其他层次使用
    	 * req.method 请求方式
    	 * req.path 请求路径
    	 * req.action 动作
    	 * req.id 操作的具体资源
    	 * req.data http传递的数据
    	 */
    	// 全部路由入口
    	router.router(req, res, function(result){ 
    		res.end(result); 
    	}); 
    });

}).listen(8080); 

console.log('Server running at http://127.0.0.1:8080/');