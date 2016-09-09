var should = require('should');
var request = require('supertest');
var uri = `${process.env.IP}:${process.env.PORT}`;

function getData() {
    var POTextileGeneralATK = require('dl-models').po.POTextileGeneralATK;
    var Supplier = require('dl-models').core.Supplier;
    var Uom = require('dl-models').core.Uom;
    var PurchaseOrderItem = require('dl-models').po.PurchaseOrderItem;
    var Product = require('dl-models').core.Product;

    var now = new Date();
    var stamp = now / 1000 | 0;
    var code = stamp.toString(36);

    var poTextileGeneralATK = new POTextileGeneralATK();
    poTextileGeneralATK.RONo = '1' + code + stamp;
    poTextileGeneralATK.RefPONo = '2' + code + stamp;
    poTextileGeneralATK.PRNo = '3' + code + stamp;
    poTextileGeneralATK.ppn = 10;
    poTextileGeneralATK.deliveryDate = new Date();
    poTextileGeneralATK.termOfPayment = 'Tempo 2 bulan';
    poTextileGeneralATK.deliveryFeeByBuyer = true;
    poTextileGeneralATK.PODLNo = '';
    poTextileGeneralATK.description = 'SP1';
    poTextileGeneralATK.supplierID = {};

    var supplier = new Supplier({
        code: '123',
        name: 'hot',
        description: 'hotline',
        phone: '0812....',
        address: 'test',
        local: true
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

    var productValue = new PurchaseOrderItem ({
        qty: 0,
        price: 0,
        product: product
    });
    
    var _products = [];
    _products.push(productValue);

    poTextileGeneralATK.supplier = supplier;
    poTextileGeneralATK.items = _products;
    return poTextileGeneralATK;
}

it('#01. Should be able to get list', function (done) {
    request(uri)
        .get('/v1/po/textilegeneralatks')
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
        .get('/v1/po/textilegeneralatks/podl')
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
    
    request(uri).post('/v1/po/textilegeneralatks')
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
    request(uri).put('/v1/po/textilegeneralatks')
        .send({ RONo: 'RO01234567890', description: 'updated description' })
        .end(function (err, res) {
            if (err) {
                done(err);
            } else {
                done();
            }
        });
});
