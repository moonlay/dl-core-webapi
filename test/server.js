'use strict'
module.exports = new Promise((resolve, reject) => {
    try {
        var restify = require('restify');
        var server = restify.createServer();

        server.use(restify.queryParser());
        server.use(restify.bodyParser());
        server.use(restify.CORS());

        var v1BuyerRouter = require('../src/routers/v1/core/buyer-router');
        v1BuyerRouter.applyRoutes(server);

        var v1FabricRouter = require('../src/routers/v1/core/fabric-router');
        v1FabricRouter.applyRoutes(server);
        
        var v1SparepartRouter = require('../src/routers/v1/core/sparepart-router');
        v1SparepartRouter.applyRoutes(server);
        
        server.listen(process.env.PORT, process.env.IP);
        console.log(`server created at ${process.env.IP}:${process.env.PORT}`);
        resolve(`${process.env.IP}:${process.env.PORT}`);
    }
    catch (e) {
        reject(e);
    };
});