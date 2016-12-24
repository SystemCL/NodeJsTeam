
//Lets require/import the HTTP module
var http = require('http');
var redis = require('redis');
client = redis.createClient();
fs = require('fs');

//Lets define a port we want to listen to
const PORT=8080;


//We need a function which handles requests and send response
function handleRequest(request, response){

    // put in cache
    client.set('string key', 'Hello World', redis.print);
    // Expire in 3 seconds
    client.expire('string key', 3);
    // get from
    client.get('string key');

    // vlad
    // faci cache numai la requesturile care cer date
    //

    fs.readFile('./clientPage.html', function (err, html) {
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