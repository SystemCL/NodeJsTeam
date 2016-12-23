//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');
var express = require('express');
var app = express();

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var mongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://localhost:27017/mydb';

var str = "";

app.route('/persons').get(function(req,res){
  mongoClient.connect(url, function(err, db){
    var cursor = db.collection('persons').find({});
      cursor.each(function(err,item){
          if(item != null){
            str = str + "&nbsp;&nbsp;&nbsp;&nbsp;" + item.firstname + "</br>";
          }
      });
      res.send(str);
      //var cursor = collection.find({});
  });


});

var server = app.listen(8081,function(){});
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
