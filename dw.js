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
});
