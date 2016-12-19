function test(name, path) {
    describe(name, function() {
        require(path);
    });
}

before("initialize server", function(done) {
    var server = require("../server");
    server(true)
        .then((server) => {
            const apiVersion = '1.0.0';

            var Router = require('restify-router').Router;
            var router = new Router();
            var resultFormatter = require("../src/result-formatter");
            var passport = require('../src/passports/local-passport');

            router.post('/', passport, (request, response, next) => {
                var account = request.user;

                var jwt = require("jsonwebtoken");
                var token = jwt.sign({
                    username: account.username,
                    profile: account.profile,
                    roles: account.roles
                }, process.env.AUTH_SECRET);

                var result = resultFormatter.ok(apiVersion, 200, token);
                response.send(200, result);
            });

            router.applyRoutes(server, "/authenticate");
            server.listen(process.env.PORT, process.env.IP);
            console.log(`server created at ${process.env.IP}:${process.env.PORT}`);

            done();
        });
});

describe('@dl-core-webapi', function() {
    this.timeout(2 * 60000);
    //Master
    test("~/master/budget", "./routes/master/budget");
    test("~/master/buyer", "./routes/master/buyer");
    test("~/master/category", "./routes/master/category");
    test("~/master/category", "./routes/master/currency");
    test("~/master/division", "./routes/master/division");
    test("~/master/lot-machine", "./routes/master/lot-machine");
    test("~/master/machine", "./routes/master/machine");
    test("~/master/product", "./routes/master/product");
    test("~/master/supplier", "./routes/master/supplier"); 
    test("~/master/thread-specification", "./routes/master/thread-specification");
    test("~/master/unit", "./routes/master/unit");
    test("~/master/uom", "./routes/master/uom");
    test("~/master/uster", "./routes/master/uster");
    test("~/master/vat", "./routes/master/vat");
    test("~/master/lamp-standard", "./routes/master/lamp-standard");
    test("~/master/instruction", "./routes/master/instruction");
});
