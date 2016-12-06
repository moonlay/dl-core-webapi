 var basicTest = require("../../basic-test-factory");
 basicTest({
     uri: "/master/buyers",
     model: require("dl-models").master.Buyer,
     validate: require("dl-models").validator.master.buyer,
     util: require("dl-module").test.data.master.buyer,
     keyword: "code"
 });
 