var querystring = require('querystring');
var _events = ['listAll', 'listUser', 'createUser', 'addUSer', 'deleteUser'];

function controller(method, id, action, callback){
			var module = require( '../models/model');
			var dao = new module.dao();
			var e = event(method, id);
			console.log(e);
			var fn = dao[e];
			return fn(method, id, action, callback);
}

function event(method, id){
	 var  localEvent;
	 switch(method){
		case 'GET' : 
				if(id === '' || id === undefined){
					localEvent = 'listAll'; 
				}else{
					localEvent = 'listUser'; 
				}
				break;
		case 'PUT' : 
				localEvent = 'createUser'; 
				break;
		case 'POST' : 
				localEvent = 'addUSer'; 
				break;
		case 'DELETE' : 
				localEvent = 'deleteUser'; 
				break;	
	 }
	 return localEvent;
}

exports.controller = controller;
