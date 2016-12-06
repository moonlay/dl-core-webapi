 var basicTest = require("../../basic-test-factory");
 basicTest({
     uri: "/master/vats",
     model: require("dl-models").master.Vat,
     validate: require("dl-models").validator.master.vat,
     util: require("dl-module").test.data.master.vat,
     keyword: null
 });
 