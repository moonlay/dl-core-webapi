'use strict'

var restify = require('restify');
var server = restify.createServer();
// restify.CORS.ALLOW_HEADERS.push('accept-encoding');
// restify.CORS.ALLOW_HEADERS.push('accept-language');
// restify.CORS.ALLOW_HEADERS.push('content-type');
// restify.CORS.ALLOW_HEADERS.push('x-forwarded-proto');
// restify.CORS.ALLOW_HEADERS.push('x-forwarded-port');
// restify.CORS.ALLOW_HEADERS.push('x-region');
// restify.CORS.ALLOW_HEADERS.push('x-forwarded-for');
 
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.CORS());
server.use(restify.fullResponse());

var v1BuyerRouter = require('./src/routers/v1/master/buyer-router');
v1BuyerRouter.applyRoutes(server);

var v1SupplierRouter = require('./src/routers/v1/master/supplier-router');
v1SupplierRouter.applyRoutes(server);

var v1ProductRouter = require('./src/routers/v1/master/product-router');
v1ProductRouter.applyRoutes(server);

var v1TextileRouter = require('./src/routers/v1/master/textile-router');
v1TextileRouter.applyRoutes(server);

var v1FabricRouter = require('./src/routers/v1/master/fabric-router');
v1FabricRouter.applyRoutes(server);

var v1AccessoriesRouter = require('./src/routers/v1/master/accessories-router');
v1AccessoriesRouter.applyRoutes(server);

var v1SparepartRouter = require('./src/routers/v1/master/sparepart-router');
v1SparepartRouter.applyRoutes(server);

var v1GeneralRouter = require('./src/routers/v1/master/general-router');
v1GeneralRouter.applyRoutes(server);

var v1UoMRouter = require('./src/routers/v1/master/uom-router');
v1UoMRouter.applyRoutes(server);

var v1UnitRouter = require('./src/routers/v1/master/unit-router');
v1UnitRouter.applyRoutes(server);

var v1CategoryRouter = require('./src/routers/v1/master/category-router');
v1CategoryRouter.applyRoutes(server);

var v1PurchaseOrderExternalRouter = require('./src/routers/v1/purchasing/purchase-order-external-router');
v1PurchaseOrderExternalRouter.applyRoutes(server);

var v1PurchaseOrderRouter = require('./src/routers/v1/purchasing/purchase-order-router');
v1PurchaseOrderRouter.applyRoutes(server, "/v1/purchasing/po");

var v1DeliveryOrderRouter = require('./src/routers/v1/purchasing/delivery-order-router');
v1DeliveryOrderRouter.applyRoutes(server);


// server.on('NotFound', function(request, response, cb) {

// }); // When a client request is sent for a URL that does not exist, restify will emit this event. Note that restify checks for listeners on this event, and if there are none, responds with a default 404 handler. It is expected that if you listen for this event, you respond to the client.
// server.on('MethodNotAllowed', function(request, response, cb) {

// }); // When a client request is sent for a URL that does exist, but you have not registered a route for that HTTP verb, restify will emit this event. Note that restify checks for listeners on this event, and if there are none, responds with a default 405 handler. It is expected that if you listen for this event, you respond to the client.
// server.on('VersionNotAllowed', function(request, response, cb) {

// }); // When a client request is sent for a route that exists, but does not match the version(s) on those routes, restify will emit this event. Note that restify checks for listeners on this event, and if there are none, responds with a default 400 handler. It is expected that if you listen for this event, you respond to the client.
// server.on('UnsupportedMediaType', function(request, response, cb) {

// }); // When a client request is sent for a route that exist, but has a content-type mismatch, restify will emit this event. Note that restify checks for listeners on this event, and if there are none, responds with a default 415 handler. It is expected that if you listen for this event, you respond to the client.
// server.on('after', function(request, response, route, error) {

// }); // Emitted after a route has finished all the handlers you registered. You can use this to write audit logs, etc. The route parameter will be the Route object that ran.
// server.on('uncaughtException', function(request, response, route, error) {

// }); // Emitted when some handl
server.listen(process.env.PORT, process.env.IP);
console.log(`server created at ${process.env.IP}:${process.env.PORT}`)