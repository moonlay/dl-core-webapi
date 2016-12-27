 var v1BuyerRouter = require('../src/routers/v1/master/buyer-router');
 var v1SupplierRouter = require('../src/routers/v1/master/supplier-router');
 var v1ProductRouter = require('../src/routers/v1/master/product-router');
 var v1UoMRouter = require('../src/routers/v1/master/uom-router');
 var v1UnitRouter = require('../src/routers/v1/master/unit-router');
 var v1CategoryRouter = require('../src/routers/v1/master/category-router');
 var v1CurrencyRouter = require('../src/routers/v1/master/currency-router');
 var v1VatRouter = require('../src/routers/v1/master/vat-router');
 var v1BudgetRouter = require('../src/routers/v1/master/budget-router');
 var v1UnitNiRouter = require('../src/routers/v1/master/division-router');
 var v1MachineRouter = require('../src/routers/v1/master/machine-router');
 var v1UsterRouter = require('../src/routers/v1/master/uster-router');
 var v1LotMachineRouter = require('../src/routers/v1/master/lot-machine-router');
 var v1ThreadSpecificationRouter = require('../src/routers/v1/master/thread-specification-router');
 var v1PowerBiRouter = require('../src/routers/v1/core/power-bi-router');
 var v1LampStandardRouter = require('../src/routers/v1/master/lamp-standard-router');


 module.exports = function(server) {
 
     v1BuyerRouter().applyRoutes(server,                    "/master/buyers");
     v1SupplierRouter().applyRoutes(server,                 "/master/suppliers/");
     v1ProductRouter().applyRoutes(server,                  "/master/products");
     v1UoMRouter().applyRoutes(server,                      "/master/uoms");
     v1UnitRouter().applyRoutes(server,                     "/master/units");
     v1CategoryRouter().applyRoutes(server,                 "/master/categories");
     v1CurrencyRouter().applyRoutes(server,                 "/master/currencies");
     v1VatRouter().applyRoutes(server,                      "/master/vats");
     v1BudgetRouter().applyRoutes(server,                   "/master/budgets");
     v1UnitNiRouter().applyRoutes(server,                   "/master/divisions");
     v1MachineRouter().applyRoutes(server,                  "/master/machines");
     v1UsterRouter().applyRoutes(server,                    "/master/usters");
     v1LotMachineRouter().applyRoutes(server,               "/master/lots");
     v1ThreadSpecificationRouter().applyRoutes(server,      "/master/thread-specifications");
     v1LampStandardRouter().applyRoutes(server,             "/master/lamp-standards");

     v1PowerBiRouter().applyRoutes(server,                  "/core/power-bi/reports");
 };
 