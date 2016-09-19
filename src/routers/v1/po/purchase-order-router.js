var Router = require('restify-router').Router;
var router = new Router();
var db = require("../../../db");
var PurchaseOrderBaseManager = require("dl-module").managers.po.PurchaseOrderBaseManager;
var resultFormatter = require("../../../result-formatter");
const apiVersion = '1.0.0';

router.get("/v1/purchasing/po/", (request, response, next) => {
    db.get().then(db => {
            var manager = new PurchaseOrderBaseManager(db, {
                username: 'router'
            });

            var query = request.query;
            manager.readAll(query)
            .then(docs => {
                    var result = resultFormatter.ok(apiVersion, 200, docs);
                    response.send(200, result);
                })
                .catch(e => {
                    response.send(500, "gagal ambil data");
                })
        })
        .catch(e => {
            var error = resultFormatter.fail(apiVersion, 400, e);
            response.send(400, error);
        })
})

router.get('/v1/purchasing/po/:id', (request, response, next) => {
    db.get().then(db => {
        var manager = new PurchaseOrderBaseManager(db, {
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

router.get("/v1/purchasing/po/nopodl/:supplier", (request, response, next) => {
    db.get().then(db => {
            var manager = new PurchaseOrderBaseManager(db, {
                username: 'router'
            });
            
             var supplier = request.params.supplier;
            var query = request.query;
            manager.readPOnoPODLBySupplier(query,supplier)
            .then(docs => {
                    var result = resultFormatter.ok(apiVersion, 200, docs);
                    response.send(200, result);
                })
                .catch(e => {
                    response.send(500, "gagal ambil data");
                })
        })
        .catch(e => {
            var error = resultFormatter.fail(apiVersion, 400, e);
            response.send(400, error);
        })
})

router.get("/v1/purchasing/po/haspodl", (request, response, next) => {
    db.get().then(db => {
            var manager = new PurchaseOrderBaseManager(db, {
                username: 'router'
            });

            var query = request.query;
            manager.readPOhasPODL(query)
            .then(docs => {
                    var result = resultFormatter.ok(apiVersion, 200, docs);
                    response.send(200, result);
                })
                .catch(e => {
                    response.send(500, "gagal ambil data");
                })
        })
        .catch(e => {
            var error = resultFormatter.fail(apiVersion, 400, e);
            response.send(400, error);
        })
})
module.exports = router;

