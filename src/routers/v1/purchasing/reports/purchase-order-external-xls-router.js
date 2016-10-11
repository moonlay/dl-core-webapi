var Router = require('restify-router').Router;
var router = new Router();
var db = require("../../../db");
var PurchaseOrderExternalManager = require("dl-module").managers.purchasing.PurchaseOrderExternalManager;
var resultFormatter = require("../../../result-formatter");
const apiVersion = '1.0.0';
var passport = require('../../../passports/jwt-passport');

router.get('/', function(request, response, next) {
    var docs = [{
        'field': 'value1'
    }, {
        'field': 'value2'
    }]
    response.xls('data.xlsx', docs);
    // db.get().then(db => {
    //         var manager = new PurchaseOrderExternalManager(db, request.user);

    //         var query = request.query;
    //         manager.read(query)
    //             .then(docs => {
    //                 response.xls('data.xlsx', docs);
    //             })
    //             .catch(e => {
    //                 response.send(500, "Failed to fetch data.");
    //             });
    //     })
    //     .catch(e => {
    //         var error = resultFormatter.fail(apiVersion, 400, e);
    //         response.send(400, error);
    //     });
});


module.exports = router;