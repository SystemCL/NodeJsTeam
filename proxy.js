
//Lets require/import the HTTP module
var http = require('http');
var redis = require('redis');
var express = require('express');

client = redis.createClient();
fs = require('fs');

//Lets define a port we want to listen to
const PORT=8080;


//We need a function which handles requests and send response
function handleRequest(request, response){

}

/*module.exports.findPersonByFirstName = function(db, redis, firstname, callback) {
	redis.get(firstname, function (err, reply) {
		if (err) callback(null);
		else if (reply)
			callback(JSON.parse(reply));
		else {
			//Firstname doesn't exist in cache - we need to query the main database
			db.collection('persons').findOne({
				firstname: firstname
			}, function (err, doc) {
				if (err || !doc) callback(null);
				else {//Person found in database, save to cache and
					//return to client
					redis.set(firstname, JSON.stringify(doc), function () {
							callback(doc);
						}
					);
				}
			});
		}
	});
}

app.get('/persons/:firstname', function(req,res) {
	if(!req.param('firstname')) res.status(400).send("Please send a proper firstname");
	else {
		access.findPersonByFirstName(db,redis,req.param('firstname'), function(person){
			if(!person) res.status(500).send("Server error");
			else res.status(200).send(person)
			});
	}
});*/


//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
	//Callback triggered when server is successfully listening. Hurray!
	console.log("Server listening on: http://localhost:%s", PORT);
});



// nu stergeeeee !!!


// put in cache
// client.set('string key', 'Hello World', redis.print);
// // Expire in 3 seconds
// client.expire('string key', 3);
// // get from
// client.get('string key');

// vlad
// faci cache numai la requesturile care cer date
//
//

// var myReq = {
//
//     host: 'www.nodejitsu.com',
//     path: '/',
//     //since we are listening on a custom port, we need to specify it by hand
//     port: '1337',
//     //This is what changes the request to a POST request
//     method: 'POST'
// };

// http.request(myReq, function (err, res) {
//    //ceva
//     console.log(res);
// });