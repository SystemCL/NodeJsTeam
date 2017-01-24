var jsonxml = require("jsontoxml");
var request = require('request');
var express = require('express');

var redis = require('redis');
var redisClient = redis.createClient();
var app = express();
var fs = require('fs');


app.listen(9000, function () {
	 console.log("proxy started on 9000!!!");
});

app.get('/', function (req, res) {

		fs.readFile('./html/clientPage.html', function (err, html) {
				if (err) {
						throw err;
				}
				res.writeHeader(200, {"Content-Type": "text/html"});
				res.write(html);
				res.end();
		});
});

app.get("/insert", function (req, res) {
	res.writeHead(301,  {Location: '/'} );
	res.end();

	request.post({
		headers: {'content-type' : 'application/json'},
		url:     'http://localhost:8081/insert?firstname='+ req.query.firstname +'&lastname=' + req.query.lastname + '&age=' + req.query.age + '&group=' + req.query.group + '&sex=' + req.query.sex
	}, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			 // send back to client
				
		}
	});

	setTimeout(function(){ 
		alert("Inserted !"); }, 1000);

});

app.get("/persons", function (req, res) {
	console.log(req.url.toString());

	if (redisClient.get(req.url) == null ) {
		// se afla in cache
		res.write(" " + redisClient.get(req.url)); //aici da true
		res.end();
	} else {
		// nu se gaseste in cache
		request("http://localhost:8081/persons", function (error, response, body) {
			if (!error && response.statusCode == 200) {
				// put in cache
				redisClient.set(req.url, body, redis.print);
				var abc = jsonxml(body);
				res.write('<html><head></head><body>');
				res.write('<p>Respose here: </p>');
				//res.write('<p><textarea for="responseTextarea" rows="15" cols="80">'+ parser.toXml(body, options) +'</textarea></p>');
			 	// res.write('<p><textarea for="responseTextarea" rows="25" cols="120">'+ jsonxml(body) +'</textarea></p>');
				res.write('<p><textarea for="responseTextarea" rows="25" cols="120">'+ jsonxml(body) +'</textarea></p>');
				res.end('</body></html>');
			}
		});
	}
});