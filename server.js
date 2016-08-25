'use strict'

var restify = require('restify');
var server = restify.createServer();

server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.CORS());

var v1BuyerRouter=require('./src/routers/v1/core/buyer-router');
v1BuyerRouter.applyRoutes(server); 

var v1SupplierRouter = require('./src/routers/v1/core/supplier-router');
v1SupplierRouter.applyRoutes(server); 


var v1TextileRouter = require('./src/routers/v1/core/textile-router');
v1TextileRouter.applyRoutes(server)

var v1FabricRouter = require('./src/routers/v1/core/fabric-router');
v1FabricRouter.applyRoutes(server);

var v1AccessoriesRouter = require('./src/routers/v1/core/accessories-router');
v1AccessoriesRouter.applyRoutes(server);

var v1SparepartRouter = require('./src/routers/v1/core/sparepart-router');
v1SparepartRouter.applyRoutes(server);

var v1UoMRouter = require('./src/routers/v1/core/UoM-router');
v1UoMRouter.applyRoutes(server);

var v1GeneralMerchandiseRouter = require('./src/routers/v1/core/general-merchandise-router');
v1GeneralMerchandiseRouter.applyRoutes(server);

var v1POGarmentGeneralRouter = require('./src/routers/v1/po/po-garment-general-router');
v1POGarmentGeneralRouter.applyRoutes(server);

var v1POGarmentSparepartRouter = require('./src/routers/v1/po/po-garment-sparepart-router');
v1POGarmentSparepartRouter.applyRoutes(server);

var v1POTextileJobOrderRouter = require('./src/routers/v1/po/po-textile-job-order-external-router');
v1POTextileJobOrderRouter.applyRoutes(server);

var v1POGarmentFabricRouter = require('./src/routers/v1/po/po-garment-fabric-router');
v1POGarmentFabricRouter.applyRoutes(server);

var v1POTextileJobOrderRouter = require('./src/routers/v1/po/po-textile-general-atk-router');
v1POTextileJobOrderRouter.applyRoutes(server);

var v1POGarmentAccessoriesRouter = require('./src/routers/v1/po/po-garment-accessories-router');
v1POGarmentAccessoriesRouter.applyRoutes(server);

server.listen(process.env.PORT, process.env.IP);
console.log(`server created at ${process.env.IP}:${process.env.PORT}`)