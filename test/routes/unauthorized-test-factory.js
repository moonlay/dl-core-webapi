require("should");
const host = `${process.env.IP}:${process.env.PORT}`;
var Request = require("supertest");
var getTestServer = require("../test-server");
var ObjectId = require("mongodb").ObjectId;

function getUnauthorizedTest(opt) {

    var options = opt || {};
    var uri = options.uri;

    var request;
    var jwt;

    before("#00. get security token", function (done) {
        getTestServer().then((server) => {
            request = Request(server);
            done();
        });
    });

    it(`#01. get list without security token - [GET]${uri}`, function (done) {
        request
            .get(uri)
            .set("Accept", "application/json")
            .expect(401)
            .end(function (err, response) {
                if (err)
                    done(err);
                else {
                    done();
                }
            });
    });

    it(`#02. get data without security token - [GET]${uri}/:id`, function (done) {
        request
            .get(`${uri}/${new ObjectId()}`)
            .set("Accept", "application/json")
            .expect(401)
            .end(function (err, response) {
                if (err)
                    done(err);
                else {
                    done();
                }
            });
    });

    it(`#03. create data without security token - [GET]${uri}`, function (done) {
        request
            .post(uri)
            .set("Accept", "application/json")
            .send({})
            .expect(401)
            .end(function (err, response) {
                if (err)
                    done(err);
                else {
                    done();
                }
            });
    });


    it(`#04. update data without security token - [GET]${uri}/:id`, function (done) {
        request
            .put(`${uri}/${new ObjectId()}`)
            .set("Accept", "application/json")
            .send({})
            .expect(401)
            .end(function (err, response) {
                if (err)
                    done(err);
                else {
                    done();
                }
            });
    });


    it(`#05. delete data without security token - [GET]${uri}/:id`, function (done) {
        request
            .delete(`${uri}/${new ObjectId()}`)
            .set("Accept", "application/json")
            .expect(401)
            .end(function (err, response) {
                if (err)
                    done(err);
                else {
                    done();
                }
            });
    });

}


module.exports = getUnauthorizedTest;
