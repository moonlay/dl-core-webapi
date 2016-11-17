var Router = require('restify-router').Router;
var router = new Router();
var db = require("../../../db");
var PurchaseRequestManager = require("dl-module").managers.purchasing.PurchaseRequestManager;
var resultFormatter = require("../../../result-formatter");

var passport = require('../../../passports/jwt-passport');
const apiVersion = '1.0.0';

router.get('/', passport, (request, response, next) => {
    db.get().then(db => {
        var manager = new PurchaseRequestManager(db, request.user);

        var PRNo = request.params.PRNo;
        var unitId = request.params.unitId;
        var categoryId = request.params.categoryId;
        var budgetId = request.params.budget;
        var dateFrom = request.params.dateFrom;
        var dateTo = request.params.dateTo;

        manager.getDataPRMonitoring(unitId, categoryId, budgetId, PRNo, dateFrom, dateTo)
            .then(docs => {
                if ((request.headers.accept || '').toString().indexOf("application/xls") < 0) {
                    var result = resultFormatter.ok(apiVersion, 200, docs);
                    response.send(200, result);
                } else {
                    var dateFormat = "DD MMMM YYYY";
                    var dateFormat2 = "DD-MMMM-YYYY";
                    var locale = 'id-ID';
                    var moment = require('moment');
                    moment.locale(locale);

                    var data = [];
                    var index = 0;
                    for (var purchaseRequest of docs) {
                        for (var item of purchaseRequest.items) {
                                index++;
                                var _item = {
                                    "No":index,
                                    "Unit": `${purchaseRequest.unit.division.name} - ${purchaseRequest.unit.name}`,
                                    "Budget": purchaseRequest.budget.name,
                                    "Kategori":purchaseRequest.category.name,
                                    "Tanggal PR": moment(new Date(purchaseRequest.date)).format(dateFormat2),
                                    "Nomor PR": purchaseRequest.no,
                                    "Kode Barang": item.product.code,
                                    "Nama Barang": item.product.name,
                                    "Jumlah": item.quantity,
                                    "Satuan":item.product.uom.unit,
                                    "Tanggal Diminta Datang": purchaseRequest.expectedDeliveryDate ? moment(new Date(purchaseRequest.expectedDeliveryDate)).format(dateFormat2) : "-",
                                }
                                data.push(_item);
                        }
                    }

                    var options = {
                        "No":"number",
                        "Unit": "string",
                        "Budget": "string",
                        "Kategori":"string",
                        "Tanggal PR": "string",
                        "Nomor PR": "string",
                        "Kode Barang": "string",
                        "Nama Barang": "string",
                        "Jumlah": "number",
                        "Satuan":"string",
                        "Tanggal Diminta Datang": "string",
                    };
                    response.xls(`Monitoring Purchase Request - ${moment(new Date()).format(dateFormat)}.xlsx`, data, options);

                }
            })
            .catch(e => {
                var error = resultFormatter.fail(apiVersion, 400, e);
                response.send(400, error);
            })
    })
});

module.exports = router

