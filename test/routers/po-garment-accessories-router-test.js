var should = require('should');
var request = require('supertest');
var uri = `${process.env.IP}:${process.env.PORT}`;

function getData() {
    var POGarmentAccessories = require('dl-models').po.POGarmentAccessories;
    var Supplier = require('dl-models').core.Supplier;
    var Buyer = require('dl-models').core.Buyer;
    var UoM_Template = require('dl-models').core.UoM_Template;
    var UoM = require('dl-models').core.UoM;
    var PurchaseOrderItem = require('dl-models').po.PurchaseOrderItem;
    var Product = require('dl-models').core.Product;

    var now = new Date();
    var stamp = now / 1000 | 0;
    var code = stamp.toString(36);

    var poGarmentAccessories = new POGarmentAccessories();
    poGarmentAccessories.PRNo = '1' + code + stamp;
    poGarmentAccessories.RONo = '2' + code + stamp;
    poGarmentAccessories.RefPONo = '3' + code + stamp;
    poGarmentAccessories.ppn = 10;
    poGarmentAccessories.deliveryDate = new Date();
    poGarmentAccessories.termOfPayment = 'Tempo 2 bulan';
    poGarmentAccessories.deliveryFeeByBuyer = true;
    poGarmentAccessories.PODLNo = '';
    poGarmentAccessories.description = 'SP1';
    poGarmentAccessories.supplierID = {};
    poGarmentAccessories.buyerID = {};
    poGarmentAccessories.article = "Test Article";

    var supplier = new Supplier({
        _id:code,
        code: '1234',
        name: 'hot',
        description: 'hotline',
        phone: '0812....',
        address: 'test',
        local: true
    });
    
    var buyer = new Buyer({
        _id:code,
        code: '1234',
        name: 'hot',
        description: 'hotline',
        contact: '0812....',
        address: 'test',
        tempo:'tempo',
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
    
    poGarmentAccessories.supplier = supplier;
    poGarmentAccessories.buyer = buyer;
    poGarmentAccessories.items = _products;
    return poGarmentAccessories;
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