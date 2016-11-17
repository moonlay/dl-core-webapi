var Router = require('restify-router').Router;
var router = new Router();
var db = require("../../../../../db");
var UsterClassificationManager = require("dl-module").managers.master.UsterClassificationManager;
var resultFormatter = require("../../../../../result-formatter");

var passport = require('../../../../../passports/jwt-passport');
const apiVersion = '1.0.0';

router.get("/", passport, (request, response, next) => {
    db.get().then(db => {
        var Manager = new UsterClassificationManager(db, request.user);

        var queryProduct = request.queryInfo;
        Manager.getProductInUster(queryProduct)
            .then(docs =>{
                var data = [];
                for(var a of docs){
                    data.push({"threadName" : a});
                }
	            var result = resultFormatter.ok(apiVersion, 200, data);
	            delete docs;
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
module.exports = router