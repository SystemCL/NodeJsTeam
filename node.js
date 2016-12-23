
// Create UDP Server
var dgram = require('dgram');
var socketUDP = dgram.createSocket({type:'udp4', reuseAddr: true });//createSocket('udp4');


var multicastAddress = '239.1.2.3';
var multicastPort = 5001;
var sockets = [];

var args = process.argv.slice(2);
console.log("argumente: " + args);

var connections = JSON.parse("[" + args[0] + "]");
var portTcp = args[1];

//console.log(connections)
//var info = JSON.parse( args[1] );
//console.log(args[1]);


socketUDP.bind(multicastPort, '0.0.0.0',function(){
    socketUDP.addMembership('239.1.2.3');
});


// TCP Module
const net = require('net');

socketUDP.on("message", function ( data, rinfo ) {
    console.log("Give nr of nodes", rinfo.address, " : ", JSON.parse(data));
    var data = JSON.parse(data);
    //console.log("> ", data);

    switch (data.type) {
        case "get_info":

            var response = {};
            response.type = "post";
            response.connetions = "4";

            const nodeTCP = new net.Socket();
            nodeTCP.connect(data.port, function () {
                console.log("Connected to client");
                nodeTCP.write(JSON.stringify(response));
            });

            nodeTCP.on('data', function (data) {
                var msg = JSON.parse(data);
                console.log(msg);
            });


            break;

    }
});



/*
server.createServer( function(socket){
    // Identify name of client
    socket.name = socket.remoteAddress + ":" + socket.remotePort;
    console.log("New connection > " + socket.name);

    // add socket to connection array
    sockets.push(socket);

    socket.on('data', function(data){

        var msg = JSON.parse(data);
    });


}).listen(8000);
*/



/*
function connectionHandler(socket){

    sockets.append(socket);

    socketTCP.on('data', function () {
        var msg = JSON.parse(data);
        console.log(msg);
    });

    socketTCP.on('error', function () {

    });
}

connections.forEach(function (item, index, array) {
    socketTCP.createServer(connectionHandler).listen(item);
    console.log('Connected to: ' + item);
});
*/