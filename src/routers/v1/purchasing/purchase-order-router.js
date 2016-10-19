var Router = require('restify-router').Router;
var router = new Router();
var db = require("../../../db");
var PurchaseOrderManager = require("dl-module").managers.purchasing.PurchaseOrderManager;
var resultFormatter = require("../../../result-formatter");

var passport = require('../../../passports/jwt-passport');
const apiVersion = '1.0.0';


router.get("/", passport, (request, response, next) => {
    db.get().then(db => {
        var manager = new PurchaseOrderManager(db, request.user);

        var sorting = {
            "unit.division": 1,
            "category.name": 1,
            "purchaseRequest.date": 1
        };
        var query = request.queryInfo;
        query.order = sorting;
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

router.get('/:id', passport, (request, response, next) => {
    db.get().then(db => {
        var manager = new PurchaseOrderManager(db, request.user);

        var id = request.params.id;

        manager.getSingleById(id)
            .then(doc => {
                var result = resultFormatter.ok(apiVersion, 200, doc);
                response.send(200, result);
            })
            .catch(e => {
                var error = resultFormatter.fail(apiVersion, 400, e);
                response.send(400, error);
            });

    });
});

router.post('/', passport, (request, response, next) => {
    db.get().then(db => {
        var manager = new PurchaseOrderManager(db, request.user);
        var isSplit = false;
        var data = request.body;
        var job = isSplit ? manager.split(data) : manager.create(data);
        job
            .then(docId => {
                response.header('Location', `${request.url}/${docId.toString()}`);
                var result = resultFormatter.ok(apiVersion, 201);
                response.send(201, result);
            })
            .catch(e => {
                var error = resultFormatter.fail(apiVersion, 400, e);
                response.send(400, error);
            });

    });
});

router.put('/:id', passport, (request, response, next) => {
    db.get().then(db => {
        var manager = new PurchaseOrderManager(db, request.user);

        var id = request.params.id;
        var data = request.body;

        manager.update(data)
            .then(docId => {
                var result = resultFormatter.ok(apiVersion, 204);
                response.send(204, result);
            })
            .catch(e => {
                var error = resultFormatter.fail(apiVersion, 400, e);
                response.send(400, error);
            });

    });
});

router.del('/:id', passport, (request, response, next) => {
    db.get().then(db => {
        var manager = new PurchaseOrderManager(db, request.user);

        var id = request.params.id;
        var data = request.body;

        manager.delete(data)
            .then(docId => {
                var result = resultFormatter.ok(apiVersion, 204);
                response.send(204, result);
            })
            .catch(e => {
                var error = resultFormatter.fail(apiVersion, 400, e);
                response.send(400, error);
            });
    });
});


module.exports = router;
