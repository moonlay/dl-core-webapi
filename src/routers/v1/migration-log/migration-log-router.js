var Router = require("restify-router").Router;

var JwtRouterFactory = require("../../jwt-router-factory");
var passport = require("../../../passports/jwt-passport");
var resultFormatter = require("../../../result-formatter");

var Manager = require("dl-module").etl.migrationLog.migrationLogManager;

var db = require("../../../db");
const apiVersion = '1.0.0';

function getRouter() {
    var options = {
        version: apiVersion,
        defaultOrder: {
            "_updatedDate": -1
        },
        defaultFilter: (request, response, next) => {
            return {
                "_createdBy": request.user.username
            };
        },
    };

    var router = JwtRouterFactory(Manager, options);

    var defaultOrder = options.defaultOrder || {};
    var defaultFilter = options.defaultFilter || {};
    var defaultSelect = options.defaultSelect || [];

    var getManager = (user) => {
        return db.get()
            .then((db) => {
                return Promise.resolve(new Manager(db, user));
            });
    };

    router.get("/get/report", passport, function (request, response, next) {
        var user = request.user;
        var query = request.query;
        var rManager;

        query.filter = Object.assign({}, query.filter, typeof defaultFilter === "function" ? defaultFilter(request, response, next) : defaultFilter, query.filter);
        query.order = Object.assign({}, query.order, typeof defaultOrder === "function" ? defaultOrder(request, response, next) : defaultOrder, query.order);
        query.select = query.select ? query.select : typeof defaultSelect === "function" ? defaultSelect(request, response, next) : defaultSelect;

        getManager(user)
            .then((manager) => {
                rManager = manager;
                return rManager.getData(query);
            })
            .then(docs => {
                var result = resultFormatter.ok(apiVersion, 200, docs.data);
                delete docs.data;
                result.info = docs;
                response.send(200, result);
                return Promise.resolve(result);
            })
            .catch((e) => {
                var statusCode = 500;
                if (e.name === "ValidationError")
                    statusCode = 400;
                var error = resultFormatter.fail(apiVersion, statusCode, e);
                response.send(statusCode, error);
            });
    });

    return router;
}

module.exports = getRouter;