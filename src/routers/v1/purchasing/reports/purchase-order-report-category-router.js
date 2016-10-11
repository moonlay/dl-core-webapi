var Router = require('restify-router').Router;
var router = new Router();
var db = require("../../../../db");
var resultFormatter = require("../../../../result-formatter");
const apiVersion = '1.0.0';
var PurchaseOrderManager = require("dl-module").managers.purchasing.PurchaseOrderManager;

function getData(from, to) {
    return new Promise((resolve, reject) => {
        db.get().then(db => {
                var manager = new PurchaseOrderManager(db, {
                    username: 'router'
                });
                var sdate = from;
                var edate = to;
                manager.getDataPOCategory(sdate, edate)
                    .then(docs => {
                        resolve(docs);
                    })
                    .catch(e => {
                        reject(e);
                    });
            })
            .catch(e => {
                reject(e);
            });
    });
}

router.get("/", function(request, response, next) {
    var sdate = request.params.dateFrom;
    var edate = request.params.dateTo;
    getData(sdate, edate)
        .then(docs => {

            var result = resultFormatter.ok(apiVersion, 200, docs);
            response.send(200, result);
        })
        .catch(e => {
            var error = resultFormatter.fail(apiVersion, 400, e);
            response.send(400, error);
        })
});

router.get("/xls", function(request, response, next) {
    var sdate = request.params.dateFrom;
    var edate = request.params.dateTo;
    getData(sdate, edate)
        .then(docs => {
            response.xls('data.xlsx', docs);
        })
        .catch(e => {
            var error = resultFormatter.fail(apiVersion, 400, e);
            response.send(400, error);
        })
});

module.exports = router;