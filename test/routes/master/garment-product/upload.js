require("should");
const host = `${process.env.IP}:${process.env.PORT}`;
var Request = require("supertest");
var server = require("../../../test-server");
var getToken = require("../../../token");
var ObjectId = require("mongodb").ObjectId;

var request = Request(host);
var jwt;

before("#00. init server", function (done) {
    server().then((server) => {
        request = Request(server);
        getToken(request)
            .then((token) => {
                jwt = token;
                done();
            })
            .catch((e) => {
                done(e);
            });
    });
})

it(`#01. should error when upload invalid file`, function (done) {
    request
        .post('/v1/master/upload-garment-products')
        .attach('fileUpload', "test/files/Master Garment Barang - Invalid.csv")
        .end(function (err, response) {
            if (err)
                done(err);
            else {
                var result = response.header;
                result.should.have.property("content-type");
                result.should.have.property("date");
                done();
            }
        });
});

it(`#02. should succes when upload valid file`, function (done) {
    request
        .post('/v1/master/upload-garment-products')
        .attach('fileUpload', "test/files/Master Garment Barang - Valid.csv")
        .end(function (err, response) {
            if (err)
                done(err);
            else {
                done();
            }
        });
});

it(`#03. should succes when get distinct data`, function (done) {
    request
        .get('/v1/master/garment-products/read/distinct-product-description')
        .set("authorization", `Bearer ${jwt}`)
        .set("Accept", "application/json")
        .expect(200)
        .expect("Content-Type", "application/json")
        .end(function (err, response) {
            if (err)
                done(err);
            else {
                var result = response.body;
                result.should.have.property("apiVersion");
                result.should.have.property("data");
                result.data.should.instanceOf(Array);
                done();
            }
        });
});