//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');
var express = require('express');
var app = express();

var PORT = 8081;

var mongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://localhost:27017/mydb';

//http://localhost:8081/
app.use(function(request, response, next) {

	console.time('handler name');
	// log each request to the console
	console.log(request.method, request.url);
	// continue doing what we were doing and go to the route
	next();
	console.timeEnd('handler name');
	console.log("--------------------------------")
});

app.route('/').get(function(request,response){
   response.send("Datawarehouse");
});

// http://localhost:8081/persons
// http://localhost:8081/persons?sex=F&group=FI-131
app.route('/persons').get(function(request,response){
	console.log(request.method);// pune acolo, dai run
	mongoClient.connect(url, function(err, db){
		var query = require('url').parse(request.url,true).query;
		if(query.firstname != null || query.lastname !=null || query.group != null || query.sex !=null ){
		//if(query.group != null || parseInt(query.age, 10) != 0 || query.firstname !=null || query.lastname !=null ){
			var query = require('url').parse(request.url,true).query;
			//parseInt(request.query.age, 10);
			db.collection('persons').find({firstname:query.firstname,lastname:query.lastname,group:query.group,sex:query.sex}, {}).toArray(function(err,result){
			//db.collection('persons').find({group:query.group, age:parseInt(query.age, 10), firstname:query.firstname, lastname:query.lastname}, {}).toArray(function(err,result){
				if(err){
					throw err;
				} else{
					response.json(result);
				}
			});
		} else {
			db.collection('persons').find().toArray(function(err, result){
				if(err){
					throw err;
				}
				response.json(result);
			});
		}
	});

});

// http://localhost:8081/persons/Balan  -search by firstname
app.route("/persons/:firstname").get(function(request, response) {
	mongoClient.connect(url, function (err, db) {
		db.collection('persons').find({'firstname':request.params.firstname}, {}).toArray(function (err, result) {
			if (err) {
				throw err;
			}
			response.json(result);
		});
	});
});

//not work yet
app.route('/deleteperson/:id').delete(function(request,response){
	mongoClient.connect(url, function(err,db){
		var personToDelete = request.params.id;
		db.collection('persons').remove({ '_id':personToDelete}, function(err){
			response.send((err === null) ? {msg: ''} : {msg:'error: '+err});
		});
	});
});

//it works with post method
app.route('/insert').post(function (request, response) {
	mongoClient.connect(url,function(err,db){
		//Exemplu pentru a scoate date din body
		// Get our form values. These rely on the "name" attributes
		//var userName = request.body.username;
		//var userEmail = request.body.useremail;
		var firstname = request.query.firstname; //eu am pus direct string //proxy o sa trimita date
		var lastname = request.query.lastname;
		var age = parseInt(request.query.age, 10);
		var sex = request.query.sex;
		var group = request.query.group;
		// Submit to the DB
		db.collection('persons').insert({
			"firstname" : firstname,
			"lastname" : lastname,
			"age": age,
			"sex": sex,
			"group": group
		}, function (err, doc) {
			if (err) {
				// If it failed, return error
				response.send("There was a problem adding the information to the database.");
			}
			else {
				// And forward to persons page
				response.redirect("persons");
			}
		});

	});
});

/*
app.post('/addUser', function(req, res){
	console.dir(req.body);
	res.send("test");
});
*/

var server = app.listen(PORT,function(){
	console.log("DataWareHouse listening on: http://localhost:%s", PORT);
});

