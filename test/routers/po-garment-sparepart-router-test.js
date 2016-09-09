var should = require('should');
var request = require('supertest');
var uri = `${process.env.IP}:${process.env.PORT}`;

function getData() {
    var POGarmentSparepart = require('dl-models').po.POGarmentSparepart;
    var Supplier = require('dl-models').core.Supplier;
    var Uom = require('dl-models').core.Uom;
    var PurchaseOrderItem = require('dl-models').po.PurchaseOrderItem;
    var Product = require('dl-models').core.Product;

    var now = new Date();
    var stamp = now / 1000 | 0;
    var code = stamp.toString(36);

    var pOGarmentSparepart = new POGarmentSparepart();
    pOGarmentSparepart.RONo = '1' + code + stamp;
    pOGarmentSparepart.PRNo = '2' + code + stamp;
    pOGarmentSparepart.PONo = '3' + code + stamp;
    pOGarmentSparepart.ppn = 10;
    pOGarmentSparepart.deliveryDate = new Date();
    pOGarmentSparepart.termOfPayment = 'Tempo 2 bulan';
    pOGarmentSparepart.deliveryFeeByBuyer = true;
    pOGarmentSparepart.PODLNo = '';
    pOGarmentSparepart.description = 'SP1';
    pOGarmentSparepart.supplierID = {};
    pOGarmentSparepart.article = "Test Article";

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


    var product = new Product({
        code: '22',
        name: 'hotline',
        price: 0,
        description: 'hotline123',
        uom: uom,
        detail: {}
    });

    var productValue = new PurchaseOrderItem({
        qty: 0,
        price: 0,
        product: product
    });

    var _products = [];
    _products.push(productValue);

    pOGarmentSparepart.supplier = supplier;
    pOGarmentSparepart.items = _products;
    return pOGarmentSparepart;
}

it('#01. Should be able to get list', function (done) {
    request(uri)
        .get('/v1/po/garmentspareparts')
        .expect(200)
        .end(function (err, response) {
            if (err)
                done(err);
            else {
                var result = response.body;
                result.should.have.property("apiVersion");
                result.should.have.property('data');
                result.data.should.instanceOf(Array);
                done();
            }
        });
})

it('#02. should success when create new data', function (done) {
    var data = getData();
    
    request(uri).post('/v1/po/garmentspareparts')
        .send(data)
        .end(function (err, res) {
            if (err) {
                done(err);
            } else {
                done();

            }
        });
});

var createdData;
var createdId;
it(`#03. should success when update created data`, function (done) {
    request(uri).put('/v1/po/garmentspareparts')
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
    request(uri).del('/v1/po/garmentspareparts/:id')
    .query({_id:createdId})
    .end(function (err, res) {
            if (err) {
                done(err);
            } else {
                done();
            }
        });
});
