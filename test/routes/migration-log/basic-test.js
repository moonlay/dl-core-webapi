require("should");
const host = `${process.env.IP}:${process.env.PORT}`;
var Request = require("supertest");
var ObjectId = require("mongodb").ObjectId;
var getTestServer = require("../../test-server");
var getToken = require("../../token");
var request = Request(host);
var jwt;

before("#00. get security token", function (done) {
    getTestServer().then((server) => {
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
});


it(`#01. should success when get data`, function (done) {
    request
        .get('/v1/migrationLog/get/report')
        .set("authorization", `JWT ${jwt}`)
        .expect(200)
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
