 var basicTest = require("../../basic-test-factory");
 basicTest({
     uri: "/master/divisions",
     model: require("dl-models").master.Division,
     validate: require("dl-models").validator.master.division,
     util: require("dl-module").test.data.master.division,
     keyword: "code"
 });
 