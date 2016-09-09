var should = require('should');
var request = require('supertest');
var uri = `${process.env.IP}:${process.env.PORT}`;

function getData() {
    var POTextile = require('dl-models').po.POTextile;
    var Buyer = require('dl-models').core.Buyer;
    var Uom = require('dl-models').core.Uom;
    var PurchaseOrderItem = require('dl-models').po.PurchaseOrderItem;
    var Product = require('dl-models').core.Product;

    var now = new Date();
    var stamp = now / 1000 | 0;
    var code = stamp.toString(36);

    var poTextile = new POTextile();
    poTextile.PRNo = '1' + code + stamp;
    poTextile.RefPONo = '2' + code + stamp;
    poTextile.PODLNo = '';
    poTextile.unit = 'unit';
    poTextile.PRDate = new Date();
    poTextile.category = 'category';
    poTextile.requestDate = new Date();
    poTextile.staffName = 'staff';
    poTextile.receivedDate = new Date();

    var uom = new Uom({
        unit: `Meter`
    });

    var product = new Product("fabric", {
        code: 'FF0001',
        name: 'kain',
        price: 0,
        description: 'kain putih',
        UoM: uom,
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

    var _products = [];
    _products.push(productValue);

    poTextile.items = _products;

    return poTextile;
}

it('#01. Should be able to get list', function (done) {
    request(uri)
        .get('/v1/po/textiles')
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
        .get('/v1/po/textiles/podl')
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
    
    request(uri).post('/v1/po/textiles')
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
    request(uri).put('/v1/po/textiles')
        .send({description: 'updated description' })
        .end(function (err, res) {
            if (err) {
                done(err);
            } else {
                done();
            }
        });
});

it("#04. should success when delete data", function(done) {
    request(uri).del('/v1/po/textiles/:id')
    .query({_id:createdId})
    .end(function (err, res) {
            if (err) {
                done(err);
            } else {
                done();
            }
        });
});