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

        var v1SupplierRouter = require('../src/routers/v1/core/supplier-router');
        v1SupplierRouter.applyRoutes(server);

        var v1TextileRouter = require('../src/routers/v1/core/textile-router');
        v1TextileRouter.applyRoutes(server);

        var v1FabricRouter = require('../src/routers/v1/core/fabric-router');
        v1FabricRouter.applyRoutes(server);

        var v1SparepartRouter = require('../src/routers/v1/core/sparepart-router');
        v1SparepartRouter.applyRoutes(server);

        var v1AccessoriesRouter = require('../src/routers/v1/core/accessories-router');
        v1AccessoriesRouter.applyRoutes(server);

        var v1UomRouter = require('../src/routers/v1/core/uom-router');
        v1UomRouter.applyRoutes(server);

        var v1GeneralMerchandiseRouter = require('../src/routers/v1/core/general-merchandise-router');
        v1GeneralMerchandiseRouter.applyRoutes(server);

        var v1POGarmentGeneralRouter = require('../src/routers/v1/po/po-garment-general-router');
        v1POGarmentGeneralRouter.applyRoutes(server);

        var v1POGarmentFabricRouter = require('../src/routers/v1/po/po-garment-fabric-router');
        v1POGarmentFabricRouter.applyRoutes(server);

        var v1POGarmentSparepartRouter = require('../src/routers/v1/po/po-garment-sparepart-router');
        v1POGarmentSparepartRouter.applyRoutes(server);

        var v1POTextileSparepartRouter = require('../src/routers/v1/po/po-textile-sparepart-router');
        v1POTextileSparepartRouter.applyRoutes(server);

        var v1POTextileJobOrderRouter = require('../src/routers/v1/po/po-textile-job-order-external-router');
        v1POTextileJobOrderRouter.applyRoutes(server);

        var v1POTextileGeneralATKRouter = require('../src/routers/v1/po/po-textile-general-atk-router');
        v1POTextileGeneralATKRouter.applyRoutes(server);

        var v1POGarmentAccessoriesRouter = require('../src/routers/v1/po/po-garment-accessories-router');
        v1POGarmentAccessoriesRouter.applyRoutes(server);

        var v1POTextileGeneralOtherATKRouter = require('../src/routers/v1/po/po-textile-general-other-atk-router');
        v1POTextileGeneralOtherATKRouter.applyRoutes(server);

        var v1POGarmentJobOrderFabricRouter = require('../src/routers/v1/po/po-garment-job-order-fabric-router');
        v1POGarmentJobOrderFabricRouter.applyRoutes(server);

        var v1SuratJalanRouter = require('../src/routers/v1/surat-jalan/surat-jalan-router');
        v1SuratJalanRouter.applyRoutes(server);

        var v1POTextile = require('../src/routers/v1/po/purchase-order-textile-router');
        v1POTextile.applyRoutes(server);

        var v1POFabric = require('../src/routers/v1/po/purchase-order-fabric-router');
        v1POFabric.applyRoutes(server);

        var v1POAccessories = require('../src/routers/v1/po/purchase-order-accessories-router');
        v1POAccessories.applyRoutes(server);

        var v1POSparepart = require('../src/routers/v1/po/purchase-order-sparepart-router');
        v1POSparepart.applyRoutes(server);

        var v1POGeneral = require('../src/routers/v1/po/purchase-order-general-router');
        v1POGeneral.applyRoutes(server);

        var v1PurchaseOrder = require('../src/routers/v1/po/purchase-order-router');
        v1PurchaseOrder.applyRoutes(server);

        var v1POGroup = require('../src/routers/v1/po/purchase-order-group-router');
        v1POGroup.applyRoutes(server);

        server.listen(process.env.PORT, process.env.IP);
        console.log(`server created at ${process.env.IP}:${process.env.PORT}`);
        resolve(`${process.env.IP}:${process.env.PORT}`);
    }
    catch (e) {
        reject(e);
    };
});