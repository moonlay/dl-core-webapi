function test(name, path) {
    describe(name, function () {
        require(path);
    });
}

describe('@dl-core-webapi', function () { 
  
    this.timeout(2 * 60000);
    //Master
    test("~/master/budget", "./routes/master/budget");
    test('~/master/budget/upload', './routes/master/budget/upload');
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
    test("~/master/order-type", "./routes/master/order-type");
    test("~/master/process-type", "./routes/master/process-type");
});
