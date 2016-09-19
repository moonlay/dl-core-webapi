var should = require('should');
var request = require('supertest');
var uri = `${process.env.IP}:${process.env.PORT}`;

function getData() {
    var PurchaseOrder = require('dl-models').po.PurchaseOrder;
    var Buyer = require('dl-models').core.Buyer;
    var Uom = require('dl-models').core.Uom;
    var PurchaseOrderItem = require('dl-models').po.PurchaseOrderItem;
    var Product = require('dl-models').core.Product;
    var StandardQualityTestPercentage = require('dl-models').po.StandardQualityTestPercentage;

    var now = new Date();
    var stamp = now / 1000 | 0;
    var code = stamp.toString(36);

    var purchaseOrder = new PurchaseOrder();
    purchaseOrder.PRNo = '1' + code + stamp;
    purchaseOrder.RefPONo = '2' + code + stamp;
    purchaseOrder.PODLNo = '';
    purchaseOrder.unit = 'unit';
    purchaseOrder.PRDate = new Date();
    purchaseOrder.category = 'category';
    purchaseOrder.requestDate = new Date();
    purchaseOrder.staffName = 'staff';
    purchaseOrder.receivedDate = new Date();

    var _uom = new Uom({
        unit: `Meter`
    });

    var product = new Product("fabric", {
        code: 'FF0001',
        name: 'kain',
        price: 0,
        description: 'kain putih',
        uom: _uom,
        detail: {}
    });

    var productValue = new PurchaseOrderItem({
        price: 10000,
        description: 'test desc',
        dealQuantity: 10,
        dealMeasurement: 'Meter',
        defaultQuantity: 1000,
        defaultMeasurementQuantity: 'Centimeter',
        product: product
    });
    var _stdQtyTest = new StandardQualityTestPercentage({
        shrinkage: 10,
        wetRubbing: 20,
        dryRubbing: 30,
        washing: 40,
        darkPrespiration: 50,
        lightMedPrespiration: 60,
    })
    
    var _products = [];
    _products.push(productValue);

    purchaseOrder.items = _products;
    purchaseOrder.standardQuality = _stdQtyTest;

    return purchaseOrder;
}

function updateForSplit(purchaseOrder) {

    var newPurchaseOrder = {};
    newPurchaseOrder.iso = purchaseOrder.iso;
    newPurchaseOrder.PRNo = purchaseOrder.PRNo;
    newPurchaseOrder.RefPONo = purchaseOrder.PRNo;
    newPurchaseOrder.linkedPONo = purchaseOrder.PONo;
    newPurchaseOrder.PODLNo = purchaseOrder.PODLNo;
    newPurchaseOrder.unit = purchaseOrder.unit;
    newPurchaseOrder.PRDate = purchaseOrder.PRDate;
    newPurchaseOrder.category = purchaseOrder.category;
    newPurchaseOrder.rate = purchaseOrder.rate;
    newPurchaseOrder.requestDate = purchaseOrder.requestDate;
    newPurchaseOrder.staffName = purchaseOrder.staffName;
    newPurchaseOrder.receivedDate = purchaseOrder.receivedDate;
    newPurchaseOrder.items = purchaseOrder.items;
    newPurchaseOrder.standardQuality = purchaseOrder.standardQuality;

    for (var item of newPurchaseOrder.items) {
        item.dealQuantity = 1;
        item.defaultQuantity = 10;
    }

    return newPurchaseOrder;
}

it('#01. Should be able to get list', function (done) {
    request(uri)
        .get('/v1/purchasing/po/fabrics')
        .expect(200)
        .end(function (err, response) {
            if (err) {
                console.log(err);
                done(err);
            }
            else {
                var result = response.body;
                console.log(result);
                result.should.have.property("apiVersion");
                result.should.have.property('data');
                result.data.should.instanceOf(Array);
                done();
            }
        });
})

var createdId;
it('#02. should success when create new data', function (done) {
    var data = getData();
    
    request(uri).post('/v1/purchasing/po/fabrics')
        .send(data)
        .end(function (err, res) {
            if (err) {
                done(err);
            } else {
                var result = res.headers;
                createdId = result['location']
                done();

            }
        });
});

it('#02. should success when create new data', function (done) {
    var data = getData();
    
    request(uri).post('/v1/purchasing/po/fabrics')
        .send(data)
        .end(function (err, res) {
            if (err) {
                done(err);
            } else {
                var result = res.headers;
                createdId = result['location']
                done();

            }
        });
});

var createdData;
it(`#03. should success when update created data`, function (done) {
    request(uri).put('/v1/purchasing/po/fabrics')
        .send({ RONo: 'RO01234567890', description: 'updated description' })
        .end(function (err, res) {
            if (err) {
                done(err);
            } else {
                done();
            }
        });
});

it("#04. should success when delete data", function(done) {
    request(uri).del('/v1/purchasing/po/fabrics/:id')
    .query({_id:createdId})
    .end(function (err, res) {
            if (err) {
                done(err);
            } else {
                done();
            }
        });
});