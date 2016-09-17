var should = require('should');
var request = require('supertest');
var uri = `${process.env.IP}:${process.env.PORT}`;

function getData() {
    var POTextileJobOrder = require('dl-models').po.POTextileJobOrder;
    var Supplier  = require('dl-models').core.Supplier;
    var Buyer = require('dl-models').core.Buyer;
    var Uom = require('dl-models').core.Uom;
    var PurchaseOrderItem = require('dl-models').po.PurchaseOrderItem;
    var Product = require('dl-models').core.Product;

    var now = new Date();
    var stamp = now / 1000 | 0;
    var code = stamp.toString(36);

    var pOTextileJobOrder = new POTextileJobOrder();
    pOTextileJobOrder.PRNo = '1' + code + stamp;
    pOTextileJobOrder.RefPONo = '2' + code + stamp;
    pOTextileJobOrder.PODLNo = '';
    pOTextileJobOrder.buyerID = {};
    pOTextileJobOrder.article = "Test Article";

    var _buyer = new Buyer({
        _id: '123',
        code: '123',
        name: 'hot',
        description: 'hotline',
        contact: '0812....',
        address: 'test',
        tempo: 'tempo',
        local: true
    });
    
    var supplier = new Supplier({
        code: '123',
        name: 'hot',
        description: 'hotline',
        contact: '0812....',
        address: 'test',
        import: true
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

    pOTextileJobOrder.buyer = _buyer;
    pOTextileJobOrder.items = _products;
    
    return pOTextileJobOrder;
}

it('#01. Should be able to get list', function (done) {
    request(uri)
        .get('/v1/po/textilejoborders')
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
    
    request(uri).post('/v1/po/textilejoborders')
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
    request(uri).put('/v1/po/textilejoborders')
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
    request(uri).del('/v1/po/textilejoborders/:id')
    .query({_id:createdId})
    .end(function (err, res) {
            if (err) {
                done(err);
            } else {
                done();
            }
        });
});