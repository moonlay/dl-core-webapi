 var basicTest = require("../../basic-test-factory");
 basicTest({
     uri: "/master/currencies",
     model: require("dl-models").master.Currency,
     validate: require("dl-models").validator.master.currency,
     util: require("dl-module").test.data.master.currency,
     keyword: "code"
 });
 