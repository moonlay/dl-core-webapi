var Router = require('restify-router').Router;
var router = new Router();
var db = require("../../../db");
var PurchaseOrderManager = require("dl-module").managers.purchasing.PurchaseOrderManager;
var DeliveryOrderManager = require("dl-module").managers.purchasing.DeliveryOrderManager;
var resultFormatter = require("../../../result-formatter");

var passport = require('../../../passports/jwt-passport');
const apiVersion = '1.0.0';

router.get('/', passport, (request, response, next) => {
    db.get().then(db => {
        var manager = new PurchaseOrderManager(db, request.user);

        var unitId = request.params.unitId;
        var categoryId = request.params.categoryId;
        var PODLNo = request.params.PODLNo;
        var PRNo = request.params.PRNo;
        var supplierId = request.params.supplierId;
        var dateFrom = request.params.dateFrom;
        var dateTo = request.params.dateTo;

        manager.getDataPOMonitoringPembelian(unitId, categoryId, PODLNo, PRNo, supplierId, dateFrom, dateTo)
            .then(docs => {
                if ((request.headers.accept || '').toString().indexOf("application/xls") < 0) {
                    var result = resultFormatter.ok(apiVersion, 200, docs);
                    response.send(200, result);
                }
                else {
                    var dateFormat = "DD MMM YYYY";
                    var dateFormat2 = "DD-MMMM-YYYY";
                    var locale = 'id-ID';
                    var moment = require('moment');
                    moment.locale(locale);

                    var data = [];
                    var index = 0;
                    for (var PO of docs) {
                        for (var item of PO.items) {
                            index++;
                            var _item = {
                                "No": index,
                                "Tanggal Purchase Request": moment(new Date(PO.purchaseRequest.date)).format(dateFormat2),
                                "No Purchase Request": PO.purchaseRequest.no,
                                "Nama Barang": item.product.name,
                                "Kode Barang": item.product.code,
                                "Jumlah Barang": item.dealQuantity,
                                "Satuan Barang": item.dealUom.unit,
                                "Harga Barang": PO.purchaseOrderExternal.currencyRate ? (item.pricePerDealUnit * PO.purchaseOrderExternal.currencyRate) : 0,
                                "Harga Total": PO.purchaseOrderExternal.currencyRate ? (item.pricePerDealUnit * item.dealQuantity * PO.purchaseOrderExternal.currencyRate) : 0,
                                "Kode Supplier": PO.supplier.code,
                                "Nama Supplier": PO.supplier.name,
                                "Tanggal Terima PO Internal": moment(new Date(PO.purchaseRequest.date)).format(dateFormat2),
                                "Tanggal Terima PO Eksternal": PO.purchaseOrderExternal.date ? moment(new Date(PO.purchaseOrderExternal.date)).format(dateFormat2) : "-",
                                "Tanggal Target Datang": PO.purchaseOrderExternal.expectedDeliveryDate ? moment(new Date(PO.purchaseOrderExternal.expectedDeliveryDate)).format(dateFormat2) : "-",
                                "No PO Eksternal": PO.purchaseOrderExternal.no,
                                "Tanggal Surat Jalan": item.fulfillments.length > 0 ? (item.fulfillments[0].supplierDoDate ? moment(new Date(item.fulfillments[0].supplierDoDate)).format(dateFormat2) : "-") : "-",
                                "Tanggal Datang Barang": item.fulfillments.length > 0 ? (item.fulfillments[0].deliveryOderDate ? moment(new Date(item.fulfillments[0].deliveryOderDate)).format(dateFormat2) : "-") : "-",
                                "No Surat Jalan": item.fulfillments.length > 0 ? item.fulfillments[0].deliveryOderNo : "-",
                                "Tanggal Bon Terima Unit": item.fulfillments.length > 0 ? (item.fulfillments[0].unitReceiptNoteDate ? moment(new Date(item.fulfillments[0].unitReceiptNoteDate)).format(dateFormat2) : "-") : "-",
                                "No Bon Terima Unit": item.fulfillments.length > 0 ? item.fulfillments[0].unitReceiptNoteNo : "-",
                                "Jumlah Diminta": item.fulfillments.length > 0 ? item.fulfillments[0].unitReceiptNoteDeliveredQuantity : 0,
                                "Satuan Diminta": item.fulfillments.length > 0 ? item.fulfillments[0].unitReceiptDeliveredUom.unit : "-",
                                "Tanggal Invoice": item.fulfillments.length > 0 ? (item.fulfillments[0].invoiceDate ? moment(new Date(item.fulfillments[0].invoiceDate)).format(dateFormat2) : "-") : "-",
                                "No Invoice": item.fulfillments.length > 0 ? item.fulfillments[0].invoiceNo : "-",
                                "Tanggal Nota Intern": item.fulfillments.length > 0 ? (item.fulfillments[0].interNoteDate ? moment(new Date(item.fulfillments[0].interNoteDate)).format(dateFormat2) : "-") : "-",
                                "No Nota Intern": item.fulfillments.length > 0 ? item.fulfillments[0].interNoteNo : "-",
                                "Nilai Nota Intern": item.fulfillments.length > 0 ? item.fulfillments[0].interNoteValue : 0,
                                "Tanggal Jatuh Tempo": item.fulfillments.length > 0 ? (item.fulfillments[0].interNoteDueDate ? moment(new Date(item.fulfillments[0].interNoteDueDate)).format(dateFormat2) : "-") : "-",
                                "Tanggal PPN": item.fulfillments.length > 0 ? (item.fulfillments[0].ppnDate ? moment(new Date(item.fulfillments[0].ppnDate)).format(dateFormat2) : "-") : "-",
                                "No PPN": item.fulfillments.length > 0 ? item.fulfillments[0].ppnNo : "-",
                                "Nilai PPN": item.fulfillments.length > 0 ? item.fulfillments[0].ppnValue : 0,
                                "Tanggal PPH": item.fulfillments.length > 0 ? (item.fulfillments[0].pphDate ? moment(new Date(item.fulfillments[0].pphDate)).format(dateFormat2) : "-") : "-",
                                "No PPH": item.fulfillments.length > 0 ? item.fulfillments[0].pphValue : "-",
                                "Nilai PPH": item.fulfillments.length > 0 ? item.fulfillments[0].pphDate : "-",
                                "Keterangan": PO.remark || "-"
                            }
                            data.push(_item);
                        }
                    }
                    var options = {
                        "No": "number",
                        "Tanggal Purchase Request": "string",
                        "No Purchase Request": "string",
                        "Nama Barang": "string",
                        "Kode Barang": "string",
                        "Jumlah Barang": "number",
                        "Satuan Barang": "string",
                        "Harga Barang": "number",
                        "Harga Total": "number",
                        "Kode Supplier": "string",
                        "Nama Supplier": "string",
                        "Tanggal Terima PO Internal": "string",
                        "Tanggal Terima PO Eksternal": "string",
                        "Tanggal Target Datang": "string",
                        "No PO Eksternal": "string",
                        "Tanggal Surat Jalan": "string",
                        "Tanggal Datang Barang": "string",
                        "No Surat Jalan": "string",
                        "Tanggal Bon Terima Unit": "string",
                        "No Bon Terima Unit": "string",
                        "Jumlah Diminta": "number",
                        "Satuan Diminta": "string",
                        "Tanggal Invoice": "string",
                        "No Invoice": "string",
                        "Tanggal Nota Intern": "string",
                        "No Nota Intern": "string",
                        "Nilai Nota Intern": "number",
                        "Tanggal Jatuh Tempo": "string",
                        "Tanggal PPN": "string",
                        "No PPN": "string",
                        "Nilai PPN": "number",
                        "Tanggal PPH": "string",
                        "No PPH": "string",
                        "Nilai PPH": "number",
                        "Keterangan": "string"
                    };


                    response.xls(`Laporan Monitoring Pembelian - ${moment(new Date()).format(dateFormat)}.xlsx`, data, options);
                }
            })
            .catch(e => {
                var error = resultFormatter.fail(apiVersion, 400, e);
                response.send(400, error);
            })
    })
});

module.exports = router