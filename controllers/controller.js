function group_dao(){
     //创建数据库连接
	var dbConnection = mysql.createConnection({
		  host     : 'localhost',
		  user     : 'root',
		  password : 'admin',
		  database : 'nodejs'
	});
	
	this.retrieve = function(id, params, callback){
		var groups = [];		
		// 执行数据库查询，在回调函数中处理查询结果
		dbConnection.query('SELECT * FROM groups where id = ?', [id], function(err, rows, fields) {
			if (err) throw err;
		     for(var i=0; i<rows.length; i++){
				var group = new Group(rows[i].id, rows[i].name, rows[i].location, rows[i].size);
				groups.push(group);
			}
			callback(groups);
			dbConnection.end();
		});	
	};
	
	this.list = function(id, params, callback){
	    var groups = [];		
		// 执行数据库查询，在回调函数中处理查询结果
		dbConnection.query('SELECT * FROM groups', function(err, rows, fields) {
			if (err) throw err;
		     for(var i=0; i<rows.length; i++){
				var group = new Group(rows[i].id, rows[i].name, rows[i].location, rows[i].size);
				groups.push(group);
			}
			//执行回调函数
			callback(groups);
			dbConnection.end();
		});	
		
	};
	
	this.postMember = function(id, params, callback){
		if(arguments.length >= 2){
			var newId = arguments[0];
			var params = arguments[1];
			// 执行数据库插入操作，通过Javascript 对象传递参数
			dbConnection.query('INSERT INTO groups SET ?', {id: newId, name: params.name, location: params.location, size: params.size} , function(err, result) {
			if (err) throw err;
			//执行回调函数
			callback({id: newId});
			dbConnection.end();
		});	
		}
	};
		
	this.update = function(id, params, callback){
		if(arguments.length >= 2){
			var newId = arguments[0];
			var params = arguments[1];
			// 执行数据库更新操作
			dbConnection.query('UPDATE groups SET name = ?, location=?, size=? where id = ?', [params.name,  params.location, params.size, id] , function(err, result) {
			if (err) throw err;
			//执行回调函数
			callback({id: newId});
			dbConnection.end();
		});	
		}
	};
	
	this.deleteMember = function(id, params, callback){
		// 执行数据库删除操作
		dbConnection.query('DELETE FROM groups where id = ?', [id] , function(err, result) {
			if (err) throw err;
			//执行回调函数
			callback({id: id});
			dbConnection.end();
		});
	};
}

exports.dao = group_dao;
