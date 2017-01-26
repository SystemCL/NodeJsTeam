//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');
var express = require('express');
var app = express();

var mongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
var PORT = parseInt(process.argv.slice(2));
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
//http://localhost:9000/persons?resp_firstname=Chirica&resp_lastname=Ionela&resp_age=22&resp_group=FI-131&resp_sex=F
app.route('/persons').get(function(request,response){
	console.log(request.method);

	mongoClient.connect(url, function(err, db){
		var query = require('url').parse(request.url,true).query;

		var searchPath = {};

		if (query.firstname != null) {
			searchPath.firstname = query.firstname ;
			console.log(searchPath);
		}

		if (query.lastname != null) {
			searchPath.lastname = query.lastname;
		}

        //i for case insensitive search
		db.collection('persons').find( {"firstname": {$regex: "^"+ query.firstname +".*", $options:"i"}, //incepe cu
										"lastname":{$regex: "^"+ query.lastname +".*", $options:"i"},
										"age": {$regex: ".*"+ query.age +".*", $options:"i"},
										"sex": {$regex: ".*"+ query.sex +".*", $options:"i"},
										  }

		).toArray(function(err, result){
			if(err){ throw err;}
			response.json(result);
		});
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

//it works with post method
app.route('/insert').post(function (request, response) {
	mongoClient.connect(url,function(err,db){
		var firstname = request.query.firstname; //eu am pus direct string //proxy o sa trimita date
		var lastname = request.query.lastname;
		var age = request.query.age;
		var sex = request.query.sex;
		var group = request.query.group;
		// Submit to the DB
		db.collection('persons').insert({
			"firstname" : firstname,
			"lastname" : lastname,
			"age": age,
			"group": group,
			"sex": sex
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

var server = app.listen(PORT,function(){
	console.log("DataWareHouse listening on: http://localhost:%s", PORT);
});

