 var basicTest = require("../../basic-test-factory");
 basicTest({
     uri: "/master/standard-tests",
     model: require("dl-models").master.StandardTest,
     validate: require("dl-models").validator.master.standardTest,
     util: require("dl-module").test.data.master.standardTest,
     keyword: "code"
 });
 