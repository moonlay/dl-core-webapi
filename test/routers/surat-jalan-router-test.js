var should = require('should');
var request = require('supertest');
var uri = `${process.env.IP}:${process.env.PORT}`;

function getData() {
    var PurchaseOrder = require('dl-models').po.PurchaseOrder;
    var PurchaseOrderItem = require('dl-models').po.PurchaseOrderItem;
    var Product = require('dl-models').core.Product;
    var Supplier = require('dl-models').core.Supplier;
    var Uom = require('dl-models').core.Uom;
    var SuratJalan = require('dl-models').suratJalan.SuratJalan;
    
    var now = new Date();
    var stamp = now / 1000 | 0;
    var code = stamp.toString(36);

    var uom = new Uom({
        unit: `Meter`
    });


    var _product = new Product('accessories',{
        code: code,
        name: `name[${code}]`,
        price: 1000,
        description: `desc for ${code}`,
        uom: uom
    });

    var purchaseOrderItem = new PurchaseOrderItem({
        price: 10000,
        description: 'test desc',
        dealQuantity: 10,
        dealMeasurement: 'Meter',
        defaultQuantity: 1000,
        defaultMeasurement: 'Centimeter',
        realizationQuantity: 1000,
        product: _product
    });

    var _purchaseOrderItems = [];
    _purchaseOrderItems.push(purchaseOrderItem);

    var purchaseOrder = new PurchaseOrder({
        PONo : `1 [${code}]`,
        RefPONo : `2 [${code}]`,
        RONo : `3 [${code}]`,
        PRNo : `4 [${code}]`,
        article : "Test Article",
        supplierId : {},
        currency : "IDR",
        items : _purchaseOrderItems
    });
    
    var _POItems = [];
    _POItems.push(purchaseOrder);
    
    var _supplier = new Supplier({
        code: '123',
        name: 'hot',
        description: 'hotline',
        phone: '0812....',
        address: 'test',
        local: true
    });

    var suratJalan = new SuratJalan();
    suratJalan.RefSJNo='RefSJNo' + code + stamp;
    suratJalan.SJNo='SJNo' + code + stamp;
    suratJalan.SJDate= new Date();
    suratJalan.productArriveDate= new Date();
    suratJalan.supplier=_supplier;
    suratJalan.deliveryType='Lokal';
    suratJalan.deliveryNo='123456789';
    //suratJalan.isPosted=false;
    suratJalan.items=_POItems;
    
    return suratJalan;

}

it('#01. Should be able to get list', function (done) {
    request(uri)
        .get('/v1/suratjalan')
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
    var data=getData();
    request(uri).post('/v1/suratjalan')
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
it(`#03. should success when update created data`, function(done) {
    
    request(uri).put('/v1/suratjalan')
        .send({ deliveryNo: '0123456789[update]'})
        .end(function (err, res) {
            if (err) {
                done(err);
            } else {
                done();
            }
        });
        });

it(`#04. should success when posting created data`, function(done) {
    
    request(uri).del('/v1/suratjalan/posting/:id')
        .query({_id:createdId})
        .end(function (err, res) {
            if (err) {
                done(err);
            } else {
                done();
            }
        });
        });
        
it("#05. should success when delete data", function(done) {
    request(uri).del('/v1/suratjalan/:id')
    .query({_id:createdId})
    .end(function (err, res) {
            if (err) {
                done(err);
            } else {
                done();
            }
        });
});