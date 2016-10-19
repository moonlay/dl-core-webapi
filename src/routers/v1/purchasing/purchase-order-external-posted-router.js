var Router = require('restify-router').Router;
var router = new Router();
var db = require("../../../db");
var PurchaseOrderExternalManager = require("dl-module").managers.purchasing.PurchaseOrderExternalManager;
var resultFormatter = require("../../../result-formatter");
var passport = require('../../../passports/jwt-passport');
const apiVersion = '1.0.0';
var ObjectId = require("mongodb").ObjectId;


router.get("/", passport, (request, response, next) => {
    db.get().then(db => {
        var manager = new PurchaseOrderExternalManager(db, request.user);

        var query = request.queryInfo;
        
        var filter = {
            _deleted: false,
            isPosted: true,
            isClosed: false,
            supplierId: new ObjectId(query.filter.supplierId)
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

module.exports = router;
