
//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');
var express = require('express');
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var router = express.Router();


var PORT = 8081;

var mongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://localhost:27017/mydb';

var str = "";

//http://localhost:8081/
app.route('/').get(function(req,res){
   res.send("Datawarehouse");
});

//http://localhost:8081/personslist
app.route('/personslist').get(function(req,res){
    console.log(req.method);// pune acolo, dai run
    mongoClient.connect(url, function(err, db){
        db.collection('persons').find().toArray(function(err, result){
           if(err){
               throw err;
           }
           res.json(result);
        });
    });

});


//http://localhost:8081/persons?sex=F&group=FI-131
app.route('/persons').get(function(req,res){
   mongoClient.connect(url,function(err,db){
       var query = require('url').parse(req.url,true).query;
      db.collection('persons').find({sex:query.sex, group:query.group}, {}).toArray(function(err,result){
          if(err){
              throw err;
          }
          res.json(result);
      });
   });

});


app.route('/addperson').post(function (req, res) {
    mongoClient.connect(url,function(err,db){
        //Exemplu pentru a scoate date din body
        // Get our form values. These rely on the "name" attributes
        //var userName = req.body.username;
        //var userEmail = req.body.useremail;
        var firstname = "Ciocan"; //eu am pus direct string
        var lastname = "Ion";
        var age = 21;
        var sex = "M";
        var group = "FI-121";
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
                res.send("There was a problem adding the information to the database.");
            }
            else {
                // And forward to success page
                res.redirect("personslist");
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

