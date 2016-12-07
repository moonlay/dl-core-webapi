 var basicTest = require("../../basic-test-factory");
 basicTest({
     uri: "/master/units",
     model: require("dl-models").master.Unit,
     validate: require("dl-models").validator.master.unit,
     util: require("dl-module").test.data.master.unit,
     keyword: "code"
 });
 