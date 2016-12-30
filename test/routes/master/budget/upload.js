require("should");
const host = `${process.env.IP}:${process.env.PORT}`;
var Request = require("supertest");
var ObjectId = require("mongodb").ObjectId;
var server = require("../../../test-server");
var request;// = Request(server);
var jwt;

before("#00. init server", function(done){
    server().then(server=>{
        request = Request(server);
        done();
    });
})

it(`#01. should error when upload invalid file`, function (done) {
    request
        .post('/v1/master/upload-budgets') 
        .attach('fileUpload', "test/files/Master Budget - Invalid.csv")
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
        .post('/v1/master/upload-budgets') 
        .attach('fileUpload', "test/files/Master Budget - Valid.csv")
        .end(function (err, response) {
            if (err)
                done(err);
            else { 
                done();
            }
        });
});