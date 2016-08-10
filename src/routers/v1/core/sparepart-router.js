var Router = require('restify-router').Router;
var router = new Router();
var db = require("../../../db");
var SparepartManager = require("dl-module").managers.core.SparepartManager;
var resultFormatter = require("../../../result-formatter");
const apiVersion = '1.0.0';

router.get("/v1/core/spareparts", function(request, response, next) {
    db.get().then(db => {
            var manager = new SparepartManager(db, {
                username: 'router'
            });

            var query = request.query;
            manager.read(query)
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

router.get("/v1/core/spareparts/:id", function(request, response, next) {
    db.get().then(db => {
        var manager = new SparepartManager(db, {
            username: 'router'
        });

        var id = request.params.id;

        manager.getById(id)
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