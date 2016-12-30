var server = require('./server');
server().then((server) => { 
    server.listen(process.env.PORT, process.env.IP);
    console.log(`server created at ${process.env.IP}:${process.env.PORT}`); 
});
