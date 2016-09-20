var should = require('should');
var request = require('supertest');
var uri = `${process.env.IP}:${process.env.PORT}`;

function getData() {
    var PurchaseOrder = require('dl-models').purchasing.PurchaseOrder;
    var PurchaseOrderItem = require('dl-models').purchasing.PurchaseOrderItem;
    var Product = require('dl-models').master.Product;
    var Supplier = require('dl-models').master.Supplier;
    var Uom = require('dl-models').master.Uom;
    var DeliveryOrder = require('dl-models').purchasing.DeliveryOrder;

    var now = new Date();
    var stamp = now / 1000 | 0;
    var code = stamp.toString(36);

    var _uom = new Uom({
        unit: `Meter`
    });


    var _product = new Product('accessories', {
        code: code,
        name: `name[${code}]`,
        price: 1000,
        description: `desc for ${code}`,
        uom: _uom,
        tags: 'product,master',
        properties: []
    });

    var purchaseOrderItem = new PurchaseOrderItem({
        product: _product,
        defaultQuantity: 10,
        defaultUom: 10,
        dealQuantity: 10,
        dealUom: 10,
        price: 10000,
        realizationQuantity: 10,
        pricePerDealUnit: 10,
        remark: 'remark01',
        fulfillments: []

    });

    var _purchaseOrderItems = [];
    _purchaseOrderItems.push(purchaseOrderItem);

    var purchaseOrder = new PurchaseOrder({
        no: `2 [${code}]`,
        refNo: `2 [${code}]`,
        iso: `3 [${code}]`,

        realizationOrderId: {},
        realizationOrder: {},
        purchaseRequestId: {},
        purchaseRequest: {},
        buyerId: {},
        buyer: '',
        purchaseOrderExternalId: {},
        purchaseOrderExternal: {},
        supplierId: {},
        supplier: _supplier,

        unitId: {},
        unit: {},

        categoryId: {},
        category: {},

        freightCostBy: '',
        currency: '',
        currencyRate: 1,

        paymentMethod: '',
        paymentDueDays: 30,

        useVat: false,
        vatRate: 0,
        useIncomeTax: false,

        date: now,
        expectedDeliveryDate: now,
        actualDeliveryDate: now,

        isPosted: false,
        remark: '',
        items: [],
    });

    var _POItems = [];
    _POItems.push(purchaseOrder);

    var _supplier = new Supplier({
        code: '123',
        name: `[${code}]`,
        address: 'jakarta selatan',
        contact: '0812....',
        PIC: 'hotline',
        import: true
    });

    var deliveryOrder = new DeliveryOrder();
    deliveryOrder.no = '1';
    deliveryOrder.refNo = '2';
    deliveryOrder.date = now;
    deliveryOrder.supplierId = {};
    deliveryOrder.supplier = _supplier;
    deliveryOrder.isPosted = false;
    deliveryOrder.remark = 'remark DO';
    deliveryOrder.items = [];

    deliveryOrder.items = _POItems;

    return deliveryOrder;

}

it('#01. Should be able to get list', function (done) {
    request(uri)
        .get('/v1/purchasing/do')
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
    
    request(uri).post('/v1/purchasing/do')
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
    request(uri).put('/v1/purchasing/do')
        .send({ refNo: '[UPDATED]'})
        .end(function (err, res) {
            if (err) {
                done(err);
            } else {
                done();
            }
        });
});

it("#04. should success when delete data", function(done) {
    request(uri).del('/v1/purchasing/do/:id')
    .query({_id:createdId})
    .end(function (err, res) {
            if (err) {
                done(err);
            } else {
                done();
            }
        });
});