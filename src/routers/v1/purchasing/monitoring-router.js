var Router = require('restify-router').Router;
var router = new Router();
var db = require("../../../db");
var PurchaseOrderManager = require("dl-module").managers.purchasing.PurchaseOrderManager;
var DeliveryOrderManager = require("dl-module").managers.purchasing.DeliveryOrderManager;
var resultFormatter = require("../../../result-formatter");
const apiVersion = '1.0.0';

router.get('/v1/po/monitoringpembelian?unitId=:unitId&categoryId=:categoryId&PODLNo=:PODLNo&PRNo=:PRNo&supplierId=:supplierId&dateFrom=:dateFrom&dateTo=:dateTo', (request, response, next) => {
    db.get().then(db => {
        var manager = new PurchaseOrderManager(db, {
            username: 'router'
        });

        var unitId = request.params.unitId;
        var categoryId = request.params.categoryId;
        var PODLNo = request.params.PODLNo;
        var PRNo = request.params.PRNo;
        var supplierId = request.params.supplierId;
        var dateFrom = request.params.dateFrom;
        var dateTo = request.params.dateTo;

        manager.getDataPOMonitoringPembelian(unitId, categoryId, PODLNo, PRNo, supplierId, dateFrom, dateTo)
            .then(doc => {
                var result = resultFormatter.ok(apiVersion, 200, doc);
                response.send(200, result);
            })
            .catch(e => {
                var error = resultFormatter.fail(apiVersion, 400, e);
                response.send(400, error);
            })
    })
});

router.get('/v1/po/monitoringsuratjalan?no=:no&supplierId=:supplierId&dateFrom=:dateFrom&dateTo=:dateTo', (request, response, next) => {
    db.get().then(db => {
        var manager = new DeliveryOrderManager(db, {
            username: 'router'
        }); 

        var no = request.params.no;
        var supplierId = request.params.supplierId;
        var dateFrom = request.params.dateFrom;
        var dateTo = request.params.dateTo;

        manager.getDataDeliveryOrder(no, supplierId, dateFrom, dateTo)
            .then(doc => {
                var result = resultFormatter.ok(apiVersion, 200, doc);
                response.send(200, result);
            })
            .catch(e => {
                var error = resultFormatter.fail(apiVersion, 400, e);
                response.send(400, error);
            })
    })
});

module.exports = router