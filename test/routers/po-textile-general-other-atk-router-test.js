var should = require('should');
var request = require('supertest');
var uri = `${process.env.IP}:${process.env.PORT}`;

function getData() {
    var POTekstilGeneralOtherATK = require('dl-models').po.POTekstilGeneralOtherATK;
    var UoM = require('dl-models').core.UoM;
    var PurchaseOrderItem = require('dl-models').po.PurchaseOrderItem;
    var Product = require('dl-models').core.Product;

    var now = new Date();
    var stamp = now / 1000 | 0;
    var code = stamp.toString(36);

    var poTextileGeneralOtherATK = new POTekstilGeneralOtherATK();
    poTextileGeneralOtherATK.PRNo = '1' + code + stamp;
    poTextileGeneralOtherATK.RefPONo = '2' + code + stamp;
    poTextileGeneralOtherATK.PODLNo = '';

    var _uom = new UoM({
        unit: `Meter`
    });

    var product = new Product({
        code: '22',
        name: 'hotline',
        price: 0,
        description: 'hotline123',
        UoM: _uom,
        detail: {}
    });

    var productValue = new PurchaseOrderItem({
        quantity: 10,
        price: 10000,
        description: 'test desc',
        dealQuantity: 10,
        dealMeasurement: 'Meter',
        defaultQuantity: 1000,
        defaultMeasurementQuantity: 'Centimeter',
        product: product
    });

    var _products = [];
    _products.push(productValue);

    poTextileGeneralOtherATK.items = _products;

    return poTextileGeneralOtherATK;
}

it('#01. Should be able to get list', function (done) {
    request(uri)
        .get('/v1/po/textilegeneralotheratks')
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
        .get('/v1/po/textilegeneralotheratks/podl')
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
    
    request(uri).post('/v1/po/textilegeneralotheratks')
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
    request(uri).put('/v1/po/textilegeneralotheratks')
        .send({ RONo: 'RO01234567890', description: 'updated description' })
        .end(function (err, res) {
            if (err) {
                done(err);
            } else {
                done();
            }
        });
});
