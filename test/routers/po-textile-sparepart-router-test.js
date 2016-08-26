var should = require('should');
var request = require('supertest');
var uri = `${process.env.IP}:${process.env.PORT}`;

function getData() {
    var POTextileSparepart = require('dl-models').po.POTextileSparepart;
    var Supplier = require('dl-models').core.Supplier;
    var UoM_Template = require('dl-models').core.UoM_Template;
    var UoM = require('dl-models').core.UoM;
    var PurchaseOrderItem = require('dl-models').po.PurchaseOrderItem;
    var Product = require('dl-models').core.Product;

    var now = new Date();
    var stamp = now / 1000 | 0;
    var code = stamp.toString(36);

    var pOTextileSparepart = new POTextileSparepart();
    pOTextileSparepart.RONo = '1' + code + stamp;
    pOTextileSparepart.PRNo = '2' + code + stamp;
    pOTextileSparepart.PONo = '3' + code + stamp;
    pOTextileSparepart.ppn = 10;
    pOTextileSparepart.deliveryDate = new Date();
    pOTextileSparepart.termOfPayment = 'Tempo 2 bulan';
    pOTextileSparepart.deliveryFeeByBuyer = true;
    pOTextileSparepart.PODLNo = '';
    pOTextileSparepart.description = 'SP1';
    pOTextileSparepart.supplierID = {};
    pOTextileSparepart.article = "Test Article";

    var supplier = new Supplier({
        code: '123',
        name: 'hot',
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

    pOTextileSparepart.supplier = supplier;
    pOTextileSparepart.items = _products;
    return pOTextileSparepart;
}

it('#01. Should be able to get list', function (done) {
    request(uri)
        .get('/v1/po/textilespareparts')
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
    
    request(uri).post('/v1/po/textilespareparts')
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
    request(uri).put('/v1/po/textilespareparts')
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
    request(uri).del('/v1/po/textilespareparts/:id')
    .query({_id:createdId})
    .end(function (err, res) {
            if (err) {
                done(err);
            } else {
                done();
            }
        });
});
