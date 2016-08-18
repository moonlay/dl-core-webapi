var should = require('should');
var request = require('supertest');
var uri = `${process.env.IP}:${process.env.PORT}`;

function getData() {
    var Buyer = require('dl-models').core.Buyer;
    var buyer = new Buyer();

    var now = new Date();
    var stamp = now / 1000 | 0;
    var code = stamp.toString(36);

    buyer.code = code;
    buyer.name = `name[${code}]`;
    buyer.contact = 'phone[${code}]';
    buyer.address = 'Solo [${code}]';
    buyer.tempo = 0;

    return buyer;
}

it('#01. Should be able to get list', function (done) {
    request(uri)
        .get('/v1/core/buyers')
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
    request(uri).post('/v1/core/buyers')
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

it(`#03. should success when update created data`, function(done) {
    
    // createdData.RONo += '[updated]';
    // createdData.ReffPONo += '[updated]';
    // createdData.PONo += '[updated]';
    // createdData.termOfPayment += '[updated]';
    // createdData.PODLNo += '[updated]';
    // createdData.description += '[updated]';
    
    request(uri).put('/v1/core/buyers')
        .send({ name: 'Manny', code: 'cat' })
        .end(function (err, res) {
            if (err) {
                done(err);
            } else {
                done();
            }
        });
        });

var createdId;
it("#04. should success when delete data", function(done) {
    request(uri).del('/v1/core/buyers/:id')
    .query({_id:createdId})
    .end(function (err, res) {
            if (err) {
                done(err);
            } else {
                done();
            }
        });
});
