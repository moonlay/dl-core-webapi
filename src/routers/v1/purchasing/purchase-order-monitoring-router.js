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
                            if (item.fulfillments.length > 0) {
                                for (var fulfillment of item.fulfillments) {
                                    index++;
                                    var _item = {
                                        "No": index,
                                        "Tanggal Purchase Request": moment(new Date(PO.purchaseRequest.date)).format(dateFormat2),
                                        "No Purchase Request": PO.purchaseRequest.no,
                                        "Nama Barang": item.product.name,
                                        "Kode Barang": item.product.code,
                                        "Jumlah Barang": item.dealQuantity ? item.dealQuantity : 0,
                                        "Satuan Barang": item.dealUom.unit ? item.dealUom.unit : "-",
                                        "Harga Barang": PO.purchaseOrderExternal ? (item.pricePerDealUnit * PO.purchaseOrderExternal.currencyRate) : 0,
                                        "Harga Total": PO.purchaseOrderExternal ? (item.pricePerDealUnit * item.dealQuantity * PO.purchaseOrderExternal.currencyRate) : 0,
                                        "Kode Supplier": PO.supplier.code ? PO.supplier.code : "-",
                                        "Nama Supplier": PO.supplier.name ? PO.supplier.name : "-",
                                        "Tanggal Terima PO Internal": moment(new Date(PO.purchaseRequest.date)).format(dateFormat2),
                                        "Tanggal Terima PO Eksternal": PO.purchaseOrderExternal.date ? moment(new Date(PO.purchaseOrderExternal.date)).format(dateFormat2) : "-",
                                        "Tanggal Target Datang": PO.purchaseOrderExternal.expectedDeliveryDate ? moment(new Date(PO.purchaseOrderExternal.expectedDeliveryDate)).format(dateFormat2) : "-",
                                        "No PO Eksternal": PO.purchaseOrderExternal.no ? PO.purchaseOrderExternal.no : "-",
                                        "Tanggal Surat Jalan": fulfillment.supplierDoDate ? moment(new Date(fulfillment.supplierDoDate)).format(dateFormat2) : "-",
                                        "Tanggal Datang Barang": fulfillment.deliveryOderDate ? moment(new Date(fulfillment.deliveryOderDate)).format(dateFormat2) : "-",
                                        "No Surat Jalan": fulfillment.deliveryOderNo ? fulfillment.deliveryOderNo : "-",
                                        "Tanggal Bon Terima Unit": fulfillment.unitReceiptNoteDate ? moment(new Date(fulfillment.unitReceiptNoteDate)).format(dateFormat2) : "-",
                                        "No Bon Terima Unit": fulfillment.unitReceiptNoteNo ? fulfillment.unitReceiptNoteNo : "-",
                                        "Jumlah Diminta": fulfillment.unitReceiptNoteDeliveredQuantity ? fulfillment.unitReceiptNoteDeliveredQuantity : 0,
                                        "Satuan Diminta": fulfillment.unitReceiptDeliveredUom ? fulfillment.unitReceiptDeliveredUom.unit : "-",
                                        "Tanggal Invoice": fulfillment.invoiceDate ? moment(new Date(fulfillment.invoiceDate)).format(dateFormat2) : "-",
                                        "No Invoice": fulfillment.invoiceNo ? fulfillment.invoiceNo : "-",
                                        "Tanggal Nota Intern": fulfillment.interNoteDate ? moment(new Date(fulfillment.interNoteDate)).format(dateFormat2) : "-",
                                        "No Nota Intern": fulfillment.interNoteNo ? fulfillment.interNoteNo : "-",
                                        "Nilai Nota Intern": fulfillment.interNoteValue ? fulfillment.interNoteValue : 0,
                                        "Tanggal Jatuh Tempo": fulfillment.interNoteDueDate ? moment(new Date(fulfillment.interNoteDueDate)).format(dateFormat2) : "-",
                                        "Tanggal PPN": fulfillment.ppnDate ? moment(new Date(fulfillment.ppnDate)).format(dateFormat2) : "-",
                                        "No PPN": fulfillment.ppnNo ? fulfillment.ppnNo : "-",
                                        "Nilai PPN": fulfillment.ppnValue ? fulfillment.ppnValue : 0,
                                        "Tanggal PPH": fulfillment.pphDate ? moment(new Date(fulfillment.pphDate)).format(dateFormat2) : "-",
                                        "No PPH": fulfillment.pphNo ? fulfillment.pphNo : "-",
                                        "Nilai PPH": fulfillment.pphValue ? fulfillment.pphValue : 0,
                                        "Keterangan": PO.purchaseOrderExternal.remark ? PO.purchaseOrderExternal.remark : "-"
                                    }
                                    data.push(_item);
                                }
                            }
                            else {
                                index++;
                                var _item = {
                                    "No": index,
                                    "Tanggal Purchase Request": moment(new Date(PO.purchaseRequest.date)).format(dateFormat2),
                                    "No Purchase Request": PO.purchaseRequest.no,
                                    "Nama Barang": item.product.name,
                                    "Kode Barang": item.product.code,
                                    "Jumlah Barang": item.dealQuantity ? item.dealQuantity : 0,
                                    "Satuan Barang": item.dealUom.unit ? item.dealUom.unit : "-",
                                    "Harga Barang": PO.purchaseOrderExternal.currencyRate ? (item.pricePerDealUnit * PO.purchaseOrderExternal.currencyRate) : 0,
                                    "Harga Total": PO.purchaseOrderExternal.currencyRate ? (item.pricePerDealUnit * item.dealQuantity * PO.purchaseOrderExternal.currencyRate) : 0,
                                    "Kode Supplier": PO.supplier.code ? PO.supplier.code : "-",
                                    "Nama Supplier": PO.supplier.name ? PO.supplier.name : "-",
                                    "Tanggal Terima PO Internal": moment(new Date(PO.purchaseRequest.date)).format(dateFormat2),
                                    "Tanggal Terima PO Eksternal": PO.purchaseOrderExternal.date ? moment(new Date(PO.purchaseOrderExternal.date)).format(dateFormat2) : "-",
                                    "Tanggal Target Datang": PO.purchaseOrderExternal.expectedDeliveryDate ? moment(new Date(PO.purchaseOrderExternal.expectedDeliveryDate)).format(dateFormat2) : "-",
                                    "No PO Eksternal": PO.purchaseOrderExternal.no,
                                    "Tanggal Surat Jalan": "-",
                                    "Tanggal Datang Barang": "-",
                                    "No Surat Jalan": "-",
                                    "Tanggal Bon Terima Unit": "-",
                                    "No Bon Terima Unit": "-",
                                    "Jumlah Diminta": 0,
                                    "Satuan Diminta": "-",
                                    "Tanggal Invoice": "-",
                                    "No Invoice": "-",
                                    "Tanggal Nota Intern": "-",
                                    "No Nota Intern": "-",
                                    "Nilai Nota Intern": 0,
                                    "Tanggal Jatuh Tempo": "-",
                                    "Tanggal PPN": "-",
                                    "No PPN": "-",
                                    "Nilai PPN": 0,
                                    "Tanggal PPH": "-",
                                    "No PPH": "-",
                                    "Nilai PPH": 0,
                                    "Keterangan": PO.purchaseOrderExternal.remark ? PO.purchaseOrderExternal.remark : "-"
                                }
                                data.push(_item);
                            }
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