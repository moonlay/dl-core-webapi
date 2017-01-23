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
var v1UploadUomRouter = require('../src/routers/v1/master/upload-uom-router');
var v1UploadBuyerRouter = require('../src/routers/v1/master/upload-buyer-router');
var v1UploadSupplierRouter = require('../src/routers/v1/master/upload-supplier-router');
var v1UploadProductRouter = require('../src/routers/v1/master/upload-product-router');
var v1UploadVatRouter = require('../src/routers/v1/master/upload-vat-router');
var v1UploadBudgetRouter = require('../src/routers/v1/master/upload-budget-router');
var v1UploadCurrencyRouter = require('../src/routers/v1/master/upload-currency-router');
var v1UploadDivisionRouter = require('../src/routers/v1/master/upload-division-router');
var v1UploadCategoryRouter = require('../src/routers/v1/master/upload-category-router');
var v1UploadUnitRouter = require('../src/routers/v1/master/upload-unit-router');
var v1PowerBiRouter = require('../src/routers/v1/core/power-bi-router');
var v1LampStandardRouter = require('../src/routers/v1/master/lamp-standard-router');
var v1ProcessTypeRouter = require('../src/routers/v1/master/process-type-router');
var v1OrderTypeRouter = require('../src/routers/v1/master/order-type-router');
var v1MachineTypeRouter = require('../src/routers/v1/master/machine-type-router');


module.exports = function (server) {

    v1BuyerRouter().applyRoutes(server, "/master/buyers");
    v1SupplierRouter().applyRoutes(server, "/master/suppliers");
    v1ProductRouter().applyRoutes(server, "/master/products");
    v1UoMRouter().applyRoutes(server, "/master/uoms");
    v1UnitRouter().applyRoutes(server, "/master/units");
    v1CategoryRouter().applyRoutes(server, "/master/categories");
    v1CurrencyRouter().applyRoutes(server, "/master/currencies");
    v1VatRouter().applyRoutes(server, "/master/vats");
    v1BudgetRouter().applyRoutes(server, "/master/budgets");
    v1UnitNiRouter().applyRoutes(server, "/master/divisions");
    v1MachineRouter().applyRoutes(server, "/master/machines");
    v1UsterRouter().applyRoutes(server, "/master/usters");
    v1LotMachineRouter().applyRoutes(server, "/master/lots");
    v1ThreadSpecificationRouter().applyRoutes(server, "/master/thread-specifications");
    v1UploadUomRouter().applyRoutes(server, "/master/upload-uoms");
    v1UploadBuyerRouter().applyRoutes(server, "/master/upload-buyers");
    v1UploadSupplierRouter().applyRoutes(server, "/master/upload-suppliers");
    v1UploadProductRouter().applyRoutes(server, "/master/upload-products");
    v1UploadVatRouter().applyRoutes(server, "/master/upload-vats");
    v1UploadBudgetRouter().applyRoutes(server, "/master/upload-budgets");
    v1UploadCurrencyRouter().applyRoutes(server, "/master/upload-currencies");
    v1UploadDivisionRouter().applyRoutes(server, "/master/upload-divisions");
    v1UploadCategoryRouter().applyRoutes(server, "/master/upload-categories");
    v1UploadUnitRouter().applyRoutes(server, "/master/upload-units");
    v1LampStandardRouter().applyRoutes(server, "/master/lamp-standards");
    v1ProcessTypeRouter().applyRoutes(server, "/master/process-types");
    v1OrderTypeRouter().applyRoutes(server, "/master/order-types");
    v1MachineTypeRouter().applyRoutes(server, "/master/machine-types")

    v1PowerBiRouter().applyRoutes(server, "/core/power-bi/reports");
};
