var Router = require("restify-router").Router;
var db = require("../../../db");
var resultFormatter = require("../../../result-formatter");
var passport = require("../../../passports/jwt-passport");
var fs = require('fs');
var csv = require('fast-csv');
const apiVersion = '1.0.0';
var Manager = require("dl-module").managers.master.KursBudgetManager;

function getRouter() {
    var router = new Router();
    router.post('/', (request, response, next) => {
        var dateFormat = "DD MMM YYYY";
        var locale = 'id-ID';
        var moment = require('moment');
        moment.locale(locale);

        db.get().then(db => {
            var dataCsv = [];
            var dataAll;
            var manager = new Manager(db, {
                username: 'router'
            });

            fs.createReadStream(request.files.fileUpload.path)
                .pipe(csv())
                .on('data', function (data) {
                    dataCsv.push(data);
                })
                .on('end', function (data) {
                    dataAll = dataCsv;
                    if (dataAll[0][0] === "Mata Uang" && dataAll[0][1] === "Kurs") {
                        manager.insert(dataAll)
                            .then(doc => {
                                if (doc[0]["Error"] === undefined) {
                                    var result = resultFormatter.ok(apiVersion, 201, doc);
                                    response.send(201, result);
                                }
                                else {
                                    var currency = [];
                                    for (var item of doc) {
                                        var _item = {
                                            "Mata Uang": item["Mata Uang"],

                                            "Kurs": item.Kurs,

                                            "Error": item.Error
                                        }
                                        currency.push(_item);
                                    }
                                    var options = {
                                        "code": "string",

                                        "rate": "string",

                                        "Error": "string"
                                    };
                                    response.xls(`Error Log-kurs budget ${moment(new Date()).format(dateFormat)}.xlsx`, currency, options);

                                }
                            })
                            .catch(e => {
                                var error = resultFormatter.fail(apiVersion, 404, e);
                                response.send(404, error);
                            })
                    } else {
                        var error = resultFormatter.fail(apiVersion, 404, "");
                        response.send(404, error);

                    }
                });
        })
    });
    return router;
}

module.exports = getRouter;