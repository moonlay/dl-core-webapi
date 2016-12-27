require("should");
const host = `${process.env.IP}:${process.env.PORT}`;
var Request = require("supertest");
var server = require("../../../test-server");
var ObjectId = require("mongodb").ObjectId;

var request = Request(host);
var jwt;

before("#00. init server", function(done){
    server().then(server=>{
        request = Request(server);
        done();
    });
})

it(`#01. should error when upload invalid file`, function (done) {
    request
        .post('/v1/master/upload-units') 
        .attach('fileUpload', "test/files/Master Unit - Invalid.csv")
        .end(function (err, response) {
            if (err)
                done(err);
            else {
                var result= response.header;
                result.should.have.property("content-type");
                result.should.have.property("date"); 
                done();
            }
        });
});

it(`#02. should succes when upload valid file`, function (done) {
    request
        .post('/v1/master/upload-units') 
        .attach('fileUpload', "test/files/Master Unit - Valid.csv")
        .end(function (err, response) {
            if (err)
                done(err);
            else { 
                done();
            }
        });
});