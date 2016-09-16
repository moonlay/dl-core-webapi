var Router = require('restify-router').Router;
var router = new Router();
var db = require("../../../db");
var ProductManager = require("dl-module").managers.core.ProductManager;
var resultFormatter = require("../../../result-formatter");
const apiVersion = '1.0.0';

router.get("/v1/core/products", function(request, response, next) {
    db.get().then(db => {
            var manager = new ProductManager(db, {
                username: 'router'
            });

            var query = request.query;
            manager.readAll(query)
            .then(docs => {
                    var result = resultFormatter.ok(apiVersion, 200, docs);
                    response.send(200, result);
                })
                .catch(e => {
                    response.send(500, "Failed to fetch data.");
                })
        })
        .catch(e => {
            var error = resultFormatter.fail(apiVersion, 400, e);
            response.send(400, error);
        })
});

module.exports = router