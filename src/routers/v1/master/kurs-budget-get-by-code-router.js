var Manager = require("dl-module").managers.master.KursBudgetManager;
const apiVersion = '1.0.0';
var Router = require("restify-router").Router;
var db = require("../../../db")
var resultFormatter = require("../../../result-formatter");
var passport = require('../../../passports/jwt-passport');

function getRouter() {
    var router = new Router();

    router.get('/', passport, (request, response, next) => {
        db.get().then(db => {
            var manager = new Manager(db, request.user);
            var code = request.params.code;
            var date = request.params.date || new Date();
            manager.collection.aggregate([
                {
                    $match:
                        { "_deleted": false, "code": code, "date": { $lte: date } }
                },
                {
                    $project: {
                        "code": 1, "rate": 1, "date": 1
                    }
                },
                { $sort: { date: -1 } },
                { $limit: 1 }])
                .toArray()
                .then(doc => {
                    var data = doc.length>0 ? doc[0] : {};
                    var result = resultFormatter.ok(apiVersion, 200, data);
                    response.send(200, result);
                })
                .catch(e => {
                    var error = resultFormatter.fail(apiVersion, 400, e);
                    response.send(400, error);
                });
        })
            .catch(e => {
                var error = resultFormatter.fail(apiVersion, 400, e);
                response.send(400, error);
            });
    });
    return router;
}
module.exports = getRouter;
