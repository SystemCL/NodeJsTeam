var jsonxml = require("jsontoxml");
var request = require('request');
var express = require('express');
//var flash = require('connect-flash');

var redis = require('redis');
var redisClient = redis.createClient();
var app = express();
var fs = require('fs');

var dwAdress = "http://localhost:";
var cacheTimeOut = 10;

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

	console.log(req.query);

	var fname = 'firstname='+ req.query.firstname;
	var lname = '&lastname=' + req.query.lastname;
	var age = '&age=' + req.query.age;
	var group = '&group=' + req.query.group;
	var sex = '&sex=' + req.query.sex;

	var finalUrl = dwAdress + randomNumber(9500,9501) + "/insert?" + fname +lname + age + group + sex;

	request.post({
		headers: {'content-type' : 'application/json'},
		url:    finalUrl
	}, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			// send back to client
			/*response.writeHead(301,  {Location: '/'});
			response.end();*/
		}
	});

	res.writeHead(301,  {Location: '/'} );
	res.end();
});

app.get("/persons", function (req, res) {

	redisClient.get(req.url, function (error, reply) {

		var fname = '?firstname='+ req.query.resp_firstname ;
		var lname =	'&lastname=' + req.query.resp_lastname ;
		var age = '&age=' + req.query.resp_age ;
		var group = '&group=' + req.query.resp_group ;
		var sex = '&sex=' + req.query.resp_sex;
	//	var sex = '&sex=' +  ""; //req.query.resp_sex;

		// loadbalancing in one line :D
		var finalUrl = dwAdress + randomNumber(9500,9501) + "/persons" + fname + lname + age + group + sex;
		console.log("LOADBALANCING URL >>>>", finalUrl);

		if (reply) {

			console.log("data din cache: " + reply);

			if (req.query.resp_type == "xml") {
				// SEND DATA XML
				res.write('<html><head></head><body>');
				res.write('<p>Respose here: </p>');
				res.write('<p><textarea for="responseTextarea" rows="25" cols="120">'+ jsonxml(reply) +'</textarea></p>');

			} else {
				res.write('<html><head></head><body>');
				res.write('<p>Respose here: </p>');
				res.write('<p><textarea for="responseTextarea" rows="25" cols="120">'+ reply +'</textarea></p>');
			}
			res.end('</body></html>');

		} else {

			console.log("nu sunt in cache");
			request(finalUrl, function (error, response, body) {
				if (!error && response.statusCode == 200) {

					redisClient.set(req.url, body, redis.print);
					redisClient.expire(req.url, cacheTimeOut);

					if (req.query.resp_type == "xml") {
						// SEND DATA XML
						res.write('<html><head></head><body>');
						res.write('<p>Respose here: </p>');
						res.write('<p><textarea for="responseTextarea" rows="25" cols="120">'+ jsonxml(body) +'</textarea></p>');

					} else {
						res.write('<html><head></head><body>');
						res.write('<p>Respose here: </p>');
						res.write('<p><textarea for="responseTextarea" rows="25" cols="120">'+ body +'</textarea></p>');

					}
					res.end('</body></html>');
				}
			});

		}
	});

});

