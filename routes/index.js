var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Hello World page */
router.get('/helloworld', function(req, res){
  res.render('helloworld', {title:'Hello, World!'});
});



/* GET personlist page*/
/*router.get('/persons', function(req, res) {
  var db = req.db;
  var collection = db.get('persons'); //collection name in db //db.get('persons')
  collection.find({}, {}, function (e, docs) {
    res.render('persons', {
      "persons": docs
    });
  });
});*/

//group:req.params.group

router.get('/persons', function(req, res) { /// persons/:group

  var query = require('url').parse(req.url,true).query;
  var db = req.db;
  var collection = db.get('persons'); //collection name in db //db.get('persons')
  collection.find({sex:query.sex, group:query.group}, {}, function (e, docs1) {
    res.render('persons', {
      "persons": docs1
    });
  });
  //res.send(req.params.group);
  //res.send(//path la pagina);
  //in caz ca avem in request /persons, atunci o sa-i trimita pagina
  // ap da, da sa facem acum un fisier proxy si sal pornim sa ne conectam la el

});




module.exports = router;
