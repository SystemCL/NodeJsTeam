var jsonxml = require("jsontoxml");
var request = require('request');
var express = require('express');
//var flash = require('connect-flash');

var redis = require('redis');
var redisClient = redis.createClient();
var app = express();
var fs = require('fs');
var dwAdress = "http://localhost:";

app.listen(9000, function () {
	console.log("proxy started on 9000!!!");
});


function randomNumber (low, high) {
	return Math.floor(Math.random() * (high - low + 1) + low);
}

app.use(function(request, response, next) {

	console.time('handler name');
	// log each request to the console
	console.log(request.method, request.url);
	// continue doing what we were doing and go to the route
	next();
	console.timeEnd('handler name');
	console.log("--------------------------------")
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
});

app.get("/persons", function (req, res) {

	redisClient.get(req.url, function (error, reply) {

		// loadbalancing in one line :D
		var finalUrl = dwAdress + randomNumber(9500,9501) + "/persons";
		console.log("LOADBALANCING URL >>>>", finalUrl);

		if (reply) {

			console.log("data din cache: " + reply);
			res.write(" " + redisClient.get(req.url)); //aici da true
			res.end();

		} else {

			console.log("nu sunt in cache");
			request(finalUrl, function (error, response, body) {
				if (!error && response.statusCode == 200) {

					redisClient.set(req.url, body, redis.print);
					redisClient.expire(req.url, 5); // is in cache fot 5 sec

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

});

