var should = require('should');
var request = require('supertest');
var uri = `${process.env.IP}:${process.env.PORT}`;

function getData() {
    var POGarmentAccessories = require('dl-models').po.POGarmentAccessories;
    var Supplier = require('dl-models').core.Supplier;
    var Buyer = require('dl-models').core.Buyer; 
    var Uom = require('dl-models').core.Uom;
    var PurchaseOrderItem = require('dl-models').po.PurchaseOrderItem;
    var Product = require('dl-models').core.Product;
    
    var now = new Date();
    var stamp = now / 1000 | 0;
    var code = stamp.toString(36);

    var pOGarmentAccessories = new POGarmentAccessories();
    pOGarmentAccessories.RONo = '1' + code + stamp;
    pOGarmentAccessories.PRNo = '2' + code + stamp;
    pOGarmentAccessories.RefPONo = '3' + code + stamp;
    pOGarmentAccessories.article = "Test Article";
    pOGarmentAccessories.PODLNo = '';
    pOGarmentAccessories.buyerId = {};

    var buyer = new Buyer({
        _id: '123',
        code: '123',
        name: 'Buyer01',
        contact: '0812....',
        address: 'test',
        tempo: 0
    });

    var uom = new Uom({
        unit: 'Meter'
    });

    var product = new Product ({
        code: '22',
        name: 'hotline',
        price: 0,
        description: 'hotline123',
        uom: uom,
        detail: {}
    });

    var productValue = new PurchaseOrderItem({
        quantity: 2,
        price: 10000,
        description: 'warna merah',
        dealQuantity: 2,
        dealMeasurement: 'Meter',
        defaultQuantity: 200,
        defaultMeasurementQuantity: 'Centimeter',
        product: product
    });

    var _products = [];
    _products.push(productValue);

    pOGarmentAccessories.buyer = buyer;
    pOGarmentAccessories.items = _products;

    return pOGarmentAccessories;
}

it('#01. Should be able to get list', function (done) {
    request(uri)
        .get('/v1/po/garmentaccessories')
        .expect(200)
        .end(function (err, response) {
            if (err) {
                console.log(err);
                done(err);
            }
            else {
                var result = response.body;
                result.should.have.property("apiVersion");
                result.should.have.property('data');
                result.data.should.instanceOf(Array);
                done();
            }
        });
})

it('#02. Should be able to get all podl list', function (done) {
    request(uri)
        .get('/v1/po/garmentaccessories/podl')
        .expect(200)
        .end(function (err, response) {
            if (err) {
                done(err);
            }
            else {
                var result = response.body;
                result.should.have.property("apiVersion");
                result.should.have.property('data');
                result.data.should.instanceOf(Array);
                done();
            }
        });
})

var createdId;
it('#03. should success when create new data', function (done) {
    var data = getData();
    
    request(uri).post('/v1/po/garmentaccessories')
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
it(`#04. should success when update created data`, function (done) {
    request(uri).put('/v1/po/garmentaccessories')
        .send({ RONo: 'RO01234567890', description: 'updated description' })
        .end(function (err, res) {
            if (err) {
                done(err);
            } else {
                done();
            }
        });
});

it("#05. should success when delete data", function(done) {
    request(uri).del('/v1/po/garmentaccessories/:id')
    .query({_id:createdId})
    .end(function (err, res) {
            if (err) {
                done(err);
            } else {
                done();
            }
        });
});