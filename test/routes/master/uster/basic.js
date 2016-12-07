 var basicTest = require("../../basic-test-factory");
 basicTest({
     uri: "/master/usters",
     model: require("dl-models").master.Uster,
     validate: require("dl-models").validator.master.uster,
     util: require("dl-module").test.data.master.uster,
     keyword: "code"
 });
 