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
    test("/v1/core/spareparts", "./routers/sparepart-router-test");
    test("/v1/core/buyers", "./routers/buyer-router-test");
    test("/v1/core/suppliers", "./routers/supplier-router-test");
    test("/v1/core/textiles", "./routers/textile-router-test");
    test("/v1/core/fabrics", "./routers/fabric-router-test");
    test("/v1/core/accessories", "./routers/accessories-router-test");
    test("/v1/core/uoms", "./routers/UoM-router-test");
    test("/v1/core/generalmerchandise", "./routers/general-merchandise-router-test");
    test("/v1/po/garmentgenerals", "./routers/po-garment-general-router-test");
    test("/v1/po/garmentspareparts", "./routers/po-garment-sparepart-router-test");
    test("/v1/po/textilejoborders", "./routers/po-textile-job-order-external-router-test");
    test("/v1/po/garmentfabrics", "./routers/po-garment-fabric-router-test");
    
});
