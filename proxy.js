
//Lets require/import the HTTP module
var http = require('http');
fs = require('fs');

//Lets define a port we want to listen to
const PORT=8080;
var index = require('./routes/index');






//We need a function which handles requests and send response
function handleRequest(request, response){


    fs.readFile('./clientMainPage.html', function (err, html) {
        if (err) {
            throw err;
        }
        response.writeHeader(200, {"Content-Type": "text/html"});
        response.write(html);
        response.end();
    });
}

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});