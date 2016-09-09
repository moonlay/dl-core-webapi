var should = require('should');
var request = require('supertest');
var uri = `${process.env.IP}:${process.env.PORT}`;

function getData() {
    var Fabric = require('dl-models').core.Fabric;
    var UoM = require('dl-models').core.UoM;
    var UoM_Template = require('dl-models').core.UoM_Template;
    
    var now = new Date();
    var stamp = now / 1000 | 0;
    var code = stamp.toString(36);
    
    var fabric = new Fabric();
    // var uom_template = new UoM_Template({
    //     mainValue: 1,
    //     mainUnit: 'M',
    //     convertedValue: 1,
    //     convertedUnit: 'M'
    // });
    // var _uom_units = [];
    // _uom_units.push(uom_template);

    // var uom = new UoM({
    //     category: `UoM_Unit_Test[${code}]`,
    //     default: uom_template,
    //     units: _uom_units
    // });
    var uom = new UoM({
        unit: `Meter`
    });

    fabric.code = code;
    fabric.name = `name[${code}]`;
    fabric.price = 500;
    fabric.description = `desc for ${code}`;
    fabric.detail.composition = `composition for ${code}`;
    fabric.detail.construction = `construction for ${code}`;
    fabric.detail.yarn = `yarn for ${code}`;
    fabric.detail.width = 5;
    fabric.UoM = uom;
    return fabric;
}
it('#01. Should be able to get list', function (done) {
    request(uri)
        .get('/v1/core/fabrics')
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
    request(uri).post('/v1/core/fabrics')
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

it(`#03. should success when update created data`, function (done) {
    request(uri).put('/v1/core/buyers')
        .send({ name: 'test_name', code: 'test_code' })
        .end(function (err, res) {
            if (err) {
                done(err);
            } else {
                done();
            }
        });
});

var createdId;
it("#04. should success when delete data", function (done) {
    request(uri).del('/v1/core/buyers/:id')
        .query({ _id: createdId })
        .end(function (err, res) {
            if (err) {
                done(err);
            } else {
                done();
            }
        });
});
