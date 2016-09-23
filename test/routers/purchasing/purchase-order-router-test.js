var should = require('should');
var request = require('supertest');
var uri = `${process.env.IP}:${process.env.PORT}`;

function getData() {
    var PurchaseOrder = require('dl-models').purchasing.PurchaseOrder;
    var Buyer = require('dl-models').master.Buyer;
    var Unit = require('dl-models').master.Unit;
    var Category = require('dl-models').master.Category;
    var Uom = require('dl-models').master.Uom;
    var PurchaseOrderItem = require('dl-models').purchasing.PurchaseOrderItem;
    var Product = require('dl-models').master.Product;

    var now = new Date();
    var stamp = now / 1000 | 0;
    var code = stamp.toString(36);
    
    var buyer = new Buyer();
        buyer.code = code;
        buyer.name = `name[${code}]`;
        buyer.address = `Solo [${code}]`;
        buyer.country = `Ireland [${code}]`;
        buyer.contact = `phone[${code}]`;
        buyer.tempo= 0;
    
    var unit = new Unit();
        unit.code = code;
        unit.division = `division[${code}]`;
        unit.subDivision = `subDivision[${code}]`;
        unit.description=`description[${code}]`;
    
    var category = new Category();
        category.code = '';
        category.name = '';
        category.codeRequirement = '';
        
        
    var uom = new Uom({
        unit: `Meter`
    });
    
    var product = new Product();
        product.code = code;
        product.name = `name[${code}]`;
        product.price = 50;
        product.description = `description for ${code}`;
        product.uom = uom;
        product.tags = 'product,master';
        product.properties = [];
    
    var purchaseOrderItem = new PurchaseOrderItem();
        purchaseOrderItem.price= 10000;
        purchaseOrderItem.description= 'test desc';
        purchaseOrderItem.defaultQuantity= 10;
        purchaseOrderItem.defaultUom= 'Meter';
        purchaseOrderItem.dealQuantity= 1000;
        purchaseOrderItem.dealUom= 'Centimeter';
        purchaseOrderItem.product= product;

    var _purchaseOrderItems = [];
    _purchaseOrderItems.push(purchaseOrderItem);
    
    var purchaseOrder = new PurchaseOrder();
        purchaseOrder.refNo = '1' + code + stamp;
        purchaseOrder.buyerId = "id";
        purchaseOrder.buyer = buyer;
        purchaseOrder.unit = unit;
        purchaseOrder.buyerId = "id";
        purchaseOrder.categoryId = category;
        purchaseOrder.freightCostBy = "Pembeli";
        purchaseOrder.date = new Date();
        purchaseOrder.expectedDeliveryDate = new Date();
        purchaseOrder.actualDeliveryDate = new Date();
        purchaseOrder.items = _purchaseOrderItems;
        purchaseOrder.purchaseRequest.no = '1' + code + stamp;
        purchaseOrder.purchaseRequest.date = new Date();
        
    return purchaseOrder;
}

function updateForSplit(purchaseOrder) {

    var newPurchaseOrder = {};
    newPurchaseOrder.no = purchaseOrder.no;
    newPurchaseOrder.refNo = purchaseOrder.refNo;
    newPurchaseOrder.buyer = purchaseOrder.buyer;
    newPurchaseOrder.unit = purchaseOrder.unit;
    newPurchaseOrder.category = purchaseOrder.category;
    newPurchaseOrder.freightCostBy = purchaseOrder.freightCostBy+"split";
    newPurchaseOrder.expectedDeliveryDate = purchaseOrder.expectedDeliveryDate;
    newPurchaseOrder.actualDeliveryDate = purchaseOrder.actualDeliveryDate;
    newPurchaseOrder.date = purchaseOrder.date;
    newPurchaseOrder.items = purchaseOrder.items;

    for (var item of newPurchaseOrder.items) {
        item.dealQuantity = 1;
        item.defaultQuantity = 10;
    }

    return newPurchaseOrder;
}

it('#01. Should be able to get list', function (done) {
    request(uri)
        .get('/v1/purchasing/po')
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

var createdId;
var createdData;
it('#02. should success when create new data', function (done) {
    var data = getData();
    request(uri).post('/v1/purchasing/po')
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

it('#03. Should be able to get data by id', function (done) {
    request(uri)
        .get('/v1/purchasing/po/')
        .query({id:createdId})
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
                result.data.should.instanceOf(Object);
                createdData=result.data;
                done();
            }
        });
})

it(`#04. should success when update created data`, function (done) {
    request(uri).put('/v1/purchasing/po')
        .send({freightCostBy: '[updated]' })
        .end(function (err, res) {
            if (err) {
                done(err);
            } else {
                done();
            }
        });
});

it('#05. should success when split data', function (done) {
    var data = updateForSplit(createdData);
    request(uri).post('/v1/purchasing/po/split')
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

it("#06. should success when delete data", function(done) {
    request(uri).del('/v1/purchasing/po/:id')
    .query({_id:createdId})
    .end(function (err, res) {
            if (err) {
                done(err);
            } else {
                done();
            }
        });
});