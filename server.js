'use strict'

var restify = require('restify');
restify.CORS.ALLOW_HEADERS.push('authorization');

var passport = require('passport');
var server = restify.createServer();

var json2xls = require('json2xls');
server.use(json2xls.middleware);
// restify.CORS.ALLOW_HEADERS.push('accept-encoding');
// restify.CORS.ALLOW_HEADERS.push('accept-language');
// restify.CORS.ALLOW_HEADERS.push('content-type');
// restify.CORS.ALLOW_HEADERS.push('x-forwarded-proto');
// restify.CORS.ALLOW_HEADERS.push('x-forwarded-port');
// restify.CORS.ALLOW_HEADERS.push('x-region');
// restify.CORS.ALLOW_HEADERS.push('x-forwarded-for');

server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.CORS({
    headers: ['Content-Disposition']
}));
// server.use(restify.fullResponse());
server.use(passport.initialize());
server.use(function(request, response, next) {
    var query = request.query;
    query.order = !query.order ? {} : JSON.parse(query.order);
    query.filter = !query.filter ? {} : JSON.parse(query.filter);
    request.queryInfo = query;
    next();
});


var v1BuyerRouter = require('./src/routers/v1/master/buyer-router');
v1BuyerRouter.applyRoutes(server, "/v1/master/buyers");

var v1SupplierRouter = require('./src/routers/v1/master/supplier-router');
v1SupplierRouter.applyRoutes(server, "/v1/master/suppliers/");

var v1ProductRouter = require('./src/routers/v1/master/product-router');
v1ProductRouter.applyRoutes(server, "/v1/master/products");

var v1UoMRouter = require('./src/routers/v1/master/uom-router');
v1UoMRouter.applyRoutes(server, "/v1/master/uoms");

var v1UnitRouter = require('./src/routers/v1/master/unit-router');
v1UnitRouter.applyRoutes(server, "/v1/master/units");

var v1CategoryRouter = require('./src/routers/v1/master/category-router');
v1CategoryRouter.applyRoutes(server, "/v1/master/categories");

var v1CurrencyRouter = require('./src/routers/v1/master/currency-router');
v1CurrencyRouter.applyRoutes(server, "/v1/master/currencies");

var v1VatRouter = require('./src/routers/v1/master/vat-router');
v1VatRouter.applyRoutes(server, "/v1/master/vats");

var v1BudgetRouter = require('./src/routers/v1/master/budget-router');
v1BudgetRouter.applyRoutes(server, "/v1/master/budgets");

var v1PurchaseOrderExternalPostRouter = require('./src/routers/v1/purchasing/purchase-order-external-post-router');
v1PurchaseOrderExternalPostRouter.applyRoutes(server, "/v1/purchasing/po/externals/post");

var v1PurchaseOrderExternalsUnpostedRouter = require('./src/routers/v1/purchasing/purchase-order-external-posted-router');
v1PurchaseOrderExternalsUnpostedRouter.applyRoutes(server, "/v1/purchasing/po/externals/posted");

// var v1PurchaseOrderExternalsPdfRouter = require('./src/routers/v1/purchasing/purchase-order-external-pdf-router');
// v1PurchaseOrderExternalsPdfRouter.applyRoutes(server, "/v1/purchasing/po/externals/pdf");

var v1PurchaseOrderExternalByUserRouter = require('./src/routers/v1/purchasing/purchase-order-external-by-user-router');
v1PurchaseOrderExternalByUserRouter.applyRoutes(server, "/v1/purchasing/po/externals/by-user");

var v1PurchaseOrderExternalRouter = require('./src/routers/v1/purchasing/purchase-order-external-router');
v1PurchaseOrderExternalRouter.applyRoutes(server, "/v1/purchasing/po/externals");

var v1PurchaseOrderSplitRouter = require('./src/routers/v1/purchasing/purchase-order-split-router');
v1PurchaseOrderSplitRouter.applyRoutes(server, "/v1/purchasing/po/split");

var v1DOMonitoringRouter = require('./src/routers/v1/purchasing/purchase-order-monitoring-router');
v1DOMonitoringRouter.applyRoutes(server, '/v1/purchasing/po/monitoring');

var v1PurchaseOrderUnpostedRouter = require('./src/routers/v1/purchasing/purchase-order-un-posted-router');
v1PurchaseOrderUnpostedRouter.applyRoutes(server, "/v1/purchasing/po/unposted");

var v1PurchaseOrderByUserRouter = require('./src/routers/v1/purchasing/purchase-order-by-user-router');
v1PurchaseOrderByUserRouter.applyRoutes(server, "/v1/purchasing/po/by-user");

var v1PurchaseOrderRouter = require('./src/routers/v1/purchasing/purchase-order-router');
v1PurchaseOrderRouter.applyRoutes(server, "/v1/purchasing/po");

