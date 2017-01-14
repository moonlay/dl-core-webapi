 var basicTest = require("../../basic-test-factory");
 basicTest({
     uri: "/master/order-types",
     model: require("dl-models").master.OrderType,
     validate: require("dl-models").validator.master.orderType,
     util: require("dl-module").test.data.master.orderType,
     keyword: "code"
 });
 