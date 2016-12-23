var dgram = require('dgram');
var socket = dgram.createSocket('udp4');

var testMessage = {"type":"get", "port":""};

var multicastAddress = '239.1.2.3';
var portUDPmulticast = 5001;
var portUDP = 5000;

var portTCP = 9000;


socket.bind(portUDP, '0.0.0.0',function(){
    socket.addMembership('239.1.2.3');
});

socket.on("message", function ( data, rinfo ) {
    console.log("Message received from ", rinfo._remoteAddress, " : ", data.toString());
});

setInterval(function () {

     //var message = ;
    // message.type = "get";
    // message.port = myport;

    var request = {};
    request.type = "get_info";
    request.port = portTCP;

    socket.send(JSON.stringify(request),
        portUDPmulticast,
        multicastAddress,
        function (err) {
            if (err) console.log(err);

            console.log("Ask UPD all nodes");
        }
    );
}, 3000);


// create TCP server for data transfer
// client - node protocol

var server = require("net");
var bestNode = 0;

 server.createServer( function(socket){
    // Identify name of client
    socket.name = socket.remoteAddress + ":" + socket.remotePort;
    //console.log("New connection > " + socket.name);

    socket.on('data', function(data){
        var msg = JSON.parse(data);
        //console.log(msg);

        switch (msg.type) {
            case "post":
                console.log("Node: > " + socket.remotePort + " conections: " + msg.connetions);
                // call node to get info list

                if (msg.connections > bestNode) {
                    //
                    bestNode = msg.connections
                }

                break;
        }


     });

 }).listen(portTCP);



// after 4 sec
setInterval(function () {
    // ask node for data
    var request = {};
    request.type = "get";
    request.sort = "asc"; // asc | desc
    server.write(JSON.stringify(request));
}, 4000);

