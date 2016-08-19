var should = require('should');
var request = require('supertest');
var uri = `${process.env.IP}:${process.env.PORT}`;

function getData() {
    var POTextileJobOrder = require('dl-models').po.POTextileJobOrder;
    var Supplier = require('dl-models').core.Supplier;
    var Buyer = require('dl-models').core.Buyer;
    var UoM_Template = require('dl-models').core.UoM_Template;
    var UoM = require('dl-models').core.UoM;
    var PurchaseOrderItem = require('dl-models').po.PurchaseOrderItem;
    var Product = require('dl-models').core.Product;
    
    var now = new Date();
    var stamp = now / 1000 | 0;
    var code = stamp.toString(36);
    
    var pOTextileJobOrder = new POTextileJobOrder();
    pOTextileJobOrder.RONo =  '1' + code + stamp;
    pOTextileJobOrder.RefPONo =  '2' + code + stamp;
    pOTextileJobOrder.PRNo =  '3' + code + stamp;
    pOTextileJobOrder.ppn = 10;
    pOTextileJobOrder.deliveryDate = new Date();
    pOTextileJobOrder.termOfPayment = 'Tempo 2 bulan';
    pOTextileJobOrder.deliveryFeeByBuyer = true;
    pOTextileJobOrder.PODLNo = '';
    pOTextileJobOrder.description = 'SP1';
    pOTextileJobOrder.supplierID = {};
    pOTextileJobOrder.buyerID = {};
    pOTextileJobOrder.article = "Test Article";

    var buyer = new Buyer({
        code: '123',
        name: 'hot',
        description: 'hotline',
        contact: '0812....',
        address: 'test',
        tempo:'tempo',
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

    var template = new UoM_Template({
        mainUnit: 'M',
        mainValue: 1,
        convertedUnit: 'M',
        convertedValue: 1
    });

    var _units = [];
    _units.push(template);

    var _uom = new UoM({
        category: 'UoM-Unit-Test',
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

    pOTextileJobOrder.supplier = supplier;
    pOTextileJobOrder.buyer=buyer;
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