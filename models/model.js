var fs = require('fs');
var querystring = require('querystring');

// CURD
exports.create = function(info, callback) {
	info = querystring.parse(info);
	fs.readFile( __dirname + "/" + "../data/users.json", 'utf8', function (err, data) {
    	var item = 'user' + info.id;
    	data = JSON.parse(data);
    	if (data[item] !== undefined) {
    		console.log('Item is already existed!');
    		callback('Item is already existed!');
    	} else {
    		data[item] = info;
    		console.log('\nADD' + ' ' +item + '\n' + data);
    		// 添加需要在控制台查看，查看XHR请求返回的结果
    		callback('\nADD' + ' ' +item + '\n' + JSON.stringify(data));
    	}
	});
};

exports.update = function(id, info, callback) {
	info = querystring.parse(info);
	fs.readFile( __dirname + "/" + "../data/users.json", 'utf8', function (err, data) {
    	var item = 'user' + id;
    	data = JSON.parse(data);
    	if (data[item] === undefined) {
    		console.log('Item is not found!');
    		callback('Item is not found!');
    	} else {
    		data[item] = info;
    		console.log('\nUPDATE' + ' ' +item + '\n' + data);
    		// 添加需要在控制台查看，查看XHR请求返回的结果
    		callback('\nUPDATE' + ' ' +item + '\n' + JSON.stringify(data));
    	}
	});
};

exports.read = function(id, callback) {
	if(id === '' || id === undefined) {
    	fs.readFile( __dirname + "/" + "../data/users.json", 'utf8', function (err, data) {
        	console.log('\nGET all items' + '\n' + data);
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
	    		console.log('\nGET' + ' ' +item + '\n' + res);
	    		callback(res);
	    	}
		});
	}
};

exports.delete = function(id, callback) {
	fs.readFile( __dirname + "/" + "../data/users.json", 'utf8', function (err, data) {
    	var item = 'user' + id;
    	data = JSON.parse(data);
    	if (data[item] === undefined) {
    		console.log('Item is not found!');
    		callback('Item is not found!');
    	} else {
    		delete data[item];
    		console.log('\nDELETE' + ' ' +item + '\n' + data);
    		// 删除需要在控制台查看，查看XHR请求返回的结果
    		callback('\nDELETE' + ' ' +item + '\n' + JSON.stringify(data));
    	}
	});
};

/*
// 调通测试代码
exports.test = function(action, callback){
	callback(action);
};
*/