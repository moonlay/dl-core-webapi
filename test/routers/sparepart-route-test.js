var should = require('should');
var request = require('supertest');
var uri = `${process.env.IP}:${process.env.PORT}`;

function getData() {
    var Sparepart = require('dl-models').core.Sparepart;
    var UoM = require('dl-models').core.UoM;
    var UoM_Template = require('dl-models').core.UoM_Template;

    var sparepart = new Sparepart();
    var uom_template = new UoM_Template({
        mainValue: 1,
        mainUnit: 'M',
        convertedValue: 1,
        convertedUnit: 'M'
    });

    var _uom_units = [];
    _uom_units.push(uom_template);

    var uom = new UoM({
        category: 'UoM_Unit_Test',
        default: uom_template,
        units: _uom_units
    });

    var now = new Date();
    var stamp = now / 1000 | 0;
    var code = stamp.toString(36);

    sparepart.code = code;
    sparepart.name = `name[${code}]`;
    sparepart.description = `description [${code}]`;
    sparepart.UoM = uom;
    return sparepart;
}

it('#01. Should be able to get list', function (done) {
    request(uri)
        .get('/v1/core/spareparts')
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