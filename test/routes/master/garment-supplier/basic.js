 var basicTest = require("../../basic-test-factory");
 basicTest({
     uri: "/master/garment-suppliers",
     model: require("dl-models").master.Supplier,
     validate: require("dl-models").validator.master.supplier,
     util: require("dl-module").test.data.master.supplier,
     keyword: "code"
 });
 