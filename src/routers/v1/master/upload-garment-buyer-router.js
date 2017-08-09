var Router = require("restify-router").Router;
var db = require("../../../db");
var resultFormatter = require("../../../result-formatter");
var passport = require("../../../passports/jwt-passport");
var fs = require('fs');
var csv = require('fast-csv');
var BuyerManager = require('dl-module').managers.master.GarmentBuyerManager;
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
            var manager = new BuyerManager(db, {
                username: 'router'
            });

            fs.createReadStream(request.files.fileUpload.path)
                .pipe(csv())
                .on('data', function (data) {
                    dataCsv.push(data);
                })
                .on('end', function (data) {
                    dataAll = dataCsv;
                    if (dataAll[0][0] === "Kode Buyer" && dataAll[0][1] === "Nama" && dataAll[0][2] === "Alamat" && dataAll[0][3] === "Kota" && dataAll[0][4] === "Negara" && dataAll[0][5] === "NPWP" && dataAll[0][6] === "Jenis Buyer" && dataAll[0][7] === "Kontak" && dataAll[0][8] === "Tempo") {
                        manager.insert(dataAll)
                            .then(doc => {
                                if (doc[0]["Error"] === undefined) {
                                    var result = resultFormatter.ok(apiVersion, 201, doc);
                                    response.send(201, result);
                                }
                                else {
                                    var buyer=[];
                                    for (var item of doc) {
                                        var _item = {
                                            "Kode Buyer": item.code,
                                            "Nama": item.name,
                                            "Alamat": item.address,
                                            "Kota": item.city,
                                            "Negara": item.country,
                                            "NPWP":item.NPWP,
                                            "Jenis Buyer":item.type,
                                            "Kontak": item.contact,
                                            "Tempo": item.tempo,
                                            "Error": item.Error

                                        }
                                        buyer.push(_item);
                                    }  
                                    var options = {
                                        "Kode Buyer": "string",
                                        "Nama": "string",
                                        "Alamat": "string",
                                        "Kota": "string",
                                        "Negara": "string",
                                        "NPWP": "string",
                                        "Jenis Buyer": "string",
                                        "Kontak": "string",
                                        "Tempo": "string",
                                        "Error": "string"
                                    };
                                    response.xls(`Error Log-Garment Buyer ${moment(new Date()).format(dateFormat)}.xlsx`, buyer, options);

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