var v1PurchaseRequestPostRouter = require('./src/routers/v1/purchasing/purchase-request-post-router');
v1PurchaseRequestPostRouter.applyRoutes(server, "/v1/purchasing/pr/post");

var v1PurchaseRequestByUserRouter = require('./src/routers/v1/purchasing/purchase-request-by-user-router');
v1PurchaseRequestByUserRouter.applyRoutes(server, "/v1/purchasing/pr/by-user");

var v1PurchaseRequestRouter = require('./src/routers/v1/purchasing/purchase-request-monitoring-router');
v1PurchaseRequestRouter.applyRoutes(server, "/v1/purchasing/pr/monitoring");

var v1PurchaseRequestRouter = require('./src/routers/v1/purchasing/purchase-request-router');
v1PurchaseRequestRouter.applyRoutes(server, "/v1/purchasing/pr");

var v1DOMonitoringByUserRouter = require('./src/routers/v1/purchasing/delivery-order-monitoring-by-user-router');
v1DOMonitoringByUserRouter.applyRoutes(server, '/v1/purchasing/do/monitoring/by-user');

var v1POMonitoringRouter = require('./src/routers/v1/purchasing/delivery-order-monitoring-router');
v1POMonitoringRouter.applyRoutes(server, '/v1/purchasing/do/monitoring');

var v1DeliveryOrderByUserRouter = require('./src/routers/v1/purchasing/delivery-order-by-user-router');
v1DeliveryOrderByUserRouter.applyRoutes(server, "/v1/purchasing/do/by-user");

var v1DeliveryOrderRouter = require('./src/routers/v1/purchasing/delivery-order-router');
v1DeliveryOrderRouter.applyRoutes(server, "/v1/purchasing/do");

var v1ReportPoCategoryPeriode = require('./src/routers/v1/purchasing/reports/purchase-order-report-category-router');
v1ReportPoCategoryPeriode.applyRoutes(server, "/v1/purchasing/po/reports/categories");

var v1ReportPoUnitPeriode = require('./src/routers/v1/purchasing/reports/purchase-order-report-unit-router');
v1ReportPoUnitPeriode.applyRoutes(server, "/v1/purchasing/po/reports/units");

var v1UnitReceiptNote = require('./src/routers/v1/purchasing/unit-receipt-note-do-router');
v1UnitReceiptNote.applyRoutes(server, "/v1/purchasing/receipt-note/unit/do");

var v1UnitReceiptNoteMonitoringByUser = require('./src/routers/v1/purchasing/unit-receipt-note-monitoring-by-user-router');
v1UnitReceiptNoteMonitoringByUser.applyRoutes(server, "/v1/purchasing/receipt-note/unit/monitoring/by-user"); 

var v1UnitReceiptNoteMonitoring = require('./src/routers/v1/purchasing/unit-receipt-note-monitoring-router');
v1UnitReceiptNoteMonitoring.applyRoutes(server, "/v1/purchasing/receipt-note/unit/monitoring"); 

var v1UnitReceiptNoteByUser = require('./src/routers/v1/purchasing/unit-receipt-note-by-user-router');
v1UnitReceiptNoteByUser.applyRoutes(server, "/v1/purchasing/receipt-note/unit/by-user");

var v1UnitReceiptNote = require('./src/routers/v1/purchasing/unit-receipt-note-router');
v1UnitReceiptNote.applyRoutes(server, "/v1/purchasing/receipt-note/unit");
 
var v1UnitPaymentPriceCorrectionNoteByUser = require('./src/routers/v1/purchasing/unit-payment-price-correction-note-by-user-router');
v1UnitPaymentPriceCorrectionNoteByUser.applyRoutes(server, "/v1/purchasing/unit-payment-note/price-correction/by-user"); 
 
var v1UnitPaymentPriceCorrectionNote = require('./src/routers/v1/purchasing/unit-payment-price-correction-note-router');
v1UnitPaymentPriceCorrectionNote.applyRoutes(server, "/v1/purchasing/unit-payment-note/price-correction"); 

var v1UnitPaymentOrderByUser = require('./src/routers/v1/purchasing/unit-payment-order-by-user-router');
v1UnitPaymentOrderByUser.applyRoutes(server, "/v1/purchasing/payment-order/unit/by-user");

var v1UnitPaymentOrder = require('./src/routers/v1/purchasing/unit-payment-order-router');
v1UnitPaymentOrder.applyRoutes(server, "/v1/purchasing/payment-order/unit");
 
var v1UnitPaymentOrderSupplier = require('./src/routers/v1/purchasing/unit-receipt-note-suplier-unit-router');
v1UnitPaymentOrderSupplier.applyRoutes(server, "/v1/purchasing/unit-receipt-note-suplier-unit");
 
// var v1UnitReceiptNote = require('./src/routers/v1/purchasing/unit-receipt-note-pdf-router');
// v1UnitReceiptNote.applyRoutes(server, "/v1/purchasing/receipt-note/unit/pdf"); 

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