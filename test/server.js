'use strict'
module.exports = new Promise((resolve, reject) => {
    try {
        var restify = require('restify');
        var server = restify.createServer();

        server.use(restify.queryParser());
        server.use(restify.bodyParser());
        server.use(restify.CORS());

        var v1ProductRouter = require('../src/routers/v1/core/product-router');
        v1ProductRouter.applyRoutes(server);
        
        var v1BuyerRouter = require('../src/routers/v1/core/buyer-router');
        v1BuyerRouter.applyRoutes(server);

        server.listen(process.env.PORT, process.env.IP);
        console.log(`server created at ${process.env.IP}:${process.env.PORT}`);
        resolve(`${process.env.IP}:${process.env.PORT}`);
    }
    catch (e) {
        reject(e);
    };
});