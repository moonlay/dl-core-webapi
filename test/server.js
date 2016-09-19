'use strict'
module.exports = new Promise((resolve, reject) => {
    try {
        var restify = require('restify');
        var server = restify.createServer();

        server.use(restify.queryParser());
        server.use(restify.bodyParser());
        server.use(restify.CORS());

        var v1BuyerRouter = require('../src/routers/v1/master/buyer-router');
        v1BuyerRouter.applyRoutes(server);

        var v1SupplierRouter = require('../src/routers/v1/master/supplier-router');
        v1SupplierRouter.applyRoutes(server);

        var v1ProductRouter = require('../src/routers/v1/master/product-router');
        v1ProductRouter.applyRoutes(server);

        var v1TextileRouter = require('../src/routers/v1/master/textile-router');
        v1TextileRouter.applyRoutes(server)

        var v1FabricRouter = require('../src/routers/v1/master/fabric-router');
        v1FabricRouter.applyRoutes(server);

        var v1AccessoriesRouter = require('../src/routers/v1/master/accessories-router');
        v1AccessoriesRouter.applyRoutes(server);

        var v1SparepartRouter = require('../src/routers/v1/master/sparepart-router');
        v1SparepartRouter.applyRoutes(server);

        var v1GeneralRouter = require('../src/routers/v1/master/general-router');
        v1GeneralRouter.applyRoutes(server);

        var v1UoMRouter = require('../src/routers/v1/master/uom-router');
        v1UoMRouter.applyRoutes(server);

        var v1UnitRouter = require('../src/routers/v1/master/unit-router');
        v1UnitRouter.applyRoutes(server);

        var v1CategoryRouter = require('../src/routers/v1/master/category-router');
        v1CategoryRouter.applyRoutes(server);

        var v1PurchaseOrderRouter = require('../src/routers/v1/purchasing/purchase-order-router');
        v1PurchaseOrderRouter.applyRoutes(server);

        var v1PurchaseOrderExternalRouter = require('../src/routers/v1/purchasing/purchase-order-external-router');
        v1PurchaseOrderExternalRouter.applyRoutes(server);

        server.listen(process.env.PORT, process.env.IP);
        console.log(`server created at ${process.env.IP}:${process.env.PORT}`);
        resolve(`${process.env.IP}:${process.env.PORT}`);
    }
    catch (e) {
        reject(e);
    };
});