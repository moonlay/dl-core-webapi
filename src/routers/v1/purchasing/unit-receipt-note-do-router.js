var Router = require('restify-router').Router;
var router = new Router();
var db = require("../../../db");
var DeliveryOrderManager = require("dl-module").managers.purchasing.DeliveryOrderManager;
var resultFormatter = require("../../../result-formatter");
var ObjectId = require("mongodb").ObjectId;
var passport = require('../../../passports/jwt-passport');
const apiVersion = '1.0.0';

router.get("/", passport, (request, response, next) => {
    db.get().then(db => {
        var manager = new DeliveryOrderManager(db, {
            username: 'router'
        });

        var query = request.queryInfo;
        
        var filter = {
            "_deleted": false,
            "isClosed": false,
            "supplierId": new ObjectId(query.filter.supplierId),
            "items": {
                $elemMatch: {
                    "fulfillments": {
                        $elemMatch: {
                            "purchaseOrder.unitId": new ObjectId(query.filter.unitId)
                        }
                    }
                }
            }
        };
        
        query.filter = filter;
        
        manager.read(query)
            .then(docs => {
                var result = resultFormatter.ok(apiVersion, 200, docs.data);
                delete docs.data;
                result.info = docs;
                response.send(200, result);
            })
            .catch(e => {
                response.send(500, "gagal ambil data");
            });
    })
        .catch(e => {
            var error = resultFormatter.fail(apiVersion, 400, e);
            response.send(400, error);
        });
});
module.exports = router