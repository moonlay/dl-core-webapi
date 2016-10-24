var Router = require('restify-router').Router;
var router = new Router();
var db = require("../../../db");
var UnitReceiptNoteManager = require("dl-module").managers.purchasing.UnitReceiptNoteManager;
var resultFormatter = require("../../../result-formatter");

var passport = require('../../../passports/jwt-passport');
const apiVersion = '1.0.0';

router.get('/', passport, (request, response, next) => {
    db.get().then(db => {
        var manager = new UnitReceiptNoteManager(db, request.user);

        var no = request.params.no;
        var supplierId = request.params.supplierId;
        var categoryId = request.params.categoryId;
        var unitId = request.params.unitId;
        var dateFrom = request.params.dateFrom;
        var dateTo = request.params.dateTo;

        manager.getUnitReceiptNotes(no, unitId, categoryId, supplierId, dateFrom, dateTo)
            .then(docs => {
                if ((request.headers.accept || '').toString().indexOf("application/xls") < 0) {
                    var result = resultFormatter.ok(apiVersion, 200, docs);
                    response.send(200, result);
                }
                else {
                    var data = [];
                    var index = 0;
                    for (var unitReceiptNote of docs) {
                        for (var item of unitReceiptNote.items) {
                            index++;
                            var _item = {}
                            _item.no = index;
                            _item.unit = item.purchaseOrder.unit.division;
                            _item.category = item.purchaseOrder.category.name;
                            _item.noPoInternal = item.purchaseOrder.refNo || "-";
                            _item.productCode = item.product.code;
                            _item.productName = item.product.name;
                            _item.supplier = unitReceiptNote.supplier.name;
                            _item.unitReceiptNoteDate = unitReceiptNote.date;
                            _item.unitReceiptNoteNo = unitReceiptNote.no;
                            _item.purchaseOrderQuantity = item.purchaseOrderQuantity;
                            _item.purchaseOrderUom = item.deliveredUom.unit;
                            _item.deliveredQuantity = item.deliveredQuantity;
                            _item.deliveredUom = item.deliveredUom.unit;
                            _item.totalQuantity = (item.purchaseOrderQuantity || 0) - (item.deliveredQuantity || 0);
                            data.push(_item);
                        }
                    }
                    var dateFormat = "DDMMMMYYYY";
                    var locale = 'id-ID';
                    var moment = require('moment');
                    moment.locale(locale);

                    response.xls(`Monitoring Bon Unit - ${moment(new Date()).format(dateFormat)}.xlsx`, data);
                }
            })
            .catch(e => {
                var error = resultFormatter.fail(apiVersion, 400, e);
                response.send(400, error);
            })
    })
});

module.exports = router

