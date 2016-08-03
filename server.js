'use strict'

var restify = require('restify');
var server = restify.createServer();

server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.CORS());

var v1ProductRouter = require('./src/routers/v1/core/product-router');
var v2BuyerRouter=require('./src/routers/v1/core/buyer-router');
v1ProductRouter.applyRoutes(server); 
v2BuyerRouter.applyRoutes(server); 

server.listen(process.env.PORT, process.env.IP);
console.log(`server created at ${process.env.IP}:${process.env.PORT}`)