var server = require("../server");
var Router = require('restify-router').Router;
var resultFormatter = require("../src/result-formatter");
var passport = require('../src/passports/local-passport');
var jwt = require("jsonwebtoken");
const apiVersion = "0.0.0";

function getTestServer() {
    return server().then((server) => {
        var router = new Router();
        router.post('/', passport, (request, response, next) => {
            var account = request.user;
            var token = jwt.sign({
                username: account.username,
                profile: account.profile,
                roles: account.roles
            }, process.env.AUTH_SECRET);

            var result = resultFormatter.ok(apiVersion, 200, token);
            response.send(200, result);
        });
        router.applyRoutes(server, "/authenticate");
        return Promise.resolve(server);
    })
}

module.exports = getTestServer;