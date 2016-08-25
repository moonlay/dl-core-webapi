var should = require('should');
var request = require('supertest');
var uri = `${process.env.IP}:${process.env.PORT}`;

function getData() {
    var POGarmentFabric = require('dl-models').po.POGarmentFabric;
    var Supplier = require('dl-models').core.Supplier;
    var UoM_Template = require('dl-models').core.UoM_Template;
    var UoM = require('dl-models').core.UoM;
    var PurchaseOrderItem = require('dl-models').po.PurchaseOrderItem;
    var Product = require('dl-models').core.Product;
    var StandardQualityTestPercentage = require('dl-models').po.StandardQualityTestPercentage;

    var now = new Date();
    var stamp = now / 1000 | 0;
    var code = stamp.toString(36);

    var poGarmentFabric = new POGarmentFabric();
    poGarmentFabric.PRNo = '1' + code + stamp;
    poGarmentFabric.RONo = '2' + code + stamp;
    poGarmentFabric.RefPONo = '3' + code + stamp;
    poGarmentFabric.ppn = 10;
    poGarmentFabric.deliveryDate = new Date();
    poGarmentFabric.termOfPayment = 'Tempo 2 bulan';
    poGarmentFabric.deliveryFeeByBuyer = true;
    poGarmentFabric.PODLNo = '';
    poGarmentFabric.description = 'SP1';
    poGarmentFabric.supplierID = {};

    var supplier = new Supplier({
        code: '123',
        name: 'hot',
        description: 'hotline',
        phone: '0812....',
        address: 'test',
        local: true
    });

    var template = new UoM_Template ({
        mainUnit: 'M',
        mainValue: 1,
        convertedUnit: 'M',
        convertedValue: 1
    });

    var _units = [];
    _units.push(template);

    var _uom = new UoM ({
        category: 'UoM-Unit-Test',
        default: template,
        units: _units
    });

    var product = new Product ({
        code: '22',
        name: 'hotline',
        price: 0,
        description: 'hotline123',
        UoM: _uom,
        detail: {}
    });

    var productValue = new PurchaseOrderItem ({
        qty: 0,
        price: 0,
        product: product
    });
    
    var _products = [];
    _products.push(productValue);
    
    var _stdQtyTest = new StandardQualityTestPercentage({
        shrinkage : 10,
        wetRubbing : 20,
        dryRubbing : 30,
        washing : 40,
        darkPrespiration : 50,
        lightMedPrespiration : 60,
    })
    
    poGarmentFabric.standardQuality = _stdQtyTest;
    poGarmentFabric.supplier = supplier;
    poGarmentFabric.items = _products;
    return poGarmentFabric;
}

it('#01. Should be able to get list', function (done) {
    request(uri)
        .get('/v1/po/garmentfabrics')
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
        .get('/v1/po/garmentfabrics/podl')
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
it('#02. should success when create new data', function (done) {
    var data = getData();
    
    request(uri).post('/v1/po/garmentfabrics')
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
    request(uri).put('/v1/po/garmentfabrics')
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
    request(uri).del('/v1/po/garmentfabrics/:id')
    .query({_id:createdId})
    .end(function (err, res) {
            if (err) {
                done(err);
            } else {
                done();
            }
        });
});