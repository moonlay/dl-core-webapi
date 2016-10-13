var Router = require('restify-router').Router;
var router = new Router();
var db = require("../../../../db");
var resultFormatter = require("../../../../result-formatter");
const apiVersion = '1.0.0';
var PurchaseOrderManager = require("dl-module").managers.purchasing.PurchaseOrderManager;
var passport = require('../../../../passports/jwt-passport');

<<<<<<< HEAD:src/routers/v1/purchasing/reports/purchase-order-report-unit-router.js
router.get("/",passport, function(request, response, next) {
    db.get().then(db => {
            var manager = new PurchaseOrderManager(db, request.user);
            var sdate = request.params.dateFrom;
            var edate = request.params.dateTo;
                manager.getDataPOUnit(sdate, edate)
                    .then(docs => {
                        if ((request.headers.accept || '').toString().indexOf("application/xls") < 0) {
                            var result = resultFormatter.ok(apiVersion, 200, docs);
                            response.send(200, result);
                        }
                        else {
                            response.xls('data.xlsx', docs);
                        }
                    })
                    .catch(e => {
                        response.send(500, "gagal ambil data");
                    })
            
        }).catch(e => {
                var error = resultFormatter.fail(apiVersion, 400, e);
                response.send(400, error);
            })
});

router.get("/:unit",passport, function(request, response, next) {
    db.get().then(db => {
            var manager = new PurchaseOrderManager(db, request.user);
            var sdate = request.params.dateFrom;
            var edate = request.params.dateTo;
            var unit=request.params.unit;
            
        manager.getDataPODetailUnit(sdate, edate, unit)
        .then(docs => {
            if ((request.headers.accept || '').toString().indexOf("application/xls") < 0) {
                var result = resultFormatter.ok(apiVersion, 200, docs);
                response.send(200, result);
            }
            else {
                response.xls('data.xlsx', docs);
            }
        }).catch(e => {
                    response.send(500, "gagal ambil data");
                })
            
        }).catch(e => {
                var error = resultFormatter.fail(apiVersion, 400, e);
                response.send(400, error);
            })
=======
router.get("/:unit", passport, function(request, response, next) {
    db.get().then(db => {
        var manager = new PurchaseOrderManager(db, request.user);
        var sdate = request.params.dateFrom;
        var edate = request.params.dateTo;
        var unit = request.params.unit;
        if (unit == "undefined") {
            manager.getDataPOUnit(sdate, edate)
                .then(docs => {
                    if ((request.headers.accept || '').toString().indexOf("application/xls") < 0) {
                        var result = resultFormatter.ok(apiVersion, 200, docs);
                        response.send(200, result);
                    }
                    else { 
                        response.xls('data.xlsx', docs);
                    }
                })
                .catch(e => {
                    response.send(500, "gagal ambil data");
                })
        }
        else {
            manager.getDataPODetailUnit(sdate, edate, unit)
                .then(docs => {
                    if ((request.headers.accept || '').toString().indexOf("application/xls") < 0) {
                        var result = resultFormatter.ok(apiVersion, 200, docs);
                        response.send(200, result);
                    }
                    else {
                        response.xls('data.xlsx', docs);
                    }
                }).catch(e => {
                    response.send(500, "gagal ambil data");
                })
        }
    }).catch(e => {
        var error = resultFormatter.fail(apiVersion, 400, e);
        response.send(400, error);
    })
>>>>>>> e95f1ff1dbb418e24f5923c7b57a63c04ed464a6:src/routers/v1/purchasing/reports/purchase-order-report-router.js
});

module.exports = router;