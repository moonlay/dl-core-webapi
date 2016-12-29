var Router = require("restify-router").Router;
var db = require("../../../db");
var resultFormatter = require("../../../result-formatter");
var passport = require("../../../passports/jwt-passport");
var fs = require('fs');
var csv = require('fast-csv');
var UnitManager = require('dl-module').managers.master.UnitManager;
const apiVersion = '1.0.0';

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
            var manager = new UnitManager(db, {
                username: 'router'
            });

            fs.createReadStream(request.files.fileUpload.path)
                .pipe(csv())
                .on('data', function (data) {
                    dataCsv.push(data);
                })
                .on('end', function (data) {
                    dataAll = dataCsv;
                    if (dataAll[0][0] === "Kode Unit" && dataAll[0][1] === "Divisi" && dataAll[0][2] === "Nama" && dataAll[0][3] === "Deskripsi") {
                        manager.insert(dataAll)
                            .then(doc => {
                                if (doc[0]["Error"] === undefined) {
                                    var result = resultFormatter.ok(apiVersion, 201, doc);
                                    response.send(201, result);
                                }
                                else {
                                    var unit = [];
                                    for (var item of doc) {
                                        var _item = {
                                            "Kode Unit": item.code,
                                            "Divisi": item.division,
                                            "Nama": item.name,
                                            "Deskripsi": item.description,
                                            "Error": item.Error
                                        }
                                        unit.push(_item);
                                    }
                                    var options = {
                                        "Kode Unit": "string",
                                        "Divisi": "string",
                                        "Nama": "string",
                                        "Deskripsi": "string",
                                        "Error": "string"
                                    };
                                    response.xls(`Error Log-unit ${moment(new Date()).format(dateFormat)}.xlsx`, unit, options);

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