function test(name, path) {
    describe(name, function () {
        require(path);
    })
}

var server = require('./server');

before('initialize server', function (done) {
    server
        .then(uri => {
            console.log(uri);
            done();
        })
        .catch(e => done(e));
})



describe('@dl-core-webapi', function () {
    this.timeout(2 * 60000);
    // test("/v1/core/buyers", "./routers/buyer-route-test");
    // test("/v1/core/fabrics", "./routers/fabric-route-test");
    test("/v1/core/spareparts", "./routers/sparepart-route-test");
});
