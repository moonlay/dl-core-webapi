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


 module.exports = function(server) {
 
     v1BuyerRouter().applyRoutes(server,                    "/v1/master/buyers");
     v1SupplierRouter().applyRoutes(server,                 "/v1/master/suppliers/");
     v1ProductRouter().applyRoutes(server,                  "/v1/master/products");
     v1UoMRouter().applyRoutes(server,                      "/v1/master/uoms");
     v1UnitRouter().applyRoutes(server,                     "/v1/master/units");
     v1CategoryRouter().applyRoutes(server,                 "/v1/master/categories");
     v1CurrencyRouter().applyRoutes(server,                 "/v1/master/currencies");
     v1VatRouter().applyRoutes(server,                      "/v1/master/vats");
     v1BudgetRouter().applyRoutes(server,                   "/v1/master/budgets");
     v1UnitNiRouter().applyRoutes(server,                   "/v1/master/divisions");
     v1MachineRouter().applyRoutes(server,                  "/v1/master/machines");
     v1UsterRouter().applyRoutes(server,                    "/v1/master/usters");
     v1LotMachineRouter().applyRoutes(server,               "/v1/master/lots");
     v1ThreadSpecificationRouter().applyRoutes(server,      "/v1/master/thread-specifications");

     v1PowerBiRouter().applyRoutes(server,                  "/v1/core/power-bi/reports");
 };
 