/**
 * 负责将请求处理成JSON对象
 * url处理具体参照 http://nodeapi.ucdok.com/#/api/url.html
 */
var url = require('url'),
	path = require('path'); // path模块处理路径

function parser(req){ 
	var method = req.method.toUpperCase(); //获取请求方法，并转为大写
	var path = req.url; //获取原始请求路径，例如/user?id=1&name=kevin 
	var pathname = url.parse(path).pathname; // 获取不带参数的路径，例如/user

	// node path模块自带的pathname.split(path.sep)用于切割路径
	// 但是由于windows和*nix下，具体看http://nodeapi.ucdok.com/#/api/path.html
	/** path.sep
	 * linux上的例子:'foo/bar/baz'.split(path.sep) returns ['foo', 'bar', 'baz']
	 * Windows上的例子:'foo\\bar\\baz'.split(path.sep) returns ['foo', 'bar', 'baz']
	 */

	// 这里用pathname.split('/')来实现切割各个参数
	pathname = pathname.split('/');

	return  { 
		method : method, 
		path : path,
		action : pathname[1],
		id : pathname[2]
	}; 
}

exports.parser = parser;