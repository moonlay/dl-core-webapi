require("should");
const host = `${process.env.IP}:${process.env.PORT}`;
var Request = require("supertest");
var server = require("../../../test-server");
var getToken = require("../../../token");
var ObjectId = require("mongodb").ObjectId;

var request = Request(host);
var jwt;

before("#00. get security token", function (done) {
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
});

it(`#01. should succes get data by code`, function (done) {
    request
        .get('/v1/master/kurs-budgets/by-code')
        .set("authorization", `Bearer ${jwt}`)
        .set("Accept", "application/json")
        .expect(200)
        .expect("Content-Type", "application/json")
        .end(function (err, response) {
            if (err)
                done(err);
            else {
                done();
            }
        });
});