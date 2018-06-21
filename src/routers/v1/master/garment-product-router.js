var Manager = require("dl-module").managers.master.GarmentProductManager;
var JwtRouterFactory = require("../../jwt-router-factory");
var passport = require("../../../passports/jwt-passport");
var db = require("../../../db");
var resultFormatter = require("../../../result-formatter");

const apiVersion = '1.0.0';

function getRouter() {
    var router = JwtRouterFactory(Manager, {
        version: apiVersion,
        defaultOrder: {
            "code": 1
        }
    });

    router.get("/read/distinct-product-description", passport, function (request, response, next) {
        var user = request.user;
        var query = request.query;

        query.filter = query.filter;
        query.order = query.order;
        query.select = query.select;

        db.get()
            .then(db => {
                manager = new Manager(db, user);
                return manager.getDistinctProductDescription(query);
            })
            .then(docs => {
                var result = resultFormatter.ok(apiVersion, 200, docs);
                delete docs.data;
                result.info = docs;
                return Promise.resolve(result);
            })
            .then((result) => {
                response.send(result.statusCode, result);
            })
            .catch((e) => {
                var statusCode = 500;
                if (e.name === "ValidationError")
                    statusCode = 400;
                var error = resultFormatter.fail(apiVersion, statusCode, e);
                response.send(statusCode, error);
            });
    })

    router.get("/read-single/product-by-name", passport, function (request, response, next) {
        var user = request.user;
        var query = request.query;

        query.filter = query.filter;
        query.order = query.order;
        query.select = query.select;

        db.get()
            .then(db => {
                manager = new Manager(db, user);
                return manager.getSingleProductByName(query);
            })
            .then((doc) => {
                var result;
                if (!doc) {
                    result = resultFormatter.fail(apiVersion, 404, new Error("data not found"));
                }
                else {
                    result = resultFormatter.ok(apiVersion, 200, doc);
                }
                return Promise.resolve(result);
            })
            .then((result) => {
                response.send(result.statusCode, result);
            })
            .catch((e) => {
                var statusCode = 500;
                if (e.name === "ValidationError")
                    statusCode = 400;
                var error = resultFormatter.fail(apiVersion, statusCode, e);
                response.send(statusCode, error);
            });
    })
    return router;
}
module.exports = getRouter;