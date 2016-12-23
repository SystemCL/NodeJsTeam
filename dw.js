
//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');
var express = require('express');
var app = express();
var PORT = 8081;

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var mongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://localhost:27017/mydb';

var str = "";

app.route('/persons').get(function(req,res){
    mongoClient.connect(url, function(err, db){
        db.collection('persons').find().toArray(function(err, result){
           if(err){
               throw err;
           }
           res.send(result);
        });
    });

});

var server = app.listen(PORT,function(){
    console.log("DataWareHouse listening on: http://localhost:%s", PORT);
});
/*
 // Use connect method to connect to the Server
 mongoClient.connect(url, function (err, db) {
 if (err) {
 console.log('Unable to connect to the mongoDB server. Error:', err);
 } else {
 console.log('Connection established to', url);
 // Get the documents collection
 var collection = db.collection('persons');
 collection.find({}).toArray(function (err, result) {
 if (err) {
 console.log(err);
 } else if (result.length) {
 console.log('Found:', JSON.stringify(result));
 } else {
 console.log('No document(s) found with defined "find" criteria!');
 }
 //Close connection
 //db.close();
 });
 // do some work here with the database.

 //Close connection
 //db.close();
 }
 });*/
/*
//Lets require/import the HTTP module
var http = require('http');

var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/mydb');


const PORT=9000;


//We need a function which handles requests and send response
function handleRequest(request, response){
        response.writeHeader(200, {"Content-Type": "text/html"});
        response.write("raspunsul");
        response.end();
}

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("DataWareHouse listening on: http://localhost:%s", PORT);
}); */