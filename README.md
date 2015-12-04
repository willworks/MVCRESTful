# RESTful
A RESTful web system build with node

### node获取url数据

官方API参考[node URL](http://nodeapi.ucdok.com/#/api/url.html)

		/* 测试代码

		 * POST请求
		   var xmlhttp = new XMLHttpRequest();
		   var user = 'name=mohit&password=password4&profession=teacher&id=4';
		   xmlhttp.open('POST','http://localhost:8080/addUser',true);
		   xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		   xmlhttp.send(user);

		 * GET请求
		    var xmlhttp = new XMLHttpRequest();
		    // xmlhttp.open('GET','http://localhost:8080/listUsers');
		    xmlhttp.open('GET','http://localhost:8080/listUser/1');
		    xmlhttp.send();

		 * PUT请求
		 	var xmlhttp = new XMLHttpRequest();
		 	var user = 'name=mohit&password=password4&profession=teacher&id=1';
		 	xmlhttp.open('PUT','http://localhost:8080/updateUser/1',true);
		 	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		 	xmlhttp.send(user);

	     * DELETE请求
	        var xmlhttp = new XMLHttpRequest();
	        xmlhttp.open('DELETE','http://localhost:8080/deleteUser/1');
	        xmlhttp.send();
	        
		*/

		var http = require('http'),
			fs = require('fs'),
			url = require('url'),
			querystring = require('querystring');

		http.createServer(function (req, res) { 

			//获取请求方法
			var method = req.method; 

			//获取原始请求路径
			var path = req.url; 

			// 获取不带参数的路径
			var pathname = url.parse(path).pathname; 

			// node path模块自带的pathname.split(path.sep)用于切割路径
			// 但是由于windows和*nix下，具体看http://nodeapi.ucdok.com/#/api/path.html
			// linux上的例子:'foo/bar/baz'.split(path.sep) returns ['foo', 'bar', 'baz']
			// Windows上的例子:'foo\\bar\\baz'.split(path.sep) returns ['foo', 'bar', 'baz']

			// 这里用pathname.split('/')来实现切割各个参数
			pathname = pathname.split('/');

			//获取GET/DELETE url传递的参数 通过来获取params.XXX
			var params = url.parse(req.url).query; 
				params = querystring.parse(params);

			//获取POST/PUT传递的参数 通过addListener来实现
			var paramsPost ='';  
		    req.addListener('data', function(chunk){  
		        paramsPost += chunk;  
		    })  
		    .addListener('end', function(){  
		        paramsPost = querystring.parse(paramsPost);
		        console.log(paramsPost);
		    });

		}).listen(8080, '127.0.0.1'); 

		console.log('Server running at http://127.0.0.1:8080/');

### RESTful API列表


<table style="margin:0 auto"> 
	<tbody>
		<tr>
			<th>序号</th>
			<th>URI</th>
			<th>HTTP 方法</th>
			<th>发送内容</th>
			<th>结果</th> 
		</tr>

		<tr>
			<td>1</td>
			<td>listUsers</td>
			<td>GET</td>
			<td>空</td>
			<td>显示所有用户列表</td> 
		</tr>


		<tr>
			<td>2</td>
			<td>listUser/id</td>
			<td>GET</td>
			<td>空</td>
			<td>显示用户详细信息</td> 
		</tr>


		<tr>
			<td>3</td>
			<td>addUser</td>
			<td>POST</td>
			<td>JSON 字符串</td>
			<td>添加新用户</td> 
		</tr>


		<tr>
			<td>4</td>
			<td>updateUser/id</td>
			<td>PUT</td>
			<td>JSON 字符串</td>
			<td>更新用户</td> 
		</tr>


		<tr>
			<td>5</td>
			<td>deleteUser/id</td>
			<td>DELETE</td>
			<td>空</td>
			<td>删除用户</td> 
		</tr>



	</tbody>
</table>

<br />

关于PUT和POST的差别，可以看看《HTTP权威指南》，里边提到的是

 - PUT：“让服务器用请求的主体部分来创建一个由请求的URL命名的新文档，或者是替换指定URL的文档”
 - POST：“post用于向服务器发送数据，而put用于向服务器上的资源中存储数据，通常POST方法用于HTML中的表单，用户在表单中填好数据之后，点击发送，填好的数据便会发送到服务器，然后由服务器将其送到它要去的地方(例如一个网关程序，然后由这个程序对数据进行处理)”

通过链接来看的话

 - PUT：http://localhost:8080/addUser/1 body:'name=mohit&password=password4&profession=teacher&id=4'
 - POST：http://localhost:8080/addUser body:'name=mohit&password=password4&profession=teacher&id=4'

在HTTP规范中对POST和PUT是这样定义的：
  
 - The POST method isused to request that the origin server accept the entity enclosed in therequest as a new subordinate of the resource identified by the Request-URI inthe Request-Line ...... If a resource has been created on the origin server,the response SHOULD be 201 (Created) and contain an entity which describes thestatus of the request and refers to the new resource, and a Location header.
  
 - The PUT methodrequests that the enclosed entity be stored under the supplied Request-URI. Ifthe Request-URI refers to an already existing resource, the enclosed entitySHOULD be considered as a modified version of the one residing on the originserver. If the Request-URI does not point to an existing resource, and that URIis capable of being defined as a new resource by the requesting user agent, theorigin server can create the resource with that URI.

大概意思就是，POST全部数据传到服务器处理，而PUT指定了URL上的资源进行操作，但是实际上，最大的差别不是在语义，而是在幂等和非幂等

