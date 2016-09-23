var should = require('should');
var request = require('supertest');
var uri = `${process.env.IP}:${process.env.PORT}`;

function getData() {
    var PurchaseOrderExternal = require('dl-models').purchasing.PurchaseOrderExternal;
    var PurchaseOrder = require('dl-models').purchasing.PurchaseOrder;
    var Supplier = require('dl-models').master.Supplier;
    var Buyer = require('dl-models').master.Buyer;
    var Unit = require('dl-models').master.Unit;
    var Category = require('dl-models').master.Category;
    var Uom = require('dl-models').master.Uom;
    var PurchaseOrderItem = require('dl-models').purchasing.PurchaseOrderItem;
    var Product = require('dl-models').master.Product;

    var now = new Date();
    var stamp = now / 1000 | 0;
    var code = stamp.toString(36);
    
    var supplier = new Supplier();
    supplier.code = code;
    supplier.name = `name[${code}]`;
    supplier.address = `Solo [${code}]`;
    supplier.contact = `phone[${code}]`;
    supplier.PIC=`PIC[${code}]`;
    supplier.import = true;

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
    
    var _purchaseOrderExternalItems = [];
    _purchaseOrderExternalItems.push(purchaseOrder);
    
    var purchaseOrderExternal = new PurchaseOrderExternal();
        purchaseOrderExternal.supplierId = "id";
        purchaseOrderExternal.supplier = supplier;
        purchaseOrderExternal.freightCostBy = "Pembeli";
        purchaseOrderExternal.currency = "IDR";
        purchaseOrderExternal.paymentMethod = "Cash";
        purchaseOrderExternal.useVat = true;
        purchaseOrderExternal.useIncomeTax = true;
        purchaseOrderExternal.date = new Date();
        purchaseOrderExternal.expectedDeliveryDate = new Date();
        purchaseOrderExternal.actualDeliveryDate = new Date();
        purchaseOrderExternal.items = _purchaseOrderItems;
    
    return purchaseOrderExternal;
}

it('#01. Should be able to get list', function (done) {
    request(uri)
        .get('/v1/purchasing/po/externals')
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
    
    request(uri).post('/v1/purchasing/po/externals')
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
    request(uri).put('/v1/purchasing/po/externals')
        .send({ freightCostBy: '[UPDATED]'})
        .end(function (err, res) {
            if (err) {
                done(err);
            } else {
                done();
            }
        });
});

it("#04. should success when delete data", function(done) {
    request(uri).del('/v1/purchasing/po/externals/:id')
    .query({_id:createdId})
    .end(function (err, res) {
            if (err) {
                done(err);
            } else {
                done();
            }
        });
});