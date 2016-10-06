var Router = require('restify-router').Router;
var router = new Router();
var db = require("../../../db");
var PurchaseOrderExternalManager = require("dl-module").managers.purchasing.PurchaseOrderExternalManager;
var resultFormatter = require("../../../result-formatter");

var passport = require('../../../passports/jwt-passport');
const apiVersion = '1.0.0';

 
router.post('/', passport, (request, response, next) => {
    db.get().then(db => {
        var manager = new PurchaseOrderExternalManager(db, request.user);

        var data = request.body;

        manager.post(data)
            .then(docId => {
                response.header('Location', `${docId.toString()}`);
                var result = resultFormatter.ok(apiVersion, 201);
                response.send(201, result);
            })
            .catch(e => {
                var error = resultFormatter.fail(apiVersion, 400, e);
                response.send(400, error);
            });

    });
});
   

module.exports = router;
