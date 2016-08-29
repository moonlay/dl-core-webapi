var should = require('should');
var request = require('supertest');
var uri = `${process.env.IP}:${process.env.PORT}`;

function getData() {
    var POTekstilGeneralOtherATK = require('dl-models').po.POTekstilGeneralOtherATK;
    var Supplier = require('dl-models').core.Supplier;
    var UoM_Template = require('dl-models').core.UoM_Template;
    var UoM = require('dl-models').core.UoM;
    var PurchaseOrderItem = require('dl-models').po.PurchaseOrderItem;
    var Product = require('dl-models').core.Product;

    var now = new Date();
    var stamp = now / 1000 | 0;
    var code = stamp.toString(36);

    var poTextileGeneralOtherATK = new POTekstilGeneralOtherATK();
    poTextileGeneralOtherATK.RONo = '1' + code + stamp;
    poTextileGeneralOtherATK.RefPONo = '2' + code + stamp;
    poTextileGeneralOtherATK.PRNo = '3' + code + stamp;
    poTextileGeneralOtherATK.ppn = 10;
    poTextileGeneralOtherATK.deliveryDate = new Date();
    poTextileGeneralOtherATK.termOfPayment = 'Tempo 2 bulan';
    poTextileGeneralOtherATK.deliveryFeeByBuyer = true;
    poTextileGeneralOtherATK.PODLNo = '';
    poTextileGeneralOtherATK.description = 'SP1';
    poTextileGeneralOtherATK.kurs = 13000;
    poTextileGeneralOtherATK.currency = 'dollar';
    poTextileGeneralOtherATK.supplierID = {};

    var supplier = new Supplier({
        _id: '123',
        code: '123',
        name: 'Toko Stationery',
        description: 'hotline',
        phone: '0812....',
        address: 'test',
        local: true
    });

    var template = new UoM_Template({
        mainUnit: 'M',
        mainValue: 1,
        convertedUnit: 'M',
        convertedValue: 1
    });

    var _units = [];
    _units.push(template);

    var _uom = new UoM({
        category: `UoM_Unit_Test[${code}]`,
        default: template,
        units: _units
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
        qty: 0,
        price: 0,
        product: product
    });

    var _products = [];
    _products.push(productValue);

    poTextileGeneralOtherATK.supplier = supplier;
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
